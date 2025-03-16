import { apiClient } from "../../infrastructure/apiClient";
import { useState, useEffect } from "react";
import * as S from "./MainPage.style";

export const MainPage: React.FC = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getFWS();
        console.log(response);
        setData(response.mensaje);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = (item: string) => {
    const fetchData = async () => {
      try {
        const response = await apiClient.folderSelect(item);
        setData(response.subcarpetas);
      } catch (error) {
        setError("Error al cargar los datos");
      } finally {
        console.log("error");
        setLoading(false);
      }
    };
    fetchData();
  };

  return (
    <div>
      <S.StyledButtonWrapper>
        <S.StyledButton>Crear carpeta</S.StyledButton>
        <S.StyledButton>Subir archivo</S.StyledButton>
      </S.StyledButtonWrapper>
      <div>
        {loading && <S.StyledFolderWrapper>Cargando...</S.StyledFolderWrapper>}
        {error && <S.StyledFolderWrapper>{error}</S.StyledFolderWrapper>}
        {data && (
          <S.StyledFolderWrapper>
            {data.map((item: string, index: any) => (
              <S.StyledFolder key={index} onClick={() => handleClick(item)}>
                {item}
              </S.StyledFolder>
            ))}
          </S.StyledFolderWrapper>
        )}
      </div>
    </div>
  );
};
