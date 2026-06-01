import { useState } from 'react';
import { FireIcon, BoltIcon, TrophyIcon, StarIcon } from './Icons';

interface PrizeShopProps {
  points: number;
  onRedeem: (cost: number, name: string) => boolean;
}

interface PrizeItem {
  id: number;
  name: string;
  cost: number;
  Icon: React.ComponentType<{ className?: string }>;
}

const PRIZES: PrizeItem[] = [
  { id: 1, name: 'BLAZE Can', cost: 30, Icon: FireIcon },
  { id: 2, name: 'BLAZE Tee', cost: 80, Icon: BoltIcon },
  { id: 3, name: 'BLAZE Cap', cost: 120, Icon: TrophyIcon },
  { id: 4, name: 'BLAZE Bag', cost: 200, Icon: StarIcon },
];

export default function PrizeShop({ points, onRedeem }: PrizeShopProps) {
  const [redeemed, setRedeemed] = useState<Record<number, boolean>>({});

  const handleRedeem = (prize: PrizeItem) => {
    const success = onRedeem(prize.cost, prize.name);
    if (success) {
      setRedeemed(prev => ({ ...prev, [prize.id]: true }));
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        <h3 className="font-barlow-condensed text-xs font-bold tracking-[3px] text-blaze-muted uppercase">
          Redeem Prizes
        </h3>
        <div className="flex-1 h-px bg-blaze-border" />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PRIZES.map(({ id, name, cost, Icon }) => {
          const canAfford = points >= cost;
          const isRedeemed = redeemed[id];
          
          return (
            <div
              key={id}
              className="bg-blaze-card border border-blaze-border rounded-lg p-3.5 text-center"
            >
              <Icon className="w-10 h-10 mx-auto mb-1.5 text-blaze-gold" />
              
              <div className="font-barlow-condensed text-xs font-bold text-white tracking-wider">
                {name}
              </div>
              
              <div className="text-xs text-blaze-gold font-semibold my-1.5">
                {cost} pts
              </div>
              
              <button
                onClick={() => handleRedeem({ id, name, cost, Icon })}
                disabled={!canAfford || isRedeemed}
                className={`
                  w-full bg-transparent border rounded py-1.5 px-2
                  font-barlow-condensed text-[11px] font-bold tracking-wider uppercase
                  transition-all duration-200
                  ${isRedeemed
                    ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10'
                    : canAfford
                      ? 'border-blaze-fire/40 text-blaze-fire hover:bg-blaze-fire/15 hover:border-blaze-fire'
                      : 'border-blaze-border text-blaze-muted/30 cursor-not-allowed'
                  }
                `}
              >
                {isRedeemed ? 'CLAIMED' : 'REDEEM'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
