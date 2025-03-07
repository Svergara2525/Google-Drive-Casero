import axios from "axios";

export const apiClient = (() => {
  const conexion = "http://127.0.0.1:5000/conexion";

  return {
    getFWS: () => axios.get(conexion).then((response) => response.data),
  };
})();
