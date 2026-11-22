import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { Dashboard } from './components/Dashboard';
import { SessionSetup } from './components/SessionSetup';
import { LiveInterviewRoom } from './components/LiveInterviewRoom';
import { SessionSummary } from './components/SessionSummary';
import { CollaborativeStudio } from './components/CollaborativeStudio';
import { PredictiveAnalytics } from './components/PredictiveAnalytics';
import { HistoryList } from './components/HistoryList';
import { WeaknessDetector } from './components/WeaknessDetector';
import { GroupDiscussionRoom } from './components/GroupDiscussionRoom';

import { CodingArenaDashboard } from './components/coding/CodingArenaDashboard';
import { CodingArenaRoom } from './components/coding/CodingArenaRoom';
import { CodingResultSummary } from './components/coding/CodingResultSummary';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/AuthModal';

const MainContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {currentTab === 'dashboard' && <Dashboard />}
      {currentTab === 'coding-arena' && <CodingArenaDashboard />}
      {currentTab === 'coding-room' && <CodingArenaRoom />}
      {currentTab === 'coding-summary' && <CodingResultSummary />}
      {currentTab === 'setup' && <SessionSetup />}
      {currentTab === 'room' && <LiveInterviewRoom />}
      {currentTab === 'summary' && <SessionSummary />}
      {currentTab === 'weaknesses' && <WeaknessDetector />}
      {currentTab === 'gd-room' && <GroupDiscussionRoom />}
      {currentTab === 'collaborative' && <CollaborativeStudio />}
      {currentTab === 'analytics' && <PredictiveAnalytics />}
      {currentTab === 'history' && <HistoryList />}
    </main>
  );
};

const AppLayout: React.FC = () => {
  const { currentTab, isLoggedIn, setCurrentTab } = useApp();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('prepvertex_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('prepvertex_sidebar_collapsed', String(isSidebarCollapsed));
    } catch {}
  }, [isSidebarCollapsed]);

  // Strict route guard: unauthenticated users cannot access any internal module
  useEffect(() => {
    if (!isLoggedIn && currentTab !== 'landing') {
      setCurrentTab('landing');
    }
  }, [isLoggedIn, currentTab, setCurrentTab]);

  // If on Landing Page or not logged in, render full-width immersive landing page with auth modal
  if (!isLoggedIn || currentTab === 'landing') {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F4F0E7] dark:bg-[#111D1A] text-[#292F2C] dark:text-[#F4F0E7] transition-colors font-sans antialiased">
      {/* Collapsible Editorial Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isSidebarCollapsed ? 'md:pl-16' : 'md:pl-64'
        }`}
      >
        <TopHeader
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <div className="flex-1 flex flex-col">
          <MainContent />
        </div>

        <footer className="border-t border-[#DFE1D8] dark:border-[#35443D] py-5 text-center text-xs text-[#727A73] dark:text-[#B6C0B8] bg-[#EBE9DF]/70 dark:bg-[#1B2B26]/70 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-semibold text-[#172D29] dark:text-[#F4F0E7] font-display">
              INTERVO • AI Interview Coach & Live Coding Arena
            </span>
            <div className="flex items-center gap-3 text-[#727A73] dark:text-[#B6C0B8]">
              <span className="text-[#172D29] dark:text-[#C6D58A] font-medium">AES-256 E2E Protected</span>
              <span>·</span>
              <span className="font-medium text-[#C47759] dark:text-[#D18A6D]">50-Problem Live Coding Arena Active</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
