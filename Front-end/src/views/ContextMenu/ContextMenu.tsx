import { Menu } from "@mantine/core";
import { apiClient } from "../../infrastructure/apiClient";

interface Props {
  children: React.ReactNode;
  opened: boolean | undefined;
  onChange: (variable: boolean | undefined) => void;
}

export const ContextMenu: React.FC<Props> = ({
  children,
  opened,
  onChange,
}) => {
  const deleteFile = () => {
    
  };

  const downloadFile = () => {};

  const renameFile = () => {};

  return (
    <Menu opened={opened} onChange={onChange}>
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
