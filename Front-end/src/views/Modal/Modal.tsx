import { useState, useRef } from "react";
import { apiClient } from "../../infrastructure/apiClient";

import * as S from "./Modal.style";

interface Props {
  setShowModal: (valor: boolean | null) => void;
  showFileModal: boolean | null;
  showFolderModal: boolean | null;
  setShowFileModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
}

export const Modal: React.FC<Props> = ({
  setShowModal,
  showFileModal,
  showFolderModal,
  setShowFileModal,
  setShowFolderModal,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [folderName, setFolderlName] = useState<string | null>(null);
  const clickModal = useRef(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("path", window.location.pathname.replace(/^\/+/, ""));
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("file", selectedFiles[i]);
      }
    }
    const fetchData = async () => {
      try {
        await apiClient.uploadFile(formData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const createFolder = (folderName: string) => {
    const formData = new FormData();
    formData.append(
      "path",
      window.location.pathname.replace(/^\/+/, "") + "/" + folderName
    );
    const fetchData = async () => {
      try {
        await apiClient.createFolder(formData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleFolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderlName(event.target.value);
  };

  const handleClickModal = () => {
    if (!clickModal.current) {
      setShowModal(false);
      setShowFileModal(false);
      setShowFolderModal(false);
    }
    clickModal.current = false;
  };

  return (
    <S.BackgroundDark onClick={() => handleClickModal()}>
      <S.ModalWrapper
        onClick={() => {
          clickModal.current = true;
        }}
      >
        {showFileModal && (
          <S.ModalOptionWrapper>
            <S.StyledFileUploader>
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                {selectedFiles === null ? (
                  <S.CloudUploadIcon />
                ) : (
                  <S.SelectedFileWrapper>
                    <S.FileIcon />
                    <S.FileSelectText>
                      {selectedFiles.length + " Archivos seleccionados"}
                    </S.FileSelectText>
                  </S.SelectedFileWrapper>
                )}
              </label>
            </S.StyledFileUploader>
            <S.ButtonsWrapper>
              <S.StyledButton
                disabled={!selectedFiles}
                onClick={() => {
                  handleUpload();
                  setShowModal(false);
                  setShowFileModal(false);
                }}
              >
                Subir archivo
              </S.StyledButton>
              <S.StyledButton
                onClick={() => {
                  setShowModal(false);
                  setShowFileModal(false);
                }}
              >
                Cerrar
              </S.StyledButton>
            </S.ButtonsWrapper>
          </S.ModalOptionWrapper>
        )}

        {showFolderModal && (
          <S.ModalOptionWrapper>
            <S.StyledInputFolderName
              type="text"
              value={folderName ?? ""}
              onChange={handleFolderName}
            />
            <S.ButtonsWrapper>
              <S.StyledButton
                disabled={!folderName}
                onClick={() => {
                  createFolder(folderName ?? "");
                  setShowModal(false);
                  setShowFolderModal(false);
                }}
              >
                Crear carpeta
              </S.StyledButton>
              <S.StyledButton
                onClick={() => {
                  setShowModal(false);
                  setShowFolderModal(false);
                }}
              >
                Cerrar
              </S.StyledButton>
            </S.ButtonsWrapper>
          </S.ModalOptionWrapper>
        )}
      </S.ModalWrapper>
    </S.BackgroundDark>
  );
};
