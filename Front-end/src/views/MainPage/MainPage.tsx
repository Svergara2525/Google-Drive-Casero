import { apiClient } from "../../infrastructure/apiClient";
import { useState, useEffect } from "react";

import { CloseModalBar } from "../CloseModalBar";
import { Data } from "../../Models/data";
import { file_atributes } from "../../Models/file_atributes";
import { Modal } from "../Modal";

import { FaFolder } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

import * as S from "./MainPage.style";

interface Props {
  showModal: boolean | null;
  showFileModal: boolean | null;
  showFolderModal: boolean | null;
  setShowModal: (valor: boolean | null) => void;
  setShowFileModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
}

export const MainPage: React.FC<Props> = ({
  showModal,
  showFileModal,
  showFolderModal,
  setShowModal,
  setShowFileModal,
  setShowFolderModal,
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);
  const [imagen, setImage] = useState<file_atributes | null>(null);
  const [openImage, setOpenImage] = useState<boolean | null>(false);

  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".heic",
    ".bmp",
    ".webp",
    ".svg",
  ];

  const fileExtensions = [".pdf", ".docx", ".txt"];

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

  console.log(openImage);

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
      {loading && <S.StyledFolderWrapper>Cargando...</S.StyledFolderWrapper>}
      {error && <S.StyledFolderWrapper>{error}</S.StyledFolderWrapper>}
      {data && (
        <S.StyledDataWrapper>
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
              data.archivos.map((item: file_atributes, index: any) => (
                <S.StyledFileBox
                  onClick={() => {
                    setImage(item);
                    setOpenImage(true);
                  }}
                  key={index}
                >
                  <S.StyledOptionsFileWrapper>
                    <S.FileNameContainer>{item.file_name}</S.FileNameContainer>
                    <SlOptionsVertical />
                  </S.StyledOptionsFileWrapper>
                  {imageExtensions.includes(item.extension.toLowerCase()) ? (
                    <S.StyledImagePreview
                      src={`http://localhost:5001/files${item.file_path}`}
                      alt="Imagen"
                      key={index}
                    />
                  ) : fileExtensions.includes(item.extension.toLowerCase()) ? (
                    <S.StyledFilePreview />
                  ) : null}
                </S.StyledFileBox>
              ))}
          </S.StyledFilesWrapper>
          {openImage && (
            <S.BackgroundDark>
              <CloseModalBar setOpenModal={setOpenImage} imagen={imagen} />
              {imageExtensions.includes(
                (imagen?.extension ?? "").toLowerCase()
              ) ? (
                <S.StyledOpenImage
                  src={`http://localhost:5001/files${imagen?.file_path}`}
                  alt="Imagen"
                />
              ) : fileExtensions.includes(
                  (imagen?.extension ?? "").toLowerCase()
                ) ? (
                <iframe
                  src={`http://localhost:5001/files${imagen?.file_path}`}
                  width="100%"
                  height="100%"
                  title="Archivo"
                />
              ) : null}
            </S.BackgroundDark>
          )}
        </S.StyledDataWrapper>
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setShowFileModal={setShowFileModal}
          setShowFolderModal={setShowFolderModal}
          showFileModal={showFileModal}
          showFolderModal={showFolderModal}
        ></Modal>
      )}
    </S.StyledMainPageWrapper>
  );
};
