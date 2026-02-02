import { Menu } from "@mantine/core";
import { apiClient } from "../../infrastructure/apiClient";

interface Props {
  children: React.ReactNode;
  opened: boolean | undefined;
  onChange: (variable: boolean | undefined) => void;
  setRechargePage: (value: string | null) => void;
  filePath: string | null;
}

export const ContextMenu: React.FC<Props> = ({
  children,
  opened,
  onChange,
  setRechargePage,
  filePath,
}) => {
  const deleteFile = async () => {
    await apiClient.deleteFile(filePath || "");
    setRechargePage(filePath);
  };

  const downloadFile = async () => {
    console.log("Descargar archivo");
  };

  const renameFile = () => {
    console.log("Renombrar archivo");
  };

  return (
    <Menu opened={opened} onChange={onChange} closeOnItemClick={false}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Opciones</Menu.Label>
        <Menu.Item onClick={() => deleteFile()}>Borrar Archivo</Menu.Item>
        <Menu.Item onClick={() => downloadFile()}>Descargar Archivo</Menu.Item>
        <Menu.Item onClick={() => renameFile()}>Cambiar Nombre</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
