interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  withDivider?: boolean;
}

export function SectionTitle({
  children,
  className = "",
  withDivider = false,
}: SectionTitleProps) {
  if (withDivider) {
    return (
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 h-px bg-black/10" />
        <h2
          className={`font-inter text-xs font-semibold uppercase tracking-[0.3em] text-center whitespace-nowrap text-black/55 ${className}`}
        >
          {children}
        </h2>
        <div className="flex-1 h-px bg-black/10" />
      </div>
    );
  }

  return (
    <h2
      className={`font-serif text-[2rem] font-semibold leading-tight text-(--foreground) md:text-[3rem] ${className}`}
    >
      {children}
    </h2>
  );
}
