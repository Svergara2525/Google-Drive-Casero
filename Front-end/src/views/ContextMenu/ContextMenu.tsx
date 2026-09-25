import { Menu } from "@mantine/core";
import { FiDownload, FiEdit3, FiTrash2 } from "react-icons/fi";
import "./ContextMenu.css";
import { API_URL, apiClient } from "../../infrastructure/apiClient";
import { file_atributes } from "../../Models/file_atributes";

interface Props {
  children: React.ReactNode;
  opened: boolean | undefined;
  onChange: (variable: boolean | undefined) => void;
  setRechargePage: (value: string | null) => void;
  file: file_atributes;
  isFile: boolean;
  setShowModal: (valor: boolean | null) => void;
  setShowFolderModal: (valor: boolean | null) => void;
  setFilePath: (valor: string | null) => void;
  isRefreshAfterDelete: React.MutableRefObject<boolean>;
  setFileExtension: (valor: string | null) => void;
}

export const ContextMenu: React.FC<Props> = ({
  children,
  opened,
  onChange,
  setRechargePage,
  file,
  isFile,
  setShowModal,
  setShowFolderModal,
  setFilePath,
  isRefreshAfterDelete,
  setFileExtension,
}) => {
  const deleteFile = async (filePath: string | null, isFile: boolean) => {
    isRefreshAfterDelete.current = true;
    await apiClient.deleteFile(filePath || "", isFile);
    setRechargePage(filePath);
  };

  return (
    <Menu opened={opened} onChange={onChange} closeOnItemClick={false}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown className="file-context-menu">
        <Menu.Label>Opciones</Menu.Label>
        <Menu.Item
          className="file-context-menu-delete"
          leftSection={<FiTrash2 aria-hidden="true" />}
          onClick={() => deleteFile(file.file_path, isFile)}
        >
          {isFile ? "Borrar archivo" : "Borrar carpeta"}
        </Menu.Item>
        <Menu.Item
          leftSection={<FiDownload aria-hidden="true" />}
          component="a"
          href={`${API_URL}/download_file${file.file_path ?? ""}`}
          download={file.file_name ?? undefined}
        >
          Descargar
        </Menu.Item>
        <Menu.Item
          leftSection={<FiEdit3 aria-hidden="true" />}
          onClick={() => {
            setShowModal(true);
            setShowFolderModal(true);
            setFilePath(file.file_path);
            setFileExtension(file.extension);
          }}
        >
          Cambiar nombre
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
