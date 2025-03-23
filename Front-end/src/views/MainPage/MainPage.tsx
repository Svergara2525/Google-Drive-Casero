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
        history.pushState({ data: response.subcarpetas }, "", "/");
        setData(response.subcarpetas);
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
        console.log(window.location.pathname);
        const nuevaURL =
          window.location.pathname === "/"
            ? `/${item}`
            : `${window.location.pathname}/${item}`;
        const response = await apiClient.folderSelect(nuevaURL);
        history.pushState({ data: response.subcarpetas }, "", nuevaURL);
        setData(response.subcarpetas);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      }
    };
    fetchData();
  };

  window.onpopstate = (event) => {
    console.log("He hecho click atrás", event.state.data);
    if (event.state && event.state.data) {
      setData(event.state.data);
    }
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
