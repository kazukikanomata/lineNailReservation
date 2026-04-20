"use client";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";

const buttonStyles = cva(
  "btn transition-all duration-200 active:scale-95 border-none",
  {
    variants: {
      variant: {
        primary: "btn rounded-xl neu-btn bg-neu-bg text-black",
        accent: "bg-neu-accent text-white shadow-lg active:shadow-inner",
        inset: "neu-inset text-neu-text",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-4 text-lg font-bold",
        responsive: "btn-sm md:btn-md lg:btn-lg",
      },
      outline: { true: "btn-outline border-current" },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  isBack?: boolean;
  fallbackHref?: string;
}

export const Button = ({
  variant,
  size,
  outline,
  className,
  children,
  isBack = false,
  fallbackHref,
  onClick,
  ...props
}: ButtonProps) => {
  const router = useRouter();
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isBack) {
      const hasInternalReferrer = document.referrer.includes(
        window.location.host,
      );
      if (hasInternalReferrer) {
        router.back();
      } else {
        router.push(fallbackHref || "/");
      }
    }
    onClick?.(e);
  };

  return (
    <button
      type={isBack ? "button" : props.type}
      className={cn(buttonStyles({ variant, size, outline }), className)}
      onClick={handleBack}
      {...props}
    >
      {children}
    </button>
  );
};
