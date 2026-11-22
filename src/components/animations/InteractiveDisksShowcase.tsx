import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Disc3, Brain, Code2, ShieldCheck, Play, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InteractiveDisksShowcase: React.FC = () => {
  const { navigateToProtected } = useApp();
  const [activeDisk, setActiveDisk] = useState<number>(1);
  const [isSpinning, setIsSpinning] = useState<boolean>(true);

  const disks = [
    {
      id: 0,
      title: 'AI Bar Raiser Voice',
      subtitle: 'Real-Time Spoken Evaluation',
      tag: 'FAANG Rubric',
      color: 'from-violet-500 to-indigo-600',
      textColor: 'text-violet-400',
      icon: Brain,
      targetTab: 'setup' as const,
      description: 'Conversational voice assessment calibrated to senior hiring bars with audio waveforms.'
    },
    {
      id: 1,
      title: 'Live Coding Arena',
      subtitle: 'Monaco Sandbox & 50 DSA',
      tag: 'Multi-Language',
      color: 'from-sky-400 to-indigo-600',
      textColor: 'text-sky-400',
      icon: Code2,
      targetTab: 'coding-arena' as const,
      description: 'Zero-delay code execution, hidden test cases, runtime memory telemetry, and instant AI debugging.'
    },
    {
      id: 2,
      title: 'AES-256 Security Vault',
      subtitle: 'Zero-Knowledge Privacy',
      tag: 'Local Sandbox',
      color: 'from-emerald-400 to-teal-600',
      textColor: 'text-emerald-400',
      icon: ShieldCheck,
      targetTab: 'analytics' as const,
      description: 'Client-side hardware encryption ensuring zero telemetry leakage of your actual resumes.'
    }
  ];

  return (
    <div className="relative py-12 max-w-5xl mx-auto">
      {/* Interactive 3D Disks Presentation */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 perspective-1000">
        {disks.map((disk, idx) => {
          const Icon = disk.icon;
          const isActive = activeDisk === disk.id;

          return (
            <motion.div
              key={disk.id}
              onClick={() => setActiveDisk(disk.id)}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative cursor-pointer transition-all duration-300 ${
                isActive ? 'z-20 scale-105' : 'z-10 opacity-70 hover:opacity-100 scale-95'
              }`}
            >
              {/* Outer Vinyl Record Disc */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-slate-950 border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center group overflow-hidden">
                {/* Concentric Vinyl Grooves */}
                <div className="absolute inset-2 rounded-full border border-slate-800/80 pointer-events-none" />
                <div className="absolute inset-5 rounded-full border border-slate-800/60 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-slate-800/50 pointer-events-none" />
                <div className="absolute inset-12 rounded-full border border-slate-800/40 pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-slate-800/30 pointer-events-none" />

                {/* Rotating holographic shine line */}
                <motion.div
                  animate={{ rotate: isSpinning ? 360 : 0 }}
                  transition={{
                    duration: isActive ? 6 : 14,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(255,255,255,0.12)_330deg,transparent_360deg)] rounded-full pointer-events-none"
                />

                {/* Center Label Island */}
                <motion.div
                  animate={{ rotate: isSpinning ? (isActive ? 360 : 0) : 0 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className={`w-28 h-28 rounded-full bg-gradient-to-tr ${disk.color} p-1 shadow-inner flex flex-col items-center justify-center text-center text-white font-bold select-none`}
                >
                  <div className="w-full h-full rounded-full bg-slate-900/90 text-white flex flex-col items-center justify-center p-2 border border-white/20">
                    <Icon className={`w-5 h-5 ${disk.textColor} mb-1`} />
                    <span className="text-[10px] font-black uppercase tracking-wider line-clamp-1">
                      {disk.title}
                    </span>
                    <span className="text-[8px] font-mono text-slate-400">{disk.tag}</span>
                    {/* Vinyl Center Hole */}
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-700 mt-1" />
                  </div>
                </motion.div>
              </div>

              {/* Disk Description Card below */}
              <div
                className={`mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border text-center transition-all ${
                  isActive
                    ? 'border-sky-500 dark:border-sky-500/60 shadow-lg shadow-sky-500/10'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {disk.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {disk.description}
                </p>
                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToProtected(disk.targetTab);
                    }}
                    className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Launch {disk.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
