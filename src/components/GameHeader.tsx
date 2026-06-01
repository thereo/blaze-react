interface GameHeaderProps {
  title: string;
  colorClass: string;
  onBack: () => void;
}

export default function GameHeader({ title, colorClass, onBack }: GameHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-blaze-border">
      <button
        onClick={onBack}
        className="bg-transparent border border-blaze-border rounded py-1.5 px-3.5
          font-barlow-condensed text-xs font-bold tracking-[2px] text-blaze-muted uppercase
          hover:border-blaze-fire hover:text-blaze-fire transition-all duration-200"
      >
        BACK
      </button>
      <h2 className={`font-black-ops text-xl ${colorClass}`}>
        {title}
      </h2>
    </div>
  );
}
