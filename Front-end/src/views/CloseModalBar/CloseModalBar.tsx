import { file_atributes } from "../../Models/file_atributes";
import { API_URL } from "../../infrastructure/apiClient";

import { FiX, FiDownload, FiFile } from "react-icons/fi";
import "./CloseModalBar.css";

interface Props {
  setOpenModal: (valor: boolean | null) => void;
  imagen: file_atributes | null;
}

export const CloseModalBar: React.FC<Props> = ({ setOpenModal, imagen }) => {
  return (
    <div className="preview-toolbar">
      <button
        className="preview-tool-button"
        aria-label="Cerrar vista previa"
        onClick={() => setOpenModal(false)}
      >
        <FiX aria-hidden="true" />
      </button>
      <div className="preview-title">
        <FiFile aria-hidden="true" />
        <span>{imagen?.file_name}</span>
      </div>
      <a
        className="preview-tool-button"
        aria-label="Descargar archivo"
        title="Descargar archivo"
        href={`${API_URL}/download_file${imagen?.file_path}`}
        download={imagen?.file_name}
      >
        <FiDownload aria-hidden="true" />
      </a>
    </div>
  );
};
