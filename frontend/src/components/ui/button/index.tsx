type ButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "responsive";

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

const sizeClasses: Record<ButtonSize, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
  responsive: "btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  outline?: boolean;
  soft?: boolean;
  dash?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "responsive",
  outline,
  soft,
  dash,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classes = [
    "btn",
    sizeClasses[size],
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
