import { useState } from "react";

import { FaFolder } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { apiClient } from "../../../../infrastructure/apiClient";

import { Data } from "../../../../Models/data";
import { ContextMenu } from "../../../ContextMenu";

import * as S from "./FoldersData.style";

interface Props {
  setData: (valor: Data | null) => void;
  setError: (valor: string | null) => void;
  data: Data | null;
  optionMenu: React.MutableRefObject<boolean>;
}

export const FoldersData: React.FC<Props> = ({
  setData,
  setError,
  data,
  optionMenu,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleClick = (item: string) => {
    const fetchData = async () => {
      try {
        console.log(window.location.pathname);
        const nuevaURL =
          window.location.pathname === "/"
            ? `/${item}`
            : `${window.location.pathname}/${item}`;
        const response = await apiClient.folderSelect(nuevaURL);
        history.pushState({ data: response }, "", nuevaURL);
        setData(response);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      }
    };

    fetchData();
  };

  return (
    <S.StyledFolderWrapper>
      {data?.subcarpetas.map((item: string, index: any) => (
        <S.StyledFolder
          key={index}
          onClick={() => {
            if (!optionMenu.current) {
              handleClick(item);
            }
          }}
        >
          <FaFolder />
          {item}
          <ContextMenu
            opened={selectedFolder === item}
            onChange={(opened) => {
              setSelectedFolder(opened ? item : null);
              optionMenu.current = opened ? true : false;
            }}
          >
            <SlOptionsVertical />
          </ContextMenu>
        </S.StyledFolder>
      ))}
    </S.StyledFolderWrapper>
  );
};
