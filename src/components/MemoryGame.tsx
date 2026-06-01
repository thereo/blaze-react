import { useState, useCallback, useEffect } from 'react';
import GameHeader from './GameHeader';
import { FireIcon, BoltIcon, TrophyIcon, StarIcon, ScratchIcon, QuizIcon, WhackIcon, SpinIcon } from './Icons';

interface MemoryGameProps {
  onBack: () => void;
  onReward: (icon: string, title: string, subtitle: string, points: number) => void;
  isPlayed: boolean;
  onPlayed: () => void;
}

interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SYMBOLS = ['bolt', 'fire', 'scratch', 'target', 'star', 'quiz', 'trophy', 'spin'];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  bolt: BoltIcon,
  fire: FireIcon,
  scratch: ScratchIcon,
  target: WhackIcon,
  star: StarIcon,
  quiz: QuizIcon,
  trophy: TrophyIcon,
  spin: SpinIcon,
};

export default function MemoryGame({ onBack, onReward, isPlayed, onPlayed }: MemoryGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [locked, setLocked] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, id) => ({
        id,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setLocked(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = useCallback((id: number) => {
    if (locked || isPlayed) return;
    
    const card = cards[id];
    if (card.isMatched || card.isFlipped) return;

    const newCards = [...cards];
    newCards[id] = { ...newCards[id], isFlipped: true };
    setCards(newCards);

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setMoves(m => m + 1);

      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => 
            i === first || i === second ? { ...c, isMatched: true } : c
          ));
          setMatches(m => m + 1);
          setFlipped([]);
          setLocked(false);
        }, 300);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => 
            i === first || i === second ? { ...c, isFlipped: false } : c
          ));
          setFlipped([]);
          setLocked(false);
        }, 700);
      }
    }
  }, [cards, flipped, locked, isPlayed]);

  useEffect(() => {
    if (matches === 8 && !isPlayed) {
      onPlayed();
      const points = Math.max(10, 60 - moves * 2);
      setTimeout(() => {
        onReward('TROPHY', 'MEMORY CLEARED!', `Done in ${moves} moves`, points);
      }, 300);
    }
  }, [matches, moves, isPlayed, onPlayed, onReward]);

  return (
    <div>
      <GameHeader title="MEMORY MATCH" colorClass="text-emerald-500" onBack={onBack} />
      
      <div className="flex gap-5 justify-center mb-3.5">
        <div className="font-barlow-condensed text-sm text-blaze-muted tracking-wider">
          Moves <b className="text-white">{moves}</b>
        </div>
        <div className="font-barlow-condensed text-sm text-blaze-muted tracking-wider">
          Pairs <b className="text-white">{matches}</b>/8
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 max-w-[320px] mx-auto mb-4">
        {cards.map((card) => {
          const IconComponent = ICON_MAP[card.symbol];
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched}
              className={`
                aspect-square rounded-lg flex items-center justify-center
                transition-all duration-150 select-none
                ${card.isMatched
                  ? 'bg-emerald-500/12 border border-emerald-500/40 cursor-default'
                  : card.isFlipped
                    ? 'bg-emerald-500/6 border border-emerald-500/20'
                    : 'bg-blaze-card2 border border-blaze-border hover:scale-105 cursor-pointer'
                }
              `}
            >
              {(card.isFlipped || card.isMatched) && IconComponent && (
                <IconComponent className={`w-8 h-8 ${card.isMatched ? 'text-emerald-500' : 'text-blaze-gold'}`} />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="text-center">
        <button
          onClick={initGame}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-blaze-dark font-black-ops text-sm py-3 px-7 rounded
            hover:scale-105 active:scale-95 transition-transform duration-150
            shadow-[0_4px_20px_rgba(0,200,83,0.3)]"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
