import React, { useState } from 'react';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CodingArenaShowcase } from './CodingArenaShowcase';
import { InterviewersShowcase } from './InterviewersShowcase';
import { AnalyticsShowcase } from './AnalyticsShowcase';
import { ChallengesSection } from './ChallengesSection';
import { FAQSection } from './FAQSection';
import { FinalCTASection } from './FinalCTASection';
import { LandingFooter } from './LandingFooter';
import { ScrollProgress } from '../animations/ScrollProgress';
import { LandingAuthCard } from './LandingAuthCard';
import { ButtermaxIntro } from '../animations/ButtermaxIntro';
import { FluidCursor } from '../animations/FluidCursor';
import { CrtTerminalShowcase } from '../animations/CrtTerminalShowcase';
import { InteractiveDisksShowcase } from '../animations/InteractiveDisksShowcase';
import { ShieldCheck, Sparkles, Terminal, RotateCcw } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [replayIntro, setReplayIntro] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F0E7] dark:bg-[#111D1A] text-[#292F2C] dark:text-[#F4F0E7] font-sans selection:bg-[#C47759]/20 selection:text-[#172D29] relative transition-colors overflow-x-hidden">
      {/* Buttermax Signature Cinematic Intro Preloader */}
      <ButtermaxIntro
        forceShow={replayIntro}
        onComplete={() => setReplayIntro(false)}
      />

      {/* Fluid Magnetic Mouse Follower (Desktop) */}
      <FluidCursor />

      {/* Reading scroll progress bar across landing page */}
      <ScrollProgress />

      {/* Sticky Top Navigation */}
      <LandingNavbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section with Fluid Canvas Wave Background */}
        <HeroSection />

        {/* 2. Metrics Section with Animated Count-Ups */}
        <StatsSection />

        {/* 4. Terminal Showcase in Deep Forest Theme */}
        <section className="py-20 sm:py-24 bg-[#172D29] text-[#F4F0E7] relative border-y border-[#223F3A] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(198,213,138,0.06),transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#223F3A] border border-[#35443D] text-[#C6D58A] text-xs font-mono font-semibold">
                <Terminal className="w-3.5 h-3.5 text-[#C6D58A]" />
                <span>INTERACTIVE SANDBOX EMULATOR</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F4F0E7] [text-wrap:balance] font-display">
                Live Terminal Execution Engine
              </h2>
              <p className="text-sm text-[#DCE5DF] [text-wrap:balance]">
                Experience high-performance code execution in an isolated runner. Run algorithm test cases, inspect Big-O trade-offs, and observe AI Bar Raiser feedback.
              </p>
            </div>

            <CrtTerminalShowcase />
          </div>
        </section>

        {/* 5. 8-Card Preparation Suite */}
        <FeaturesSection />

        {/* 6. Rotating 3D Interactive Vinyl Disks (The Editorial Forest) */}
        <section className="py-20 sm:py-24 bg-[#EBE9DF]/60 dark:bg-[#1B2B26]/40 border-y border-[#DFE1D8] dark:border-[#35443D] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5DF] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold">
                <span>✦</span>
                <span>Kinetic 3D Core Pillars</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] [text-wrap:balance] font-display">
                Three Pillars of Technical Interview Mastery
              </h2>
              <p className="text-sm text-[#727A73] dark:text-[#B6C0B8] [text-wrap:balance]">
                Interact with the rotating 3D cores to explore real-time spoken bar-raising, multi-language coding sandboxes, and AES-256 client privacy.
              </p>
            </div>

            <InteractiveDisksShowcase />
          </div>
        </section>

        {/* 7. Timeline / How It Works */}
        <HowItWorksSection />

        {/* 8. Dedicated Monaco Coding Arena Showcase */}
        <CodingArenaShowcase />

        {/* 9. AI Bar Raiser Personas Showcase */}
        <InterviewersShowcase />

        {/* 10. Performance Radar Analytics */}
        <AnalyticsShowcase />

        {/* 11. Dedicated Candidate Authentication & Instant Access Portal Section */}
        <section id="auth-portal" className="py-20 sm:py-28 bg-white/70 dark:bg-[#1B2B26]/50 border-y border-[#DFE1D8] dark:border-[#35443D] relative overflow-hidden backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5DF] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
                <span>Zero-Leak Protected Candidate Portal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] [text-wrap:balance] font-display">
                Sign In to INTERVO to Begin Practice
              </h2>
              <p className="text-sm text-[#727A73] dark:text-[#B6C0B8] [text-wrap:balance]">
                All mock interview sessions, live coding arena challenges, and personalized radar analytics require authentication to maintain privacy and encrypted candidate progress.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <LandingAuthCard />
            </div>
          </div>
        </section>

        {/* 12. Candidate Challenges & Solvers */}
        <ChallengesSection />

        {/* 13. Frequently Asked Questions */}
        <FAQSection />

        {/* 14. Final Call to Action */}
        <FinalCTASection />
      </main>

      {/* Floating Replay Intro Animation Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setReplayIntro(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#172D29]/90 hover:bg-[#223F3A] text-[#F4F0E7] font-semibold text-xs shadow-lg backdrop-blur-md transition-all hover:scale-105 cursor-pointer border border-[#35443D]"
          title="Replay Cinematic Intro"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C6D58A]" />
          <span>Replay Intro</span>
        </button>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};
