import { CloseModalBar } from "../../../CloseModalBar";
import { file_atributes } from "../../../../Models/file_atributes";
import { API_URL } from "../../../../infrastructure/apiClient";

import "./OpenFileModal.css";

interface Props {
  clickFile: React.MutableRefObject<boolean>;
  setOpenImage: (valor: boolean | null) => void;
  imagen: file_atributes | null;
  imageExtensions: string[];
  fileExtensions: string[];
}

export const OpenFileModal: React.FC<Props> = ({
  clickFile,
  setOpenImage,
  imagen,
  imageExtensions,
  fileExtensions,
}) => {
  const handleClickFile = () => {
    if (!clickFile.current) {
      setOpenImage(false);
    }
    clickFile.current = false;
  };
  return (
    <div
      className="preview-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Vista previa de ${imagen?.file_name ?? "archivo"}`}
      onClick={() => handleClickFile()}
    >
      <CloseModalBar setOpenModal={setOpenImage} imagen={imagen} />
      {imageExtensions.includes((imagen?.extension ?? "").toLowerCase()) ? (
        <img
          className="preview-image"
          onClick={() => {
            clickFile.current = true;
          }}
          src={`${API_URL}/files${imagen?.file_path}`}
          alt={imagen?.file_name ?? "Imagen"}
        />
      ) : fileExtensions.includes((imagen?.extension ?? "").toLowerCase()) ? (
        <iframe
          className="preview-document"
          src={`${API_URL}/files${imagen?.file_path}`}
          width="100%"
          height="100%"
          title="Archivo"
        />
      ) : null}
    </div>
  );
};
