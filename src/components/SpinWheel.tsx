import { useRef, useState, useCallback, useEffect } from 'react';
import GameHeader from './GameHeader';

interface SpinWheelProps {
  onBack: () => void;
  onReward: (icon: string, title: string, subtitle: string, points: number) => void;
  isPlayed: boolean;
  onPlayed: () => void;
}

interface Segment {
  label: string;
  value: number;
  color: string;
}

const SEGMENTS: Segment[] = [
  { label: '10 PTS', value: 10, color: '#FF3D00' },
  { label: '25 PTS', value: 25, color: '#1A1A1A' },
  { label: '5 PTS', value: 5, color: '#FF6D00' },
  { label: '50 PTS', value: 50, color: '#1A1A1A' },
  { label: '0 PTS', value: 0, color: '#2A2A2A' },
  { label: '30 PTS', value: 30, color: '#FF3D00' },
  { label: '15 PTS', value: 15, color: '#1A1A1A' },
  { label: '20 PTS', value: 20, color: '#FF6D00' },
];

export default function SpinWheel({ onBack, onReward, isPlayed, onPlayed }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const angleRef = useRef(0);

  const drawWheel = useCallback((angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = 135;
    const cy = 135;
    const r = 130;
    const arc = (2 * Math.PI) / SEGMENTS.length;

    ctx.clearRect(0, 0, 270, 270);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    SEGMENTS.forEach((seg, i) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, i * arc, (i + 1) * arc);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = '#0A0A0A';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(i * arc + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = seg.color === '#1A1A1A' || seg.color === '#2A2A2A' ? '#FF6D00' : '#fff';
      ctx.font = 'bold 13px "Barlow Condensed", sans-serif';
      ctx.fillText(seg.label, r - 14, 5);
      ctx.restore();
    });

    ctx.restore();

    // Rim
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 61, 0, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#0A0A0A';
    ctx.fill();
    ctx.strokeStyle = '#FF3D00';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center text
    ctx.fillStyle = '#FF3D00';
    ctx.font = 'bold 14px "Black Ops One", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BLAZE', cx, cy);
  }, []);

  useEffect(() => {
    drawWheel(angleRef.current);
  }, [drawWheel]);

  const handleSpin = useCallback(() => {
    if (spinning || isPlayed) return;

    setSpinning(true);
    const total = (5 + Math.random() * 5) * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 3200;
    const startTime = performance.now();
    const startAngle = angleRef.current;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      angleRef.current = startAngle + total * eased;
      drawWheel(angleRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        onPlayed();

        const arc = (2 * Math.PI) / SEGMENTS.length;
        const normalized = ((-angleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const index = Math.floor(normalized / arc) % SEGMENTS.length;
        const segment = SEGMENTS[index];

        if (segment.value > 0) {
          setResult(`You got ${segment.label}!`);
          onReward('FIRE', 'ON FIRE!', `Wheel reward: ${segment.label}`, segment.value);
        } else {
          setResult('0 points this time');
          onReward('X', 'NO LUCK', 'Try other games!', 0);
        }
      }
    };

    requestAnimationFrame(animate);
  }, [spinning, isPlayed, drawWheel, onPlayed, onReward]);

  return (
    <div>
      <GameHeader title="SPIN THE WHEEL" colorClass="text-blaze-fire" onBack={onBack} />
      
      {/* Wheel container */}
      <div className="relative w-[270px] h-[270px] mx-auto mb-6">
        {/* Pointer */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-0 h-0 
          border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-blaze-fire
          drop-shadow-[0_0_6px_rgba(255,61,0,0.8)]" 
        />
        
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={270}
          height={270}
          className="block rounded-full border-[3px] border-blaze-border"
        />
      </div>
      
      {/* Result */}
      <div className="text-center font-barlow-condensed text-sm font-bold tracking-wider text-blaze-muted min-h-[20px] mb-4">
        {result}
      </div>
      
      {/* Spin button */}
      <div className="text-center">
        <button
          onClick={handleSpin}
          disabled={spinning || isPlayed}
          className="fire-gradient text-white font-black-ops text-base py-3 px-7 rounded
            hover:scale-105 active:scale-95 transition-transform duration-150
            shadow-[0_4px_20px_rgba(255,61,0,0.4)]
            disabled:opacity-35 disabled:pointer-events-none"
        >
          {isPlayed ? 'ALREADY PLAYED' : 'IGNITE!'}
        </button>
      </div>
    </div>
  );
}
