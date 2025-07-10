import { useState } from "react";
import { apiClient } from "../../infrastructure/apiClient";
import { MdCloudUpload } from "react-icons/md";

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

  return (
    <S.BackgroundDark>
      <S.ModalWrapper>
        {showFileModal && (
          <div>
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
                  <MdCloudUpload color="#1475cf" size={60} />
                ) : (
                  <S.SelectedFileWrapper>
                    <S.NumberOffFiles />
                    <S.FileSelectText>
                      {selectedFiles.length + " Archivos seleccionados"}
                    </S.FileSelectText>
                  </S.SelectedFileWrapper>
                )}
              </label>
            </S.StyledFileUploader>
            <button onClick={handleUpload}>Subir archivo</button>
            <button
              onClick={() => {
                setShowModal(false);
                setShowFileModal(false);
              }}
            >
              Cerrar
            </button>
          </div>
        )}

        {showFolderModal && (
          <div>
            <button onClick={() => createFolder(folderName ?? "")}>
              Crear carpeta
            </button>
            <input
              type="text"
              value={folderName ?? ""}
              onChange={handleFolderName}
            />
            <button
              onClick={() => {
                setShowModal(false);
                setShowFolderModal(false);
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </S.ModalWrapper>
    </S.BackgroundDark>
  );
};
