import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Volume2,
  CheckCircle2,
  Cpu,
  Brain,
  ShieldCheck,
  TrendingUp,
  Award,
  Clock,
  Mic,
  Activity,
  ChevronDown,
  Lock,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INTERVIEWER_PERSONAS } from '../../utils/speechEngine';
import { RevealText } from '../animations/RevealText';
import { TiltCard } from '../animations/TiltCard';
import { FloatingElement } from '../animations/FloatingElement';
import { LandingAuthCard } from './LandingAuthCard';
import { FluidWaveCanvas } from '../animations/FluidWaveCanvas';
import { MagneticButton } from '../animations/MagneticButton';
import { speakText } from '../../utils/speechEngine';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { openAuthModal } = useApp();
  const [activeCompetency, setActiveCompetency] = useState(0);
  const [rightPanelTab, setRightPanelTab] = useState<'preview' | 'auth'>('preview');
  const [isSpeakingVoice, setIsSpeakingVoice] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const sampleQuestions = [
    {
      role: 'Full Stack & System Architecture',
      question: 'How would you design an idempotent payment processing webhook pipeline under high concurrency?',
      answer: "I'd use a unique idempotency key with Redis distributed locks and a Postgres transaction write-ahead log to prevent double charges...",
      score: '9.4',
      speech: 'How would you design an idempotent payment processing webhook pipeline under high concurrency?'
    },
    {
      role: 'Backend & Distributed Systems',
      question: 'How do you prevent cache stampedes and thundering herd in a large multi-region Redis cluster?',
      answer: 'By implementing probabilistic early expiration with mutex locks on cache misses and staggering TTLs with jitter...',
      score: '9.6',
      speech: 'How do you prevent cache stampedes and thundering herd in a large multi-region Redis cluster?'
    },
    {
      role: 'Production Architecture Defense',
      question: 'Walk me through your recovery strategy when a zero-downtime database migration locks a critical table.',
      answer: 'First verify replication lag, run kill-query on blocking DDL, fall back to shadow-table copy, and route reads via replica...',
      score: '9.5',
      speech: 'Walk me through your recovery strategy when a zero-downtime database migration locks a critical table.'
    }
  ];

  const currentQ = sampleQuestions[questionIndex];

  const competencies = [
    { label: 'System Architecture', score: '9.4/10', bar: 94 },
    { label: 'Algorithmic Depth', score: '9.2/10', bar: 92 },
    { label: 'STAR Communication', score: '9.6/10', bar: 96 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCompetency((prev) => (prev + 1) % competencies.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handlePlayVoice = () => {
    if (isSpeakingVoice) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeakingVoice(false);
      return;
    }

    setIsSpeakingVoice(true);
    speakText(currentQ.speech, 'sarah', () => {
      setIsSpeakingVoice(false);
    });
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAuth = () => {
    const el = document.getElementById('auth-portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setRightPanelTab('auth');
    }
  };

  const persona = INTERVIEWER_PERSONAS[0];

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-[#F4F0E7] dark:bg-[#111D1A] text-[#292F2C] dark:text-[#F4F0E7] transition-colors"
    >
      {/* Background Subtle Organic Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft forest ambient glows */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.12, 0.18, 0.12]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-[#172D29] dark:bg-[#24362F] rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.08, 0.14, 0.08]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 -right-40 w-[600px] h-[500px] bg-[#DCE5DF] dark:bg-[#1B2B26] rounded-full blur-[140px]"
        />
        
        {/* Interactive Fluid Waves Canvas Layer */}
        <div className="absolute bottom-0 left-0 right-0 opacity-20 pointer-events-none">
          <FluidWaveCanvas height={240} interactive={true} />
        </div>

        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#727A73_1px,transparent_1px)] dark:bg-[radial-gradient(#C6D58A15_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* =========================================================================
              LEFT COLUMN (6 cols): Headline, Value Proposition, Action CTAs
             ========================================================================= */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Editorial Trust Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE5DF] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold shadow-xs"
            >
              <span className="text-[#C47759]">✦</span>
              <span>INTERVO · AI Interview Coach & Live Coding Arena</span>
            </motion.div>

            {/* Main Headline with Editorial Staggered Entrance */}
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] leading-[1.08] font-display">
              <RevealText
                text="INTERVO: Your Next Interview. Your Best Performance."
                gradientWords={['INTERVO:', 'Best', 'Performance.']}
                gradientClass="text-[#C47759] dark:text-[#D18A6D]"
                delay={0.15}
              />
            </div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg text-[#727A73] dark:text-[#B6C0B8] max-w-xl mx-auto lg:mx-0 leading-relaxed [text-wrap:balance]"
            >
              Master technical coding and behavioral interviews with INTERVO. Experience realistic
              real-time AI Bar Raisers, sub-second code execution, and personalized radar scorecards.
            </motion.p>

            {/* CTAs with Restrained Editorial Action */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <MagneticButton
                onClick={() => openAuthModal('signup', 'dashboard')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#172D29] hover:bg-[#223F3A] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] text-[#F4F0E7] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Practicing Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                onClick={scrollToFeatures}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] text-[#292F2C] dark:text-[#F4F0E7] font-semibold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Features</span>
              </MagneticButton>
            </motion.div>

            {/* Trust proof indicators (No pills) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="pt-4 border-t border-[#DFE1D8] dark:border-[#35443D] flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#727A73] dark:text-[#B6C0B8]"
            >
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
                <span>AES-256 Vault Encryption</span>
              </div>
              <span className="hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C47759]" />
                <span>Login Required for Protection</span>
              </div>
              <span className="hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Brain className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
                <span>3 AI Bar Raisers</span>
              </div>
            </motion.div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (6 cols): 3D Tilt Preview Card OR Direct Sign-Up Card
             ========================================================================= */}
          <div className="lg:col-span-6 relative">
            {/* View Switcher Bar (Simulation Preview vs. Quick Register) */}
            <div className="flex items-center justify-end mb-3 gap-2">
              <span className="text-[11px] font-semibold text-[#727A73] dark:text-[#B6C0B8]">View:</span>
              <div className="p-1 rounded-xl bg-[#EBE9DF] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] flex text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setRightPanelTab('preview')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    rightPanelTab === 'preview'
                      ? 'bg-white dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                      : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
                  }`}
                >
                  Live Mock Preview
                </button>
                <button
                  type="button"
                  onClick={() => setRightPanelTab('auth')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    rightPanelTab === 'auth'
                      ? 'bg-white dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                      : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
                  }`}
                >
                  Sign In on Page
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {rightPanelTab === 'preview' ? (
                <TiltCard key="preview-card" maxTilt={5}>
                  {/* Subtle Forest Ambient Glow */}
                  <div className="absolute -inset-1 bg-[#172D29]/10 dark:bg-[#C6D58A]/10 rounded-3xl blur-2xl opacity-60" />

                  {/* Main Interactive Preview Card */}
                  <div className="relative rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-4">
                    {/* Card Header: AI Interviewer Status */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-[#DFE1D8] dark:border-[#35443D]">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={persona.avatar}
                            alt={persona.name}
                            className="w-11 h-11 rounded-xl object-cover border border-[#DFE1D8] dark:border-[#35443D] shadow-xs"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#C6D58A] border-2 border-white dark:border-[#1B2B26]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-[#172D29] dark:text-[#F4F0E7]">
                              {persona.name}
                            </h4>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]">
                              Staff Bar Raiser
                            </span>
                          </div>
                          <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">{persona.company}</p>
                        </div>
                      </div>

                      {/* Interactive Voice Waveform & Trigger Indicator */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePlayVoice}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                            isSpeakingVoice
                              ? 'bg-[#C6D58A]/30 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A] shadow-xs'
                              : 'bg-[#EBE9DF] dark:bg-[#24362F] text-[#292F2C] dark:text-[#F4F0E7] hover:bg-[#172D29] hover:text-[#F4F0E7] dark:hover:bg-[#C6D58A] dark:hover:text-[#172D29]'
                          }`}
                          title="Click to test live AI interviewer voice"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isSpeakingVoice ? 'animate-bounce' : ''}`} />
                          <span>{isSpeakingVoice ? 'Speaking...' : 'Hear AI Voice'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setQuestionIndex((prev) => (prev + 1) % sampleQuestions.length)}
                          className="px-2.5 py-1.5 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] hover:bg-[#DCE5DF] dark:hover:bg-[#35443D] text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7] text-xs font-bold transition-colors cursor-pointer"
                          title="Cycle to next mock question"
                        >
                          Next ⟳
                        </button>
                      </div>
                    </div>

                    {/* Sample Interview Question Block */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQ.question}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="p-3.5 rounded-xl bg-[#F4F0E7] dark:bg-[#111D1A] border border-[#DFE1D8] dark:border-[#35443D] space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-[#C47759] tracking-wider">
                            Target: {currentQ.role}
                          </span>
                          <span className="text-[10px] font-mono text-[#727A73] dark:text-[#B6C0B8]">
                            Q {questionIndex + 1}/{sampleQuestions.length}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#172D29] dark:text-[#F4F0E7] leading-snug">
                          "{currentQ.question}"
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Candidate Response Snippet */}
                    <div className="p-3.5 rounded-xl bg-[#EBE9DF]/70 dark:bg-[#24362F]/60 border border-[#DFE1D8] dark:border-[#35443D] space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-[#727A73] dark:text-[#B6C0B8]">
                        <span className="flex items-center gap-1.5 text-[#172D29] dark:text-[#C6D58A]">
                          <Mic className="w-3 h-3" />
                          <span>Candidate Answer (Voice Captured)</span>
                        </span>
                        <span>42s elapsed</span>
                      </div>
                      <p className="text-xs text-[#292F2C] dark:text-[#F4F0E7] leading-relaxed font-mono">
                        "{currentQ.answer}"
                      </p>
                    </div>

                    {/* Real-Time Live Evaluation Score Card (Deep Forest) */}
                    <FloatingElement amplitude={3} duration={4}>
                      <div className="p-4 rounded-xl bg-[#172D29] text-[#F4F0E7] border border-[#223F3A] space-y-3 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-[#223F3A] text-[#C6D58A]">
                              <Award className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-[#F4F0E7] block">AI Bar Raiser Evaluation</span>
                              <span className="text-[10px] text-[#DCE5DF]">Staff-level trade-off grounding</span>
                            </div>
                          </div>

                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black font-mono text-[#C6D58A]">9.4</span>
                            <span className="text-xs text-[#DCE5DF] font-mono">/ 10</span>
                          </div>
                        </div>

                        {/* Dynamic Competency Progress */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#DCE5DF] font-medium">
                              {competencies[activeCompetency].label}
                            </span>
                            <span className="font-mono text-[#C6D58A] font-bold">
                              {competencies[activeCompetency].score}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-[#0F1E1B] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#C6D58A] rounded-full"
                              animate={{ width: `${competencies[activeCompetency].bar}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </div>
                    </FloatingElement>

                    {/* Restrained Metric Blocks */}
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D]">
                        <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] uppercase font-semibold block">Latency</span>
                        <strong className="text-[#172D29] dark:text-[#F4F0E7] font-mono">340ms Instant AI</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D]">
                        <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] uppercase font-semibold block">Evaluation</span>
                        <strong className="text-[#172D29] dark:text-[#C6D58A] font-bold">Strong Hire Bar</strong>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ) : (
                <LandingAuthCard
                  key="auth-card"
                  onSuccess={() => {}}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Smooth Scroll Indicator */}
        <div className="flex justify-center pt-16">
          <button
            onClick={scrollToFeatures}
            className="flex flex-col items-center gap-1.5 text-xs text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#C6D58A] transition-colors cursor-pointer group"
          >
            <span className="text-[11px] font-semibold">Scroll to explore capabilities</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#C47759]" />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};
