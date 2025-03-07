import * as S from "./Banner.style";
import { apiClient } from "../../infrastructure/apiClient";
import { useState, useEffect } from "react";

export const Banner: React.FC = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.getFWS();
        setData(response.mensaje);
      } catch (error) {
        console.log(error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <S.BannerWrapper>
      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}
      {data && (
        <div>
          {data.map((item: any, index: any) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      )}
    </S.BannerWrapper>
  );
};
