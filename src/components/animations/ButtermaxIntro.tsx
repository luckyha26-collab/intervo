import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, Zap } from 'lucide-react';

interface ButtermaxIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const ButtermaxIntro: React.FC<ButtermaxIntroProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (forceShow) return true;
    try {
      const shown = sessionStorage.getItem('intervo_intro_shown_v1');
      return !shown;
    } catch {
      return true;
    }
  });

  const [count, setCount] = useState(0);
  const [stage, setStage] = useState<'loading' | 'burst' | 'done'>('loading');

  useEffect(() => {
    if (!isVisible) return;

    // Increment count up to 100%
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('burst');
          setTimeout(() => {
            setStage('done');
            setIsVisible(false);
            try {
              sessionStorage.setItem('intervo_intro_shown_v1', 'true');
            } catch {}
            onComplete?.();
          }, 650);
          return 100;
        }
        return prev + 4;
      });
    }, 28);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const dismiss = () => {
    setStage('burst');
    setTimeout(() => {
      setStage('done');
      setIsVisible(false);
      try {
        sessionStorage.setItem('intervo_intro_shown_v1', 'true');
      } catch {}
      onComplete?.();
    }, 350);
  };

  if (!isVisible && stage === 'done') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="buttermax-intro-curtain"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070913] text-white overflow-hidden select-none"
        >
          {/* Animated Background Fluid Waves (Buttermax Yellow & Neon Violet Accent) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.4, 1.1],
                rotate: [0, 90, 180],
                x: ['-10%', '10%', '-5%'],
                y: ['-10%', '15%', '0%']
              }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] opacity-25"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(14, 165, 233, 0.35) 0%, rgba(99, 102, 241, 0.25) 40%, rgba(16, 185, 129, 0.15) 70%, transparent 85%)'
              }}
            />

            {/* Kinetic decorative grid */}
            <svg
              className="absolute inset-0 w-full h-full opacity-15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="buttermax-grid"
                  width="48"
                  height="48"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="24" cy="24" r="1.5" fill="#38bdf8" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#buttermax-grid)" />
            </svg>
          </div>

          {/* Central Logo & Kinetic Geometry */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6">
            {/* Morphing Geometric Emblem */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  borderRadius: ['30%', '50%', '30%'],
                  scale: [1, 1.15, 1]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 border-2 border-sky-400/80 shadow-[0_0_40px_rgba(56,189,248,0.5)]"
              />

              <motion.div
                animate={{
                  rotate: [360, 180, 0],
                  borderRadius: ['50%', '25%', '50%'],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-2 border border-indigo-400/80 shadow-[0_0_30px_rgba(99,102,241,0.5)]"
              />

              {/* Center Icon */}
              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg"
              >
                <Zap className="w-6 h-6 fill-current" />
              </motion.div>
            </div>

            {/* Giant Stylized Brand Wordmark */}
            <div className="space-y-1">
              <motion.h1
                initial={{ letterSpacing: '0.35em', opacity: 0 }}
                animate={{ letterSpacing: '0.12em', opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-indigo-300"
              >
                INTERVO
              </motion.h1>
              <p className="text-xs sm:text-sm font-mono tracking-widest text-sky-400/90 uppercase">
                Interactive Live Coding & Bar Raiser Arena
              </p>
            </div>

            {/* Loading Telemetry Bar & Percentage Counter */}
            <div className="w-64 max-w-xs space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
                  INITIALIZING
                </span>
                <span className="tabular-nums font-bold text-white text-sm">{count}%</span>
              </div>

              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400 rounded-full"
                  style={{ width: `${count}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>MEM_SAFE // AES-256</span>
                <span>SANDBOX READY</span>
              </div>
            </div>

            {/* Skip Affordance */}
            <div className="pt-4">
              <button
                onClick={dismiss}
                className="px-4 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-sky-500 hover:text-white hover:border-sky-400 text-slate-400 text-[11px] font-mono transition-all cursor-pointer flex items-center gap-2 group"
              >
                <span>Press ESC or Click to Enter</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
