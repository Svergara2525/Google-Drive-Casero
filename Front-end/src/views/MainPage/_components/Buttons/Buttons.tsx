import { FiFolderPlus, FiUploadCloud } from "react-icons/fi";
import "./Buttons.css";

interface Props {
  setShowModal: (valor: boolean | null) => void;
  setShowFileModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
  setIsCreateFolder: (valor: boolean | null) => void;
}

export const Buttons: React.FC<Props> = ({
  setShowModal,
  setShowFileModal,
  setShowFolderModal,
  setIsCreateFolder,
}) => {
  return (
    <div className="file-actions">
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setShowFolderModal(true);
          setIsCreateFolder(true);
        }}
      >
        <FiFolderPlus aria-hidden="true" /> Crear carpeta
      </button>
      <button
        className="button button--primary"
        onClick={() => {
          setShowModal(true);
          setShowFileModal(true);
        }}
      >
        <FiUploadCloud aria-hidden="true" /> Subir archivo
      </button>
    </div>
  );
};
