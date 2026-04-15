import React from "react";

type TypographyProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "small";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "success"
    | "base-content";
  align?: "left" | "center" | "right";
  weight?: "light" | "normal" | "medium" | "bold";
  children: React.ReactNode;
  className?: string;
};

export const Typography = ({
  as: Component = "p",
  variant = "body",
  color = "base-content",
  align = "left",
  weight = "normal",
  children,
  className = "",
}: TypographyProps) => {
  const variantClasses = {
    h1: "text-4xl md:text-5xl font-extrabold",
    h2: "text-3xl md:text-4xl font-bold",
    h3: "text-2xl md:text-3xl font-semibold",
    body: "text-base",
    caption: "text-sm text-opacity-80",
    small: "text-xs",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    error: "text-error",
    success: "text-success",
    "base-content": "text-base-content",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  const combinedClasses = [
    variantClasses[variant],
    colorClasses[color],
    alignClasses[align],
    weightClasses[weight],
    className,
  ].join(" ");

  return <Component className={combinedClasses}>{children}</Component>;
};
