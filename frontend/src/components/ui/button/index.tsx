type ButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  neutral: "btn-neutral",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  outline?: boolean;
  soft?: boolean;
  dash?: boolean;
}

export const Button = ({
  variant = "primary",
  outline,
  soft,
  dash,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classes = [
    "btn",
    outline ? "btn-outline" : "",
    soft ? "btn-soft" : "",
    dash ? "btn-dash" : "",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
