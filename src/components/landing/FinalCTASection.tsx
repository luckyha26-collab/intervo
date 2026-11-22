import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Brain
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FinalCTASection: React.FC = () => {
  const { openAuthModal } = useApp();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#172D29] text-[#F4F0E7]">
      {/* Subtle organic ambient depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#223F3A] rounded-full blur-[140px] pointer-events-none opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-[#0F1E1B] rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#223F3A] border border-[#35443D] text-[#C6D58A] text-xs font-semibold backdrop-blur-xs">
          <span>✦</span>
          <span>Ready to Step Up to the Senior Bar?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4F0E7] leading-tight [text-wrap:balance] font-display">
          Your Dream Role Starts with Better Preparation.
        </h2>

        <p className="text-sm sm:text-base text-[#DCE5DF] max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
          Stop guessing whether you're interview-ready. Start practising, improving, and building the confidence to succeed.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openAuthModal('signup', 'dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C47759] hover:bg-[#AF6648] text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Launch INTERVO Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#B6C0B8] font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C6D58A]" />
            <span>Instant setup in 30 seconds</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C6D58A]" />
            <span>Client-side private AES-256 vault</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-[#C6D58A]" />
            <span>3 calibrated AI Bar Raisers</span>
          </div>
        </div>
      </div>
    </section>
  );
};
