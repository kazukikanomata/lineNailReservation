import { NailCoursesMenu } from "../components/menu";
import { HealthStatusDisplay } from "../components/healthStatus";
import { useHealthCheck } from "../hooks/useHealthCheck";

function App() {
  const { healthStatus } = useHealthCheck();
  return (
    <>
      <h1>LINE Reservation App</h1>
      <HealthStatusDisplay status={healthStatus} />
      <NailCoursesMenu />
    </>
  );
}

export default App;
