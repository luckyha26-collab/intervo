import React, { useState } from 'react';
import {
  Brain,
  ShieldCheck,
  Code2,
  Lock,
  X,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingFooter: React.FC = () => {
  const { navigateToProtected, currentResume } = useApp();
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F1E1B] text-[#B6C0B8] border-t border-[#223F3A] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1-2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#172D29] border border-[#35443D] flex items-center justify-center text-[#C6D58A] font-bold shadow-xs">
                <span>✦</span>
              </div>
              <span className="text-base font-black tracking-tight text-[#F4F0E7] font-display">
                INTERVO<span className="text-[#C47759]">.ai</span>
              </span>
            </div>

            <p className="text-xs text-[#B6C0B8] leading-relaxed max-w-sm">
              INTERVO: The AI-powered interview coach that pairs resume intelligence, live coding sandbox execution,
              and real-time voice feedback to prepare engineers for Tier-1 hiring bars.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#C6D58A] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6D58A]" />
              <span>AES-256 Client-Side Encryption Enabled</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('coding-arena')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Coding Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Practice Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateToProtected('setup')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Mock Interview
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToProtected('coding-arena')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Live Coding Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToProtected('gd-room')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Group Discussion
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToProtected('weaknesses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Weakness Detector
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToProtected('analytics')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Performance Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trust & Privacy
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 leading-snug">
                Client-side zero-knowledge vault. Your resume never leaves your browser session unencrypted.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} INTERVO. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built for high-performance engineers</span>
            <span>·</span>
            <span>Vite + React + Tailwind</span>
          </div>
        </div>
      </div>

      {/* Privacy / Terms Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in text-slate-300">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-7 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-extrabold text-base">
                <Lock className="w-4 h-4 text-sky-400" />
                <span>{activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === 'privacy' ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong>1. Zero-Knowledge Local Storage:</strong> INTERVO stores your resume contents,
                  practice transcripts, and scorecards in your browser's encrypted local storage using AES-256.
                </p>
                <p>
                  <strong>2. AI Request Privacy:</strong> When you generate questions or evaluate an answer,
                  only the necessary technical prompt text is forwarded to the API. No persistent tracking or selling of candidate data occurs.
                </p>
                <p>
                  <strong>3. Audio Processing:</strong> Voice synthesis and recognition leverage native browser Web Speech APIs. No candidate voice recordings are uploaded to third-party databases.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>
                  <strong>1. Educational Simulation:</strong> INTERVO provides simulated interview scenarios for practice and preparation purposes.
                </p>
                <p>
                  <strong>2. Code Execution Sandbox:</strong> The live coding arena runs in an isolated execution sandbox strictly for evaluating algorithms against public and hidden unit test cases.
                </p>
                <p>
                  <strong>3. Fair Use:</strong> Users are free to practice and download their personal scorecards and improvement roadmaps.
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
