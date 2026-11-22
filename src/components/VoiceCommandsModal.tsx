import React from 'react';
import { Mic, X, CheckCircle, Volume2, Shield, Moon, Clock, ArrowRight } from 'lucide-react';

interface VoiceCommandsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceCommandsModal: React.FC<VoiceCommandsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const commands = [
    {
      phrase: '"Submit answer" / "Finish answer"',
      action: 'Submits your current spoken or typed response for instant AI grading and feedback.',
      icon: CheckCircle,
      color: 'text-[#C6D58A]'
    },
    {
      phrase: '"Repeat question" / "Read question again"',
      action: 'Has the AI interviewer persona re-read the active interview question out loud.',
      icon: Volume2,
      color: 'text-[#172D29] dark:text-[#C6D58A]'
    },
    {
      phrase: '"Give hint" / "Show hint"',
      action: 'Opens the contextual hint to help structure your thoughts using the STAR method.',
      icon: Shield,
      color: 'text-[#C47759]'
    },
    {
      phrase: '"Next question" / "Move next"',
      action: 'Advances to the next question in your interview queue.',
      icon: ArrowRight,
      color: 'text-[#172D29] dark:text-[#F4F0E7]'
    },
    {
      phrase: '"Pause timer" / "Resume timer"',
      action: 'Freezes or unfreezes the per-question countdown clock for thinking time.',
      icon: Clock,
      color: 'text-[#C47759]'
    },
    {
      phrase: '"Toggle dark mode" / "Dark mode"',
      action: 'Switches the interface between sleek dark forest mode and warm ivory light mode.',
      icon: Moon,
      color: 'text-[#727A73]'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172D29]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] rounded-2xl w-full max-w-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#EBE9DF] dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] rounded-xl border border-[#DFE1D8] dark:border-[#35443D]">
              <Mic className="w-5 h-5 text-[#C47759] animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">Hands-Free Voice Commands</h3>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">Speak naturally during your interview session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Command List */}
        <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
          {commands.map((cmd, idx) => {
            const Icon = cmd.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/40 dark:bg-[#24362F]/30 hover:bg-[#EBE9DF]/60 transition-colors"
              >
                <div className={`mt-0.5 p-2 rounded-lg bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs ${cmd.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 mb-1 text-xs font-semibold font-mono tracking-wide rounded-md bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#DFE1D8] dark:border-[#35443D]">
                    {cmd.phrase}
                  </span>
                  <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
                    {cmd.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#F4F0E7] dark:bg-[#24362F] border-t border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between text-xs text-[#727A73] dark:text-[#B6C0B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C6D58A] animate-ping"></span>
            <span>Microphone continuous listening is available in the Live Room</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold hover:bg-[#233f3a] transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

