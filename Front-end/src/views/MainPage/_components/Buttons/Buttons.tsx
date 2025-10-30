import * as S from "./Buttons.style";

interface Props {
  setShowModal: (valor: boolean | null) => void;
  setShowFileModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
}

export const Buttons: React.FC<Props> = ({
  setShowModal,
  setShowFileModal,
  setShowFolderModal,
}) => {
  return (
    <S.StyledButtonWrapper>
      <S.StyledButton
        onClick={() => {
          setShowModal(true);
          setShowFolderModal(true);
        }}
      >
        Crear carpeta
      </S.StyledButton>
      <S.StyledButton
        onClick={() => {
          setShowModal(true);
          setShowFileModal(true);
        }}
      >
        Subir archivo
      </S.StyledButton>
    </S.StyledButtonWrapper>
  );
};
