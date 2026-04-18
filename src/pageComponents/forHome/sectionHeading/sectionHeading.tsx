interface SectionHeadingProps {
  text: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  text,
  className = "",
}) => {
  return (
    <div
      className={`relative text-center py-8 2xl:py-10 select-none ${className}`}
    >
      {/* Shadow layer */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl 2xl:text-7xl font-black uppercase tracking-widest text-brand dark:text-red-400 opacity-30 dark:opacity-50"
        style={{
          WebkitTextStroke: "1px rgba(0,0,0,0.15)",
          transform: "translate(4px, 4px)",
        }}
      >
        {text}
      </span>
      {/* Main text */}
      <h2 className="relative text-5xl md:text-6xl 2xl:text-7xl font-black uppercase tracking-widest dark:text-white">
        {text}
      </h2>
    </div>
  );
};

export default SectionHeading;
