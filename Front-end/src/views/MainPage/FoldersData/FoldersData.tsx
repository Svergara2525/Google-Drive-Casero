import * as S from "./FoldersData.style";
import { FaFolder } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { apiClient } from "../../../infrastructure/apiClient";

import { Data } from "../../../Models/data";

interface Props {
  setData: (valor: Data | null) => void;
  setError: (valor: string | null) => void;
  data: Data | null;
}

export const FoldersData: React.FC<Props> = ({ setData, setError, data }) => {
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
        <S.StyledFolder key={index} onClick={() => handleClick(item)}>
          <FaFolder />
          {item}
          <SlOptionsVertical />
        </S.StyledFolder>
      ))}
    </S.StyledFolderWrapper>
  );
};
