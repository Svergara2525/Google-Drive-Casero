import { useState, useRef } from "react";
import { apiClient } from "../../infrastructure/apiClient";

import { FiCloud, FiFileText, FiFolderPlus, FiEdit3 } from "react-icons/fi";
import "./Modal.css";

interface Props {
  setShowModal: (valor: boolean | null) => void;
  showFileModal: boolean | null;
  showFolderModal: boolean | null;
  setShowFileModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
  setRechargePage: (valor: string | null) => void;
  isCreateFolder: boolean | null;
  setIsCreateFolder: (valor: boolean | null) => void;
  filePath: string | null;
  fileExtension: string | null;
}

export const Modal: React.FC<Props> = ({
  setShowModal,
  showFileModal,
  showFolderModal,
  setShowFileModal,
  setShowFolderModal,
  setRechargePage,
  isCreateFolder,
  setIsCreateFolder,
  filePath,
  fileExtension,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [folderName, setFolderlName] = useState<string | null>(null);
  const clickModal = useRef(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFiles(event.target.files);
    }
  };

  const renameFile = async (newFile: string | null) => {
    const folderPath = newFile?.substring(0, newFile?.lastIndexOf("/"));
    await apiClient.renameFile(
      filePath || "",
      newFile ?? "",
      fileExtension || "",
    );
    setRechargePage(folderPath + "/" + newFile);
    console.log("Renombrar archivo");
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
        setRechargePage(selectedFiles ? selectedFiles[0].name : null);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const createFolder = (folderName: string) => {
    const fetchData = async () => {
      try {
        await apiClient.createFolder(folderName);
        setRechargePage(folderName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const handleNombreCarpeta = (folderName: string) => {
    const currentPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
    folderName = currentPath ? `${currentPath}/${folderName}` : folderName;
    if (isCreateFolder) {
      createFolder(folderName);
      setIsCreateFolder(false);
    } else {
      renameFile(folderName ?? "");
    }
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
    <div className="modal-backdrop" onClick={() => handleClickModal()}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={() => {
          clickModal.current = true;
        }}
      >
        {showFileModal && (
          <div className="modal-content">
            <div className="modal-heading">
              <span className="modal-heading-icon">
                <FiCloud aria-hidden="true" />
              </span>
              <h2 id="modal-title">Subir archivos</h2>
              <p>Añade nuevos archivos a tu espacio personal.</p>
            </div>
            <div className="file-uploader">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
                className="file-upload-input"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                {selectedFiles === null ? (
                  <>
                    <FiCloud className="upload-icon" aria-hidden="true" />
                    <span className="file-select-text">
                      Selecciona tus archivos
                    </span>
                    <span className="file-select-caption">
                      Haz clic para explorar tu dispositivo
                    </span>
                  </>
                ) : (
                  <span className="selected-file">
                    <FiFileText className="upload-icon" aria-hidden="true" />
                    <span className="file-select-text">
                      {selectedFiles.length + " Archivos seleccionados"}
                    </span>
                    <span className="file-select-caption">
                      Haz clic para cambiar la selección
                    </span>
                  </span>
                )}
              </label>
            </div>
            <div className="modal-actions">
              <button
                className="button button--primary"
                disabled={!selectedFiles}
                onClick={() => {
                  handleUpload();
                  setShowModal(false);
                  setShowFileModal(false);
                }}
              >
                Subir archivo
              </button>
              <button
                className="button"
                onClick={() => {
                  setShowModal(false);
                  setShowFileModal(false);
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {showFolderModal && (
          <div className="modal-content">
            <div className="modal-heading">
              <span className="modal-heading-icon">
                {isCreateFolder ? (
                  <FiFolderPlus aria-hidden="true" />
                ) : (
                  <FiEdit3 aria-hidden="true" />
                )}
              </span>
              <h2 id="modal-title">
                {isCreateFolder ? "Crear carpeta" : "Cambiar nombre"}
              </h2>
              <p>
                {isCreateFolder
                  ? "Un nuevo lugar para mantener todo organizado."
                  : "Elige un nuevo nombre para este elemento."}
              </p>
            </div>
            <label className="folder-input-label" htmlFor="folder-name">
              {isCreateFolder ? "Nombre de la carpeta" : "Nuevo nombre"}
            </label>
            <input
              className="folder-name-input"
              id="folder-name"
              placeholder="Introduce el nombre"
              type="text"
              value={folderName ?? ""}
              onChange={handleFolderName}
            />
            <div className="modal-actions">
              <button
                className="button button--primary"
                disabled={!folderName}
                onClick={() => {
                  handleNombreCarpeta(folderName ?? "");
                  setShowModal(false);
                  setShowFolderModal(false);
                }}
              >
                {isCreateFolder ? "Crear carpeta" : "Cambiar nombre"}
              </button>
              <button
                className="button"
                onClick={() => {
                  setShowModal(false);
                  setShowFolderModal(false);
                  setIsCreateFolder(false);
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
