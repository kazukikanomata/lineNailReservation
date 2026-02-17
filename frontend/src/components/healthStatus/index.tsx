export const HealthStatusDisplay = ({ status }: { status: string }) => {
  return (
    <div className="card">
      <p>Status: {status}</p>
    </div>
  );
};
