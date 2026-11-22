import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  Send,
  HelpCircle,
  Sparkles,
  Users,
  CheckCircle,
  RefreshCw,
  AlertCircle,
  Pause,
  Play,
  RotateCcw,
  StopCircle,
  AlertTriangle,
  FileCheck,
  X,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INTERVIEWER_PERSONAS, speakText, isSpeechRecognitionSupported, parseVoiceCommand } from '../utils/speechEngine';
import { AnswerFeedbackModal } from './AnswerFeedbackModal';

export const LiveInterviewRoom: React.FC = () => {
  const {
    activeSession,
    currentQuestionIndex,
    currentAnswerDraft,
    setCurrentAnswerDraft,
    isEvaluating,
    submitAndEvaluateCurrentAnswer,
    timerSecondsLeft,
    isTimerPaused,
    setIsTimerPaused,
    activePersonaId,
    stopInterviewAndFinishPartial,
    discardActiveSession,
    peerComments,
    addPeerComment,
    setLastVoiceCommand,
    toggleDarkMode
  } = useApp();

  // Voice recording state
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showPeerDrawer, setShowPeerDrawer] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [newPeerNote, setNewPeerNote] = useState('');
  const [micAudioLevel, setMicAudioLevel] = useState(0);

  const recognitionRef = useRef<any>(null);
  const cancelSpeechRef = useRef<(() => void) | null>(null);

  if (!activeSession) return null;

  const currentItem = activeSession.questions[currentQuestionIndex];
  const question = currentItem.question;
  const persona = INTERVIEWER_PERSONAS.find(p => p.id === activePersonaId) || INTERVIEWER_PERSONAS[0];

  // Auto-speak question on index change
  useEffect(() => {
    setShowHint(false);
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
    }

    setIsSpeakingQuestion(true);
    const cancel = speakText(question.question, persona.id, () => {
      setIsSpeakingQuestion(false);
    });
    cancelSpeechRef.current = cancel;

    return () => {
      if (cancelSpeechRef.current) cancelSpeechRef.current();
    };
  }, [currentQuestionIndex, question.question, persona.id]);

  // Speech Recognition & Voice Commands listener
  useEffect(() => {
    if (!isSpeechRecognitionSupported()) return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        // Check for Hands-free Voice Commands
        const cmd = parseVoiceCommand(finalTranscript);
        if (cmd) {
          setLastVoiceCommand(cmd.rawPhrase);
          setTimeout(() => setLastVoiceCommand(null), 3500);

          if (cmd.action === 'submit') {
            submitAndEvaluateCurrentAnswer();
            return;
          } else if (cmd.action === 'repeat') {
            handleRepeatQuestion();
            return;
          } else if (cmd.action === 'hint') {
            setShowHint(prev => !prev);
            return;
          } else if (cmd.action === 'timer') {
            setIsTimerPaused(prev => !prev);
            return;
          } else if (cmd.action === 'clear') {
            setCurrentAnswerDraft('');
            return;
          } else if (cmd.action === 'theme') {
            toggleDarkMode();
            return;
          }
        }

        // Otherwise append spoken text to draft
        setCurrentAnswerDraft(prev => (prev ? `${prev} ${finalTranscript.trim()}` : finalTranscript.trim()));
      }
    };

    recognition.onerror = (e: any) => {
      console.warn('Speech recognition status:', e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, [question, persona.id]);

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setMicAudioLevel(0);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        // Simulate dynamic sound wave levels
        const interval = setInterval(() => {
          if (!isListening) {
            clearInterval(interval);
            return;
          }
          setMicAudioLevel(Math.floor(Math.random() * 80) + 20);
        }, 150);
      } catch (err) {
        console.warn('Microphone start error:', err);
      }
    }
  };

  const handleRepeatQuestion = () => {
    if (cancelSpeechRef.current) cancelSpeechRef.current();
    setIsSpeakingQuestion(true);
    const cancel = speakText(question.question, persona.id, () => {
      setIsSpeakingQuestion(false);
    });
    cancelSpeechRef.current = cancel;
  };

  const handleStopSpeech = () => {
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      setIsSpeakingQuestion(false);
    }
  };

  // Timer calculation
  const totalTimer = activeSession.timerPerQuestion;
  const isTimeCritical = totalTimer > 0 && timerSecondsLeft <= 20;

  // Add peer note
  const handleAddPeerNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPeerNote.trim()) return;
    addPeerComment(newPeerNote.trim(), 'suggestion');
    setNewPeerNote('');
  };

  const wordCount = currentAnswerDraft.trim() ? currentAnswerDraft.trim().split(/\s+/).length : 0;
  const answeredCount = activeSession.questions.filter(q => q.feedback).length;

  const insertTemplate = (prefix: string) => {
    setCurrentAnswerDraft(prev => (prev ? `${prev}\n${prefix}: ` : `${prefix}: `));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in relative">
      
      {/* Top Session Progress Bar with Editorial Forest tokens */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Question Counter & Category */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#172D29] dark:bg-[#C6D58A] text-[#F4F0E7] dark:text-[#172D29] font-mono font-bold text-xs shadow-xs">
            Q{currentQuestionIndex + 1}/{activeSession.questions.length}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                {activeSession.targetRole}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                activeSession.difficulty === 'Hard' ? 'bg-[#C47759]/10 text-[#C47759] border-[#C47759]/30' :
                activeSession.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30' :
                'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border-[#C6D58A]/40'
              }`}>
                {activeSession.difficulty}
              </span>
            </div>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
              Focus: {activeSession.categoryFocus} · {answeredCount} answered so far
            </p>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        {totalTimer > 0 && (
          <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${
            isTimeCritical
              ? 'bg-[#C47759]/10 border-[#C47759]/40 text-[#C47759] animate-pulse'
              : 'bg-[#F4F0E7] dark:bg-[#24362F] border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#F4F0E7]'
          }`}>
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-[#C47759]' : 'text-[#172D29] dark:text-[#C6D58A]'}`} />
            <div className="font-mono text-sm font-bold">
              {Math.floor(timerSecondsLeft / 60)}:{(timerSecondsLeft % 60).toString().padStart(2, '0')}
            </div>
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="p-1 rounded-md hover:bg-[#EBE9DF] dark:hover:bg-[#35443D] text-[#727A73] transition-colors"
              title={isTimerPaused ? 'Resume countdown' : 'Pause countdown'}
            >
              {isTimerPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Right: Stop Interview Early Feature & Peer Co-pilot */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setShowPeerDrawer(!showPeerDrawer)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
              showPeerDrawer
                ? 'bg-[#172D29] text-[#F4F0E7] border-[#172D29] dark:bg-[#C6D58A] dark:text-[#172D29] shadow-xs'
                : 'border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Peer Co-Pilot ({peerComments.length})</span>
          </button>

          {/* STOP INTERVIEW BUTTON */}
          <button
            onClick={() => setShowStopModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#C47759] bg-[#C47759]/10 hover:bg-[#C47759]/20 border border-[#C47759]/30 transition-all shadow-xs"
            title="Stop or pause the interview session"
          >
            <StopCircle className="w-4 h-4 text-[#C47759]" />
            <span>Stop Interview</span>
          </button>

        </div>

      </div>

      {/* Main Grid: Left Stage (Interviewer) & Right Workspace (Candidate) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Stage: Interviewer Stage */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Persona Card */}
          <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#DFE1D8] dark:border-[#35443D] shadow-xs"
                  />
                  {isSpeakingQuestion && (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6D58A] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C6D58A] border-2 border-white dark:border-[#1B2B26]"></span>
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] font-display">
                    {persona.name}
                  </h3>
                  <p className="text-xs text-[#C47759] font-medium">
                    {persona.title}
                  </p>
                  <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                    {persona.company}
                  </p>
                </div>
              </div>

              {/* Audio Controls */}
              <button
                onClick={isSpeakingQuestion ? handleStopSpeech : handleRepeatQuestion}
                className={`p-2.5 rounded-xl border transition-all ${
                  isSpeakingQuestion
                    ? 'border-[#172D29] bg-[#EBE9DF] text-[#172D29] dark:border-[#C6D58A] dark:bg-[#24362F] dark:text-[#C6D58A] shadow-xs animate-pulse'
                    : 'border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]'
                }`}
                title={isSpeakingQuestion ? 'Mute AI Voice' : 'Repeat Question Audio'}
              >
                {isSpeakingQuestion ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>

            {/* Speaking animated waveform indicator */}
            {isSpeakingQuestion && (
              <div className="flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-xs text-[#172D29] dark:text-[#F4F0E7]">
                <span className="w-1 h-3 bg-[#172D29] dark:bg-[#C6D58A] rounded-full animate-bounce"></span>
                <span className="w-1 h-4 bg-[#172D29] dark:bg-[#C6D58A] rounded-full animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-1 h-5 bg-[#C6D58A] rounded-full animate-bounce [animation-delay:0.3s]"></span>
                <span className="w-1 h-3 bg-[#172D29] dark:bg-[#C6D58A] rounded-full animate-bounce [animation-delay:0.45s]"></span>
                <span className="ml-2 font-medium">Reading question out loud...</span>
              </div>
            )}

            {/* Grounded Resume Snippet */}
            {question.contextSnippet && (
              <div className="p-3 rounded-xl bg-[#EBE9DF]/60 dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-xs text-[#172D29] dark:text-[#F4F0E7]">
                <span className="font-bold block mb-0.5">Resume Context:</span>
                <span>{question.contextSnippet}</span>
              </div>
            )}

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8]">
                Interview Question #{currentQuestionIndex + 1}
              </span>
              <p className="text-sm sm:text-base font-bold text-[#172D29] dark:text-[#F4F0E7] leading-relaxed font-display">
                "{question.question}"
              </p>
            </div>

            {/* Expected Key Points Checklist */}
            {question.expectedKeyPoints && question.expectedKeyPoints.length > 0 && (
              <div className="pt-2 border-t border-[#DFE1D8] dark:border-[#35443D] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C6D58A]" />
                  Key Points the Interviewer is Evaluating
                </span>
                <ul className="space-y-1.5 text-xs text-[#727A73] dark:text-[#B6C0B8]">
                  {question.expectedKeyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C47759] font-bold">•</span>
                      <span className="text-[#172D29] dark:text-[#F4F0E7]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hint Accordion */}
            <div className="pt-2 border-t border-[#DFE1D8] dark:border-[#35443D]">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center justify-between w-full text-xs font-semibold text-[#172D29] dark:text-[#C6D58A] hover:underline"
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {showHint ? 'Hide Response Hint' : 'Need a hint? (Or say "Give hint")'}
                </span>
                <span>{showHint ? '▲' : '▼'}</span>
              </button>
              {showHint && (
                <div className="mt-2.5 p-3 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-xs text-[#172D29] dark:text-[#F4F0E7] leading-relaxed animate-fade-in">
                  💡 {question.hint}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Stage: Candidate Workspace */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs space-y-4">
            
            {/* Top Bar: Hands-free Mic Toggle & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
              
              <div className="flex items-center gap-2.5">
                <button
                  onClick={toggleMic}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    isListening
                      ? 'bg-[#C47759] text-white animate-pulse'
                      : 'bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29]'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span>Stop Listening</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Speak Answer (Voice-to-Text)</span>
                    </>
                  )}
                </button>

                {isListening && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-[#F4F0E7] dark:bg-[#24362F] rounded-lg border border-[#DFE1D8] dark:border-[#35443D]">
                    <span className="w-1.5 h-3 bg-[#C6D58A] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-4 bg-[#172D29] dark:bg-[#C6D58A] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-2.5 bg-[#C6D58A] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-[11px] font-mono text-[#172D29] dark:text-[#C6D58A] ml-1">Live STT Active</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#727A73] dark:text-[#B6C0B8]">
                <span>{wordCount} words</span>
                <span>·</span>
                <button
                  onClick={() => setCurrentAnswerDraft('')}
                  className="hover:text-[#C47759] transition-colors"
                  title="Clear draft"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  Clear
                </button>
              </div>

            </div>

            {/* Quick STAR Formatting Helpers */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#727A73] dark:text-[#B6C0B8] mr-1">Insert Template:</span>
              <button
                type="button"
                onClick={() => insertTemplate('Situation')}
                className="px-2.5 py-1 rounded-lg bg-[#F4F0E7] hover:bg-[#EBE9DF] text-[#172D29] text-[11px] font-semibold border border-[#DFE1D8] dark:bg-[#24362F] dark:border-[#35443D] dark:text-[#F4F0E7]"
              >
                + Situation
              </button>
              <button
                type="button"
                onClick={() => insertTemplate('Task')}
                className="px-2.5 py-1 rounded-lg bg-[#F4F0E7] hover:bg-[#EBE9DF] text-[#172D29] text-[11px] font-semibold border border-[#DFE1D8] dark:bg-[#24362F] dark:border-[#35443D] dark:text-[#F4F0E7]"
              >
                + Task
              </button>
              <button
                type="button"
                onClick={() => insertTemplate('Technical Action')}
                className="px-2.5 py-1 rounded-lg bg-[#EBE9DF] hover:bg-[#DFE1D8] text-[#172D29] text-[11px] font-semibold border border-[#DFE1D8] dark:bg-[#24362F] dark:border-[#35443D] dark:text-[#F4F0E7]"
              >
                + Action
              </button>
              <button
                type="button"
                onClick={() => insertTemplate('Quantified Result')}
                className="px-2.5 py-1 rounded-lg bg-[#C6D58A]/20 hover:bg-[#C6D58A]/30 text-[#172D29] dark:text-[#C6D58A] text-[11px] font-semibold border border-[#C6D58A]/40"
              >
                + Result
              </button>
            </div>

            {/* Answer Textarea */}
            <div className="relative">
              <textarea
                value={currentAnswerDraft}
                onChange={(e) => setCurrentAnswerDraft(e.target.value)}
                placeholder="Type your answer here or click 'Speak Answer' to speak using your microphone. You can also say 'Submit answer' when finished..."
                rows={11}
                className="w-full p-4 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/40 dark:bg-[#111D1A]/60 text-sm text-[#172D29] dark:text-[#F4F0E7] focus:outline-hidden focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] leading-relaxed resize-none font-normal"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#727A73] dark:text-[#B6C0B8] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C47759]" />
                <span>Instant structured grading (Score, Strengths, Gaps, Model Answer)</span>
              </div>

              <button
                onClick={() => submitAndEvaluateCurrentAnswer()}
                disabled={isEvaluating || !currentAnswerDraft.trim()}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Bar Raiser is Scoring Your Answer...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Answer for AI Grading</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* STOP INTERVIEW CONFIRMATION MODAL */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172D29]/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] rounded-2xl w-full max-w-lg shadow-xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#C47759]/10 text-[#C47759] rounded-xl border border-[#C47759]/30">
                  <StopCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
                    Stop Interview Session?
                  </h3>
                  <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
                    You have completed {answeredCount} of {activeSession.questions.length} questions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowStopModal(false)}
                className="p-1.5 text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
              Choose how you want to conclude this session. You can generate a partial report from the questions you answered, or discard the session.
            </p>

            <div className="space-y-3">
              {answeredCount > 0 && (
                <button
                  onClick={() => {
                    setShowStopModal(false);
                    stopInterviewAndFinishPartial();
                  }}
                  className="w-full p-4 rounded-xl border-2 border-[#172D29] dark:border-[#C6D58A] bg-[#F4F0E7] dark:bg-[#24362F] hover:bg-[#EBE9DF] text-left transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-[#172D29] dark:text-[#C6D58A]" />
                    <div>
                      <div className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7]">
                        End Early & Generate Partial Report
                      </div>
                      <div className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                        Scores your {answeredCount} answered questions and saves to history.
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
                </button>
              )}

              <button
                onClick={() => {
                  setShowStopModal(false);
                  discardActiveSession();
                }}
                className="w-full p-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#C47759]/10 hover:border-[#C47759]/40 text-left transition-all flex items-center gap-3 text-[#172D29] dark:text-[#F4F0E7]"
              >
                <AlertTriangle className="w-4 h-4 text-[#C47759]" />
                <div>
                  <div className="text-xs font-bold text-[#C47759]">
                    Discard Interview Session
                  </div>
                  <div className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                    Exits to dashboard without saving this session.
                  </div>
                </div>
              </button>

              <button
                onClick={() => setShowStopModal(false)}
                className="w-full py-2 text-xs font-semibold text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] hover:underline text-center"
              >
                Resume Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Peer Review Co-Pilot Drawer */}
      {showPeerDrawer && (
        <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xl animate-fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                  Real-time Collaborative Peer & Mentor Review Studio
                </h4>
                <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
                  Collaborative answer refinement and live annotations
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPeerDrawer(false)}
              className="text-xs text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]"
            >
              ✕ Close Co-Pilot
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {peerComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7]">
                        {comment.author}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#727A73]">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#172D29] dark:text-[#F4F0E7] leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddPeerNote} className="space-y-3">
              <label className="text-xs font-semibold text-[#172D29] dark:text-[#F4F0E7] block">
                Add Peer Reviewer Feedback or Rubric Critique:
              </label>
              <textarea
                value={newPeerNote}
                onChange={(e) => setNewPeerNote(e.target.value)}
                rows={3}
                placeholder="e.g. Suggest mentioning Redis cache invalidation strategies or STAR metrics..."
                className="w-full p-3 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/40 dark:bg-[#111D1A]/60 text-xs text-[#172D29] dark:text-[#F4F0E7] focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs hover:bg-[#233f3a] shadow-xs"
                >
                  Post Peer Suggestion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Answer Feedback Modal Overlay */}
      <AnswerFeedbackModal />

    </div>
  );
};
