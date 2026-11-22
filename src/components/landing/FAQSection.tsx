import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is INTERVO?',
      answer:
        'INTERVO is an integrated AI interview flight simulator designed for technical software engineers, architects, and product leads. It pairs resume intelligence, live coding sandbox execution, multi-participant group discussion simulations, and calibrated AI Bar Raiser personas to prepare you for senior hiring bars.'
    },
    {
      question: 'How does AI-generated interview practice work?',
      answer:
        'Instead of static question banks, our engine synthesizes role-specific technical and behavioral prompts tailored to your exact experience level, target position, and resume projects. It listens to your spoken or written responses, asks realistic follow-ups, and produces granular rubric scores in seconds.'
    },
    {
      question: 'Can I upload my resume?',
      answer:
        'Yes. You can paste your resume or upload a document. Our client-side parser extracts your technical skills, frameworks, and project descriptions so that questions focus directly on what you built. All resume data is protected by client-side AES-256 vault encryption.'
    },
    {
      question: 'Does the platform support voice interviews?',
      answer:
        'Yes. Using native Web Speech APIs, the AI interviewer speaks questions aloud with calibrated personas (Sarah Chen, Alex Thorne, Maya Patel), and you can speak your answers directly through your microphone with real-time speech-to-text transcription.'
    },
    {
      question: 'Which programming languages are supported?',
      answer:
        'The Live Coding Arena supports Python 3, JavaScript (Node.js), Java 17, C++ (g++), C (gcc), and SQL queries. Your code is executed against automated public and hidden test cases in an isolated execution sandbox.'
    },
    {
      question: 'Can I prepare for company-specific interviews?',
      answer:
        'Yes. You can target specific engineering archetypes modeled on publicly reported interview patterns from Google, Meta, Stripe, Netflix, Amazon, and high-growth startups, focusing on the specific architectural depth and communication styles each company values.'
    },
    {
      question: 'How does the AI evaluate my answers?',
      answer:
        'Evaluations are scored across four dimensions: Technical Depth, STAR Communication, Algorithmic Problem Solving, and Answer Relevance. For coding, it evaluates functional correctness, time/space Big-O complexity, and code quality. If you get stuck, it highlights where your logic failed and reveals the correct code.'
    },
    {
      question: 'Can I track my improvement over time?',
      answer:
        'Yes. Your session history, coding pass rates, and diagnosed technical weaknesses are saved in your account. The Weakness Detector tracks your recovery progress across specific topics (e.g. cache invalidation, B-Tree indexes) and provides 1-click practice drills.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-50 dark:bg-[#0B1020] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Everything You Need to Know
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed [text-wrap:balance]">
            Have questions about how INTERVO works? Find answers to common queries below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-500' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
