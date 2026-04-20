import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const typographyStyles = cva("leading-tight transition-colors", {
  variants: {
    variant: {
      primary: "text-neu-text-dark",
      muted: "text-neu-text",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    weight: {
      light: "font-light",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "base",
  },
});

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof typographyStyles> {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

export const Typography = ({
  size,
  variant,
  align,
  weight,
  as: Compnent = "span",
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <Compnent
      className={cn(
        typographyStyles({ variant, size, align, weight }),
        className,
      )}
      {...props}
    >
      {children}
    </Compnent>
  );
};
