type ToastProps = {
  message: string;
  status?: "info" | "success" | "error" | "warning";
  vertical?: "top" | "middle" | "bottom";
  horizontal?: "start" | "center" | "end";
};

export const Toast = ({
  message,
  status = "info",
  vertical = "middle",
  horizontal = "center",
}: ToastProps) => {
  const statusClasses = {
    info: "alert-info",
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
  }[status];

  return (
    <div className={`toast toast-${vertical} toast-${horizontal}`}>
      <div className={`alert ${statusClasses} shadow-lg`}>
        <span>{message}</span>
      </div>
    </div>
  );
};
