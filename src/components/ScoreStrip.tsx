import type { GameId } from '../types';

interface ScoreStripProps {
  points: number;
  played: Record<GameId, boolean>;
}

const GAME_BADGES: { id: GameId; label: string }[] = [
  { id: 'spin', label: 'SPIN' },
  { id: 'scratch', label: 'SCRATCH' },
  { id: 'memory', label: 'MEMORY' },
  { id: 'whack', label: 'WHACK' },
  { id: 'quiz', label: 'QUIZ' },
];

export default function ScoreStrip({ points, played }: ScoreStripProps) {
  return (
    <div className="flex items-center justify-between bg-blaze-card border border-blaze-border rounded-lg p-3 md:p-4 my-4 gap-3 flex-wrap">
      {/* Points display */}
      <div className="flex items-baseline gap-1.5">
        <span className="font-black-ops text-3xl text-blaze-fire leading-none">
          {points}
        </span>
        <span className="font-barlow-condensed text-[10px] tracking-[2px] text-blaze-muted uppercase">
          blaze points
        </span>
      </div>
      
      {/* Game badges */}
      <div className="flex gap-1.5 flex-wrap">
        {GAME_BADGES.map(({ id, label }) => (
          <span
            key={id}
            className={`
              px-2.5 py-1 rounded-sm font-barlow-condensed text-[10px] font-bold tracking-wider uppercase
              transition-all duration-300
              ${played[id]
                ? 'bg-blaze-fire/15 border border-blaze-fire/40 text-blaze-fire'
                : 'bg-blaze-card2 border border-blaze-border text-blaze-muted'
              }
            `}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
