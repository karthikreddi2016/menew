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
        <div className="flex-1 h-px bg-gray-border" />
        <h2
          className={`font-sans text-lg text-text-primary text-center whitespace-nowrap ${className}`}
        >
          {children}
        </h2>
        <div className="flex-1 h-px bg-gray-border" />
      </div>
    );
  }

  return (
    <h2
      className={`font-serif text-[28px] font-bold text-text-primary ${className}`}
    >
      {children}
    </h2>
  );
}
