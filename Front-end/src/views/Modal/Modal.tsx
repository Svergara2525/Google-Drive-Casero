import { useState } from "react";
import { apiClient } from "../../infrastructure/apiClient";

import * as S from "./Modal.style";

interface Props {
  setShowModal: (valor: boolean | null) => void;
}

export const Modal: React.FC<Props> = ({ setShowModal }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

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

  return (
    <S.BackgroundDark>
      <S.ModalWrapper>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir archivo</button>
        <button onClick={() => setShowModal(false)}>Cerrar</button>
      </S.ModalWrapper>
    </S.BackgroundDark>
  );
};
