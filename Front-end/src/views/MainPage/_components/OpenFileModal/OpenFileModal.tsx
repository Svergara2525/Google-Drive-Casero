import { CloseModalBar } from "../../../CloseModalBar";
import { file_atributes } from "../../../../Models/file_atributes";
import { API_URL } from "../../../../infrastructure/apiClient";

import * as S from "./OpenFileModal.style";

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
    <S.BackgroundDark onClick={() => handleClickFile()}>
      <CloseModalBar setOpenModal={setOpenImage} imagen={imagen} />
      {imageExtensions.includes((imagen?.extension ?? "").toLowerCase()) ? (
        <S.StyledOpenImage
          onClick={() => {
            clickFile.current = true;
          }}
          src={`${API_URL}/files${imagen?.file_path}`}
          alt="Imagen"
        />
      ) : fileExtensions.includes((imagen?.extension ?? "").toLowerCase()) ? (
        <iframe
          src={`${API_URL}/files${imagen?.file_path}`}
          width="100%"
          height="100%"
          title="Archivo"
        />
      ) : null}
    </S.BackgroundDark>
  );
};
