import React, { useState } from 'react';
import {
  Menu,
  Sparkles,
  Mic,
  ShieldCheck,
  Moon,
  Sun,
  WifiOff,
  Code2,
  Play,
  UserCheck,
  ChevronRight,
  Terminal,
  Radio,
  FileCode
} from 'lucide-react';
import { useApp, ActiveTab } from '../context/AppContext';
import { VoiceCommandsModal } from './VoiceCommandsModal';
import { EncryptionVaultModal } from './EncryptionVaultModal';

interface TopHeaderProps {
  onOpenMobileSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenMobileSidebar,
  isSidebarCollapsed
}) => {
  const {
    currentTab,
    setCurrentTab,
    currentUser,
    darkMode,
    toggleDarkMode,
    isOnline,
    activeSession,
    activeCodingSession,
    lastVoiceCommand,
    isVaultEncrypted,
    setIsAuthModalOpen
  } = useApp();

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  const getPageTitle = (tab: ActiveTab): { title: string; subtitle?: string; icon: any } => {
    switch (tab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Overview & Readiness', icon: Sparkles };
      case 'coding-arena':
        return { title: 'Live Coding Arena', subtitle: '50-Problem Catalog & Sandbox', icon: Code2 };
      case 'coding-room':
        return { title: 'Live Coding Interview', subtitle: activeCodingSession?.problem.title || 'Algorithmic Round', icon: Terminal };
      case 'coding-summary':
        return { title: 'Coding Evaluation', subtitle: 'Technical Bar Raiser Diff', icon: FileCode };
      case 'setup':
        return { title: 'Mock Interview Setup', subtitle: 'STAR Method & Question Bank', icon: Play };
      case 'room':
        return { title: 'Live Technical Q&A', subtitle: 'Verbal Bar Raiser Round', icon: Mic };
      case 'summary':
        return { title: 'Session Scorecard', subtitle: 'Performance Diagnosis', icon: Sparkles };
      case 'weaknesses':
        return { title: 'Weakness Detector', subtitle: 'Automated Gap Remediation', icon: Sparkles };
      case 'gd-room':
        return { title: 'Group Discussion Arena', subtitle: 'Multi-Candidate Round Table', icon: Radio };
      case 'collaborative':
        return { title: 'Peer Studio', subtitle: 'Live Review & Comments', icon: Sparkles };
      case 'analytics':
        return { title: 'Performance Analytics', subtitle: 'Readiness Modeling', icon: Sparkles };
      case 'history':
        return { title: 'Session History', subtitle: 'Past Interviews & Code', icon: Sparkles };
      case 'landing':
        return { title: 'Product Overview', subtitle: 'Public Showcase & Tour', icon: Sparkles };
      default:
        return { title: 'INTERVO', icon: Sparkles };
    }
  };

  const page = getPageTitle(currentTab);
  const PageIcon = page.icon;

  return (
    <>
      <header className="sticky top-0 z-20 w-full h-16 bg-[#F4F0E7]/85 dark:bg-[#1B2B26]/85 backdrop-blur-md border-b border-[#DFE1D8] dark:border-[#35443D] transition-colors">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Hamburger & Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onOpenMobileSidebar}
              className="md:hidden p-2 rounded-xl text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2 text-xs text-[#727A73] dark:text-[#B6C0B8] min-w-0">
              <span
                onClick={() => setCurrentTab('dashboard')}
                className="font-medium text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7] cursor-pointer hidden sm:inline"
              >
                INTERVO
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#727A73] hidden sm:inline shrink-0" />
              <div className="flex items-center gap-1.5 min-w-0">
                <PageIcon className="w-4 h-4 text-[#C47759] shrink-0" />
                <span className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] truncate font-display">
                  {page.title}
                </span>
                {page.subtitle && (
                  <span className="hidden xl:inline text-[#727A73] dark:text-[#B6C0B8] text-xs">
                    · {page.subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Quick Status & Profile Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Active session quick return indicator */}
            {activeCodingSession && currentTab !== 'coding-room' && (
              <button
                onClick={() => setCurrentTab('coding-room')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#DCE5DF] dark:bg-[#24362F] border border-[#C6D58A] text-[#172D29] dark:text-[#C6D58A] text-xs font-bold animate-pulse cursor-pointer shadow-xs"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resume Coding Session</span>
              </button>
            )}

            {activeSession && currentTab !== 'room' && (
              <button
                onClick={() => setCurrentTab('room')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7EDE8] dark:bg-[#24362F] border border-[#C47759] text-[#C47759] dark:text-[#D18A6D] text-xs font-bold animate-pulse cursor-pointer shadow-xs"
              >
                <Mic className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resume Q&A Session</span>
              </button>
            )}

            {/* Offline pill */}
            {!isOnline && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7EDE8] text-[#C47759] border border-[#C47759]/40 text-xs font-semibold">
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Offline Practice</span>
              </div>
            )}

            {/* Voice Command Button */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] text-[#727A73] dark:text-[#B6C0B8] text-xs font-semibold transition-colors cursor-pointer"
              title="Hands-free Voice Commands"
            >
              <Mic className="w-3.5 h-3.5 text-[#C47759]" />
              <span className="hidden lg:inline text-[11px]">Voice Commands</span>
            </button>

            {/* Encryption Security Badge */}
            <button
              onClick={() => setIsVaultModalOpen(true)}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isVaultEncrypted
                  ? 'border-[#DFE1D8] dark:border-[#35443D] bg-[#DCE5DF]/60 dark:bg-[#24362F]/60 text-[#172D29] dark:text-[#C6D58A]'
                  : 'border-[#DFE1D8] dark:border-[#35443D] text-[#727A73]'
              }`}
              title="End-to-End Encryption status"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
              <span className="hidden lg:inline text-[11px]">AES-256 E2E</span>
            </button>

            {/* Theme Switch */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#C6D58A]" /> : <Moon className="w-4 h-4 text-[#292F2C]" />}
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 p-1 sm:pl-1 sm:pr-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
              title="Switch Profile / Account"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-[#DFE1D8] dark:border-[#35443D]"
              />
              <span className="hidden md:inline text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] max-w-[100px] truncate font-display">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          </div>
        </div>

        {/* Voice command recognized toast notification banner */}
        {lastVoiceCommand && (
          <div className="bg-[#172D29] text-[#F4F0E7] px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-2 animate-fade-in border-b border-[#223F3A]">
            <Mic className="w-3.5 h-3.5 animate-pulse text-[#C6D58A]" />
            <span>Voice command recognized: <strong>"{lastVoiceCommand}"</strong></span>
          </div>
        )}
      </header>

      {/* Modals */}
      <VoiceCommandsModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
      <EncryptionVaultModal isOpen={isVaultModalOpen} onClose={() => setIsVaultModalOpen(false)} />
    </>
  );
};
