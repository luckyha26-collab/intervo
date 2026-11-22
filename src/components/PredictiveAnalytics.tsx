import React from 'react';
import {
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Users2,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PredictiveAnalytics: React.FC = () => {
  const { predictiveAnalytics, currentUser, setCurrentTab, userSessions } = useApp();
  const { hiringProbability, avgScore, totalSessions, skillPrioritization, cohortBenchmark, targetRole } = predictiveAnalytics;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold border border-[#DFE1D8] dark:border-[#35443D]">
          <Sparkles className="w-3.5 h-3.5 text-[#C47759]" />
          Predictive Hiring Probability & AI Task Prioritization
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172D29] dark:text-[#F4F0E7] font-display">
          Career Readiness & Workflow Optimization
        </h2>
        <p className="text-xs sm:text-sm text-[#727A73] dark:text-[#B6C0B8]">
          Machine-learning predictive analytics modeling your likelihood of clearing Tier-1 technical rounds based on score trends and automated prep roadmaps.
        </p>
      </div>

      {/* Main Probability & Cohort Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Probability Gauge Card */}
        <div className="md:col-span-7 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8]">
                Predictive Interview Pass Probability
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40">
                AI Modeled
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-3">
              <div className="text-5xl sm:text-6xl font-black text-[#172D29] dark:text-[#F4F0E7] font-display">
                {hiringProbability}%
              </div>
              <div>
                <span className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] block">
                  {cohortBenchmark.readinessLevel}
                </span>
                <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                  Target: {targetRole}
                </span>
              </div>
            </div>

            {/* Probability Progress Bar */}
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-2.5 rounded-full overflow-hidden mb-4">
              <div
                style={{ width: `${hiringProbability}%` }}
                className="h-full bg-[#172D29] dark:bg-[#C6D58A] rounded-full transition-all duration-1000"
              ></div>
            </div>

            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
              Based on your {totalSessions} completed mock interview sessions and an average score of <strong className="text-[#172D29] dark:text-[#F4F0E7]">{avgScore}/10</strong>, your technical articulation matches candidates who clear on-site rounds at leading tech employers.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between text-xs">
            <span className="text-[#727A73] dark:text-[#B6C0B8]">
              Confidence Factor: High (Multi-round evaluation)
            </span>
            <button
              onClick={() => setCurrentTab('setup')}
              className="font-bold text-[#C47759] hover:underline flex items-center gap-1"
            >
              Boost Score with Practice →
            </button>
          </div>
        </div>

        {/* Cohort & Team Benchmarking Card */}
        <div className="md:col-span-5 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users2 className="w-4 h-4 text-[#C47759]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7]">
                Team & Cohort Benchmark
              </h4>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#727A73] dark:text-[#B6C0B8]">Candidate Percentile Ranking</span>
                  <span className="font-bold text-[#C47759]">
                    Top {100 - cohortBenchmark.userPercentile}%
                  </span>
                </div>
                <div className="text-xl font-bold font-display text-[#172D29] dark:text-[#F4F0E7]">
                  {cohortBenchmark.userPercentile}th Percentile
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/60">
                  <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block mb-0.5">Cohort Average</span>
                  <span className="text-sm font-bold font-mono text-[#172D29] dark:text-[#F4F0E7]">
                    {cohortBenchmark.cohortAverageScore} / 10
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/60">
                  <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block mb-0.5">Top 10% Bar</span>
                  <span className="text-sm font-bold font-mono text-[#172D29] dark:text-[#F4F0E7]">
                    {cohortBenchmark.topTenPercentScore} / 10
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
                You are currently performing <strong className="text-[#172D29] dark:text-[#F4F0E7]">+{(avgScore - cohortBenchmark.cohortAverageScore).toFixed(1)} points</strong> above the peer candidate median in technical problem solving.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#DFE1D8] dark:border-[#35443D] text-[11px] text-[#727A73] dark:text-[#B6C0B8] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6D58A]" />
            <span>Enterprise cohort data encrypted via AES-256</span>
          </div>
        </div>

      </div>

      {/* Automated Task Prioritization Roadmap */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C47759]" />
              <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
                Automated Task & Skill Gap Prioritization
              </h3>
            </div>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
              Ranked prep recommendations calculated by prospective score gain and hiring impact
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]">
            4 Optimization Tasks
          </span>
        </div>

        <div className="space-y-3.5">
          {skillPrioritization.map((task, idx) => {
            const urgencyBadge = task.urgency === 'CRITICAL'
              ? 'bg-[#C47759]/10 text-[#C47759] border-[#C47759]/30'
              : task.urgency === 'HIGH'
              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
              : 'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border-[#C6D58A]/40';

            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/40 dark:bg-[#24362F]/40 hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#F4F0E7] font-mono font-bold text-xs shrink-0 shadow-xs">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7]">
                        {task.skill}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${urgencyBadge}`}>
                        {task.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
                      {task.actionItem}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40 font-mono">
                    Expected Gain: {task.impactScore}
                  </span>
                  <button
                    onClick={() => setCurrentTab('setup')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] text-xs font-bold shadow-xs transition-all"
                  >
                    <span>Practice Gap</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

