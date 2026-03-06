import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-inter font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  const variants = {
    primary:
      "bg-primary text-white shadow-[0_16px_40px_rgba(16,45,48,0.2)] hover:-translate-y-0.5 hover:bg-primary/95 focus-visible:ring-primary",
    secondary:
      "bg-white/75 text-primary ring-1 ring-black/10 hover:bg-white focus-visible:ring-primary",
    outline:
      "border border-black/15 bg-transparent text-primary hover:bg-primary/5 focus-visible:ring-primary",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
