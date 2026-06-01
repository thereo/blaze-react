import type { GameId } from '../types';
import { SpinIcon, ScratchIcon, MemoryIcon, WhackIcon, QuizIcon } from './Icons';

interface GameMenuProps {
  onSelect: (gameId: GameId) => void;
  played: Record<GameId, boolean>;
}

interface GameCard {
  id: GameId;
  name: string;
  points: string;
  colorClass: string;
  borderHoverClass: string;
  shadowClass: string;
  glowClass: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const GAMES: GameCard[] = [
  {
    id: 'spin',
    name: 'Spin',
    points: 'up to 50 pts',
    colorClass: 'text-blaze-fire',
    borderHoverClass: 'hover:border-blaze-fire/50',
    shadowClass: 'hover:shadow-[0_8px_32px_rgba(255,61,0,0.2)]',
    glowClass: 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,61,0,0.12),transparent_70%)]',
    Icon: SpinIcon,
  },
  {
    id: 'scratch',
    name: 'Scratch',
    points: 'surprise prize',
    colorClass: 'text-blaze-gold',
    borderHoverClass: 'hover:border-blaze-gold/50',
    shadowClass: 'hover:shadow-[0_8px_32px_rgba(255,171,0,0.2)]',
    glowClass: 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,171,0,0.12),transparent_70%)]',
    Icon: ScratchIcon,
  },
  {
    id: 'memory',
    name: 'Memory',
    points: 'up to 60 pts',
    colorClass: 'text-emerald-500',
    borderHoverClass: 'hover:border-emerald-500/40',
    shadowClass: 'hover:shadow-[0_8px_32px_rgba(0,200,83,0.15)]',
    glowClass: 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,200,83,0.1),transparent_70%)]',
    Icon: MemoryIcon,
  },
  {
    id: 'whack',
    name: 'Whack',
    points: 'up to 80 pts',
    colorClass: 'text-sky-500',
    borderHoverClass: 'hover:border-sky-500/40',
    shadowClass: 'hover:shadow-[0_8px_32px_rgba(0,176,255,0.15)]',
    glowClass: 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,176,255,0.1),transparent_70%)]',
    Icon: WhackIcon,
  },
  {
    id: 'quiz',
    name: 'Quiz',
    points: '10 pts / answer',
    colorClass: 'text-purple-500',
    borderHoverClass: 'hover:border-purple-500/40',
    shadowClass: 'hover:shadow-[0_8px_32px_rgba(213,0,249,0.15)]',
    glowClass: 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(213,0,249,0.1),transparent_70%)]',
    Icon: QuizIcon,
  },
];

export default function GameMenu({ onSelect, played }: GameMenuProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5 mb-3">
        <h3 className="font-barlow-condensed text-xs font-bold tracking-[3px] text-blaze-muted uppercase">
          Choose Your Game
        </h3>
        <div className="flex-1 h-px bg-blaze-border" />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {GAMES.map(({ id, name, points, colorClass, borderHoverClass, shadowClass, glowClass, Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`
              relative group bg-blaze-card border border-blaze-border rounded-lg p-4 text-center
              cursor-pointer overflow-hidden transition-all duration-200
              hover:-translate-y-1 ${borderHoverClass} ${shadowClass}
              ${played[id] ? 'opacity-70' : ''}
            `}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${glowClass}`} />
            
            <div className="relative z-10">
              <Icon className={`w-10 h-10 mx-auto mb-2.5 ${colorClass}`} />
              <div className={`font-barlow-condensed text-sm font-black tracking-wider uppercase ${colorClass}`}>
                {name}
              </div>
              <div className="text-[10px] text-blaze-muted mt-1 tracking-wider">
                {points}
              </div>
            </div>
            
            {played[id] && (
              <div className="absolute top-2 right-2 text-[10px] text-emerald-500 font-bold">
                DONE
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
