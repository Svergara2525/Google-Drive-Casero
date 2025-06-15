import axios from "axios";

export const apiClient = (() => {
  const conexion = "http://localhost:5001";
  return {
    getFWS: () => axios.get(conexion).then((response) => response.data),
    folderSelect: (folderSelect: string) =>
      axios.get(conexion + folderSelect).then((response) => response.data),
    uploadFile: (formData: FormData) =>
      axios
        .post(conexion + "/subir_archivo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data),
    createFolder: (formData: FormData) =>
      axios
        .post(conexion + "/crear_carpeta", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data),
  };
})();
