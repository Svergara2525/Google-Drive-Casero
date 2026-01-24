import { Menu } from "@mantine/core";

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
  return (
    <Menu opened={opened} onChange={onChange}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Opciones</Menu.Label>
        <Menu.Item>Borrar Archivo</Menu.Item>
        <Menu.Item>Descargar Archivo</Menu.Item>
        <Menu.Item>Cambiar Nombre</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
