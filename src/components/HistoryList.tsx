import React, { useState } from 'react';
import {
  History,
  TrendingUp,
  Trash2,
  Calendar,
  ExternalLink,
  Sparkles,
  Layers,
  Award,
  Filter,
  CheckCircle2,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InterviewSession } from '../types';

export const HistoryList: React.FC = () => {
  const { userSessions, deleteSession, clearAllSessions, viewPastSession, setCurrentTab, currentUser } = useApp();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const filteredSessions = userSessions.filter(s => {
    if (filterDifficulty === 'All') return true;
    return s.difficulty === filterDifficulty;
  });

  // Calculate score trend metrics
  const scores = userSessions.map(s => s.overallScore).filter(Boolean);
  const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '0.0';
  const highestScore = scores.length > 0 ? Math.max(...scores).toFixed(1) : '0.0';

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
              Interview History & Progress Tracking
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#DFE1D8] dark:border-[#35443D]">
              {currentUser.name}
            </span>
          </div>
          <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1">
            Review past mock interviews, track performance gains over time, and manage session records.
          </p>
        </div>

        {userSessions.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all past sessions? This cannot be undone.')) {
                clearAllSessions();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#C47759] border border-[#C47759]/30 hover:bg-[#C47759]/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {/* Progress Tracking Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
          <div className="flex items-center justify-between text-[#727A73] dark:text-[#B6C0B8] text-xs font-medium mb-2">
            <span>Total Sessions Completed</span>
            <Layers className="w-4 h-4 text-[#C47759]" />
          </div>
          <div className="text-2xl font-bold font-display text-[#172D29] dark:text-[#F4F0E7]">
            {userSessions.length}
          </div>
          <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] mt-1">
            Targeting {currentUser.targetRole}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
          <div className="flex items-center justify-between text-[#727A73] dark:text-[#B6C0B8] text-xs font-medium mb-2">
            <span>Average Score Across Sessions</span>
            <TrendingUp className="w-4 h-4 text-[#C6D58A]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#172D29] dark:text-[#F4F0E7]">
            {avgScore} <span className="text-xs font-normal opacity-70">/ 10</span>
          </div>
          <p className="text-[11px] text-[#172D29] dark:text-[#C6D58A] mt-1 font-medium">
            Baseline across all difficulty tiers
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs">
          <div className="flex items-center justify-between text-[#727A73] dark:text-[#B6C0B8] text-xs font-medium mb-2">
            <span>Highest Score Achieved</span>
            <Award className="w-4 h-4 text-[#C47759]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#172D29] dark:text-[#F4F0E7]">
            {highestScore} <span className="text-xs font-normal opacity-70">/ 10</span>
          </div>
          <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] mt-1">
            Personal best bar raiser benchmark
          </p>
        </div>
      </div>

      {/* Visual Score Progression Trend */}
      {userSessions.length > 1 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C47759]" />
              Score Progression Trend
            </h4>
            <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
              Recent → Oldest
            </span>
          </div>

          <div className="h-32 flex items-end gap-3 pt-4 px-2">
            {userSessions.slice(0, 10).map((session, idx) => {
              const heightPct = Math.max((session.overallScore / 10) * 100, 15);
              return (
                <div key={session.id} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono font-bold text-[#172D29] dark:text-[#F4F0E7] opacity-0 group-hover:opacity-100 transition-opacity">
                    {session.overallScore}
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-lg transition-all ${
                      session.overallScore >= 8
                        ? 'bg-[#C6D58A] group-hover:opacity-90'
                        : session.overallScore >= 6
                        ? 'bg-[#172D29] dark:bg-[#233F3A] group-hover:opacity-90'
                        : 'bg-[#C47759] group-hover:opacity-90'
                    }`}
                  ></div>
                  <span className="text-[9px] text-[#727A73] truncate max-w-full font-mono">
                    #{userSessions.length - idx}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter and Session List */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#727A73]" />
            <span className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7]">
              Filter by Difficulty:
            </span>
            <div className="flex gap-1.5">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`text-xs px-3 py-1 rounded-lg transition-all ${
                    filterDifficulty === diff
                      ? 'bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold shadow-xs'
                      : 'bg-[#F4F0E7] dark:bg-[#24362F] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#EBE9DF]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
            Showing {filteredSessions.length} of {userSessions.length} recorded sessions
          </span>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A]">
              <History className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                No Interview Sessions Found
              </h4>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] max-w-sm mx-auto mt-1">
                You haven't completed any mock interviews under this filter yet. Practice your first session to build your portfolio!
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('setup')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] text-xs font-bold shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start New Interview</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 sm:p-5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/40 dark:bg-[#24362F]/30 hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-mono font-bold text-lg shadow-xs shrink-0">
                    {session.overallScore}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                        {session.targetRole}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        session.difficulty === 'Hard' ? 'bg-[#C47759]/10 text-[#C47759] border-[#C47759]/30' :
                        session.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30' :
                        'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border-[#C6D58A]/40'
                      }`}>
                        {session.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                      {session.questions.length} questions · Completed on {new Date(session.completedAt).toLocaleDateString()} at {new Date(session.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => viewPastSession(session)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#C47759]" />
                    <span>Review Q&A</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete this interview session record?')) {
                        deleteSession(session.id);
                      }
                    }}
                    className="p-2 rounded-xl text-[#727A73] hover:text-[#C47759] hover:bg-[#C47759]/10 transition-colors"
                    title="Delete session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

