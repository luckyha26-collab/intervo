import React, { useState } from 'react';
import {
  Play,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  ShieldCheck,
  Users,
  Layers,
  ArrowRight,
  Code2,
  CheckCircle2,
  Mic,
  Calendar,
  Brain,
  Radio,
  Target,
  Zap,
  ChevronRight,
  FileText,
  Activity,
  Check,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Difficulty, CodingCategory } from '../types';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const {
    currentUser,
    currentResume,
    userSessions,
    codingHistory,
    setCurrentTab,
    predictiveAnalytics,
    weaknessTopics,
    practiceWeakness,
    viewPastSession,
    viewCodingResult,
    startCodingInterview
  } = useApp();

  const { hiringProbability, avgScore } = predictiveAnalytics;
  const criticalWeaknesses = weaknessTopics.filter((w) => w.severity === 'Critical');

  // Coding stats
  const totalCodingAttempts = codingHistory.length;
  const acceptedCoding = codingHistory.filter((h) => h.executionResult.status === 'accepted').length;
  const codingPassRate = totalCodingAttempts > 0 ? Math.round((acceptedCoding / totalCodingAttempts) * 100) : 0;

  // Recent activity tab toggle (Coding Attempts vs Mock Q&A Sessions)
  const [activityTab, setActivityTab] = useState<'coding' | 'mock'>('coding');

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* 1. Personalized Welcome Header (The Editorial Forest) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DFE1D8] dark:border-[#35443D]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C6D58A] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#727A73] dark:text-[#B6C0B8]">
              Target Role: <strong className="text-[#172D29] dark:text-[#F4F0E7]">{currentUser.targetRole}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#172D29] dark:text-[#F4F0E7] tracking-tight font-display">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>

          <p className="text-xs sm:text-sm text-[#727A73] dark:text-[#B6C0B8] max-w-2xl leading-relaxed">
            Your technical readiness is currently tracking at{' '}
            <strong className="text-[#172D29] dark:text-[#C6D58A] font-bold">{hiringProbability}%</strong> for tier-1 engineering hiring bars. Complete recommended coding rounds and system design drills to stay sharp.
          </p>
        </div>

        {/* Quick Launch Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setCurrentTab('coding-arena')}
            className="px-4 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#223F3A] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] text-[#F4F0E7] font-bold text-xs shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Launch Coding Arena</span>
          </button>

          <button
            onClick={() => setCurrentTab('setup')}
            className="px-4 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] text-[#292F2C] dark:text-[#F4F0E7] font-semibold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#C47759] fill-current" />
            <span>Start Mock Q&A</span>
          </button>

          <button
            onClick={() => setCurrentTab('gd-room')}
            className="px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] text-[#292F2C] dark:text-[#F4F0E7] font-semibold text-xs transition-all cursor-pointer"
            title="Join live Group Discussion room"
          >
            <Radio className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
            <span>GD Arena</span>
          </button>
        </div>
      </div>

      {/* 2. Key Performance Indicators (The Editorial Forest KPI cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Readiness Index */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.16 } }}
          className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#727A73] dark:text-[#B6C0B8]">
            <span>Interview Readiness</span>
            <Target className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#172D29] dark:text-[#F4F0E7] font-mono tabular-nums font-display">
              {hiringProbability}%
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                style={{ width: `${hiringProbability}%` }}
                className="bg-[#172D29] dark:bg-[#C6D58A] h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">Tier-1 Benchmark Model</span>
        </motion.div>

        {/* Metric 2: Coding Pass Rate */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.16 } }}
          className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#727A73] dark:text-[#B6C0B8]">
            <span>Coding Pass Rate</span>
            <Code2 className="w-4 h-4 text-[#C6D58A]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#172D29] dark:text-[#C6D58A] font-mono tabular-nums font-display">
              {codingPassRate}%
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                style={{ width: `${codingPassRate}%` }}
                className="bg-[#C6D58A] h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
            {acceptedCoding} of {totalCodingAttempts} challenges passed
          </span>
        </motion.div>

        {/* Metric 3: Average Rubric Score */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.16 } }}
          className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#727A73] dark:text-[#B6C0B8]">
            <span>Average Rubric Score</span>
            <Award className="w-4 h-4 text-[#C47759]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#172D29] dark:text-[#F4F0E7] font-mono tabular-nums font-display">
              {avgScore} <span className="text-sm font-normal text-[#727A73] dark:text-[#B6C0B8]">/ 10</span>
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                style={{ width: `${(avgScore / 10) * 100}%` }}
                className="bg-[#C47759] h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
            Across {userSessions.length} recorded interview sessions
          </span>
        </motion.div>

        {/* Metric 4: Weakness Gaps Flagged */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.16 } }}
          className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-[#727A73] dark:text-[#B6C0B8]">
            <span>Diagnosed Gaps</span>
            <Brain className="w-4 h-4 text-[#C47759]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#C47759] dark:text-[#D18A6D] font-mono tabular-nums font-display">
              {criticalWeaknesses.length}
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                style={{ width: `${Math.min(criticalWeaknesses.length * 25, 100)}%` }}
                className="bg-[#C47759] h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
            {weaknessTopics.length} total technical topics tracked
          </span>
        </motion.div>
      </div>

      {/* 3. Core Modules Workspace Grid (Quick Access to 4 Pillars) */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8]">
          Career Preparation Workspaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Live Coding Arena */}
          <div
            onClick={() => setCurrentTab('coding-arena')}
            className="p-5 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all cursor-pointer group shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#C47759] font-mono">
                  50 PROBLEMS
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] group-hover:text-[#C47759] transition-colors font-display">
                  Live Coding Arena
                </h3>
                <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1 leading-relaxed">
                  Monaco code editor with isolated backend sandbox. Multi-language test case verification & AI Bar Raiser follow-ups.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DFE1D8]/60 dark:border-[#35443D] flex items-center justify-between text-xs font-semibold text-[#172D29] dark:text-[#C6D58A]">
              <span>Enter Arena</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: AI Mock Technical Interview */}
          <div
            onClick={() => setCurrentTab('setup')}
            className="p-5 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all cursor-pointer group shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#C47759] flex items-center justify-center">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-[#C47759] font-mono">
                  STAR METHOD
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] group-hover:text-[#C47759] transition-colors font-display">
                  AI Technical Interview
                </h3>
                <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1 leading-relaxed">
                  Voice-enabled simulated technical rounds tailored to your resume, architectural decisions, and role expectations.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DFE1D8]/60 dark:border-[#35443D] flex items-center justify-between text-xs font-semibold text-[#172D29] dark:text-[#C6D58A]">
              <span>Start Mock Round</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Group Discussion Arena */}
          <div
            onClick={() => setCurrentTab('gd-room')}
            className="p-5 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all cursor-pointer group shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#C47759] font-mono">
                  MULTI-USER
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] group-hover:text-[#C47759] transition-colors font-display">
                  Group Discussion Arena
                </h3>
                <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1 leading-relaxed">
                  Join real-time multi-candidate roundtable discussions. Experience structured speaking turns and automated moderator scoring.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DFE1D8]/60 dark:border-[#35443D] flex items-center justify-between text-xs font-semibold text-[#172D29] dark:text-[#C6D58A]">
              <span>Join Roundtable</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Weakness Detector */}
          <div
            onClick={() => setCurrentTab('weaknesses')}
            className="p-5 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all cursor-pointer group shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F7EDE8] dark:bg-[#24362F] text-[#C47759] flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#C47759] font-mono">
                  GAP DIAGNOSIS
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] group-hover:text-[#C47759] transition-colors font-display">
                  Weakness Detector
                </h3>
                <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1 leading-relaxed">
                  Analyzes your past answers and flags conceptual vulnerabilities in cache invalidation, indexing, and metrics.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DFE1D8]/60 dark:border-[#35443D] flex items-center justify-between text-xs font-semibold text-[#172D29] dark:text-[#C6D58A]">
              <span>Review Gaps ({criticalWeaknesses.length})</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Split Grid: Recent Practice Sessions & Priority Weakness Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Recent Practice Activity (Coding + Mock Q&A) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
            <div>
              <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
                Recent Practice Activity
              </h3>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                Review submitted code, test results, and AI interviewer evaluations
              </p>
            </div>

            {/* Sub-tab toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#EBE9DF] dark:bg-[#24362F] rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActivityTab('coding')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activityTab === 'coding'
                    ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                    : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29]'
                }`}
              >
                Coding ({codingHistory.length})
              </button>
              <button
                onClick={() => setActivityTab('mock')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activityTab === 'mock'
                    ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                    : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29]'
                }`}
              >
                Mock Q&A ({userSessions.length})
              </button>
            </div>
          </div>

          {/* Activity Tab 1: Coding Attempts */}
          {activityTab === 'coding' && (
            <div className="space-y-3">
              {codingHistory.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] flex items-center justify-center mx-auto">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-[#727A73] max-w-sm mx-auto">
                    No coding challenges submitted yet. Launch your first live session from the Coding Arena to start building your portfolio!
                  </p>
                  <button
                    onClick={() => setCurrentTab('coding-arena')}
                    className="px-4 py-2 rounded-xl bg-[#172D29] hover:bg-[#223F3A] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs shadow-xs cursor-pointer"
                  >
                    Explore Coding Challenges
                  </button>
                </div>
              ) : (
                codingHistory.slice(0, 4).map((attempt) => {
                  const isAccepted = attempt.executionResult.status === 'accepted';
                  return (
                    <div
                      key={attempt.id}
                      onClick={() => viewCodingResult(attempt)}
                      className="p-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/30 hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                            isAccepted
                              ? 'bg-[#F3F7E5] text-[#4F5E24] dark:bg-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]'
                              : 'bg-[#F7EDE8] text-[#C47759] dark:bg-[#24362F] dark:text-[#D18A6D] border border-[#C47759]/40'
                          }`}
                        >
                          {attempt.overallScore}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] truncate group-hover:text-[#C47759] transition-colors font-display">
                              {attempt.problem.title}
                            </h4>
                            <span className="text-[10px] font-mono text-[#727A73]">
                              {attempt.language}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                            {attempt.testCasesPassedRate} test cases passed · {attempt.averageExecutionTimeMs}ms · {new Date(attempt.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-[#172D29] dark:text-[#C6D58A] shrink-0 group-hover:translate-x-0.5 transition-transform">
                        Review →
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Activity Tab 2: Mock Q&A Sessions */}
          {activityTab === 'mock' && (
            <div className="space-y-3">
              {userSessions.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#C47759] flex items-center justify-center mx-auto">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-xs text-[#727A73] max-w-sm mx-auto">
                    No verbal mock interview rounds recorded yet. Start a simulated STAR interview to test your responses.
                  </p>
                  <button
                    onClick={() => setCurrentTab('setup')}
                    className="px-4 py-2 rounded-xl bg-[#172D29] hover:bg-[#223F3A] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs shadow-xs cursor-pointer"
                  >
                    Start Technical Q&A Round
                  </button>
                </div>
              ) : (
                userSessions.slice(0, 4).map((sess) => (
                  <div
                    key={sess.id}
                    onClick={() => viewPastSession(sess)}
                    className="p-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/30 hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                        {sess.overallScore}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] truncate group-hover:text-[#C47759] transition-colors font-display">
                          {sess.targetRole} {sess.wasStoppedEarly && <span className="text-[10px] text-[#C47759] font-normal">(Partial)</span>}
                        </h4>
                        <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                          {sess.difficulty} · {sess.questions.length} questions · {new Date(sess.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-[#172D29] dark:text-[#C6D58A] shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Scorecard →
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Priority Weakness Watchlist */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
            <div>
              <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-2 font-display">
                <Brain className="w-4 h-4 text-[#C47759]" />
                <span>Weakness Watchlist</span>
              </h3>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                Targeted technical gaps detected across your sessions
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('weaknesses')}
              className="text-xs font-semibold text-[#C47759] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {weaknessTopics.slice(0, 3).map((weakness) => (
              <div
                key={weakness.id}
                className="p-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/30 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] line-clamp-1 font-display">
                    {weakness.topic}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
                      weakness.severity === 'Critical'
                        ? 'bg-[#F7EDE8] text-[#C47759] border border-[#C47759]/40'
                        : 'bg-[#DCE5DF] text-[#172D29] border border-[#DFE1D8]'
                    }`}
                  >
                    {weakness.severity}
                  </span>
                </div>

                <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] line-clamp-2 leading-relaxed">
                  {weakness.diagnosis}
                </p>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#727A73]">
                    Progress: {weakness.recoveryProgress}%
                  </span>
                  <button
                    onClick={() => practiceWeakness(weakness.id)}
                    className="font-bold text-[#C47759] hover:text-[#AF6648] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Practice Drill</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Active Resume Intelligence & Target Competencies Strip */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                Active Resume: {currentResume.name}
              </h4>
              <span className="text-[11px] text-[#727A73]">
                · ~{currentResume.experienceYears} Years Exp
              </span>
            </div>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
              Top Project: {currentResume.projects[0] || 'Full-stack architectural engineering'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {currentResume.skills.slice(0, 6).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs rounded-lg bg-[#EBE9DF] dark:bg-[#24362F] text-[#292F2C] dark:text-[#F4F0E7] font-medium border border-[#DFE1D8] dark:border-[#35443D]"
            >
              {skill}
            </span>
          ))}
          <button
            onClick={() => setCurrentTab('setup')}
            className="text-xs font-bold text-[#C47759] hover:underline px-2"
          >
            Update Resume →
          </button>
        </div>
      </div>

    </div>
  );
};
