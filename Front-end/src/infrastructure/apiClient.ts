import axios from "axios";

export const apiClient = (() => {
  const conexion = "http://127.0.0.1:5000";
  return {
    getFWS: () => axios.get(conexion).then((response) => response.data),
    folderSelect: (folderSelect: string) =>
      axios
        .get(conexion + "/" + folderSelect)
        .then((response) => response.data),
  };
})();
