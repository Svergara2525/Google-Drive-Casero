import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

import { Data } from "../../../../Models/data";
import { file_atributes } from "../../../../Models/file_atributes";
import { ContextMenu } from "../../../ContextMenu";

import * as S from "./FilesData.style";

interface Props {
  data: Data | null;
  setImage: (valor: file_atributes | null) => void;
  setOpenImage: (valor: boolean | null) => void;
  imageExtensions: string[];
  fileExtensions: string[];
  optionMenu: React.MutableRefObject<boolean>;
}

export const FilesData: React.FC<Props> = ({
  data,
  setImage,
  setOpenImage,
  imageExtensions,
  fileExtensions,
  optionMenu,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <S.StyledFilesWrapper>
      {data?.archivos &&
        data.archivos.map((item: file_atributes, index: any) => (
          <S.StyledFileBox
            onClick={() => {
              if (!optionMenu.current) {
                setImage(item);
                setOpenImage(true);
              }
            }}
            key={index}
          >
            <S.StyledOptionsFileWrapper>
              <S.FileNameContainer>{item.file_name}</S.FileNameContainer>
              <ContextMenu
                opened={selectedFile === item.file_name}
                onChange={(opened) => {
                  setSelectedFile(opened ? item.file_name : null);
                  optionMenu.current = opened ? true : false;
                }}
              >
                <SlOptionsVertical
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log("Options clicked")}
                />
              </ContextMenu>
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
