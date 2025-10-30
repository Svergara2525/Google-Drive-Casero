import { Data } from "../../../../Models/data";
import { file_atributes } from "../../../../Models/file_atributes";

import { SlOptionsVertical } from "react-icons/sl";

import * as S from "./FilesData.style";

interface Props {
  data: Data | null;
  setImage: (valor: file_atributes | null) => void;
  setOpenImage: (valor: boolean | null) => void;
  imageExtensions: string[];
  fileExtensions: string[];
}

export const FilesData: React.FC<Props> = ({
  data,
  setImage,
  setOpenImage,
  imageExtensions,
  fileExtensions,
}) => {
  return (
    <S.StyledFilesWrapper>
      {data?.archivos &&
        data.archivos.map((item: file_atributes, index: any) => (
          <S.StyledFileBox
            onClick={() => {
              setImage(item);
              setOpenImage(true);
            }}
            key={index}
          >
            <S.StyledOptionsFileWrapper>
              <S.FileNameContainer>{item.file_name}</S.FileNameContainer>
              <SlOptionsVertical />
            </S.StyledOptionsFileWrapper>
            {imageExtensions.includes(item.extension.toLowerCase()) ? (
              <S.StyledImagePreview
                src={`http://localhost:5001/files${item.file_path}`}
                alt="Imagen"
                key={index}
              />
            ) : fileExtensions.includes(item.extension.toLowerCase()) ? (
              <S.StyledFilePreview />
            ) : null}
          </S.StyledFileBox>
        ))}
    </S.StyledFilesWrapper>
  );
};
