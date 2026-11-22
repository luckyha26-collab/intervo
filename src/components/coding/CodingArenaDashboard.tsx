import React, { useState, useEffect, useMemo } from 'react';
import {
  Code2,
  Play,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Layers,
  ChevronRight,
  Filter,
  BarChart3,
  Flame,
  ShieldCheck,
  FileCode,
  ArrowRight,
  Search,
  BookOpen,
  RotateCcw,
  Check,
  Tag,
  AlertCircle,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProgrammingLanguage, Difficulty, CodingCategory, CodingInterviewMode } from '../../types';

export const CodingArenaDashboard: React.FC = () => {
  const {
    startCodingInterview,
    isGeneratingCodingProblem,
    codingHistory,
    viewCodingResult,
    setCurrentTab,
    currentUser,
    codingExhaustionNotice,
    setCodingExhaustionNotice,
    resetSeenProblemsForCategory,
    codeStarterMode,
    setCodeStarterMode
  } = useApp();

  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('python');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');
  const [selectedCategory, setSelectedCategory] = useState<CodingCategory>('Data Structures and Algorithms');
  const [selectedMode, setSelectedMode] = useState<CodingInterviewMode>('practice');

  // Catalog browser state
  const [catalogList, setCatalogList] = useState<any[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogDifficultyFilter, setCatalogDifficultyFilter] = useState<'all' | Difficulty>('all');
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>('all');
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Fetch 50-question catalog
  useEffect(() => {
    let isMounted = true;
    setIsLoadingCatalog(true);
    fetch('/api/coding-interview/catalog')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.catalog && Array.isArray(data.catalog)) {
          setCatalogList(data.catalog);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch coding catalog:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingCatalog(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const languages: { id: ProgrammingLanguage; label: string; ext: string }[] = [
    { id: 'python', label: 'Python', ext: '.py' },
    { id: 'javascript', label: 'JavaScript', ext: '.js' },
    { id: 'java', label: 'Java', ext: '.java' },
    { id: 'cpp', label: 'C++', ext: '.cpp' },
    { id: 'c', label: 'C', ext: '.c' },
    { id: 'sql', label: 'Database & SQL', ext: '.sql' }
  ];

  const difficulties: { id: Difficulty; label: string; desc: string; badge: string }[] = [
    { id: 'Easy', label: 'Easy', desc: 'Fundamentals & Syntax', badge: 'text-emerald-700 dark:text-emerald-300' },
    { id: 'Medium', label: 'Medium', desc: 'Standard Interview Standard', badge: 'text-sky-700 dark:text-sky-300' },
    { id: 'Hard', label: 'Hard', desc: 'Staff / High Concurrency & Edge Cases', badge: 'text-rose-700 dark:text-rose-300' }
  ];

  const categories: CodingCategory[] = [
    'Data Structures and Algorithms',
    'Arrays and Strings',
    'Searching and Sorting',
    'Linked Lists',
    'Stack and Queue',
    'Trees and Graphs',
    'Dynamic Programming',
    'Object-Oriented Programming',
    'Database and SQL',
    'Problem Solving'
  ];

  const interviewModes: { id: CodingInterviewMode; title: string; subtitle: string; icon: any; color: string }[] = [
    {
      id: 'practice',
      title: 'Practice Mode',
      subtitle: 'Unlimited time, interactive hints, immediate feedback & AI explanations.',
      icon: Sparkles,
      color: 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/30'
    },
    {
      id: 'real',
      title: 'Real Interview Mode',
      subtitle: 'Strict 45-min countdown, no hints by default, probing AI interviewer follow-ups.',
      icon: Clock,
      color: 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30'
    },
    {
      id: 'challenge',
      title: 'Challenge Mode',
      subtitle: 'Multi-question marathon with increasing difficulty & cohort ranking.',
      icon: Flame,
      color: 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/30'
    }
  ];

  const recommendedChallenges = [
    {
      id: 'two-sum',
      title: 'Two Sum & Complement Hashing',
      category: 'Arrays and Strings',
      difficulty: 'Easy' as Difficulty,
      company: 'Google / Meta',
      timeEst: '15 min'
    },
    {
      id: 'longest-substring-without-repeating-characters',
      title: 'Longest Substring Without Repeating Characters',
      category: 'Arrays and Strings',
      difficulty: 'Medium' as Difficulty,
      company: 'Amazon / Microsoft',
      timeEst: '25 min'
    },
    {
      id: 'coin-change',
      title: 'Coin Change Minimum Denominations',
      category: 'Dynamic Programming',
      difficulty: 'Medium' as Difficulty,
      company: 'Stripe / Uber',
      timeEst: '30 min'
    },
    {
      id: 'merge-k-sorted-lists',
      title: 'Merge K Sorted Lists via Priority Queue',
      category: 'Linked Lists',
      difficulty: 'Hard' as Difficulty,
      company: 'Netflix / Apple',
      timeEst: '35 min'
    }
  ];

  // Performance Statistics calculations
  const totalAttempts = codingHistory.length;
  const passedAttempts = codingHistory.filter(h => h.executionResult.status === 'accepted').length;
  const passRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;
  const avgCodingScore = totalAttempts > 0
    ? Math.round(codingHistory.reduce((sum, h) => sum + h.overallScore, 0) / totalAttempts)
    : 0;

  const handleStartNewInterview = () => {
    startCodingInterview({
      language: selectedLanguage,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      mode: selectedMode
    });
  };

  const handleLaunchRecommended = (problemId: string, diff: Difficulty, cat: string) => {
    startCodingInterview({
      language: selectedLanguage,
      difficulty: diff,
      category: cat as CodingCategory,
      mode: selectedMode,
      specificProblemId: problemId
    });
  };

  const handleResetCategory = (cat?: string) => {
    resetSeenProblemsForCategory(cat);
    setResetSuccessMessage(
      cat
        ? `Reset seen history for "${cat}". You can now practice all problems again!`
        : `Reset seen history for all categories!`
    );
    setTimeout(() => setResetSuccessMessage(null), 3500);
  };

  // Filtered catalog list
  const filteredCatalog = useMemo(() => {
    return catalogList.filter((p) => {
      if (catalogDifficultyFilter !== 'all' && p.difficulty !== catalogDifficultyFilter) {
        return false;
      }
      if (catalogCategoryFilter !== 'all' && p.category !== catalogCategoryFilter) {
        return false;
      }
      if (catalogSearch.trim()) {
        const query = catalogSearch.toLowerCase();
        const matchesTitle = p.title?.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        const matchesCategory = p.category?.toLowerCase().includes(query);
        const matchesTags = Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [catalogList, catalogDifficultyFilter, catalogCategoryFilter, catalogSearch]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#172D29] p-8 sm:p-10 text-[#F4F0E7] shadow-xl border border-[#24362F]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#C6D58A]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-[#C47759]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C6D58A] text-xs font-semibold backdrop-blur-xs">
            <Code2 className="w-4 h-4 text-[#C6D58A]" />
            <span>Interactive Live Coding Interview Arena</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#C6D58A] text-[#172D29]">
              MONACO & AI
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F0E7] font-display tracking-tight leading-tight">
            Master Algorithmic Technical Rounds with Real-Time AI Interviews
          </h1>

          <p className="text-xs sm:text-sm text-[#DCE5DF] leading-relaxed max-w-2xl font-sans">
            Solve DSA and systems problems in an industry-grade Monaco editor. Run code against public and hidden test cases, receive live guidance from your AI Bar Raiser, and get comprehensive 100-point rubric grading with code optimization diffs.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-[#DCE5DF]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C6D58A]" />
              <span>Isolated Sandboxed Execution</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C6D58A]" />
              <span>Hidden Edge-Case Test Suite</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C6D58A]" />
              <span>Voice-Enabled AI Interviewer</span>
            </span>
          </div>
        </div>
      </div>

      {/* Reset History Feedback Toast */}
      {resetSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold">{resetSuccessMessage}</span>
          </div>
          <button
            onClick={() => setResetSuccessMessage(null)}
            className="text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Exhaustion Notice Alert Card */}
      {codingExhaustionNotice && (
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border-2 border-amber-400 dark:border-amber-600/80 shadow-lg space-y-4 animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/30 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                  Tier Completed
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  You Have Attempted All {codingExhaustionNotice.totalAvailable || 'Available'} Questions in "{codingExhaustionNotice.category}" ({codingExhaustionNotice.difficulty})
                </h3>
              </div>
            </div>

            <button
              onClick={() => setCodingExhaustionNotice(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Dismiss notice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            {codingExhaustionNotice.message} You can reset your practice history to retry this category from scratch, advance to a harder difficulty tier, or browse the entire 50-problem question catalog below.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                handleResetCategory(codingExhaustionNotice.category);
                setCodingExhaustionNotice(null);
                startCodingInterview({
                  language: selectedLanguage,
                  difficulty: codingExhaustionNotice.difficulty as Difficulty,
                  category: codingExhaustionNotice.category as CodingCategory,
                  mode: selectedMode
                });
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Practice Category Again</span>
            </button>

            <button
              onClick={() => {
                const nextDiff: Difficulty =
                  codingExhaustionNotice.difficulty === 'Easy'
                    ? 'Medium'
                    : codingExhaustionNotice.difficulty === 'Medium'
                    ? 'Hard'
                    : 'Hard';
                setSelectedDifficulty(nextDiff);
                setCodingExhaustionNotice(null);
                startCodingInterview({
                  language: selectedLanguage,
                  difficulty: nextDiff,
                  category: codingExhaustionNotice.category as CodingCategory,
                  mode: selectedMode
                });
              }}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Advance to {codingExhaustionNotice.difficulty === 'Easy' ? 'Medium' : 'Hard'} Tier</span>
            </button>

            <a
              href="#coding-catalog"
              onClick={() => setCodingExhaustionNotice(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse All 50 Questions</span>
            </a>
          </div>
        </div>
      )}

      {/* Performance Statistics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
          <div className="flex items-center justify-between text-[#727A73] dark:text-[#B6C0B8] text-xs font-medium mb-1.5 font-sans">
            <span>Coding Attempts</span>
            <Layers className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#172D29] dark:text-[#F4F0E7] font-display tabular-nums">
            {totalAttempts}
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">Recorded sessions</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
          <div className="flex items-center justify-between text-[#727A73] dark:text-[#B6C0B8] text-xs font-medium mb-1.5 font-sans">
            <span>Accepted Solutions</span>
            <Award className="w-4 h-4 text-[#2D5A46] dark:text-[#C6D58A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#2D5A46] dark:text-[#C6D58A] font-display tabular-nums">
            {passedAttempts}
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] font-mono tabular-nums">{passRate}% pass rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
          <div className="flex items-center justify-between text-[#727A73] dark:text-[#B6C0B8] text-xs font-medium mb-1.5 font-sans">
            <span>Average Score</span>
            <TrendingUp className="w-4 h-4 text-[#C47759]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#172D29] dark:text-[#F4F0E7] font-display tabular-nums">
            {avgCodingScore} <span className="text-xs font-normal text-[#727A73] dark:text-[#B6C0B8]">/ 100</span>
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">Rubric composite</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
          <div className="flex items-center justify-between text-[#727A73] dark:text-[#B6C0B8] text-xs font-medium mb-1.5 font-sans">
            <span>Language Support</span>
            <Code2 className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
          </div>
          <div className="text-xl font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
            6 Languages
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">Python · JS · Java · C++ · C · SQL</span>
        </div>
      </div>

      {/* Main Start Interview Configuration Card */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div>
            <h2 className="text-xl font-extrabold text-[#172D29] dark:text-[#F4F0E7] font-display">
              Start New Coding Interview
            </h2>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5 font-sans">
              Select your preferred programming language, difficulty tier, interview category, and interview mode.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] font-semibold border border-[#DFE1D8] dark:border-[#35443D]">
            Candidate: {currentUser.name}
          </span>
        </div>

        {/* 1. Choose Programming Language */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#292F2C] dark:text-[#F4F0E7] flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
            1. Choose Programming Language
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#172D29] bg-[#EBE9DF] text-[#172D29] dark:border-[#C6D58A] dark:bg-[#24362F] dark:text-[#C6D58A] font-bold ring-2 ring-[#172D29]/20 dark:ring-[#C6D58A]/30 shadow-xs'
                      : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60 text-[#292F2C] dark:text-[#DCE5DF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-sans">{lang.label}</span>
                    <span className="text-[10px] font-mono text-[#727A73] dark:text-[#B6C0B8]">{lang.ext}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Select Difficulty */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#292F2C] dark:text-[#F4F0E7] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#C47759]" />
            2. Select Difficulty
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {difficulties.map((diff) => {
              const isSelected = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#172D29] bg-[#EBE9DF] dark:border-[#C6D58A] dark:bg-[#24362F] ring-2 ring-[#172D29]/20 dark:ring-[#C6D58A]/30 shadow-xs'
                      : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-extrabold ${diff.badge}`}>
                      {diff.label}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#172D29] dark:bg-[#C6D58A]"></span>}
                  </div>
                  <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                    {diff.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Select Interview Category */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#292F2C] dark:text-[#F4F0E7] flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
            3. Select Interview Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    isSelected
                      ? 'border-[#172D29] bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] dark:border-[#C6D58A] font-bold shadow-xs'
                      : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60 text-[#292F2C] dark:text-[#DCE5DF]'
                  }`}
                >
                  <span className="line-clamp-1">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Choose Interview Mode */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#292F2C] dark:text-[#F4F0E7] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C47759]" />
            4. Interview Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {interviewModes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;
              return (
                <div
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#172D29] bg-[#EBE9DF] dark:border-[#C6D58A] dark:bg-[#24362F] ring-2 ring-[#172D29]/20 dark:ring-[#C6D58A]/30 shadow-xs'
                      : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
                    <span className="text-xs font-extrabold text-[#172D29] dark:text-[#F4F0E7]">
                      {mode.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
                    {mode.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Code Editor Initial Workspace State */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#292F2C] dark:text-[#F4F0E7] flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#2D5A46] dark:text-[#C6D58A]" />
            5. Code Workspace State (Default Syntax or Empty Slate)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCodeStarterMode('default-syntax')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                codeStarterMode === 'default-syntax'
                  ? 'border-[#172D29] bg-[#EBE9DF] text-[#172D29] dark:border-[#C6D58A] dark:bg-[#24362F] dark:text-[#C6D58A] ring-2 ring-[#172D29]/20 dark:ring-[#C6D58A]/30 shadow-xs'
                  : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
                  Default Language Syntax
                </span>
                {codeStarterMode === 'default-syntax' && <span className="w-2 h-2 rounded-full bg-[#172D29] dark:bg-[#C6D58A]"></span>}
              </div>
              <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                Pre-loads clean, minimal syntax for {selectedLanguage.toUpperCase()} (e.g. main/solve skeleton). No spoilers or test-runner bloat.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setCodeStarterMode('empty')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                codeStarterMode === 'empty'
                  ? 'border-[#C47759] bg-[#C47759]/10 text-[#C47759] dark:text-[#E09074] ring-2 ring-[#C47759]/25 shadow-xs'
                  : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#C47759]" />
                  Empty Slate (100% Blank)
                </span>
                {codeStarterMode === 'empty' && <span className="w-2 h-2 rounded-full bg-[#C47759]"></span>}
              </div>
              <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                Starts with a completely empty editor. Write your entire program or function from scratch.
              </p>
            </button>
          </div>
        </div>

        {/* Launch Button */}
        <div className="pt-4 border-t border-[#DFE1D8] dark:border-[#35443D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
            Selected: <strong className="text-[#172D29] dark:text-[#F4F0E7] capitalize">{selectedLanguage}</strong> ·{' '}
            <strong className="text-[#172D29] dark:text-[#F4F0E7]">{selectedDifficulty}</strong> ·{' '}
            <strong className="text-[#172D29] dark:text-[#F4F0E7]">{selectedCategory}</strong> ·{' '}
            <strong className="text-[#172D29] dark:text-[#F4F0E7]">
              {codeStarterMode === 'empty' ? 'Empty Slate' : 'Default Syntax'}
            </strong>
          </div>

          <button
            onClick={handleStartNewInterview}
            disabled={isGeneratingCodingProblem}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#172D29] hover:bg-[#24362F] text-[#F4F0E7] font-display font-bold text-sm shadow-md shadow-[#172D29]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 cursor-pointer"
          >
            {isGeneratingCodingProblem ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Generating Coding Interview...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-[#C6D58A]" />
                <span>Launch Live Coding Arena</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recommended Coding Challenges */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C47759]" />
            <h3 className="font-extrabold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
              Recommended Coding Challenges
            </h3>
          </div>
          <span className="text-xs text-[#727A73] dark:text-[#B6C0B8] font-sans">
            Curated high-frequency Tier-1 interview questions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {recommendedChallenges.map((rec) => (
            <div
              key={rec.id}
              onClick={() => handleLaunchRecommended(rec.id, rec.difficulty, rec.category)}
              className="p-4 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/40 dark:bg-[#24362F]/40 hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-1 min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] group-hover:text-[#C47759] transition-colors truncate font-sans">
                    {rec.title}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
                      rec.difficulty === 'Easy'
                        ? 'bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]'
                        : rec.difficulty === 'Medium'
                        ? 'bg-[#EBE9DF] text-[#C47759] dark:bg-[#24362F] dark:text-[#E09074]'
                        : 'bg-[#C47759]/15 text-[#C47759] dark:text-[#E87555]'
                    }`}
                  >
                    {rec.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                  <span>{rec.category}</span>
                  <span>·</span>
                  <span>{rec.company}</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">{rec.timeEst}</span>
                </div>
              </div>

              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] group-hover:text-[#172D29] dark:group-hover:text-[#C6D58A] group-hover:border-[#172D29] transition-all shrink-0">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Coding Attempts */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div>
            <h3 className="font-extrabold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
              Previous Coding Attempts
            </h3>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5 font-sans">
              Review code, execution benchmarks, and AI code optimization feedback
            </p>
          </div>
          <span className="text-xs font-mono text-[#727A73] dark:text-[#B6C0B8]">
            {codingHistory.length} total attempts
          </span>
        </div>

        {codingHistory.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A]">
              <FileCode className="w-8 h-8" />
            </div>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] max-w-sm mx-auto font-sans">
              You haven't completed any coding interviews yet. Launch your first live session above to build your engineering portfolio!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {codingHistory.slice(0, 5).map((attempt) => {
              const isAccepted = attempt.executionResult.status === 'accepted';
              return (
                <div
                  key={attempt.id}
                  onClick={() => viewCodingResult(attempt)}
                  className="p-4 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/40 dark:bg-[#24362F]/30 hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold font-mono text-sm shrink-0 shadow-xs ${
                        isAccepted
                          ? 'bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#172D29]/20 dark:border-[#C6D58A]/30'
                          : 'bg-[#C47759]/15 text-[#C47759] dark:text-[#E09074] border border-[#C47759]/30'
                      }`}
                    >
                      {attempt.overallScore}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] group-hover:text-[#C47759] transition-colors font-sans">
                          {attempt.problem.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#DCE5DF]">
                          {attempt.language}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                            attempt.problem.difficulty === 'Easy'
                              ? 'bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]'
                              : attempt.problem.difficulty === 'Medium'
                              ? 'bg-[#EBE9DF] text-[#C47759] dark:bg-[#24362F] dark:text-[#E09074]'
                              : 'bg-[#C47759]/15 text-[#C47759] dark:text-[#E87555]'
                          }`}
                        >
                          {attempt.problem.difficulty}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] flex items-center gap-2 mt-0.5">
                        <span>Mode: {attempt.mode}</span>
                        <span>·</span>
                        <span>{attempt.testCasesPassedRate} test cases passed</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">{attempt.averageExecutionTimeMs}ms</span>
                        <span>·</span>
                        <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#172D29] dark:text-[#C6D58A] self-end sm:self-center">
                    <span>View Assessment & Diff</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 50-Problem Curated Question Catalog Browser */}
      <div id="coding-catalog" className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-[#172D29] dark:text-[#C6D58A]" />
              <h3 className="font-extrabold text-lg text-[#172D29] dark:text-[#F4F0E7] font-display">
                Coding Question Catalog ({catalogList.length || 50} Verified Problems)
              </h3>
            </div>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] font-sans">
              Browse, filter by algorithm topic, and launch any problem directly into your live arena.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleResetCategory()}
              className="px-3.5 py-2 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] hover:bg-[#EBE9DF] text-[#172D29] dark:text-[#F4F0E7] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer font-sans"
              title="Reset seen questions to allow non-repeating picker to choose them again"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#727A73]" />
              <span>Reset Practice History</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#727A73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Search by title, algorithm topic, or tag (e.g. hashmap, dp, tree, binary search)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/60 text-xs text-[#292F2C] dark:text-[#F4F0E7] focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden font-sans"
              />
              {catalogSearch && (
                <button
                  onClick={() => setCatalogSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Difficulty Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => {
                const isSelected = catalogDifficultyFilter === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setCatalogDifficultyFilter(diff)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer font-sans ${
                      isSelected
                        ? diff === 'Easy'
                          ? 'bg-[#172D29] text-[#C6D58A] shadow-xs'
                          : diff === 'Medium'
                          ? 'bg-[#172D29] text-[#F4F0E7] shadow-xs'
                          : diff === 'Hard'
                          ? 'bg-[#C47759] text-[#F4F0E7] shadow-xs'
                          : 'bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] shadow-xs'
                        : 'bg-[#EBE9DF] dark:bg-[#24362F] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#DCE5DF] dark:hover:bg-[#35443D]'
                    }`}
                  >
                    {diff === 'all' ? 'All Difficulties' : diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setCatalogCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer font-sans ${
                catalogCategoryFilter === 'all'
                  ? 'bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold'
                  : 'bg-[#EBE9DF] dark:bg-[#24362F] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#DCE5DF]'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => {
              const isSelected = catalogCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCatalogCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer font-sans ${
                    isSelected
                      ? 'bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold'
                      : 'bg-[#EBE9DF] dark:bg-[#24362F] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#DCE5DF]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results count & status summary */}
          <div className="flex items-center justify-between text-xs text-[#727A73] dark:text-[#B6C0B8] pt-1 font-sans">
            <span>
              Showing <strong className="text-[#172D29] dark:text-[#F4F0E7]">{filteredCatalog.length}</strong> of{' '}
              {catalogList.length || 50} problems
            </span>
            {(catalogSearch || catalogDifficultyFilter !== 'all' || catalogCategoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setCatalogSearch('');
                  setCatalogDifficultyFilter('all');
                  setCatalogCategoryFilter('all');
                }}
                className="text-[#C47759] hover:underline font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Catalog Problems Grid */}
        {isLoadingCatalog && catalogList.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#727A73]">
            <div className="inline-block w-5 h-5 border-2 border-[#172D29] dark:border-[#C6D58A] border-t-transparent rounded-full animate-spin mb-2"></div>
            <p>Loading problem bank...</p>
          </div>
        ) : filteredCatalog.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7]">
              No matching problems found
            </p>
            <p className="text-xs text-[#727A73] max-w-sm mx-auto">
              Try adjusting your search keywords or clearing the category and difficulty filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredCatalog.map((problem) => {
              const attempt = codingHistory.find((h) => h.problem.id === problem.id);
              const isAccepted = attempt?.executionResult.status === 'accepted';
              const isAttempted = !!attempt;

              return (
                <div
                  key={problem.id}
                  className="p-4 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/30 dark:bg-[#24362F]/30 hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-extrabold text-[#172D29] dark:text-[#F4F0E7] group-hover:text-[#C47759] transition-colors font-sans">
                            {problem.title}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              problem.difficulty === 'Easy'
                                ? 'bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]'
                                : problem.difficulty === 'Medium'
                                ? 'bg-[#EBE9DF] text-[#C47759] dark:bg-[#24362F] dark:text-[#E09074]'
                                : 'bg-[#C47759]/15 text-[#C47759] dark:text-[#E87555]'
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] block font-medium">
                          {problem.category}
                        </span>
                      </div>

                      {/* Solved Status Indicator */}
                      {isAccepted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#172D29]/20 dark:border-[#C6D58A]/30 shrink-0">
                          <Check className="w-3 h-3 text-[#2D5A46] dark:text-[#C6D58A]" />
                          <span>Solved</span>
                        </span>
                      ) : isAttempted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#EBE9DF] text-[#C47759] dark:bg-[#24362F] dark:text-[#E09074] border border-[#C47759]/30 shrink-0">
                          <Clock className="w-3 h-3 text-[#C47759]" />
                          <span>Attempted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBE9DF] text-[#727A73] dark:bg-[#24362F] dark:text-[#B6C0B8] shrink-0">
                          <span>New</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#292F2C] dark:text-[#DCE5DF] line-clamp-2 leading-relaxed font-sans">
                      {problem.description}
                    </p>

                    {/* Complexity badges */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#727A73] dark:text-[#B6C0B8]">
                      <span className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D]">
                        ⏱ {problem.expectedTimeComplexity || 'O(n)'}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D]">
                        📦 {problem.expectedSpaceComplexity || 'O(1)'}
                      </span>
                    </div>

                    {/* Tags */}
                    {Array.isArray(problem.tags) && problem.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {problem.tags.slice(0, 3).map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium text-[#727A73] dark:text-[#B6C0B8] bg-[#EBE9DF] dark:bg-[#24362F] px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#727A73] dark:text-[#B6C0B8]">
                      ID: {problem.id}
                    </span>

                    <button
                      onClick={() => handleLaunchRecommended(problem.id, problem.difficulty, problem.category)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] hover:bg-[#172D29] hover:text-[#F4F0E7] dark:hover:bg-[#C6D58A] dark:hover:text-[#172D29] text-[#172D29] dark:text-[#F4F0E7] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs group-hover:bg-[#172D29] group-hover:text-[#F4F0E7] dark:group-hover:bg-[#C6D58A] dark:group-hover:text-[#172D29]"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Solve Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
