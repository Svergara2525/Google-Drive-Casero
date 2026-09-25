import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FiFile, FiFileText, FiImage } from "react-icons/fi";

import { Data } from "../../../../Models/data";
import { file_atributes } from "../../../../Models/file_atributes";
import { ContextMenu } from "../../../ContextMenu";
import { API_URL } from "../../../../infrastructure/apiClient";

import "./FilesData.css";

interface Props {
  data: Data | null;
  setImage: (valor: file_atributes | null) => void;
  setOpenImage: (valor: boolean | null) => void;
  imageExtensions: string[];
  fileExtensions: string[];
  optionMenu: React.MutableRefObject<boolean>;
  setRechargePage: (value: string | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
  setShowFileModal: (valor: boolean | null) => void;
  setShowModal: (valor: boolean | null) => void;
  setFilePath: (valor: string | null) => void;
  isRefreshAfterDelete: React.MutableRefObject<boolean>;
  setFileExtension: (valor: string | null) => void;
}

export const FilesData: React.FC<Props> = ({
  data,
  setImage,
  setOpenImage,
  imageExtensions,
  fileExtensions,
  optionMenu,
  setRechargePage,
  setShowFolderModal,
  setShowModal,
  setFilePath,
  isRefreshAfterDelete,
  setFileExtension,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="files-grid">
      {data?.archivos &&
        data.archivos.map((item: file_atributes, index: number) => (
          <div
            className="file-card"
            onClick={() => {
              if (!optionMenu.current) {
                console.log("Click en la imagen");
                setImage(item);
                setOpenImage(true);
              }
            }}
            key={index}
          >
            <div className="file-card-heading">
              <span
                className={`file-type-icon ${imageExtensions.includes(item.extension.toLowerCase()) ? "file-type-icon--image" : ""}`}
              >
                {imageExtensions.includes(item.extension.toLowerCase()) ? (
                  <FiImage aria-hidden="true" />
                ) : (
                  <FiFileText aria-hidden="true" />
                )}
              </span>
              <span className="file-name" title={item.file_name}>
                {item.file_name}
              </span>
              <ContextMenu
                opened={selectedFile === item.file_name}
                onChange={(opened) => {
                  setSelectedFile(opened ? item.file_name : null);
                  optionMenu.current = opened ? true : false;
                }}
                setRechargePage={setRechargePage}
                file={item}
                isFile={true}
                setShowModal={setShowModal}
                setShowFolderModal={setShowFolderModal}
                setFilePath={setFilePath}
                isRefreshAfterDelete={isRefreshAfterDelete}
                setFileExtension={setFileExtension}
              >
                <button
                  className="icon-button"
                  aria-label={`Opciones de ${item.file_name}`}
                  onClick={() => {
                    console.log("El optionMenu es: ", optionMenu.current);
                  }}
                >
                  <SlOptionsVertical aria-hidden="true" />
                </button>
              </ContextMenu>
            </div>
            <div
              className={`file-preview ${imageExtensions.includes(item.extension.toLowerCase()) ? "file-preview--image" : ""}`}
            >
              {imageExtensions.includes(item.extension.toLowerCase()) ? (
                <img
                  className="file-image-preview"
                  src={`${API_URL}/files${item.file_path}`}
                  alt={item.file_name}
                  key={index}
                />
              ) : fileExtensions.includes(item.extension.toLowerCase()) ? (
                <span className="file-document">
                  <FiFileText aria-hidden="true" />
                  <span>{item.extension.replace(".", "").toUpperCase()}</span>
                </span>
              ) : (
                <span className="file-document file-document--generic">
                  <FiFile aria-hidden="true" />
                  <span>
                    {item.extension.replace(".", "").toUpperCase() || "ARCHIVO"}
                  </span>
                </span>
              )}
            </div>
            <div className="file-card-footer">
              <span>
                {imageExtensions.includes(item.extension.toLowerCase())
                  ? "Imagen"
                  : fileExtensions.includes(item.extension.toLowerCase())
                    ? "Documento"
                    : "Archivo"}
              </span>
              <span>
                {item.extension.replace(".", "").toUpperCase() || "ARCHIVO"}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
