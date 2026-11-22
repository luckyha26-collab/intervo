import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Award,
  Sparkles,
  ArrowRight,
  Brain,
  CheckCircle2
} from 'lucide-react';
import { INTERVIEWER_PERSONAS, speakText } from '../../utils/speechEngine';
import { useApp } from '../../context/AppContext';

export const InterviewersShowcase: React.FC = () => {
  const { setActivePersonaId, navigateToProtected } = useApp();
  const [activeVoiceId, setActiveVoiceId] = useState<string | null>(null);

  const personaDetails: Record<
    string,
    { focus: string; criteria: string[]; samplePrompt: string }
  > = {
    sarah: {
      focus: 'System Architecture & Concurrency',
      criteria: ['Idempotency & transaction boundaries', 'Distributed cache invalidation', 'Cost vs. latency trade-offs'],
      samplePrompt: 'Hello, I am Sarah Chen. Let’s evaluate the scalability trade-offs of your architecture under peak load.'
    },
    alex: {
      focus: 'Distributed Systems & Reliability',
      criteria: ['Network partitions & CAP theorem', 'Failure recovery & blast radius', 'Data replication lag'],
      samplePrompt: 'Hi, I am Alex Thorne. I look for how your systems respond to sudden node failures and network degradation.'
    },
    maya: {
      focus: 'STAR Behavioral & Engineering Leadership',
      criteria: ['Quantifiable business outcomes', 'Cross-functional conflict resolution', 'Ownership & technical influence'],
      samplePrompt: 'Welcome! I am Maya Patel. I look for structured communication using the STAR framework with concrete business metrics.'
    }
  };

  const handlePreviewVoice = (personaId: string) => {
    if (activeVoiceId === personaId) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setActiveVoiceId(null);
      return;
    }

    const promptText = personaDetails[personaId]?.samplePrompt || 'Ready for your interview.';
    setActiveVoiceId(personaId);
    speakText(promptText, personaId, () => {
      setActiveVoiceId(null);
    });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F4F0E7] dark:bg-[#111D1A] border-t border-[#DFE1D8] dark:border-[#35443D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5DF] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-[#C47759]" />
            <span>Calibrated Evaluation Standards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] [text-wrap:balance] font-display">
            Meet Your AI Bar Raisers
          </h2>

          <p className="text-sm sm:text-base text-[#727A73] dark:text-[#B6C0B8] leading-relaxed [text-wrap:balance]">
            Each interviewer persona brings a distinct focus, communication style, and rigorous standard
            modeled on Tier-1 Silicon Valley engineering hiring loops.
          </p>
        </div>

        {/* 3 Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INTERVIEWER_PERSONAS.map((persona) => {
            const isSpeaking = activeVoiceId === persona.id;
            const extra = personaDetails[persona.id] || {
              focus: 'Technical Mastery',
              criteria: ['Depth', 'Clarity', 'Edge cases'],
              samplePrompt: 'Ready.'
            };

            return (
              <div
                key={persona.id}
                className="rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all duration-300 group"
              >
                <div className="space-y-5">
                  {/* Persona Avatar & Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={persona.avatar}
                          alt={persona.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-[#DFE1D8] dark:border-[#35443D] shadow-xs group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#C6D58A] border-2 border-white dark:border-[#1B2B26]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                          {persona.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#C47759] dark:text-[#D18A6D]">
                          {persona.title}
                        </p>
                        <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] font-medium">
                          {persona.company}
                        </span>
                      </div>
                    </div>

                    {/* Audio Preview Button */}
                    <button
                      onClick={() => handlePreviewVoice(persona.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-[#C47759] text-white border-[#C47759] animate-pulse'
                          : 'border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-[#292F2C] dark:text-[#F4F0E7] hover:bg-[#172D29] hover:text-[#F4F0E7] dark:hover:bg-[#C6D58A] dark:hover:text-[#172D29]'
                      }`}
                      title={isSpeaking ? 'Stop voice sample' : 'Listen to voice intro'}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Interview Style & Tagline */}
                  <div className="p-3.5 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] space-y-1">
                    <span className="text-[10px] font-bold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider block">
                      Interview Style
                    </span>
                    <p className="text-xs text-[#292F2C] dark:text-[#F4F0E7] font-medium leading-relaxed italic">
                      "{persona.tagline}"
                    </p>
                  </div>

                  {/* Evaluation Criteria Checklist */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider block">
                      Key Bar Raiser Criteria:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#727A73] dark:text-[#B6C0B8] font-medium">
                      {extra.criteria.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A] shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select Persona Action */}
                <div className="pt-5 mt-4 border-t border-[#DFE1D8]/60 dark:border-[#35443D]">
                  <button
                    onClick={() => {
                      setActivePersonaId(persona.id);
                      navigateToProtected('setup');
                    }}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] hover:bg-[#172D29] hover:text-[#F4F0E7] dark:hover:bg-[#C6D58A] dark:hover:text-[#172D29] text-[#292F2C] dark:text-[#F4F0E7] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>Practice with {persona.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
