import React from 'react';
import {
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChallengesSection: React.FC = () => {
  const { navigateToProtected } = useApp();

  const challenges = [
    {
      id: 'black-box',
      challenge: 'The "Black Box" Rejection Mystery',
      painPoint:
        'Standard interviewers send generic rejection emails with zero actionable feedback on why your solution or communication missed the senior bar.',
      solution:
        'INTERVO delivers immediate itemized scoring across Technical Depth, STAR clarity, and algorithmic trade-offs with explicit suggestions on what was missing.',
      badge: 'Feedback Clarity'
    },
    {
      id: 'communication-gap',
      challenge: 'The LeetCode Without Communication Trap',
      painPoint:
        'Practicing coding on silent algorithmic platforms teaches you to write code in isolation, but real technical interviews evaluate how you articulate trade-offs.',
      solution:
        'Our Live Coding Arena pairs Monaco with an active AI Bar Raiser who speaks to you, tests your Big-O reasoning, and evaluates your thought process.',
      badge: 'Technical Articulation'
    },
    {
      id: 'generic-questions',
      challenge: 'Irrelevant, Generic Question Lists',
      painPoint:
        'Most mock tools generate generic trivia questions completely disconnected from the actual architecture, microservices, or databases you built on your resume.',
      solution:
        'Resume Intelligence extracts your specific production projects, libraries, and architectural decisions to ask tailored questions unique to your background.',
      badge: 'Context-Driven Prep'
    },
    {
      id: 'high-pressure-freeze',
      challenge: 'High-Pressure Cognitive Freeze',
      painPoint:
        'Technical candidates often know the theory but stumble when explaining distributed race conditions or handling follow-up edge cases under pressure.',
      solution:
        'Simulated timed sessions with voice speech recognition habituate your nervous system to think out loud, pace explanations, and handle unexpected pushback.',
      badge: 'Psychological Readiness'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Built by Engineers, for Engineers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Designed Around the Challenges of Interview Preparation
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed [text-wrap:balance]">
            We analyzed the most frustrating gaps in traditional technical interview preparation and built
            targeted solutions into every module of the platform.
          </p>
        </div>

        {/* 2x2 Grid of Challenges vs. Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {challenges.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-slate-500">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {item.challenge}
                </h3>

                {/* Challenge description */}
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
                    The Obstacle
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.painPoint}
                  </p>
                </div>

                {/* Solution */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    How INTERVO Solves It
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
