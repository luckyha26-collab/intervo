import React, { useState } from 'react';
import {
  Compass,
  PlayCircle,
  Code2,
  Radio,
  FileText,
  Brain,
  Users,
  TrendingUp,
  History,
  ShieldCheck,
  Mic,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  LogOut,
  UserCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { useApp, ActiveTab } from '../context/AppContext';
import { VoiceCommandsModal } from './VoiceCommandsModal';
import { EncryptionVaultModal } from './EncryptionVaultModal';
import { AuthModal } from './AuthModal';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const {
    currentUser,
    isLoggedIn,
    darkMode,
    toggleDarkMode,
    currentTab,
    setCurrentTab,
    activeSession,
    activeCodingSession,
    isVaultEncrypted,
    setIsAuthModalOpen,
    codingHistory
  } = useApp();

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  const handleTabClick = (tabId: ActiveTab) => {
    setCurrentTab(tabId);
    onCloseMobile();
  };

  const navSections = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: Compass },
        { id: 'setup' as ActiveTab, label: 'Start Interview', icon: PlayCircle },
        { id: 'coding-arena' as ActiveTab, label: 'Live Coding Arena', icon: Code2, badge: '50 Problems' },
        { id: 'gd-room' as ActiveTab, label: 'Group Discussion', icon: Radio, badge: 'Live' },
        { id: 'landing' as ActiveTab, label: 'Public Landing Page', icon: Sparkles },
        ...(activeCodingSession
          ? [{ id: 'coding-room' as ActiveTab, label: 'Active Coding Room', icon: Terminal, pulseColor: 'bg-emerald-500' }]
          : []),
        ...(activeSession
          ? [{ id: 'room' as ActiveTab, label: 'Active Live Q&A', icon: Mic, pulseColor: 'bg-sky-500' }]
          : [])
      ]
    },
    {
      title: 'Preparation',
      items: [
        { id: 'setup' as ActiveTab, label: 'Resume Intelligence', icon: FileText },
        { id: 'weaknesses' as ActiveTab, label: 'Weakness Detector', icon: Brain },
        { id: 'coding-arena' as ActiveTab, label: 'Practice Challenges', icon: BookOpen },
        { id: 'collaborative' as ActiveTab, label: 'Peer Studio', icon: Users }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { id: 'analytics' as ActiveTab, label: 'Performance Analytics', icon: TrendingUp },
        { id: 'history' as ActiveTab, label: 'Interview History', icon: History }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full select-none bg-[#F4F0E7] dark:bg-[#1B2B26] text-[#292F2C] dark:text-[#F4F0E7]">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
        <div
          onClick={() => handleTabClick('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group min-w-0"
        >
          <div className="w-8 h-8 rounded-xl bg-[#172D29] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-[#C6D58A] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <span>✦</span>
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <span className="font-bold text-sm tracking-tight text-[#172D29] dark:text-[#F4F0E7] block truncate font-display">
                INTERVO
              </span>
              <span className="text-[10px] text-[#C47759] font-mono block leading-none font-bold">
                AI Coding & Coach
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!isCollapsed && (
              <p className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8]">
                {section.title}
              </p>
            )}

            <div className="space-y-0.5">
              {section.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={`${item.id}-${iIdx}`}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-[#DCE5DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] font-bold shadow-xs'
                        : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF]/70 dark:hover:bg-[#24362F]/50'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#172D29] dark:text-[#C6D58A]'
                          : 'text-[#727A73] dark:text-[#B6C0B8] group-hover:text-[#172D29] dark:group-hover:text-[#F4F0E7]'
                      }`}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29]">
                        {item.badge}
                      </span>
                    )}

                    {item.pulseColor && (
                      <span className={`w-2 h-2 rounded-full ${item.pulseColor} animate-pulse shrink-0`}></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Account & Utilities Footer */}
      <div className="p-3 border-t border-[#DFE1D8] dark:border-[#35443D] space-y-2">
        {/* Quick Utility Icons (Theme, Vault, Voice) */}
        <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between px-1'}`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#C6D58A]" /> : <Moon className="w-4 h-4 text-[#292F2C]" />}
          </button>

          {/* Encryption Vault Status */}
          <button
            onClick={() => setIsVaultModalOpen(true)}
            className={`p-1.5 rounded-lg text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer ${
              isVaultEncrypted ? 'text-[#172D29] dark:text-[#C6D58A]' : ''
            }`}
            title="E2E Security Vault"
          >
            <ShieldCheck className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />
          </button>

          {/* Voice Commands */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="p-1.5 rounded-lg text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] transition-colors cursor-pointer"
            title="Hands-free Voice Commands"
          >
            <Mic className="w-4 h-4 text-[#C47759]" />
          </button>
        </div>

        {/* User Profile Card */}
        <div
          onClick={() => setIsAuthModalOpen(true)}
          className={`flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#EBE9DF] dark:hover:bg-[#24362F] cursor-pointer transition-colors border border-transparent hover:border-[#DFE1D8] dark:hover:border-[#35443D] ${
            isCollapsed ? 'justify-center p-1' : ''
          }`}
          title="Switch Profile or Account Settings"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover border border-[#DFE1D8] dark:border-[#35443D] shrink-0"
          />

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] truncate font-display">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate">
                {currentUser.targetRole}
              </p>
            </div>
          )}

          {!isCollapsed && (
            <UserCheck className="w-3.5 h-3.5 text-[#727A73] dark:text-[#B6C0B8] shrink-0" />
          )}
        </div>
      </div>

      {/* Modals */}
      <VoiceCommandsModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
      <EncryptionVaultModal isOpen={isVaultModalOpen} onClose={() => setIsVaultModalOpen(false)} />
      <AuthModal />
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-30 bg-[#F4F0E7] dark:bg-[#1B2B26] border-r border-[#DFE1D8] dark:border-[#35443D] transition-all duration-200 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-out Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0F1E1B]/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <div className="relative w-72 max-w-[80vw] bg-[#F4F0E7] dark:bg-[#1B2B26] border-r border-[#DFE1D8] dark:border-[#35443D] h-full shadow-2xl z-10 animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
