import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Download,
  Share2,
  RotateCcw,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  Brain,
  Radio,
  StopCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SessionSummary: React.FC = () => {
  const { activeSession, setCurrentTab, userSessions } = useApp();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    // Trigger celebratory confetti on high performance
    if (activeSession && activeSession.overallScore >= 7.0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [activeSession]);

  if (!activeSession) return null;

  const score = activeSession.overallScore;
  const answeredQuestions = activeSession.questions.filter(q => q.feedback);

  const getVerdict = (s: number) => {
    if (s >= 8.5) return { text: 'Strong Hire / Staff Standard', color: 'text-[#172D29] dark:text-[#C6D58A]', badge: 'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40' };
    if (s >= 7.0) return { text: 'Competitive Hire', color: 'text-[#172D29] dark:text-[#F4F0E7]', badge: 'bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#F4F0E7] border border-[#DFE1D8] dark:border-[#35443D]' };
    if (s >= 5.5) return { text: 'Borderline / Developing', color: 'text-amber-700 dark:text-amber-400', badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30' };
    return { text: 'Needs Structured Practice', color: 'text-[#C47759]', badge: 'bg-[#C47759]/10 text-[#C47759] border border-[#C47759]/30' };
  };

  const verdict = getVerdict(score);

  // Export JSON Report
  const handleExportJSON = () => {
    const reportData = {
      app: 'INTERVO - AI Mock Interview Coach',
      sessionId: activeSession.id,
      targetRole: activeSession.targetRole,
      difficulty: activeSession.difficulty,
      categoryFocus: activeSession.categoryFocus,
      overallScore: activeSession.overallScore,
      overallSummary: activeSession.overallSummary,
      wasStoppedEarly: activeSession.wasStoppedEarly || false,
      completedAt: activeSession.completedAt,
      questions: activeSession.questions.map(q => ({
        question: q.question.question,
        userAnswer: q.userAnswer,
        score: q.feedback?.score,
        strengths: q.feedback?.strengths,
        missingAreas: q.feedback?.missingAreas,
        idealAnswer: q.feedback?.idealAnswerModel
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-report-${activeSession.targetRole.toLowerCase().replace(/\s+/g, '-')}-${activeSession.id.slice(-6)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in print:p-0 print:m-0 print:max-w-full">
      
      {/* Top Banner Card in Editorial Forest Style */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-8 shadow-xs space-y-6 text-center">
        
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold border border-[#DFE1D8] dark:border-[#35443D]">
            <Sparkles className="w-3.5 h-3.5 text-[#C47759]" />
            <span>Interview Assessment Report</span>
          </div>
          {activeSession.wasStoppedEarly && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C47759]/10 text-[#C47759] border border-[#C47759]/30 text-xs font-bold">
              <StopCircle className="w-3.5 h-3.5 text-[#C47759]" />
              <span>Concluded Early (Partial Assessment)</span>
            </div>
          )}
        </div>

        {/* Score & Verdict */}
        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-mono font-bold text-4xl shadow-xs">
              {score}
              <span className="text-base font-normal opacity-70">/10</span>
            </div>
          </div>

          <div>
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${verdict.badge} mb-2`}>
              Verdict: {verdict.text}
            </span>
            <h2 className="text-2xl font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
              {activeSession.targetRole} Evaluation
            </h2>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1">
              Difficulty: {activeSession.difficulty} · {answeredQuestions.length} of {activeSession.questions.length} Questions Evaluated · {new Date(activeSession.completedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Overall Summary Narrative */}
        <div className="p-4 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-xs sm:text-sm text-[#172D29] dark:text-[#F4F0E7] leading-relaxed max-w-2xl mx-auto">
          "{activeSession.overallSummary}"
        </div>

        {/* Actions Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F] transition-colors"
          >
            <Download className="w-4 h-4 text-[#C47759]" />
            <span>Download JSON Report</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F] transition-colors"
          >
            <FileText className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
            <span>Printable / PDF Summary</span>
          </button>

          <button
            onClick={() => setCurrentTab('weaknesses')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] text-xs font-bold shadow-xs transition-all hover:bg-[#233f3a]"
          >
            <Brain className="w-4 h-4" />
            <span>Check Weakness Detector</span>
          </button>

          <button
            onClick={() => setCurrentTab('setup')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C47759] text-white hover:bg-[#b0674c] text-xs font-bold transition-all shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another Session</span>
          </button>
        </div>

      </div>

      {/* Question by Question Detailed Breakdown */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
          <div>
            <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
              Question-by-Question Deep Dive
            </h3>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
              Review answers, bar raiser scores, strengths, and areas to improve
            </p>
          </div>
          <span className="text-xs text-[#727A73] dark:text-[#B6C0B8] font-mono font-bold">
            {answeredQuestions.length} answered items
          </span>
        </div>

        <div className="space-y-4">
          {activeSession.questions.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            const qScore = item.feedback?.score || (item.userAnswer ? 7 : 0);

            return (
              <div
                key={idx}
                className="border border-[#DFE1D8] dark:border-[#35443D] rounded-xl overflow-hidden transition-all"
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="p-4 bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 hover:bg-[#EBE9DF]/60 cursor-pointer flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-mono font-bold text-xs shrink-0">
                      Q{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] truncate font-display">
                      {item.question.question}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {item.feedback ? (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40 font-mono">
                        Score: {qScore}/10
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-[#EBE9DF] text-[#727A73]">
                        Not Answered
                      </span>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#727A73]" /> : <ChevronDown className="w-4 h-4 text-[#727A73]" />}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="p-5 space-y-4 border-t border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] text-xs">
                    
                    {/* Candidate's submitted answer */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8]">
                        Your Submitted Response:
                      </label>
                      <div className="p-3.5 rounded-xl bg-[#F4F0E7]/60 dark:bg-[#111D1A]/60 border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#F4F0E7] leading-relaxed font-mono text-xs">
                        {item.userAnswer || '(Question skipped / concluded before response)'}
                      </div>
                    </div>

                    {item.feedback && (
                      <>
                        <div className="p-3.5 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] italic border border-[#DFE1D8] dark:border-[#35443D]">
                          "{item.feedback.feedbackSummary}"
                        </div>

                        {/* Strengths & Missing Areas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-xl bg-[#C6D58A]/15 border border-[#C6D58A]/40">
                            <span className="font-bold text-[#172D29] dark:text-[#C6D58A] block mb-1">
                              ✓ What was good:
                            </span>
                            <ul className="space-y-1 text-[#172D29] dark:text-[#F4F0E7]">
                              {item.feedback.strengths.map((str, sIdx) => (
                                <li key={sIdx}>• {str}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#C47759]/10 border border-[#C47759]/30">
                            <span className="font-bold text-[#C47759] block mb-1">
                              ⚠ What was missing / To improve:
                            </span>
                            <ul className="space-y-1 text-[#172D29] dark:text-[#F4F0E7]">
                              {item.feedback.missingAreas.map((gap, gIdx) => (
                                <li key={gIdx}>• {gap}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Ideal Answer Model */}
                        <div className="p-3.5 rounded-xl bg-[#EBE9DF]/60 dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D]">
                          <span className="font-bold text-[#172D29] dark:text-[#F4F0E7] block mb-1">
                            💡 Exemplary Benchmark Response:
                          </span>
                          <p className="text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
                            {item.feedback.idealAnswerModel}
                          </p>
                        </div>
                      </>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

