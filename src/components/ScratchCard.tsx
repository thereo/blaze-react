import { useRef, useState, useCallback, useEffect } from 'react';
import GameHeader from './GameHeader';
import { FireIcon, BoltIcon, StarIcon, XIcon } from './Icons';

interface ScratchCardProps {
  onBack: () => void;
  onReward: (icon: string, title: string, subtitle: string, points: number) => void;
  isPlayed: boolean;
  onPlayed: () => void;
}

interface ScratchPrize {
  id: string;
  name: string;
  value: number;
  Icon: React.ComponentType<{ className?: string }>;
}

const PRIZES: ScratchPrize[] = [
  { id: 'fire', name: 'Free BLAZE Can', value: 30, Icon: FireIcon },
  { id: 'bolt', name: '20 Bonus Pts', value: 20, Icon: BoltIcon },
  { id: 'star', name: '40 Bonus Pts', value: 40, Icon: StarIcon },
  { id: 'x', name: 'Better luck next time', value: 0, Icon: XIcon },
  { id: 'fire2', name: 'BLAZE Tee (80 pts val)', value: 80, Icon: FireIcon },
  { id: 'bolt2', name: '15 Bonus Pts', value: 15, Icon: BoltIcon },
];

export default function ScratchCard({ onBack, onReward, isPlayed, onPlayed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prize] = useState(() => PRIZES[Math.floor(Math.random() * PRIZES.length)]);
  const [revealed, setRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const initCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    ctx.clearRect(0, 0, 260, 150);

    const gradient = ctx.createLinearGradient(0, 0, 260, 150);
    gradient.addColorStop(0, '#FF3D00');
    gradient.addColorStop(0.4, '#FF6D00');
    gradient.addColorStop(0.7, '#FFAB00');
    gradient.addColorStop(1, '#FF3D00');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, 260, 150, 10);
    ctx.fill();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let y = 0; y < 150; y += 10) {
      for (let x = 0; x < 260; x += 10) {
        ctx.beginPath();
        ctx.arc(x + 5, y + 5, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 15px "Barlow Condensed", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', 130, 80);

    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  useEffect(() => {
    initCard();
  }, [initCard]);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  const checkReveal = useCallback(() => {
    if (revealed || !ctxRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, 260, 150);
    const data = imageData.data;
    let transparent = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }

    if (transparent / (260 * 150) > 0.5) {
      setRevealed(true);
      onPlayed();
      
      if (prize.value > 0) {
        onReward('STAR', 'SCRATCHED!', `Your prize: ${prize.name}`, prize.value);
      } else {
        onReward('X', 'NO LUCK', 'Try spinning the wheel!', 0);
      }
    }
  }, [revealed, prize, onPlayed, onReward]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isPlayed || revealed) return;
    setIsDrawing(true);
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }, [isPlayed, revealed, getPos, scratch]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || isPlayed || revealed) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }, [isDrawing, isPlayed, revealed, getPos, scratch]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
    checkReveal();
  }, [checkReveal]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (isPlayed || revealed) return;
    setIsDrawing(true);
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }, [isPlayed, revealed, getPos, scratch]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || isPlayed || revealed) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }, [isDrawing, isPlayed, revealed, getPos, scratch]);

  const handleTouchEnd = useCallback(() => {
    setIsDrawing(false);
    checkReveal();
  }, [checkReveal]);

  return (
    <div>
      <GameHeader title="SCRATCH CARD" colorClass="text-blaze-gold" onBack={onBack} />
      
      <div className="relative w-[260px] h-[150px] mx-auto mb-2.5 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-blaze-card2 border border-blaze-border rounded-xl">
          <prize.Icon className={`w-12 h-12 ${prize.value > 0 ? 'text-blaze-gold' : 'text-blaze-fire'}`} />
          <span className={`font-barlow-condensed text-sm font-bold mt-2 tracking-wider ${prize.value > 0 ? 'text-emerald-500' : 'text-blaze-fire'}`}>
            {prize.name}
          </span>
        </div>
        
        <canvas
          ref={canvasRef}
          width={260}
          height={150}
          className="absolute inset-0 cursor-crosshair rounded-xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      
      <p className="font-barlow-condensed text-xs tracking-wider text-blaze-muted text-center uppercase mb-4">
        {revealed ? 'Card scratched!' : 'Scratch to reveal your prize'}
      </p>
      
      {revealed && (
        <div className="text-center">
          <button
            onClick={() => {
              setRevealed(false);
              initCard();
            }}
            className="bg-gradient-to-r from-blaze-gold to-blaze-ember text-blaze-dark font-black-ops text-sm py-3 px-7 rounded
              hover:scale-105 active:scale-95 transition-transform duration-150
              shadow-[0_4px_20px_rgba(255,171,0,0.3)]"
          >
            NEW CARD
          </button>
        </div>
      )}
    </div>
  );
}
