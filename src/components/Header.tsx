export default function Header() {
  return (
    <header className="relative pt-7 pb-5 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(255,61,0,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Industrial badge */}
      <div className="relative inline-flex items-center gap-1.5 bg-blaze-fire/10 border border-blaze-fire/30 rounded px-3 py-1 mb-3">
        <span className="font-barlow-condensed text-[10px] font-bold tracking-[3px] text-blaze-fire uppercase">
          Energy Drink / Event Activation
        </span>
      </div>
      
      {/* Main title with brutalist style */}
      <div className="relative">
        <h1 
          className="font-black-ops text-6xl md:text-7xl tracking-wider leading-none text-glitch"
          data-text="BLAZE"
        >
          <span className="text-fire-gradient">BLAZE</span>
        </h1>
        
        {/* Decorative line */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blaze-fire to-transparent" />
      </div>
      
      {/* Tagline */}
      <p className="font-barlow-condensed font-semibold text-sm tracking-[6px] text-blaze-muted uppercase mt-4">
        Ignite Your Game
      </p>
      
      {/* Brutalist corner accents */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-blaze-fire/40" />
      <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-blaze-fire/40" />
    </header>
  );
}
