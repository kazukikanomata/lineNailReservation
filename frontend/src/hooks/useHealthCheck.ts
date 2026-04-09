import { usePingStatus } from "@/features/ping/hooks/use-ping-status";

function Example() {
  const { healthStatus } = usePingStatus();
  return <HealthStatusDisplay status={ healthStatus } />;
}