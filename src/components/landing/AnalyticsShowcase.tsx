import React from 'react';
import {
  LineChart,
  TrendingUp,
  Brain,
  Award,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Target,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsShowcase: React.FC = () => {
  const { navigateToProtected } = useApp();

  const metrics = [
    { label: 'Technical Depth', score: 88, desc: 'Architecture, trade-offs & edge cases' },
    { label: 'Communication (STAR)', score: 92, desc: 'Structured narrative & quantified impact' },
    { label: 'Problem Solving', score: 85, desc: 'Algorithmic efficiency & data structures' },
    { label: 'Answer Relevance', score: 90, desc: 'Direct engagement with prompt constraints' }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#EBE9DF]/30 dark:bg-[#111D1A] border-t border-[#DFE1D8] dark:border-[#35443D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5DF] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold">
            <LineChart className="w-3.5 h-3.5 text-[#C47759]" />
            <span>Deep Diagnostic Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] [text-wrap:balance] font-display">
            Actionable Intelligence, Not Generic Advice
          </h2>

          <p className="text-sm sm:text-base text-[#727A73] dark:text-[#B6C0B8] leading-relaxed [text-wrap:balance]">
            Understand exactly where you stand against the senior hiring bar with multi-dimensional
            competency breakdowns and automated remediation roadmaps.
          </p>
        </div>

        {/* Dashboard Preview Container with Illustrative Badge */}
        <div className="relative max-w-5xl mx-auto rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-lg space-y-6">
          {/* Illustrative Label */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#DFE1D8] dark:border-[#35443D] gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C6D58A]" />
              <span className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                Candidate Competency Breakdown
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#727A73] dark:text-[#B6C0B8] font-mono">
              [ILLUSTRATIVE SAMPLE REPORT]
            </span>
          </div>

          {/* 4 Competency Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] space-y-2.5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7]">
                    {m.label}
                  </span>
                  <span className="text-base font-black font-mono text-[#172D29] dark:text-[#C6D58A]">
                    {m.score}%
                  </span>
                </div>

                <div className="h-2 w-full bg-[#EBE9DF] dark:bg-[#1B2B26] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#172D29] dark:bg-[#C6D58A] rounded-full"
                    style={{ width: `${m.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] leading-snug">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Split Row: Weakness Watchlist & Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Weakness Identification */}
            <div className="p-5 rounded-xl bg-[#F7EDE8]/70 dark:bg-[#24362F]/60 border border-[#C47759]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#C47759] font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-[#C47759]" />
                <span>Detected Knowledge Gaps</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] space-y-1">
                  <strong className="text-[#172D29] dark:text-[#F4F0E7] block font-display">
                    Distributed Cache Stampede Prevention
                  </strong>
                  <p className="text-[#727A73] dark:text-[#B6C0B8] text-[11px]">
                    Answer omitted mutex locks or probabilistic early expiration for hot cache keys.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] space-y-1">
                  <strong className="text-[#172D29] dark:text-[#F4F0E7] block font-display">
                    Composite Index Selectivity
                  </strong>
                  <p className="text-[#727A73] dark:text-[#B6C0B8] text-[11px]">
                    Candidate did not clarify leftmost prefix rules in multi-column B-Tree indexes.
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement Roadmap */}
            <div className="p-5 rounded-xl bg-[#DCE5DF]/40 dark:bg-[#24362F]/60 border border-[#DFE1D8] dark:border-[#35443D] space-y-3">
              <div className="flex items-center gap-2 text-[#172D29] dark:text-[#C6D58A] font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
                <span>Targeted Recovery Roadmap</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between">
                  <div>
                    <strong className="text-[#172D29] dark:text-[#F4F0E7] block font-display">
                      1-Click Cache Concurrency Drill
                    </strong>
                    <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">3 focused rapid-fire prompts</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#DCE5DF] text-[#172D29] dark:bg-[#172D29] dark:text-[#C6D58A]">
                    Recommended
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between">
                  <div>
                    <strong className="text-[#172D29] dark:text-[#F4F0E7] block font-display">
                      SQL Query Planning Walkthrough
                    </strong>
                    <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">EXPLAIN ANALYZE execution trees</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EBE9DF] text-[#292F2C] dark:bg-[#172D29] dark:text-[#DCE5DF]">
                    Next Step
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2 text-center">
            <button
              onClick={() => navigateToProtected('analytics')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#223F3A] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] text-[#F4F0E7] font-bold text-xs transition-colors shadow-xs cursor-pointer group"
            >
              <span>View Your Personal Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
