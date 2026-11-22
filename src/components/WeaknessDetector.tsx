import React, { useState } from 'react';
import {
  AlertTriangle,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Brain,
  ShieldAlert,
  Zap,
  Play,
  RotateCcw,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WeaknessDetector: React.FC = () => {
  const { weaknessTopics, practiceWeakness, resolveWeakness, currentUser, userSessions } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'System Architecture', 'Algorithms & Data Structures', 'Behavioral & Leadership', 'Database & Storage', 'DevOps & Reliability', 'Frontend Performance'];

  const filtered = weaknessTopics.filter(w => {
    const matchCat = selectedCategory === 'All' || w.category === selectedCategory;
    const matchSearch = w.topic.toLowerCase().includes(searchTerm.toLowerCase()) || w.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const criticalCount = weaknessTopics.filter(w => w.severity === 'Critical').length;
  const avgRecovery = Math.round(weaknessTopics.reduce((acc, w) => acc + w.recoveryProgress, 0) / weaknessTopics.length);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      
      {/* Top Header Card in Deep Forest with Editorial Forest Accents */}
      <div className="relative overflow-hidden rounded-2xl bg-[#172D29] text-[#F4F0E7] p-8 sm:p-10 border border-[#233F3A] shadow-xs">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#C6D58A]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-[#C47759]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#233F3A] border border-[#35534B] text-[#C6D58A] text-xs font-semibold">
            <Brain className="w-3.5 h-3.5 text-[#C6D58A]" />
            <span>AI Weakness Detector & Remediation Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-[#F4F0E7] font-display leading-tight">
            Identify & Eliminate Technical Interview Weak Spots
          </h1>

          <p className="text-xs sm:text-sm text-[#DFE1D8]/80 leading-relaxed max-w-2xl">
            Our Bar Raiser engine analyzes every answer, missing topic, and latency trade-off from your mock sessions for {currentUser.name}. Practice targeted drills to turn vulnerabilities into strengths.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2 bg-[#233F3A] px-3.5 py-1.5 rounded-lg border border-[#35534B]">
              <span className="w-2 h-2 rounded-full bg-[#C47759] animate-pulse"></span>
              <span className="text-[#F4F0E7]">{criticalCount} Critical Gaps Identified</span>
            </div>
            <div className="flex items-center gap-2 bg-[#233F3A] px-3.5 py-1.5 rounded-lg border border-[#35534B]">
              <span className="w-2 h-2 rounded-full bg-[#C6D58A]"></span>
              <span className="text-[#F4F0E7]">{avgRecovery}% Average Recovery Progress</span>
            </div>
            <div className="flex items-center gap-2 bg-[#233F3A] px-3.5 py-1.5 rounded-lg border border-[#35534B]">
              <span className="text-[#DFE1D8]">{userSessions.length} Sessions Scanned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Category Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-[#1B2B26] p-4 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] shadow-xs'
                  : 'bg-[#F4F0E7] dark:bg-[#24362F] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#EBE9DF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search weakness topics (e.g. cache, STAR, index)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#111D1A]/60 text-xs text-[#172D29] dark:text-[#F4F0E7] focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden min-w-[240px]"
        />
      </div>

      {/* Weakness Topic Cards Grid */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isCritical = item.severity === 'Critical';
          const isHigh = item.severity === 'High';

          const badgeClass = isCritical
            ? 'bg-[#C47759]/10 text-[#C47759] border-[#C47759]/30'
            : isHigh
            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
            : 'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border-[#C6D58A]/40';

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isCritical ? 'bg-[#C47759]/10 text-[#C47759]' : isHigh ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400' : 'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A]'}`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
                        {item.topic}
                      </h3>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                        {item.severity} Gap
                      </span>
                    </div>
                    <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                      Category: {item.category} · Detected in {item.frequencyDetected} past answer evaluations
                    </p>
                  </div>
                </div>

                {/* Practice Now CTA */}
                <button
                  onClick={() => practiceWeakness(item.id)}
                  className="px-4 py-2 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all self-start sm:self-center"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Practice This Weakness</span>
                </button>
              </div>

              {/* Diagnosis & Suggested Action Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                <div className="p-3.5 rounded-xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C47759] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C47759]" />
                    AI Bar Raiser Diagnosis
                  </span>
                  <p className="text-xs text-[#172D29] dark:text-[#F4F0E7] leading-relaxed">
                    {item.diagnosis}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#C6D58A]/15 border border-[#C6D58A]/40 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#172D29] dark:text-[#C6D58A] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
                    Prescribed Action Item
                  </span>
                  <p className="text-xs text-[#172D29] dark:text-[#F4F0E7] leading-relaxed">
                    {item.suggestedAction}
                  </p>
                </div>
              </div>

              {/* Sample Target Question & Recovery Progress Bar */}
              <div className="pt-2 border-t border-[#DFE1D8] dark:border-[#35443D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-[#727A73] dark:text-[#B6C0B8] flex items-center gap-1.5 max-w-xl truncate">
                  <HelpCircle className="w-4 h-4 text-[#C47759] shrink-0" />
                  <span className="truncate italic">"{item.sampleQuestionPrompt}"</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#727A73]">Recovery:</span>
                    <div className="w-24 bg-[#EBE9DF] dark:bg-[#24362F] h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.recoveryProgress}%` }}
                        className="bg-[#C6D58A] h-full rounded-full transition-all"
                      ></div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#172D29] dark:text-[#F4F0E7]">
                      {item.recoveryProgress}%
                    </span>
                  </div>

                  <button
                    onClick={() => resolveWeakness(item.id)}
                    className="text-[11px] font-semibold text-[#C47759] hover:underline"
                  >
                    + Boost Progress
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

