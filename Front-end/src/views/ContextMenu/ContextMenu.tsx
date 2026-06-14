import { Menu } from "@mantine/core";
import { apiClient } from "../../infrastructure/apiClient";
import { file_atributes } from "../../Models/file_atributes";

interface Props {
  children: React.ReactNode;
  opened: boolean | undefined;
  onChange: (variable: boolean | undefined) => void;
  setRechargePage: (value: string | null) => void;
  file: file_atributes;
}

export const ContextMenu: React.FC<Props> = ({
  children,
  opened,
  onChange,
  setRechargePage,
  file,
}) => {
  const deleteFile = async (filePath: string | null) => {
    await apiClient.deleteFile(filePath || "");
    setRechargePage(filePath);
  };

  const renameFile = (file: string | null) => {
    console.log("Renombrar archivo");
  };

  return (
    <Menu opened={opened} onChange={onChange} closeOnItemClick={false}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Opciones</Menu.Label>
        <Menu.Item onClick={() => deleteFile(file.file_path)}>
          Borrar Archivo
        </Menu.Item>
        <Menu.Item
          component="a"
          href={`http://localhost:5001/download_file${file.file_path ?? ""}`}
          download={file.file_name ?? undefined}
        ></Menu.Item>
        <Menu.Item onClick={() => renameFile(file.file_path)}>
          Cambiar Nombre
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
