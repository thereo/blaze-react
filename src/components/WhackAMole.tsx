import { useState, useCallback, useEffect, useRef } from 'react';
import GameHeader from './GameHeader';
import { WhackIcon, BoltIcon } from './Icons';

interface WhackAMoleProps {
  onBack: () => void;
  onReward: (icon: string, title: string, subtitle: string, points: number) => void;
  isPlayed: boolean;
  onPlayed: () => void;
}

export default function WhackAMole({ onBack, onReward, isPlayed, onPlayed }: WhackAMoleProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [activeMole, setActiveMole] = useState<number | null>(null);
  const [hitMole, setHitMole] = useState<number | null>(null);
  
  const gameIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = useCallback(() => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const showMole = useCallback(() => {
    const index = Math.floor(Math.random() * 9);
    setActiveMole(index);
    setHitMole(null);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(20);
    setIsRunning(true);
    setActiveMole(null);
    setHitMole(null);

    showMole();
    gameIntervalRef.current = setInterval(showMole, 850);

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          cleanup();
          setIsRunning(false);
          onPlayed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [showMole, cleanup, onPlayed]);

  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      setActiveMole(null);
      onReward('HAMMER', "TIME'S UP!", `You smashed ${score} moles!`, score * 4);
    }
  }, [timeLeft, isRunning, score, onReward]);

  const handleHoleClick = useCallback((index: number) => {
    if (!isRunning || activeMole !== index) return;
    
    setHitMole(index);
    setActiveMole(null);
    setScore(s => s + 1);

    setTimeout(() => {
      setHitMole(null);
    }, 300);
  }, [isRunning, activeMole]);

  const timerPercent = (timeLeft / 20) * 100;
  const isLowTime = timeLeft <= 7;

  return (
    <div>
      <GameHeader title="WHACK-A-MOLE" colorClass="text-sky-500" onBack={onBack} />
      
      <div className="flex gap-5 justify-center mb-2.5">
        <div className="font-barlow-condensed text-sm text-blaze-muted">
          Score <b className="text-white">{score}</b>
        </div>
        <div className="font-barlow-condensed text-sm text-blaze-muted">
          Time <b className="text-white">{timeLeft}</b>s
        </div>
      </div>
      
      <div className="bg-blaze-card2 rounded-full h-1.5 mb-3.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 linear ${
            isLowTime
              ? 'bg-gradient-to-r from-blaze-fire to-red-600'
              : 'bg-gradient-to-r from-blaze-fire to-blaze-ember'
          }`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2.5 max-w-[290px] mx-auto mb-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleHoleClick(i)}
            className={`
              aspect-square rounded-full flex items-center justify-center
              transition-transform duration-100 select-none
              ${activeMole === i
                ? 'bg-sky-500/8 border border-sky-500/30'
                : hitMole === i
                  ? 'bg-emerald-500/10 border border-emerald-500/30'
                  : 'bg-blaze-card2 border border-blaze-border'
              }
              ${isRunning ? 'cursor-pointer active:scale-90' : 'cursor-default'}
            `}
          >
            {activeMole === i && <WhackIcon className="w-10 h-10 text-sky-400" />}
            {hitMole === i && <BoltIcon className="w-10 h-10 text-emerald-500" />}
          </button>
        ))}
      </div>
      
      <div className="text-center">
        {!isRunning && (
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-blaze-dark font-black-ops text-sm py-3 px-7 rounded
              hover:scale-105 active:scale-95 transition-transform duration-150
              shadow-[0_4px_20px_rgba(0,176,255,0.3)]"
          >
            {timeLeft === 0 ? 'PLAY AGAIN' : 'START!'}
          </button>
        )}
      </div>
    </div>
  );
}
