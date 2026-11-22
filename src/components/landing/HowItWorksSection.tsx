import React from 'react';
import {
  UploadCloud,
  SlidersHorizontal,
  Mic,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorksSection: React.FC = () => {
  const { navigateToProtected } = useApp();

  const steps = [
    {
      stepNumber: '01',
      title: 'Upload Your Resume',
      subtitle: 'Let AI understand your skills, projects, and experience.',
      detail:
        'Our client-side parser scans your GitHub repositories, production stacks, and architectural contributions with zero private data exposure.',
      icon: UploadCloud,
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800'
    },
    {
      stepNumber: '02',
      title: 'Customize Your Interview',
      subtitle: 'Choose your target role, difficulty, and interview style.',
      detail:
        'Select between Frontend, Full Stack, SRE, or Product Management. Configure question counts, pacing timers, and Bar Raiser personas.',
      icon: SlidersHorizontal,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800'
    },
    {
      stepNumber: '03',
      title: 'Experience Real Interviews',
      subtitle: 'Answer questions, solve coding challenges, and interact with AI interviewers.',
      detail:
        'Engage via Web Speech audio or keyboard input. The AI dynamically challenges your trade-offs, evaluates Big-O, and tests edge cases.',
      icon: Mic,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800'
    },
    {
      stepNumber: '04',
      title: 'Improve Your Performance',
      subtitle: 'Receive detailed feedback and personalized learning recommendations.',
      detail:
        'Get immediate scorecards on technical depth, STAR communication, and algorithmic efficiency with automated weakness drills.',
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 bg-[#F4F0E7] dark:bg-[#111D1A] border-t border-[#DFE1D8] dark:border-[#35443D] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5DF] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold">
            <span className="text-[#C47759]">✦</span>
            <span>Interactive Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] [text-wrap:balance] font-display">
            From Resume to Offer: A Proven 4-Step Process
          </h2>

          <p className="text-sm sm:text-base text-[#727A73] dark:text-[#B6C0B8] leading-relaxed [text-wrap:balance]">
            Experience a structured, realistic interview loop designed around the actual evaluation
            mechanisms of top-tier engineering organizations.
          </p>
        </div>

        {/* Steps Grid with Connected Path */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-[#DFE1D8] dark:bg-[#35443D] opacity-60 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.stepNumber}
                  className="rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group"
                >
                  <div className="space-y-4">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#C47759]">
                        {step.stepNumber}
                      </span>
                      <div className="p-3 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#C47759] dark:text-[#D18A6D]">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] leading-relaxed pt-2 border-t border-[#DFE1D8]/60 dark:border-[#35443D]">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateToProtected('setup')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#172D29] hover:bg-[#223F3A] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] text-[#F4F0E7] font-bold text-xs transition-colors shadow-xs cursor-pointer group"
          >
            <span>Start Step 1: Upload Resume Free</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
