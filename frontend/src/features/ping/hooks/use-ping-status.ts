"use client";

import { useEffect, useState } from "react";
import { getPing } from "../api/get-ping";

export function usePingStatus() {
  const [healthStatus, setHealthStatus] = useState<string>("checking....");

  useEffect(() => {
    getPing()
      .then((data) => {
        setHealthStatus(`Backend: ${data.message}, DB: ${data.db_status}`);
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        setHealthStatus(`Error: ${message}`);
      });
  }, []);

  return { healthStatus };
}
