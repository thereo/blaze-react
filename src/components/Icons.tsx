export function SpinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 4" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M24 4 L28 20 L24 24 L20 20 Z" fill="currentColor" opacity="0.9" />
      <path d="M44 24 L28 28 L24 24 L28 20 Z" fill="currentColor" opacity="0.6" />
      <path d="M24 44 L20 28 L24 24 L28 28 Z" fill="currentColor" opacity="0.4" />
      <path d="M4 24 L20 20 L24 24 L20 28 Z" fill="currentColor" opacity="0.7" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

export function ScratchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <rect x="10" y="14" width="28" height="20" rx="2" fill="currentColor" opacity="0.15" />
      <line x1="10" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      <line x1="10" y1="28" x2="38" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      <line x1="10" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      <path d="M32 8 L40 8 L40 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 40 L8 40 L8 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

export function MemoryIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <rect x="27" y="4" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <rect x="4" y="27" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <rect x="27" y="27" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 10 L15 15 M15 10 L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 10 L38 15 M38 10 L33 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12.5" cy="35.5" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M31 33 L35 37 L39 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhackIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 38 C8 38 12 30 24 30 C36 30 40 38 40 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="22" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="21" cy="20" r="1.5" fill="currentColor" />
      <circle cx="27" cy="20" r="1.5" fill="currentColor" />
      <path d="M21 25 Q24 28 27 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="8" x2="30" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 6 L40 4 L42 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="42" x2="40" y2="42" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
    </svg>
  );
}

export function QuizIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 8 L26 20 L24 24 L22 20 Z" fill="currentColor" opacity="0.8" />
      <path d="M40 24 L28 26 L24 24 L28 22 Z" fill="currentColor" opacity="0.5" />
      <path d="M24 40 L22 28 L24 24 L26 28 Z" fill="currentColor" opacity="0.3" />
      <path d="M8 24 L20 22 L24 24 L20 26 Z" fill="currentColor" opacity="0.6" />
      <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M24 19 L24 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function FireIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 4 10 4 15C4 19.4183 7.58172 23 12 23C16.4183 23 20 19.4183 20 15C20 10 12 2 12 2Z" 
        fill="currentColor" opacity="0.3" />
      <path d="M12 6C12 6 7 12 7 15.5C7 18.2614 9.23858 20.5 12 20.5C14.7614 20.5 17 18.2614 17 15.5C17 12 12 6 12 6Z" 
        fill="currentColor" opacity="0.6" />
      <path d="M12 10C12 10 9 14 9 16C9 17.6569 10.3431 19 12 19C13.6569 19 15 17.6569 15 16C15 14 12 10 12 10Z" 
        fill="currentColor" />
    </svg>
  );
}

export function BoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L4 14H11L10 22L20 10H13L13 2Z" fill="currentColor" />
    </svg>
  );
}

export function TrophyIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2H16V8C16 11.3137 13.3137 14 10 14H10C6.68629 14 4 11.3137 4 8V2H8Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 4H2C2 4 2 8 2 10C2 12 4 13 6 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 4H22C22 4 22 8 22 10C22 12 20 13 18 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 14V17H14V14" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="17" width="10" height="3" rx="1" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="6" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HammerIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18L14 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 10L18 6L20 8L16 12L14 10Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 10L16 12L12 16L10 14L14 10Z" fill="currentColor" opacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M2 22L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="4" cy="20" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.9 8.6L22 9.3L16.8 14L18.2 21L12 17.5L5.8 21L7.2 14L2 9.3L9.1 8.6L12 2Z" 
        fill="currentColor" />
    </svg>
  );
}

export function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
