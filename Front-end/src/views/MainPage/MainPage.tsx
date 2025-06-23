import { apiClient } from "../../infrastructure/apiClient";
import { useState, useEffect } from "react";
import { Data } from "../../Models/data";

import { FaFolder } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

import * as S from "./MainPage.style";

interface Props {
  setShowModal: (valor: boolean | null) => void;
  setShowFileModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
}

export const MainPage: React.FC<Props> = ({
  setShowModal,
  setShowFileModal,
  setShowFolderModal,
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getFWS();
        history.pushState({ data: response }, "", "/");
        setData(response);
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
        history.pushState({ data: response }, "", nuevaURL);
        setData(response);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      }
    };
    fetchData();
  };

  window.onpopstate = (event) => {
    if (event.state && event.state.data) {
      setData(event.state.data);
    }
  };

  return (
    <S.StyledMainPageWrapper>
      <S.StyledButtonWrapper>
        <S.StyledButton
          onClick={() => {
            setShowModal(true);
            setShowFolderModal(true);
          }}
        >
          Crear carpeta
        </S.StyledButton>
        <S.StyledButton
          onClick={() => {
            setShowModal(true);
            setShowFileModal(true);
          }}
        >
          Subir archivo
        </S.StyledButton>
      </S.StyledButtonWrapper>
      <div>
        {loading && <S.StyledFolderWrapper>Cargando...</S.StyledFolderWrapper>}
        {error && <S.StyledFolderWrapper>{error}</S.StyledFolderWrapper>}
        {data && (
          <div>
            <S.StyledFolderWrapper>
              {data.subcarpetas.map((item: string, index: any) => (
                <S.StyledFolder key={index} onClick={() => handleClick(item)}>
                  <FaFolder />
                  {item}
                  <SlOptionsVertical />
                </S.StyledFolder>
              ))}
            </S.StyledFolderWrapper>
            <S.StyledFilesWrapper>
              {data.archivos &&
                data.archivos.map((item: string, index: any) => (
                  <S.StyledImageWrapper>
                    <S.StyledOptionsFileWrapper>
                      <>Foto {index}</>
                      <SlOptionsVertical />
                    </S.StyledOptionsFileWrapper>
                    <S.StyledImage
                      src={`http://localhost:5001/files${item}`}
                      alt="Imagen"
                      key={index}
                    />
                  </S.StyledImageWrapper>
                ))}
            </S.StyledFilesWrapper>
          </div>
        )}
      </div>
    </S.StyledMainPageWrapper>
  );
};
