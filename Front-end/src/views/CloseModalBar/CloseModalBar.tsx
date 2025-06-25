import * as S from "./CloseModalBar.style";

interface Props {
  setOpenModal: (valor: boolean | null) => void;
}

export const CloseModalBar: React.FC<Props> = ({ setOpenModal }) => {
  return <S.StyledCloseButton onClick={() => setOpenModal(false)} />;
};
