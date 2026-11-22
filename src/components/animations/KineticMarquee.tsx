import React from 'react';

interface KineticMarqueeProps {
  items?: string[];
  direction?: 'left' | 'right';
  speedSeconds?: number;
  className?: string;
  outlineText?: boolean;
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items = [
    'INTERVO',
    'LIVE CODING ARENA',
    'AI BAR RAISER',
    'MONACO SANDBOX',
    'AES-256 VAULT',
    '50+ DSA CHALLENGES',
    'ZERO LEAKAGE GATING',
    'FAANG READINESS'
  ],
  direction = 'left',
  speedSeconds = 24,
  className = '',
  outlineText = false
}) => {
  const content = items.map((item, idx) => (
    <span key={idx} className="inline-flex items-center gap-6 px-4">
      <span
        className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider select-none ${
          outlineText
            ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(234,179,8,0.7)] dark:[-webkit-text-stroke:1.5px_rgba(250,204,21,0.8)]'
            : 'text-slate-900 dark:text-white'
        }`}
      >
        {item}
      </span>
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 dark:bg-yellow-400 shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
    </span>
  ));

  return (
    <div className={`relative w-full overflow-hidden whitespace-nowrap py-3 ${className}`}>
      <div
        className={`inline-flex ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        } hover:[animation-play-state:paused]`}
        style={{
          animationDuration: `${speedSeconds}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        {content}
        {content}
      </div>
    </div>
  );
};
