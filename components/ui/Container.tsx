import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1340px] px-4 sm:px-8 xl:px-10 ${className}`}>
      {children}
    </div>
  );
}
