import { apiClient } from "../../infrastructure/apiClient";
import { useState, useEffect, useRef } from "react";

import { Data } from "../../Models/data";
import { file_atributes } from "../../Models/file_atributes";
import { Modal } from "../Modal";
import { Buttons } from "./_components/Buttons";
import { FoldersData } from "./_components/FoldersData";
import { FilesData } from "./_components/FilesData";
import { OpenFileModal } from "./_components/OpenFileModal";

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFolder, setUploadedFoler] = useState<string | null>(null);
  const clickFile = useRef(false);

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

  console.log("Probando inspector");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPath = window.location.pathname;
        const response = await apiClient.folderSelect(currentPath);
        history.pushState({ data: response }, "", currentPath);
        setData(response);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [uploadedFile, uploadedFolder]);

  window.onpopstate = (event) => {
    if (event.state && event.state.data) {
      setData(event.state.data);
    }
  };

  return (
    <S.StyledMainPageWrapper>
      <Buttons
        setShowFolderModal={setShowFolderModal}
        setShowFileModal={setShowFileModal}
        setShowModal={setShowModal}
      ></Buttons>
      {loading && <S.StyledDataWrapper>Cargando...</S.StyledDataWrapper>}
      {error && <S.StyledDataWrapper>{error}</S.StyledDataWrapper>}
      {data && (
        <S.StyledDataWrapper>
          {data.subcarpetas.length !== 0 && (
            <FoldersData setData={setData} setError={setError} data={data} />
          )}
          <FilesData
            data={data}
            setImage={setImage}
            setOpenImage={setOpenImage}
            imageExtensions={imageExtensions}
            fileExtensions={fileExtensions}
          />
          {openImage && (
            <OpenFileModal
              clickFile={clickFile}
              setOpenImage={setOpenImage}
              imagen={imagen}
              imageExtensions={imageExtensions}
              fileExtensions={fileExtensions}
            />
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
          setUploadedFile={setUploadedFile}
          setUploadedFolder={setUploadedFoler}
        ></Modal>
      )}
    </S.StyledMainPageWrapper>
  );
};
