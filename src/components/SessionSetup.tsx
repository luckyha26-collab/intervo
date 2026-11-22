import React, { useState } from 'react';
import {
  Sliders,
  Play,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Difficulty, CategoryFocus } from '../types';
import { INTERVIEWER_PERSONAS } from '../utils/speechEngine';
import { ResumeUpload } from './ResumeUpload';

export const SessionSetup: React.FC = () => {
  const { currentResume, startSession, isGeneratingQuestions, evaluationError } = useApp();

  const [targetRole, setTargetRole] = useState(currentResume.roleTarget || 'Frontend Developer');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [categoryFocus, setCategoryFocus] = useState<CategoryFocus>('All-Round');
  const [timerPerQuestion, setTimerPerQuestion] = useState<number>(90);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('sarah');

  const popularRoles = [
    'Frontend Developer',
    'Full Stack Engineer',
    'Backend Engineer',
    'Machine Learning Engineer',
    'DevOps / SRE',
    'Product Manager'
  ];

  const handleStart = async () => {
    await startSession({
      targetRole,
      difficulty,
      categoryFocus,
      questionCount,
      timerPerQuestion,
      personaId: selectedPersonaId
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in">
      {/* Top Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] text-xs font-bold border border-[#DFE1D8] dark:border-[#35443D] font-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#C47759]" />
          INTERVO AI Mock Interview Coach Pro
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172D29] dark:text-[#F4F0E7] font-display">
          Configure Your Tailored Mock Interview
        </h2>
        <p className="text-xs sm:text-sm text-[#727A73] dark:text-[#B6C0B8] font-sans">
          AI inspects your resume projects and tech stack to ask targeted, role-specific questions with real-time audio and instant scoring.
        </p>
      </div>

      {/* Step 1: Resume Upload & Extraction */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#172D29] text-[#F4F0E7] font-extrabold text-xs">
            1
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
              Resume Analysis & Skill Context
            </h3>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] font-sans">
              Upload your resume or pick a curated sample profile below
            </p>
          </div>
        </div>

        <ResumeUpload />
      </div>

      {/* Step 2: Session Parameters */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#2D5A46] dark:bg-[#C6D58A] text-[#F4F0E7] dark:text-[#172D29] font-extrabold text-xs">
            2
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
              Session Settings & Difficulty Level
            </h3>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] font-sans">
              Customize the interview scope, time constraints, and interviewer persona
            </p>
          </div>
        </div>

        {/* Target Job Role */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-2 font-sans">
            <Briefcase className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
            Target Job Role (Tailors Question Domain)
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] text-sm font-semibold focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden font-sans"
            placeholder="e.g. Senior Frontend Engineer, SRE, ML Engineer..."
          />
          <div className="flex flex-wrap gap-2 pt-1">
            {popularRoles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setTargetRole(role)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all font-sans cursor-pointer ${
                  targetRole === role
                    ? 'border-[#172D29] bg-[#EBE9DF] text-[#172D29] dark:border-[#C6D58A] dark:bg-[#24362F] dark:text-[#C6D58A] font-bold'
                    : 'border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Level & Question Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Difficulty Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-2 font-sans">
              <Sliders className="w-4 h-4 text-[#C47759]" />
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { level: 'Easy', label: 'Easy', desc: 'Fresher / Fundamentals', color: 'border-[#172D29] text-[#172D29] bg-[#DCE5DF]' },
                { level: 'Medium', label: 'Medium', desc: 'Mid-level / Trade-offs', color: 'border-[#C47759] text-[#C47759] bg-[#EBE9DF]' },
                { level: 'Hard', label: 'Hard', desc: 'Senior / Edge cases', color: 'border-[#C47759] text-[#C47759] bg-[#C47759]/15' },
              ].map((item) => {
                const isSelected = difficulty === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setDifficulty(item.level as Difficulty)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? `ring-2 ring-[#172D29] dark:ring-[#C6D58A] ${item.color} font-bold shadow-xs`
                        : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60 text-[#727A73] dark:text-[#B6C0B8]'
                    }`}
                  >
                    <div className="text-sm font-bold font-sans">{item.label}</div>
                    <div className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] mt-0.5 leading-tight">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-2 font-sans">
              <Layers className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
              Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { count: 3, label: '3 Questions', desc: 'Quick Sprint (~8 min)' },
                { count: 5, label: '5 Questions', desc: 'Standard Round (~15 min)' },
                { count: 8, label: '8 Questions', desc: 'Full Deep Dive (~25 min)' }
              ].map((item) => {
                const isSelected = questionCount === item.count;
                return (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setQuestionCount(item.count)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#172D29] bg-[#EBE9DF] text-[#172D29] dark:border-[#C6D58A] dark:bg-[#24362F] dark:text-[#C6D58A] font-bold ring-2 ring-[#172D29]/20 dark:ring-[#C6D58A]/30 shadow-xs'
                        : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60 text-[#727A73] dark:text-[#B6C0B8]'
                    }`}
                  >
                    <div className="text-sm font-bold font-sans">{item.label}</div>
                    <div className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] mt-0.5">{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Category Focus & Per-Question Timer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Category Focus */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] font-sans">
              Evaluation Category Focus
            </label>
            <select
              value={categoryFocus}
              onChange={(e) => setCategoryFocus(e.target.value as CategoryFocus)}
              className="w-full px-4 py-3 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] text-sm font-semibold focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] font-sans"
            >
              <option value="All-Round">All-Round (Balanced Technical & Behavioral)</option>
              <option value="Technical Architecture">Technical Architecture & Stack Mastery</option>
              <option value="Behavioral (STAR)">Behavioral Leadership (STAR Method)</option>
              <option value="System Design">System Design & Scalability</option>
              <option value="Problem Solving">Problem Solving & Debugging</option>
            </select>
          </div>

          {/* Per-Question Timer */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-2 font-sans">
              <Clock className="w-4 h-4 text-[#C47759]" />
              Per-Question Countdown Timer
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { sec: 60, label: '60s' },
                { sec: 90, label: '90s' },
                { sec: 120, label: '120s' },
                { sec: 0, label: 'Untimed' }
              ].map((item) => {
                const isSelected = timerPerQuestion === item.sec;
                return (
                  <button
                    key={item.sec}
                    type="button"
                    onClick={() => setTimerPerQuestion(item.sec)}
                    className={`py-2.5 px-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer font-sans ${
                      isSelected
                        ? 'border-[#172D29] bg-[#EBE9DF] text-[#172D29] dark:border-[#C6D58A] dark:bg-[#24362F] dark:text-[#C6D58A] ring-2 ring-[#172D29]/20 dark:ring-[#C6D58A]/30 shadow-xs'
                        : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60 text-[#727A73] dark:text-[#B6C0B8]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Interviewer Persona Selection */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] font-sans">
            Select Interviewer Persona & Voice
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INTERVIEWER_PERSONAS.map((persona) => {
              const isSelected = selectedPersonaId === persona.id;
              return (
                <div
                  key={persona.id}
                  onClick={() => setSelectedPersonaId(persona.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#172D29] bg-[#EBE9DF] dark:border-[#C6D58A] dark:bg-[#24362F] ring-2 ring-[#172D29]/20 dark:ring-[#C6D58A]/30'
                      : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/60'
                  }`}
                >
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-[#DFE1D8] dark:border-[#35443D] shadow-xs"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] truncate font-sans">
                      {persona.name}
                    </p>
                    <p className="text-[11px] text-[#C47759] font-semibold truncate font-sans">
                      {persona.title}
                    </p>
                    <p className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate font-sans">
                      {persona.company}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error notification */}
        {evaluationError && (
          <div className="p-4 rounded-2xl bg-[#C47759]/10 border border-[#C47759]/30 text-[#C47759] dark:text-[#E09074] text-xs flex items-center gap-2 font-sans">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{evaluationError}</span>
          </div>
        )}

        {/* Start Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DFE1D8] dark:border-[#35443D]">
          <div className="text-xs text-[#727A73] dark:text-[#B6C0B8] text-center sm:text-left font-sans">
            <span>Ready to generate <strong>{questionCount} tailored questions</strong> using Gemini AI</span>
          </div>

          <button
            onClick={handleStart}
            disabled={isGeneratingQuestions}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#172D29] hover:bg-[#24362F] text-[#F4F0E7] font-extrabold text-sm shadow-md shadow-[#172D29]/20 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 cursor-pointer font-sans"
          >
            {isGeneratingQuestions ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-[#C6D58A]" />
                <span>Reading Resume & Architecting Questions...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current text-[#C6D58A]" />
                <span>Start Mock Interview Session</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
