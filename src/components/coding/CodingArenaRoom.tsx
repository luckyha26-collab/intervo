import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Play,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  ChevronRight,
  Maximize2,
  FileText,
  MessageSquare,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Pause,
  Play as PlayIcon,
  X,
  Lightbulb,
  Trash2,
  Check,
  Copy,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MonacoCodeEditor } from './MonacoCodeEditor';
import { INTERVIEWER_PERSONAS, speakText, isSpeechRecognitionSupported } from '../../utils/speechEngine';
import { ProgrammingLanguage } from '../../types';

export const CodingArenaRoom: React.FC = () => {
  const {
    activeCodingSession,
    changeCodingLanguage,
    resetCodingTemplate,
    updateCodingCode,
    runCurrentCode,
    submitCurrentCode,
    isRunningCode,
    isSubmittingCode,
    sendInterviewerChatMessage,
    exitCodingInterview,
    activePersonaId,
    requestNextCodingQuestion,
    isGeneratingCodingProblem,
    codeStarterMode,
    setCodeStarterMode,
    applyDefaultSyntax,
    clearCodeEditor,
    toggleCodingTimer
  } = useApp();

  const [leftTab, setLeftTab] = useState<'problem' | 'interviewer' | 'hints'>('problem');
  const [bottomTab, setBottomTab] = useState<'testcases' | 'custom' | 'console'>('testcases');
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState<number>(0);
  const [customInputText, setCustomInputText] = useState<string>('');
  const [chatDraft, setChatDraft] = useState<string>('');
  const [isMicListening, setIsMicListening] = useState<boolean>(false);
  const [isSpeakingInterviewer, setIsSpeakingInterviewer] = useState<boolean>(false);
  const [copiedInput, setCopiedInput] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showSurrenderModal, setShowSurrenderModal] = useState<boolean>(false);
  const [showSkipModal, setShowSkipModal] = useState<boolean>(false);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const speechCancelRef = useRef<(() => void) | null>(null);
  const recognitionRef = useRef<any>(null);

  if (!activeCodingSession) return null;

  const { problem, language, mode, code, testResults, interviewerChat, timerSecondsLeft, isTimerPaused, timeSpentSeconds } =
    activeCodingSession;

  const persona = INTERVIEWER_PERSONAS.find((p) => p.id === activePersonaId) || INTERVIEWER_PERSONAS[0];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [interviewerChat]);

  // Voice output for interviewer messages
  const handleSpeakInterviewerMessage = (text: string) => {
    if (speechCancelRef.current) speechCancelRef.current();
    setIsSpeakingInterviewer(true);
    speechCancelRef.current = speakText(text, persona.id, () => {
      setIsSpeakingInterviewer(false);
    });
  };

  // Setup Web Speech recognition
  useEffect(() => {
    if (!isSpeechRecognitionSupported()) return;
    try {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onresult = (e: any) => {
        const transcript = e.results[0]?.[0]?.transcript || '';
        if (transcript) {
          setChatDraft((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsMicListening(false);
      };

      rec.onerror = () => setIsMicListening(false);
      rec.onend = () => setIsMicListening(false);

      recognitionRef.current = rec;
    } catch {}
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isMicListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsMicListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsMicListening(true);
      } catch {}
    }
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatDraft.trim()) return;
    sendInterviewerChatMessage(chatDraft.trim());
    setChatDraft('');
  };

  const handleQuickPrompt = (promptText: string) => {
    setLeftTab('interviewer');
    sendInterviewerChatMessage(promptText);
  };

  const handleRunCode = () => {
    if (bottomTab === 'custom') {
      runCurrentCode(customInputText);
    } else {
      runCurrentCode();
      setBottomTab('testcases');
    }
  };

  const handleCopySampleInput = () => {
    if (!problem.sampleInput) return;
    navigator.clipboard.writeText(problem.sampleInput);
    setCopiedInput(true);
    setTimeout(() => setCopiedInput(false), 2000);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const activeTest = testResults?.testResults?.[selectedTestCaseIndex] || problem.publicTestCases[0];

  // Test suite stats
  const totalTests = testResults ? testResults.totalTestCases : problem.publicTestCases.length;
  const passedTests = testResults ? testResults.passedTestCases : 0;
  const passRatePercent = testResults && totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  return (
    <div className="max-w-[1720px] mx-auto space-y-4 pb-12 animate-fade-in">
      {/* =========================================================================
          TOP SESSION BANNER: Title, Difficulty, Status & Mobile Controls
         ========================================================================= */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] px-5 py-3 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Problem Title & Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] font-extrabold text-xs">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-[#172D29] dark:text-[#F4F0E7] font-display">
                {problem.title}
              </h1>
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
            <div className="flex items-center gap-2 text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
              <span className="font-medium text-[#172D29] dark:text-[#DCE5DF]">{problem.category}</span>
              <span>·</span>
              <span className="font-mono">Time: {problem.expectedTimeComplexity}</span>
              <span>·</span>
              <span className="font-mono">Space: {problem.expectedSpaceComplexity}</span>
            </div>
          </div>
        </div>

        {/* Center: Timer & Mode */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-xs font-mono font-bold text-[#172D29] dark:text-[#F4F0E7]">
            <Clock className={`w-3.5 h-3.5 ${isTimerPaused ? 'text-[#C47759]' : 'text-[#2D5A46] dark:text-[#C6D58A]'}`} />
            <span className="tabular-nums">{formatTimer(timerSecondsLeft)}</span>
            {isTimerPaused && (
              <span className="text-[10px] uppercase font-bold text-[#C47759]">
                (Paused)
              </span>
            )}
          </div>

          <button
            onClick={toggleCodingTimer}
            className="p-1.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
            title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
          >
            {isTimerPaused ? <PlayIcon className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#DFE1D8] dark:border-[#35443D] capitalize">
            {mode} Mode
          </span>
        </div>

        {/* Right: Quick actions for mobile / tablet view */}
        <div className="flex items-center gap-2">
          {/* Solution button on mobile/tablet */}
          <button
            type="button"
            onClick={() => setShowSurrenderModal(true)}
            disabled={isRunningCode || isSubmittingCode}
            className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#C47759] bg-[#C47759]/10 border border-[#C47759]/30 hover:bg-[#C47759]/20 transition-colors cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#C47759]" />
            <span>Stuck? Solution</span>
          </button>

          <button
            onClick={() => setShowSkipModal(true)}
            disabled={isGeneratingCodingProblem || isRunningCode || isSubmittingCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
            title="Load another unattempted question in this category"
          >
            <ChevronRight className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
            <span className="hidden sm:inline">Next Problem</span>
          </button>

          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          WORKSPACE: LEFT PANEL (4 cols) | CENTER & BOTTOM (5 cols) | RIGHT PANEL (3 cols)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-4 items-start">
        {/* =========================================================================
            LEFT PANEL: Problem Description, Examples, Constraints, Hints & AI Interviewer
           ========================================================================= */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] shadow-xs flex flex-col h-[740px] overflow-hidden">
          {/* Left Panel Tabs Header */}
          <div className="flex items-center border-b border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/50 px-3 pt-2 gap-1 shrink-0">
            <button
              onClick={() => setLeftTab('problem')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 font-sans ${
                leftTab === 'problem'
                  ? 'border-[#172D29] text-[#172D29] dark:border-[#C6D58A] dark:text-[#C6D58A] bg-white dark:bg-[#1B2B26] font-bold'
                  : 'border-transparent text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Problem</span>
            </button>

            <button
              onClick={() => setLeftTab('interviewer')}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 font-sans ${
                leftTab === 'interviewer'
                  ? 'border-[#172D29] text-[#172D29] dark:border-[#C6D58A] dark:text-[#C6D58A] bg-white dark:bg-[#1B2B26] font-bold'
                  : 'border-transparent text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Interviewer ({interviewerChat.length})</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6D58A] animate-ping"></span>
            </button>

            <button
              onClick={() => setLeftTab('hints')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 font-sans ${
                leftTab === 'hints'
                  ? 'border-[#172D29] text-[#172D29] dark:border-[#C6D58A] dark:text-[#C6D58A] bg-white dark:bg-[#1B2B26] font-bold'
                  : 'border-transparent text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hints</span>
            </button>
          </div>

          {/* Left Panel Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* TAB 1: Problem Description & Examples */}
            {leftTab === 'problem' && (
              <div className="space-y-5 text-slate-700 dark:text-slate-300">
                {/* Description Body */}
                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {problem.description}
                </div>

                {/* Input & Output Format */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
                      Input Format
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 font-mono">
                      {problem.inputFormat}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
                      Output Format
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 font-mono">
                      {problem.outputFormat}
                    </p>
                  </div>
                </div>

                {/* Constraints */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Constraints
                  </h4>
                  <ul className="space-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                    {problem.constraints.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-sky-500 font-bold">·</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sample Test Case with Copy */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Sample Test Case
                    </h4>
                    <button
                      type="button"
                      onClick={handleCopySampleInput}
                      className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-sky-600 transition-colors"
                    >
                      {copiedInput ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedInput ? 'Copied' : 'Copy Input'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Sample Input
                      </span>
                      <pre className="font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto">
                        {problem.sampleInput}
                      </pre>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Sample Output
                      </span>
                      <pre className="font-mono text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto">
                        {problem.sampleOutput}
                      </pre>
                    </div>

                    {problem.explanation && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          Explanation
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 italic">
                          {problem.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Interview Discussion Prompts */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Quick Interview Discussion:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleQuickPrompt("I'd like to explain my planned approach and data structure before writing code.")}
                      className="px-2.5 py-1 text-xs rounded-lg bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-300 hover:bg-sky-100 border border-sky-200 dark:border-sky-800 transition-colors cursor-pointer"
                    >
                      Explain Approach
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("What are the expected time and space complexity trade-offs for this problem?")}
                      className="px-2.5 py-1 text-xs rounded-lg bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300 hover:bg-purple-100 border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer"
                    >
                      Discuss Big-O
                    </button>
                    <button
                      onClick={() => handleQuickPrompt("Could you provide a progressive hint regarding the optimal data structure?")}
                      className="px-2.5 py-1 text-xs rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-100 border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer"
                    >
                      Request Hint
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI Interviewer Interactive Conversation */}
            {leftTab === 'interviewer' && (
              <div className="flex flex-col h-full space-y-3">
                {/* Persona Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-9 h-9 rounded-full object-cover border border-sky-300"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {persona.name} (Bar Raiser)
                      </h4>
                      <p className="text-[10px] text-slate-400">{persona.title} · {persona.company}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live
                  </span>
                </div>

                {/* Messages Stream */}
                <div ref={chatScrollRef} className="flex-1 space-y-3 overflow-y-auto max-h-[460px] pr-1">
                  {interviewerChat.map((msg) => {
                    const isCandidate = msg.sender === 'candidate';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isCandidate ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed ${
                            isCandidate
                              ? 'bg-sky-600 text-white rounded-br-xs shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs border border-slate-200/60 dark:border-slate-700/60'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 px-1">
                          <span>{msg.timestamp}</span>
                          {!isCandidate && (
                            <button
                              onClick={() => handleSpeakInterviewerMessage(msg.text)}
                              className="hover:text-sky-500 transition-colors flex items-center gap-0.5 cursor-pointer"
                              title="Read audio out loud"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Listen</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat Input Dock with Mic */}
                <form onSubmit={handleSendChat} className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatDraft}
                      onChange={(e) => setChatDraft(e.target.value)}
                      placeholder="Explain approach, ask about complexity, or request advice..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    />

                    <button
                      type="button"
                      onClick={toggleMic}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isMicListening
                          ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isMicListening ? 'Stop listening' : 'Speak to interviewer (Voice to Text)'}
                    >
                      {isMicListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    <button
                      type="submit"
                      disabled={!chatDraft.trim()}
                      className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs disabled:opacity-50 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: Progressive Hints */}
            {leftTab === 'hints' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Progressive Interview Hints</span>
                  </div>
                  <p className="leading-relaxed">
                    Try solving without hints first to simulate real interviews. If you hit a roadblock, open hints progressively:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Hint 1: Algorithmic Intuition
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {problem.explanation || 'Consider what invariant is preserved at each step. Can you compute the complement in O(1)?'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Hint 2: Optimal Data Structure
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Expected Complexity: <strong>{problem.expectedTimeComplexity}</strong> time and <strong>{problem.expectedSpaceComplexity}</strong> auxiliary space. Consider using a Hash Map, Two-Pointers, or Dynamic Programming.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Hint 3: Boundary & Edge Cases
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Check for single-element collections, empty strings, duplicates, or negative integers before finalizing your indices.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            CENTER PANEL: Monaco Code Editor, Language Selector, Run & Submit
            BOTTOM PANEL: Test Cases, Console Output, Compilation Errors, Execution Stats
           ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-5 space-y-4">
          {/* Top Editor Toolbar: Language Switcher, Default Syntax & Empty Slate Controls */}
          <div className="flex flex-wrap items-center justify-between bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] px-4 py-2.5 shadow-xs gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider font-sans">
                  Language:
                </span>
                <select
                  value={language}
                  onChange={(e) => changeCodingLanguage(e.target.value as ProgrammingLanguage)}
                  className="px-3 py-1.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] font-mono cursor-pointer"
                >
                  <option value="python">Python 3</option>
                  <option value="javascript">JavaScript (Node.js)</option>
                  <option value="java">Java 17</option>
                  <option value="cpp">C++ (g++)</option>
                  <option value="c">C (gcc)</option>
                  <option value="sql">SQL Query</option>
                </select>
              </div>

              {/* Active starter indicator */}
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-[#727A73] dark:text-[#B6C0B8] bg-[#EBE9DF] dark:bg-[#24362F] px-2.5 py-1 rounded-lg font-sans">
                <span>Starter:</span>
                <strong className="text-[#172D29] dark:text-[#F4F0E7]">
                  {code.trim().length === 0 ? 'Empty Slate' : 'Default Syntax'}
                </strong>
              </span>
            </div>

            {/* Action buttons: Default Syntax, Empty Slate, Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCodeStarterMode('default-syntax');
                  applyDefaultSyntax();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer font-sans ${
                  code.trim().length > 0 && codeStarterMode === 'default-syntax'
                    ? 'bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#172D29]/30 dark:border-[#C6D58A]/30 font-bold'
                    : 'border border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] font-semibold'
                }`}
                title="Load clean default syntax according to active programming language"
              >
                <Code2 className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
                <span className="hidden sm:inline">Default Syntax</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCodeStarterMode('empty');
                  clearCodeEditor();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer font-sans ${
                  code.trim().length === 0
                    ? 'bg-[#C47759]/15 text-[#C47759] dark:text-[#E09074] border border-[#C47759]/40 font-bold'
                    : 'border border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] dark:text-[#B6C0B8] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] font-semibold'
                }`}
                title="Keep editor completely empty to write your solution from a blank slate"
              >
                <Trash2 className="w-3.5 h-3.5 text-[#C47759]" />
                <span>Empty</span>
              </button>

              <button
                type="button"
                onClick={resetCodingTemplate}
                className="p-1.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
                title="Reload starter template according to active mode"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Professional Monaco Code Editor */}
          <MonacoCodeEditor
            code={code}
            onChange={(val) => updateCodingCode(val)}
            language={language}
            onReset={resetCodingTemplate}
            onClear={clearCodeEditor}
            onRun={handleRunCode}
            onSubmit={submitCurrentCode}
            height="440px"
          />

          {/* =====================================================================
              BOTTOM PANEL: Test Cases, Console Output, Compilation Errors, Execution Stats
             ===================================================================== */}
          <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] shadow-xs overflow-hidden flex flex-col">
            {/* Workbench Header Tabs */}
            <div className="flex items-center justify-between border-b border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/50 px-3 pt-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setBottomTab('testcases')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 font-sans ${
                    bottomTab === 'testcases'
                      ? 'border-[#172D29] text-[#172D29] dark:border-[#C6D58A] dark:text-[#C6D58A] bg-white dark:bg-[#1B2B26] font-bold'
                      : 'border-transparent text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    Test Cases ({testResults ? `${testResults.passedTestCases}/${testResults.totalTestCases}` : problem.publicTestCases.length})
                  </span>
                </button>

                <button
                  onClick={() => setBottomTab('custom')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 font-sans ${
                    bottomTab === 'custom'
                      ? 'border-[#172D29] text-[#172D29] dark:border-[#C6D58A] dark:text-[#C6D58A] bg-white dark:bg-[#1B2B26] font-bold'
                      : 'border-transparent text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Custom Input</span>
                </button>

                <button
                  onClick={() => setBottomTab('console')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 font-sans ${
                    bottomTab === 'console'
                      ? 'border-[#172D29] text-[#172D29] dark:border-[#C6D58A] dark:text-[#C6D58A] bg-white dark:bg-[#1B2B26] font-bold'
                      : 'border-transparent text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Output Console</span>
                </button>
              </div>

              {testResults && (
                <div className="flex items-center gap-3 pr-2 text-xs">
                  <span className="font-mono text-slate-400 tabular-nums">
                    {testResults.executionTimeMs}ms
                  </span>
                  <span className="font-mono text-slate-400 tabular-nums">
                    {testResults.memoryMb}MB
                  </span>
                </div>
              )}
            </div>

            {/* Workbench Tab Body */}
            <div className="p-4 min-h-[160px] max-h-[220px] overflow-y-auto">
              {/* TAB 1: Test Cases Tab */}
              {bottomTab === 'testcases' && (
                <div className="space-y-3">
                  {/* Test case pills selector */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {(testResults?.testResults || problem.publicTestCases).map((tc, idx) => {
                      const isSelected = selectedTestCaseIndex === idx;
                      const hasResult = tc.passed !== undefined;
                      return (
                        <button
                          key={tc.id || idx}
                          onClick={() => setSelectedTestCaseIndex(idx)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold'
                              : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/60'
                          }`}
                        >
                          {hasResult ? (
                            tc.passed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            )
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          )}
                          <span>
                            {tc.isHidden ? `Hidden Case #${idx + 1}` : `Case ${idx + 1}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Test Case Inspection */}
                  {activeTest && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                          Input:
                        </span>
                        <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                          {activeTest.input}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                            Expected Output:
                          </span>
                          <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">
                            {activeTest.expectedOutput}
                          </div>
                        </div>

                        {activeTest.actualOutput !== undefined && (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                              Your Output:
                            </span>
                            <div
                              className={`p-2 rounded-lg border whitespace-pre-wrap ${
                                activeTest.passed
                                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
                              }`}
                            >
                              {activeTest.actualOutput || '(Empty output)'}
                            </div>
                          </div>
                        )}
                      </div>

                      {activeTest.error && (
                        <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
                          {activeTest.error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Custom Input Tab */}
              {bottomTab === 'custom' && (
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Custom Stdin Input (Passed directly to your program):
                  </label>
                  <textarea
                    rows={4}
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    placeholder="e.g. 5 10 15 20&#10;25"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Click "Run Code" below to test with this custom input.</span>
                  </div>
                </div>
              )}

              {/* TAB 3: Output Console */}
              {bottomTab === 'console' && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Standard Output / Compilation Log:
                  </span>
                  <pre className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto min-h-[100px] whitespace-pre-wrap">
                    {testResults?.compilationError ||
                      testResults?.runtimeError ||
                      testResults?.output ||
                      'No execution output yet. Click "Run Code" or "Submit Solution".'}
                  </pre>
                </div>
              )}
            </div>

            {/* Bottom Actions Dock */}
            <div className="px-5 py-3.5 bg-[#F4F0E7]/60 dark:bg-[#24362F]/70 border-t border-[#DFE1D8] dark:border-[#35443D] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#727A73] dark:text-[#B6C0B8] font-sans">
                <ShieldCheck className="w-4 h-4 text-[#2D5A46] dark:text-[#C6D58A]" />
                <span>Backend Isolated Sandbox · 3.0s Timeout</span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Run Code Button */}
                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode || isSubmittingCode}
                  className="px-5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] font-bold text-xs shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer font-sans"
                >
                  {isRunningCode ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#172D29] dark:text-[#C6D58A]" />
                      <span>Running Code...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A] fill-current" />
                      <span>Run Code (Ctrl+Enter)</span>
                    </>
                  )}
                </button>

                {/* Submit Solution Button */}
                <button
                  onClick={() => submitCurrentCode(false)}
                  disabled={isRunningCode || isSubmittingCode}
                  className="px-6 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#24362F] text-[#F4F0E7] font-extrabold text-xs shadow-md shadow-[#172D29]/25 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer font-sans"
                >
                  {isSubmittingCode ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Grading Full Suite...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#C6D58A]" />
                      <span>Submit Solution</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT PANEL (Dedicated Desktop Dock): Timer, Progress, Interviewer Status & Decision Deck
           ========================================================================= */}
        <div className="hidden xl:flex xl:col-span-3 flex-col space-y-4">
          {/* Card 1: Interview Timer & Controls */}
          <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Clock className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
                <span>Interview Clock</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isTimerPaused
                  ? 'bg-[#EBE9DF] text-[#C47759] dark:bg-[#24362F] dark:text-[#E09074]'
                  : 'bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]'
              }`}>
                {isTimerPaused ? 'Paused' : 'Active'}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-3xl font-black font-mono text-[#172D29] dark:text-[#F4F0E7] tabular-nums tracking-tight">
                  {formatTimer(timerSecondsLeft)}
                </span>
                <p className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                  Elapsed: {Math.floor(timeSpentSeconds / 60)}m {timeSpentSeconds % 60}s
                </p>
              </div>

              <button
                type="button"
                onClick={toggleCodingTimer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-xs font-semibold text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
              >
                {isTimerPaused ? <PlayIcon className="w-3 h-3 text-[#2D5A46] dark:text-[#C6D58A]" /> : <Pause className="w-3 h-3 text-[#C47759]" />}
                <span>{isTimerPaused ? 'Resume' : 'Pause'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Question & Test Suite Progress */}
          <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Activity className="w-3.5 h-3.5 text-[#2D5A46] dark:text-[#C6D58A]" />
                <span>Test Suite Progress</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#172D29] dark:text-[#F4F0E7]">
                {passedTests}/{totalTests}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-2 w-full bg-[#EBE9DF] dark:bg-[#24362F] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    passRatePercent === 100
                      ? 'bg-[#C6D58A]'
                      : passRatePercent > 0
                      ? 'bg-[#172D29] dark:bg-[#C6D58A]'
                      : 'bg-[#DFE1D8] dark:bg-[#35443D]'
                  }`}
                  style={{ width: `${testResults ? Math.max(passRatePercent, 6) : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#727A73] dark:text-[#B6C0B8]">
                <span>{testResults ? `${passRatePercent}% Passing` : 'Awaiting First Run'}</span>
                <span>{problem.hiddenTestCasesCount || 2} Hidden on Submit</span>
              </div>
            </div>

            {/* Target Big-O Complexity */}
            <div className="pt-2 border-t border-[#DFE1D8] dark:border-[#35443D] space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#727A73] dark:text-[#B6C0B8] block">
                Target Complexity:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F]/60 border border-[#DFE1D8] dark:border-[#35443D]">
                  <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block">Time</span>
                  <strong className="text-[#172D29] dark:text-[#F4F0E7]">{problem.expectedTimeComplexity}</strong>
                </div>
                <div className="p-2 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F]/60 border border-[#DFE1D8] dark:border-[#35443D]">
                  <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] block">Space</span>
                  <strong className="text-[#172D29] dark:text-[#F4F0E7]">{problem.expectedSpaceComplexity}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: AI Interviewer Status & Persona */}
          <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-5 shadow-xs space-y-3.5">
            <span className="text-[11px] font-bold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Award className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
              <span>Assigned Interviewer</span>
            </span>

            <div className="flex items-center gap-3">
              <img
                src={persona.avatar}
                alt={persona.name}
                className="w-11 h-11 rounded-2xl object-cover border border-[#DFE1D8] dark:border-[#35443D] shadow-xs"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-extrabold text-[#172D29] dark:text-[#F4F0E7] truncate font-sans">
                  {persona.name}
                </h4>
                <p className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate">{persona.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6D58A] animate-pulse"></span>
                  <span className="text-[10px] font-medium text-[#2D5A46] dark:text-[#C6D58A]">
                    Observing Candidate
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] leading-relaxed italic bg-[#F4F0E7] dark:bg-[#24362F]/40 p-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D]">
              "{persona.tagline}"
            </p>

            <button
              type="button"
              onClick={() => setLeftTab('interviewer')}
              className="w-full py-2 px-3 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#172D29] hover:text-[#F4F0E7] dark:hover:bg-[#C6D58A] dark:hover:text-[#172D29] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open Interviewer Chat</span>
            </button>
          </div>

          {/* Card 4: Action Deck & Stuck/Solution Trigger */}
          <div className="bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-5 shadow-xs space-y-3">
            <span className="text-[11px] font-bold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider block font-sans">
              Interview Actions
            </span>

            {/* Primary Stuck/Surrender Button */}
            <button
              type="button"
              onClick={() => setShowSurrenderModal(true)}
              disabled={isRunningCode || isSubmittingCode}
              className="w-full py-2.5 px-3.5 rounded-xl border border-[#C47759]/30 bg-[#C47759]/10 text-[#C47759] dark:text-[#E09074] hover:bg-[#C47759]/20 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 font-sans"
              title="Reveal the correct solution and find out what was wrong"
            >
              <Lightbulb className="w-4 h-4 text-[#C47759]" />
              <span>Stuck? View Solution</span>
            </button>

            {/* Next Problem Button */}
            <button
              type="button"
              onClick={() => setShowSkipModal(true)}
              disabled={isGeneratingCodingProblem || isRunningCode || isSubmittingCode}
              className="w-full py-2 px-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#EBE9DF] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
              <span>Next Problem in Category</span>
            </button>

            {/* Exit Arena Button */}
            <button
              type="button"
              onClick={() => setShowExitModal(true)}
              className="w-full py-2 px-3.5 rounded-xl text-xs font-semibold text-[#727A73] hover:text-[#C47759] hover:bg-[#C47759]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit Coding Arena</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODALS: Surrender (Solution Slide), Exit, Skip / Next
         ========================================================================= */}
      {/* Surrender / Reveal Solution Modal */}
      {showSurrenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Stuck on this Problem?
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Reveal the solution and understand your mistakes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSurrenderModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We will submit your attempt and open the <strong>Solution Slide</strong> with:
            </p>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">1.</span>
                <span><strong>Where you went wrong:</strong> Diagnosis of logical bugs, complexity issues, or missing edge cases in your code.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">2.</span>
                <span><strong>The Correct Code:</strong> 100% working optimal implementation in {language.toUpperCase()}.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 font-bold shrink-0">3.</span>
                <span><strong>Step-by-Step Logic:</strong> Explanation of why the optimal algorithm works so you master it for real interviews.</span>
              </li>
            </ul>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                onClick={() => setShowSurrenderModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Keep Trying
              </button>
              <button
                onClick={() => {
                  setShowSurrenderModal(false);
                  submitCurrentCode(true);
                }}
                disabled={isSubmittingCode}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-xs shadow-md shadow-amber-600/20 cursor-pointer"
              >
                {isSubmittingCode ? 'Loading Solution...' : 'Reveal Correct Code & Mistakes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Exit Coding Interview?
              </h3>
              <button
                onClick={() => setShowExitModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Are you sure you want to exit? Your current draft and test progress in this session will be preserved in your arena dashboard.
            </p>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Resume Coding
              </button>
              <button
                onClick={() => {
                  setShowExitModal(false);
                  exitCodingInterview();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
              >
                Exit to Arena
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skip / Next Problem Confirmation Modal */}
      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-sky-500" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Load Next Question?
                </h3>
              </div>
              <button
                onClick={() => setShowSkipModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We will load another unattempted problem in <strong>{problem.category} ({problem.difficulty})</strong>. Your current code on this problem will not be graded.
            </p>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                onClick={() => setShowSkipModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Keep Current
              </button>
              <button
                onClick={async () => {
                  setShowSkipModal(false);
                  await requestNextCodingQuestion();
                }}
                disabled={isGeneratingCodingProblem}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Load Next Question</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
