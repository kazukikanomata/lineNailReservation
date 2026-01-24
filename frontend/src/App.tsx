import { useEffect, useState } from "react";
import "./App.css";
import { apiClient } from "./client";

function App() {
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

  return (
    <>
      <h1>LINE Reservation App</h1>
      <div className="card">
        <p>Status: {healthStatus}</p>
      </div>
    </>
  );
}

export default App;
