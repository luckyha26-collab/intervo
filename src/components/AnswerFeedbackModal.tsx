import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnswerFeedbackModal: React.FC = () => {
  const { viewingFeedback, setViewingFeedback, proceedToNextQuestion, activeSession, currentQuestionIndex } = useApp();

  if (!viewingFeedback || !activeSession) return null;

  const score = viewingFeedback.score;
  const isLastQuestion = currentQuestionIndex >= activeSession.questions.length - 1;

  // Score color badge in Editorial Forest tokens
  const getScoreBadge = (sc: number) => {
    if (sc >= 8) return { bg: 'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border-[#C6D58A]/40', label: 'Strong Hire / Staff Standard' };
    if (sc >= 6) return { bg: 'bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#F4F0E7] border-[#DFE1D8] dark:border-[#35443D]', label: 'Competitive / Borderline Hire' };
    return { bg: 'bg-[#C47759]/10 text-[#C47759] border-[#C47759]/30', label: 'Needs Targeted Practice' };
  };

  const badge = getScoreBadge(score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172D29]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#172D29] dark:bg-[#C6D58A] text-[#F4F0E7] dark:text-[#172D29] font-mono font-bold text-xl shadow-xs">
              {score}
              <span className="text-xs font-normal opacity-70">/10</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
                  Instant Answer Evaluation
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
                Question {currentQuestionIndex + 1} of {activeSession.questions.length} · {activeSession.targetRole}
              </p>
            </div>
          </div>

          <button
            onClick={() => setViewingFeedback(null)}
            className="p-2 text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Summary Quote */}
          {viewingFeedback.feedbackSummary && (
            <div className="p-4 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-xs text-[#172D29] dark:text-[#F4F0E7] italic leading-relaxed">
              "{viewingFeedback.feedbackSummary}"
            </div>
          )}

          {/* Key Competencies Grid */}
          {viewingFeedback.keyCompetencyScores && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#C47759]" />
                Competency Breakdown
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Technical Depth', val: viewingFeedback.keyCompetencyScores.technicalDepth },
                  { label: 'Communication', val: viewingFeedback.keyCompetencyScores.communication },
                  { label: 'Problem Solving', val: viewingFeedback.keyCompetencyScores.problemSolving },
                  { label: 'Relevance', val: viewingFeedback.keyCompetencyScores.relevance }
                ].map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/60 text-center"
                  >
                    <div className="text-sm font-bold font-mono text-[#172D29] dark:text-[#F4F0E7]">
                      {comp.val || 7}/10
                    </div>
                    <div className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate">
                      {comp.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & What Was Missing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Strengths */}
            <div className="space-y-2.5 p-4 rounded-xl bg-[#C6D58A]/15 border border-[#C6D58A]/40">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#172D29] dark:text-[#C6D58A]">
                <CheckCircle2 className="w-4 h-4 text-[#C6D58A] shrink-0" />
                <span>What Was Done Well (Strengths)</span>
              </div>
              <ul className="space-y-2 text-xs text-[#172D29] dark:text-[#F4F0E7]">
                {viewingFeedback.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C6D58A] font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="space-y-2.5 p-4 rounded-xl bg-[#C47759]/10 border border-[#C47759]/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#C47759]">
                <AlertTriangle className="w-4 h-4 text-[#C47759] shrink-0" />
                <span>What Was Missing / Areas to Improve</span>
              </div>
              <ul className="space-y-2 text-xs text-[#172D29] dark:text-[#F4F0E7]">
                {viewingFeedback.missingAreas.map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C47759] font-bold">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Exemplary Ideal Answer Model */}
          {viewingFeedback.idealAnswerModel && (
            <div className="space-y-2 p-4 rounded-xl bg-[#EBE9DF]/60 dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#172D29] dark:text-[#F4F0E7]">
                <Lightbulb className="w-4 h-4 text-[#C47759] shrink-0" />
                <span>Exemplary Model Answer (STAR / Architecture Framework)</span>
              </div>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] leading-relaxed font-normal">
                {viewingFeedback.idealAnswerModel}
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F4F0E7] dark:bg-[#24362F] border-t border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between">
          <button
            onClick={() => setViewingFeedback(null)}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]"
          >
            Review My Draft
          </button>

          <button
            onClick={proceedToNextQuestion}
            className="px-6 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] font-bold text-xs shadow-xs flex items-center gap-2 transition-all transform hover:translate-x-0.5"
          >
            <span>{isLastQuestion ? 'Complete Interview & View Summary' : 'Proceed to Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

