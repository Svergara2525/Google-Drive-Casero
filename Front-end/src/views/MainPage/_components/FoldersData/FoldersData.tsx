import { useState } from "react";

import { FaFolder } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { apiClient } from "../../../../infrastructure/apiClient";

import { Data } from "../../../../Models/data";
import { ContextMenu } from "../../../ContextMenu";

import "./FoldersData.css";

interface Props {
  setData: (valor: Data | null) => void;
  setError: (valor: string | null) => void;
  data: Data | null;
  optionMenu: React.MutableRefObject<boolean>;
  setRechargePage: (value: string | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
  setShowFileModal: (valor: boolean | null) => void;
  setShowModal: (valor: boolean | null) => void;
  setFilePath: (valor: string | null) => void;
  isRefreshAfterDelete: React.MutableRefObject<boolean>;
  setFileExtension: (valor: string | null) => void;
}

export const FoldersData: React.FC<Props> = ({
  setData,
  setError,
  data,
  optionMenu,
  setRechargePage,
  setShowFolderModal,
  setShowModal,
  setFilePath,
  isRefreshAfterDelete,
  setFileExtension,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleClick = (item: string) => {
    const fetchData = async () => {
      try {
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
    <div className="folders-grid">
      {data?.subcarpetas.map((item: string, index: number) => (
        <div
          className="folder-card"
          key={index}
          onClick={() => {
            if (!optionMenu.current) {
              handleClick(item);
            }
          }}
        >
          <span className="folder-icon">
            <FaFolder aria-hidden="true" />
          </span>
          <div className="folder-info">
            <span className="folder-name" title={item}>
              {item}
            </span>
            <span className="folder-caption">Carpeta</span>
          </div>
          <ContextMenu
            opened={selectedFolder === item}
            onChange={(opened) => {
              setSelectedFolder(opened ? item : null);
              optionMenu.current = opened ? true : false;
            }}
            setRechargePage={setRechargePage}
            setShowFolderModal={setShowFolderModal}
            setShowModal={setShowModal}
            file={{
              file_path:
                window.location.pathname === "/"
                  ? `/${item}`
                  : `${window.location.pathname.replace(/^\/+/, "")}/${item}`,
              file_name: item,
              extension: "",
            }}
            isFile={false}
            setFilePath={setFilePath}
            isRefreshAfterDelete={isRefreshAfterDelete}
            setFileExtension={setFileExtension}
          >
            <button className="icon-button" aria-label={`Opciones de ${item}`}>
              <SlOptionsVertical aria-hidden="true" />
            </button>
          </ContextMenu>
        </div>
      ))}
    </div>
  );
};
