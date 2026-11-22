import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  Download,
  FileText,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Cpu,
  Clock,
  Code2,
  AlertTriangle,
  Lightbulb,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  BookOpen,
  HelpCircle,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MonacoCodeEditor } from './MonacoCodeEditor';

export const CodingResultSummary: React.FC = () => {
  const { activeCodingResult, setCurrentTab, startCodingInterview, codingHistory } = useApp();
  const [activeCodeTab, setActiveCodeTab] = useState<'correct' | 'submitted' | 'diff'>('correct');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (activeCodingResult && activeCodingResult.overallScore >= 70 && !activeCodingResult.userGaveUp) {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  }, [activeCodingResult]);

  if (!activeCodingResult) return null;

  const {
    problem,
    language,
    mode,
    submittedCode,
    executionResult,
    overallScore,
    functionalCorrectnessScore,
    codeQualityScore,
    problemSolvingScore,
    optimizationScore,
    algorithmKnowledgeScore,
    testCasesPassedRate,
    averageExecutionTimeMs,
    categoryScores,
    optimizationSuggestions,
    strongTopics,
    weakTopics,
    repeatedMistakes,
    recommendedProblems,
    personalizedSuggestions,
    completedAt,
    correctSolutionCode,
    mistakesAnalysis,
    whyCodeFailed,
    userGaveUp
  } = activeCodingResult;

  const isSolved = overallScore >= 70 && !userGaveUp && executionResult.status === 'accepted';
  const effectiveCorrectCode =
    correctSolutionCode ||
    optimizationSuggestions.improvedSolutionCode ||
    problem.solutionCode?.[language] ||
    '';

  const getVerdict = (s: number, gaveUp?: boolean) => {
    if (gaveUp) return { text: 'Solution Revealed (Did Not Solve)', badge: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300' };
    if (s >= 85) return { text: 'Staff / Strong Hire Standard', badge: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300' };
    if (s >= 70) return { text: 'Competitive Pass (Senior Bar)', badge: 'bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-300' };
    if (s >= 50) return { text: 'Partial / Needs Debugging', badge: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300' };
    return { text: 'Unsolved / Multiple Mistakes', badge: 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300' };
  };

  const verdict = getVerdict(overallScore, userGaveUp);

  const handleExportJSON = () => {
    const reportData = {
      app: 'INTERVO - Live Coding Arena',
      id: activeCodingResult.id,
      problem: problem.title,
      category: problem.category,
      difficulty: problem.difficulty,
      language,
      mode,
      overallScore,
      userGaveUp: !!userGaveUp,
      functionalCorrectnessScore,
      codeQualityScore,
      problemSolvingScore,
      optimizationScore,
      algorithmKnowledgeScore,
      testCasesPassedRate,
      averageExecutionTimeMs,
      completedAt,
      submittedCode,
      correctSolutionCode: effectiveCorrectCode,
      whyCodeFailed,
      mistakesAnalysis,
      optimizationSuggestions,
      strongTopics,
      weakTopics
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coding-assessment-${problem.id}-${language}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleCopyCorrectCode = () => {
    navigator.clipboard.writeText(effectiveCorrectCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRetryInArena = () => {
    startCodingInterview({
      language,
      difficulty: problem.difficulty,
      category: problem.category,
      mode: 'practice',
      specificProblemId: problem.id
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fade-in print:p-0 print:m-0 print:max-w-full">
      {/* Top Assessment Banner Card */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-8 shadow-xs text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] text-xs font-bold border border-[#DFE1D8] dark:border-[#35443D] font-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#C47759]" />
          <span>Technical Bar Raiser Assessment & Solution Slide</span>
        </div>

        {/* Score & Verdict Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <div
              className={`flex items-center justify-center w-28 h-28 rounded-3xl font-extrabold text-5xl shadow-md font-mono tabular-nums ${
                isSolved
                  ? 'bg-[#172D29] text-[#C6D58A] border-2 border-[#C6D58A]/40'
                  : 'bg-[#172D29] text-[#C47759] border-2 border-[#C47759]/40'
              }`}
            >
              {overallScore}
              <span className="text-base font-normal opacity-70">/100</span>
            </div>
          </div>

          <div>
            <span className={`inline-block px-3 py-1 text-xs font-extrabold rounded-full border ${verdict.badge} mb-2 font-sans`}>
              {verdict.text}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172D29] dark:text-[#F4F0E7] font-display">
              {problem.title}
            </h2>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1 font-sans">
              Language: <span className="font-bold text-[#172D29] dark:text-[#F4F0E7] uppercase font-mono">{language}</span> ·{' '}
              Difficulty: <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">{problem.difficulty}</span> ·{' '}
              Mode: <span className="capitalize">{mode}</span> · {new Date(completedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Notice for when candidate didn't solve or had mistakes */}
        {!isSolved && (
          <div className="p-4 rounded-2xl bg-[#C47759]/10 border border-[#C47759]/30 text-left space-y-2 max-w-3xl mx-auto font-sans">
            <div className="flex items-center gap-2 font-bold text-xs text-[#C47759] dark:text-[#E09074]">
              <AlertTriangle className="w-4 h-4 text-[#C47759] shrink-0" />
              <span>
                {userGaveUp
                  ? 'Solution Requested: You surrendered this problem.'
                  : 'Your solution did not pass all test cases.'}
              </span>
            </div>
            <p className="text-xs text-[#727A73] dark:text-[#DCE5DF] leading-relaxed">
              Don't worry — review the <strong>Mistake Analysis</strong> below to see exactly where your logic broke down, then inspect the <strong>Correct Code Solution</strong> to understand how an engineer solves it in optimal time.
            </p>
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
          <div className="p-3.5 rounded-2xl bg-[#F4F0E7] dark:bg-[#24362F]/50 border border-[#DFE1D8] dark:border-[#35443D]">
            <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block uppercase font-bold font-sans">Test Cases Passed</span>
            <span className="text-lg font-black font-mono text-[#2D5A46] dark:text-[#C6D58A] tabular-nums">
              {testCasesPassedRate}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F4F0E7] dark:bg-[#24362F]/50 border border-[#DFE1D8] dark:border-[#35443D]">
            <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block uppercase font-bold font-sans">Execution Speed</span>
            <span className="text-lg font-black font-mono text-[#172D29] dark:text-[#F4F0E7] tabular-nums">
              {averageExecutionTimeMs}ms
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F4F0E7] dark:bg-[#24362F]/50 border border-[#DFE1D8] dark:border-[#35443D]">
            <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block uppercase font-bold font-sans">Target Time</span>
            <span className="text-sm font-bold font-mono text-[#172D29] dark:text-[#C6D58A] truncate block mt-0.5">
              {problem.expectedTimeComplexity}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F4F0E7] dark:bg-[#24362F]/50 border border-[#DFE1D8] dark:border-[#35443D]">
            <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block uppercase font-bold font-sans">Target Space</span>
            <span className="text-sm font-bold font-mono text-[#727A73] dark:text-[#B6C0B8] truncate block mt-0.5">
              {problem.expectedSpaceComplexity}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            onClick={handleRetryInArena}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#24362F] text-[#F4F0E7] text-xs font-extrabold shadow-sm transition-all font-sans cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-[#C6D58A]" />
            <span>Try Problem Again In Editor</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors font-sans cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
            <span>Download Assessment (JSON)</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors font-sans cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#2D5A46] dark:text-[#C6D58A]" />
            <span>Print Report (PDF)</span>
          </button>

          <button
            onClick={() => setCurrentTab('coding-arena')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors font-sans cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coding Arena Dashboard</span>
          </button>
        </div>
      </div>

      {/* MISTAKES & FAILURE ANALYSIS SECTION */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#C47759]/40 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div className="p-2 rounded-xl bg-[#C47759]/10 text-[#C47759]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
              Candidate Mistake Diagnosis: Where You Went Wrong
            </h3>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5 font-sans">
              Specific errors and flawed assumptions identified in your code submission
            </p>
          </div>
        </div>

        {/* Why code failed banner */}
        {whyCodeFailed && (
          <div className="p-4 rounded-2xl bg-[#C47759]/10 border border-[#C47759]/25 text-xs text-[#292F2C] dark:text-[#F4F0E7] leading-relaxed space-y-1 font-sans">
            <span className="font-bold block uppercase text-[10px] tracking-wider text-[#C47759]">
              Diagnostic Summary:
            </span>
            <p>{whyCodeFailed}</p>
          </div>
        )}

        {/* Line-by-line mistakes list */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] block font-sans">
            Specific Identified Mistakes:
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {(mistakesAnalysis && mistakesAnalysis.length > 0
              ? mistakesAnalysis
              : optimizationSuggestions.problemsInCode
            ).map((mistake, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D] flex items-start gap-3 text-xs"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C47759]/15 text-[#C47759] font-bold shrink-0 text-[11px] mt-0.5">
                  ✕
                </div>
                <div className="text-[#292F2C] dark:text-[#DCE5DF] leading-relaxed font-medium font-sans">
                  {mistake}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CORRECT SOLUTION SLIDE & CODE COMPARISON */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#2D5A46]/30 dark:border-[#C6D58A]/30 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#DCE5DF] dark:bg-[#24362F] text-[#2D5A46] dark:text-[#C6D58A]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
                  The Correct Code Solution ({language.toUpperCase()})
                </h3>
                <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5 font-sans">
                  100% working optimal code that passes all public and hidden test cases
                </p>
              </div>
            </div>
          </div>

          {/* Toggle between Correct Solution, Your Attempt, and Side-by-Side Diff */}
          <div className="flex items-center gap-1 p-1 bg-[#EBE9DF] dark:bg-[#24362F] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveCodeTab('correct')}
              className={`px-3 py-1.5 rounded-lg transition-all font-sans cursor-pointer ${
                activeCodeTab === 'correct'
                  ? 'bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] shadow-xs font-bold'
                  : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
              }`}
            >
              Correct Solution
            </button>
            <button
              onClick={() => setActiveCodeTab('submitted')}
              className={`px-3 py-1.5 rounded-lg transition-all font-sans cursor-pointer ${
                activeCodeTab === 'submitted'
                  ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#F4F0E7] shadow-xs font-bold'
                  : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
              }`}
            >
              Your Attempt
            </button>
            <button
              onClick={() => setActiveCodeTab('diff')}
              className={`px-3 py-1.5 rounded-lg transition-all font-sans cursor-pointer ${
                activeCodeTab === 'diff'
                  ? 'bg-white dark:bg-[#1B2B26] text-[#C47759] shadow-xs font-bold'
                  : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
              }`}
            >
              Side-by-Side Comparison
            </button>
          </div>
        </div>

        {/* Step-by-Step Logic Explanation */}
        <div className="p-4 rounded-2xl bg-[#DCE5DF]/50 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D] text-xs text-[#292F2C] dark:text-[#DCE5DF] leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-1.5 font-bold text-[#172D29] dark:text-[#C6D58A]">
            <BookOpen className="w-4 h-4 text-[#2D5A46] dark:text-[#C6D58A]" />
            <span>How This Correct Solution Works:</span>
          </div>
          <p>
            {optimizationSuggestions.optimizedApproach ||
              problem.explanation ||
              'This approach eliminates nested iteration by storing visited states in an auxiliary Hash Map to achieve linear O(N) runtime.'}
          </p>
        </div>

        {/* Complexity Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
          <div className="p-3.5 rounded-2xl bg-[#F4F0E7] dark:bg-[#24362F]/50 border border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between">
            <span className="text-[#727A73] dark:text-[#B6C0B8]">Expected Time Complexity:</span>
            <span className="font-mono font-bold text-[#2D5A46] dark:text-[#C6D58A]">
              {problem.expectedTimeComplexity}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F4F0E7] dark:bg-[#24362F]/50 border border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between">
            <span className="text-[#727A73] dark:text-[#B6C0B8]">Expected Space Complexity:</span>
            <span className="font-mono font-bold text-[#2D5A46] dark:text-[#C6D58A]">
              {problem.expectedSpaceComplexity}
            </span>
          </div>
        </div>

        {/* Code Editor View */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">
              {activeCodeTab === 'correct'
                ? 'Correct Working Solution (Passes 100% Test Cases):'
                : activeCodeTab === 'submitted'
                ? 'Your Attempted Code:'
                : 'Side-by-Side: Your Code vs. Correct Solution'}
            </span>

            {activeCodeTab === 'correct' && (
              <button
                onClick={handleCopyCorrectCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBE9DF] hover:bg-[#DCE5DF] dark:bg-[#24362F] dark:hover:bg-[#35443D] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#2D5A46] dark:text-[#C6D58A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Correct Solution'}</span>
              </button>
            )}
          </div>

          {activeCodeTab === 'diff' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#C47759] block mb-1 font-sans">
                  Your Attempt:
                </span>
                <MonacoCodeEditor
                  code={submittedCode}
                  onChange={() => {}}
                  language={language}
                  onReset={() => {}}
                  readOnly={true}
                  height="380px"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#2D5A46] dark:text-[#C6D58A] block mb-1 font-sans">
                  Correct Solution:
                </span>
                <MonacoCodeEditor
                  code={effectiveCorrectCode}
                  onChange={() => {}}
                  language={language}
                  onReset={() => {}}
                  readOnly={true}
                  height="380px"
                />
              </div>
            </div>
          ) : (
            <MonacoCodeEditor
              code={activeCodeTab === 'correct' ? effectiveCorrectCode : submittedCode}
              onChange={() => {}}
              language={language}
              onReset={() => {}}
              readOnly={true}
              height="380px"
            />
          )}
        </div>
      </div>

      {/* 100-Point Scoring Parameters Breakdown */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div>
            <h3 className="font-extrabold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
              Evaluation Parameters & Scoring Breakdown
            </h3>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5 font-sans">
              Scored rigorously across correctness, Big-O efficiency, code structure, and data structure choice
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#172D29] dark:text-[#C6D58A]">
            Total: {overallScore}/100
          </span>
        </div>

        {/* 4 Score Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D] space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">
                Functional Correctness & Test Pass Rate
              </span>
              <span className="font-mono font-bold text-[#2D5A46] dark:text-[#C6D58A] tabular-nums">
                {functionalCorrectnessScore}/35 pts
              </span>
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${(functionalCorrectnessScore / 35) * 100}%` }}
                className="bg-[#C6D58A] h-full rounded-full transition-all"
              ></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D] space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">
                Time & Space Complexity Optimization
              </span>
              <span className="font-mono font-bold text-[#172D29] dark:text-[#C6D58A] tabular-nums">
                {optimizationScore}/15 pts
              </span>
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${(optimizationScore / 15) * 100}%` }}
                className="bg-[#172D29] dark:bg-[#C6D58A] h-full rounded-full transition-all"
              ></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D] space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">
                Code Quality & Clean Architecture
              </span>
              <span className="font-mono font-bold text-[#C47759] tabular-nums">
                {codeQualityScore}/15 pts
              </span>
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${(codeQualityScore / 15) * 100}%` }}
                className="bg-[#C47759] h-full rounded-full transition-all"
              ></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D] space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">
                Problem-Solving & Data Structures
              </span>
              <span className="font-mono font-bold text-[#2D5A46] dark:text-[#C6D58A] tabular-nums">
                {problemSolvingScore}/20 pts
              </span>
            </div>
            <div className="w-full bg-[#EBE9DF] dark:bg-[#24362F] h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${(problemSolvingScore / 20) * 100}%` }}
                className="bg-[#2D5A46] dark:bg-[#C6D58A] h-full rounded-full transition-all"
              ></div>
            </div>
          </div>
        </div>

        {/* Category Explanations */}
        <div className="space-y-2.5 pt-1">
          {categoryScores.map((cat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/50 dark:bg-[#24362F]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-[#172D29] dark:text-[#F4F0E7] block font-sans">
                  {cat.name}
                </span>
                <p className="text-[#727A73] dark:text-[#B6C0B8] mt-0.5 leading-relaxed font-sans">
                  {cat.assessment}
                </p>
              </div>
              <span className="font-mono font-bold text-[#172D29] dark:text-[#F4F0E7] px-3 py-1 bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] rounded-xl shrink-0 tabular-nums shadow-xs">
                {cat.score}/{cat.maxScore}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
