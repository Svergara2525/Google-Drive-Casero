import { useState } from "react";
import { apiClient } from "../../infrastructure/apiClient";

import * as S from "./Modal.style";

interface Props {
  setShowModal: (valor: boolean | null) => void;
}

export const Modal: React.FC<Props> = ({ setShowModal }) => {
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
        {}
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir archivo</button>
        <button onClick={() => setShowModal(false)}>Cerrar</button>
        <button onClick={() => createFolder(folderName ?? "")}>
          Crear carpeta
        </button>
        <input
          type="text"
          value={folderName ?? ""}
          onChange={handleFolderName}
        />
      </S.ModalWrapper>
    </S.BackgroundDark>
  );
};
