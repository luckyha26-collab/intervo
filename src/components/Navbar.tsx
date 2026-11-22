import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  ShieldCheck,
  Moon,
  Sun,
  WifiOff,
  History,
  TrendingUp,
  Users,
  Compass,
  PlayCircle,
  Brain,
  Radio,
  LogIn,
  Code2
} from 'lucide-react';
import { useApp, ActiveTab } from '../context/AppContext';
import { VoiceCommandsModal } from './VoiceCommandsModal';
import { EncryptionVaultModal } from './EncryptionVaultModal';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    isLoggedIn,
    darkMode,
    toggleDarkMode,
    isOnline,
    currentTab,
    setCurrentTab,
    activeSession,
    activeCodingSession,
    lastVoiceCommand,
    isVaultEncrypted,
    setIsAuthModalOpen
  } = useApp();

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'coding-arena', label: 'Coding Arena', icon: Code2, badge: '50+' },
    ...(activeCodingSession ? [{ id: 'coding-room', label: 'Active Coding Room', icon: Code2, highlight: true }] : []),
    { id: 'setup', label: 'Mock Q&A', icon: PlayCircle },
    ...(activeSession ? [{ id: 'room', label: 'Live Interview', icon: Mic, highlight: true }] : []),
    { id: 'weaknesses', label: 'Weakness Detector', icon: Brain },
    { id: 'gd-room', label: 'GD Arena', icon: Radio, badge: 'LIVE' },
    { id: 'collaborative', label: 'Peer Studio', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'history', label: 'History', icon: History }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/90 dark:bg-[#111D1A]/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo in Deep Forest with Soft Matcha dot */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#172D29] text-[#F4F0E7] shadow-sm">
                <Sparkles className="w-5 h-5 text-[#C6D58A]" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#C6D58A] border-2 border-[#F4F0E7] dark:border-[#111D1A] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-bold tracking-tight text-[#172D29] dark:text-[#F4F0E7]">
                    INTERVO
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#C6D58A]/30 text-[#172D29] dark:bg-[#C6D58A]/20 dark:text-[#C6D58A] border border-[#C6D58A]/50">
                    SaaS PRO
                  </span>
                </div>
                <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">
                  Editorial AI Interview Coach & Coding Arena
                </p>
              </div>
            </div>

            {/* Navigation Tabs (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id as ActiveTab)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] shadow-xs'
                        : item.highlight
                        ? 'text-[#C47759] bg-[#C47759]/10 border border-[#C47759]/30 hover:bg-[#C47759]/20'
                        : 'text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#1B2B26]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-[#C6D58A] text-[#172D29] leading-tight">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2">
              
              {/* Offline indicator */}
              {!isOnline && (
                <div
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C47759]/10 text-[#C47759] border border-[#C47759]/30 text-xs font-medium"
                  title="Offline mode active - local practice available"
                >
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline Ready</span>
                </div>
              )}

              {/* Hands-free Voice Commands Button */}
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#DFE1D8] dark:border-[#35443D] text-xs text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#1B2B26] transition-colors"
                title="Hands-free Voice Commands"
              >
                <Mic className="w-3.5 h-3.5 text-[#C47759]" />
                <span className="hidden xl:inline text-[11px] font-medium">Voice Commands</span>
              </button>

              {/* E2E Encryption Badge */}
              <button
                onClick={() => setIsVaultModalOpen(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
                  isVaultEncrypted
                    ? 'border-[#C6D58A] bg-[#C6D58A]/15 text-[#172D29] dark:text-[#C6D58A]'
                    : 'border-[#DFE1D8] dark:border-[#35443D] text-[#727A73]'
                }`}
                title="End-to-End Encryption status"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
                <span className="hidden sm:inline text-[11px] font-medium">AES-256</span>
              </button>

              {/* Dark / Light Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#1B2B26] transition-colors"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-4 h-4 text-[#C6D58A]" /> : <Moon className="w-4 h-4 text-[#172D29]" />}
              </button>

              {/* User Profile / Login & Signup Trigger */}
              {isLoggedIn ? (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:border-[#172D29] transition-all text-left"
                  title="Switch Candidate Profile or View Account"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full border border-[#DFE1D8] dark:border-[#35443D] object-cover"
                  />
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-[#172D29] dark:text-[#F4F0E7] leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] leading-tight truncate max-w-[100px]">
                      {currentUser.targetRole}
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#172D29] hover:bg-[#292F2C] text-[#F4F0E7] text-xs font-medium shadow-xs transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In / Sign Up</span>
                </button>
              )}

            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden items-center justify-around border-t border-[#DFE1D8] dark:border-[#35443D] px-2 py-1.5 bg-[#EBE9DF]/70 dark:bg-[#111D1A]/90 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id as ActiveTab)}
                className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-[#172D29] dark:text-[#C6D58A] font-bold'
                    : 'text-[#727A73] dark:text-[#B6C0B8]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Voice Command feedback toast banner */}
        {lastVoiceCommand && (
          <div className="bg-[#172D29] text-[#F4F0E7] px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-2 border-t border-[#35443D]">
            <Mic className="w-3.5 h-3.5 text-[#C6D58A]" />
            <span>Voice command recognized: <strong>"{lastVoiceCommand}"</strong></span>
          </div>
        )}
      </header>

      {/* Modals */}
      <VoiceCommandsModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
      <EncryptionVaultModal isOpen={isVaultModalOpen} onClose={() => setIsVaultModalOpen(false)} />
      <AuthModal />
    </>
  );
};
