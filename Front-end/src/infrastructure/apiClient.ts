import axios from "axios";

export const apiClient = (() => {
  const conexion = "http://localhost:5001";
  return {
    getFWS: () => axios.get(conexion).then((response) => response.data),
    folderSelect: (folderSelect: string) =>
      axios.get(conexion + folderSelect).then((response) => response.data),
    uploadFile: (formData: FormData) =>
      axios
        .post(conexion + "/subir_archivo", formData)
        .then((response) => response.data),
    createFolder: (formData: FormData) =>
      axios
        .post(conexion + "/crear_carpeta", formData)
        .then((response) => response.data),
    deleteFile: (filePath: string) =>
      axios
        .post(conexion + "/eliminar_archivo", { path: filePath })
        .then((response) => response.data),
  };
})();
