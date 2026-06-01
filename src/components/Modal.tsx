import { FireIcon, BoltIcon, TrophyIcon, StarIcon, XIcon, HammerIcon, SpinIcon, ScratchIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  icon: string;
  title: string;
  subtitle: string;
  points: number;
  isGreen?: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FIRE: FireIcon,
  BOLT: BoltIcon,
  TROPHY: TrophyIcon,
  STAR: StarIcon,
  X: XIcon,
  HAMMER: HammerIcon,
  SPIN: SpinIcon,
  SCRATCH: ScratchIcon,
};

export default function Modal({ isOpen, icon, title, subtitle, points, isGreen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const IconComponent = ICON_MAP[icon] || FireIcon;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-blaze-card border border-blaze-border rounded-xl p-8 text-center max-w-[300px] w-[90%] animate-modalPop"
        onClick={(e) => e.stopPropagation()}
      >
        <IconComponent className="w-16 h-16 mx-auto mb-3 text-blaze-fire" />
        
        <h2 className="font-black-ops text-2xl text-blaze-fire mb-1.5">
          {title}
        </h2>
        
        <p className="text-sm text-blaze-muted mb-2">
          {subtitle}
        </p>
        
        {points > 0 && (
          <div className={`font-black-ops text-4xl mb-5 ${isGreen ? 'text-emerald-500' : 'text-blaze-gold'}`}>
            +{points}
          </div>
        )}
        
        <button
          onClick={onClose}
          className="fire-gradient text-white font-black-ops text-sm py-3 px-7 rounded
            hover:scale-105 active:scale-95 transition-transform duration-150
            shadow-[0_4px_20px_rgba(255,61,0,0.4)]"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
