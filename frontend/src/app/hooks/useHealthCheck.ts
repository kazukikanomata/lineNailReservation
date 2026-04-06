import { useEffect, useState } from "react";
import { apiClient } from "../../lib/client";

export const useHealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState<string>("checking....");

  useEffect(() => {
    apiClient
      .get<{ message: string; db_status: string }>("/ping")
      .then((data) => {
        setHealthStatus(`Backend: ${data.message}, DB: ${data.db_status}`);
      })
      .catch((error) => {
        setHealthStatus(`Error: ${error.message}`);
      });
  }, []);

  return { healthStatus };
};
