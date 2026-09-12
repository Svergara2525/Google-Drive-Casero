import axios from "axios";

export const API_URL = `http://${window.location.hostname}:5001`;

export const apiClient = (() => {
  const conexion = API_URL;
  return {
    getFWS: () => axios.get(conexion).then((response) => response.data),
    folderSelect: (folderSelect: string) =>
      axios.get(conexion + folderSelect).then((response) => response.data),
    uploadFile: (formData: FormData) =>
      axios
        .post(conexion + "/subir_archivo", formData)
        .then((response) => response.data),
    createFolder: (folderName: string) =>
      axios
        .post(conexion + "/crear_carpeta", { path: folderName })
        .then((response) => response.data),
    deleteFile: (filePath: string, isFile: boolean) =>
      axios
        .post(conexion + "/eliminar_archivo", {
          path: filePath,
          isFile: isFile,
        })
        .then((response) => response.data),
    renameFile: (oldPath: string, newPath: string, extension: string) =>
      axios.post(conexion + "/renombrar_archivo", {
        old_path: oldPath,
        new_path: newPath,
        extension: extension,
      }),
  };
})();
