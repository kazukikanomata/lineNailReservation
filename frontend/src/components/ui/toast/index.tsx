"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const toastStyles = cva("alert flex items-center gap-2 transition-all", {
  variants: {
    variant: {
      default: "toast toast-center",
    },
    alert: {
      info: "alert alert-info",
      error: "alert alert-error",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ToastProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastStyles> {
  message: string;
}

export const Toast = ({ message, alert, className, ...props }: ToastProps) => {
  return (
    <div className={cn(toastStyles({ variant: "default" }))}>
      <div className={cn(toastStyles({ alert }), className)} {...props}>
        <span>{message}</span>
      </div>
    </div>
  );
};
