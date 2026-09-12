import { file_atributes } from "../../Models/file_atributes";
import { API_URL } from "../../infrastructure/apiClient";

import * as S from "./CloseModalBar.style";

interface Props {
  setOpenModal: (valor: boolean | null) => void;
  imagen: file_atributes | null;
}

export const CloseModalBar: React.FC<Props> = ({ setOpenModal, imagen }) => {
  return (
    <>
      <S.StyledCloseButton onClick={() => setOpenModal(false)} />
      <S.StyledDownloadWrapper
        href={`${API_URL}/download_file${imagen?.file_path}`}
        download={imagen?.file_name}
      >
        <S.StyledDownloadButton />
      </S.StyledDownloadWrapper>
    </>
  );
};
