import { apiClient } from "../../infrastructure/apiClient";
import { useState, useEffect } from "react";
import * as S from "./MainPage.style";

export const MainPage: React.FC = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (path === null) {
          const response = await apiClient.getFWS();
          setData(response.mensaje);
        } else {
          const response = await apiClient.folderSelect(path);
          setData(response.subcarpetas);
        }
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path]);

  const handleClick = (item: string) => {
    localStorage.setItem("path", (path ?? "") + "/" + item);
    setPath(localStorage.getItem("path"));
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
