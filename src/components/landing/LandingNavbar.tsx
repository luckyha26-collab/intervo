import React, { useState, useEffect } from 'react';
import {
  Brain,
  Code2,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingNavbar: React.FC = () => {
  const {
    isLoggedIn,
    currentUser,
    darkMode,
    toggleDarkMode,
    setCurrentTab,
    openAuthModal,
    logout
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = ['home', 'features', 'how-it-works', 'coding-arena', 'about'];
      const scrollPos = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F0E7]/85 dark:bg-[#111D1A]/85 backdrop-blur-md border-b border-[#DFE1D8] dark:border-[#35443D] shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-8">
          {/* Zone 1: Brand Wordmark (Single text element + clean mark) */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#172D29] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-center text-[#C6D58A] font-bold shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-base">✦</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] font-display whitespace-nowrap">
                INTERVO<span className="text-[#C47759]">.ai</span>
              </span>
              <span className="block text-[10px] font-semibold text-[#727A73] dark:text-[#B6C0B8] -mt-1 tracking-wider uppercase font-sans">
                AI Interview Coach
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links with Animated Underline */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'coding-arena', label: 'Coding Arena' },
              { id: 'about', label: 'About' }
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative py-1 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#172D29] dark:text-[#C6D58A] font-bold'
                      : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C47759] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-[#727A73] hover:text-[#172D29] dark:text-[#B6C0B8] dark:hover:text-[#F4F0E7] hover:bg-[#DCE5DF]/60 dark:hover:bg-[#1B2B26] transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#C6D58A]" /> : <Moon className="w-4 h-4 text-[#292F2C]" />}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172D29] hover:bg-[#223F3A] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] text-[#F4F0E7] font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Go to Dashboard</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#292F2C] dark:text-[#F4F0E7] hover:text-[#172D29] dark:hover:text-[#C6D58A] hover:bg-[#DCE5DF]/50 dark:hover:bg-[#1B2B26] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#172D29] hover:bg-[#223F3A] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4F0E7]/95 dark:bg-[#111D1A]/95 backdrop-blur-xl border-b border-[#DFE1D8] dark:border-[#35443D] px-5 py-6 space-y-4 shadow-xl animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'coding-arena', label: 'Coding Arena' },
              { id: 'about', label: 'About' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-[#DCE5DF] dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] font-bold'
                    : 'text-[#292F2C] dark:text-[#F4F0E7] hover:bg-[#EBE9DF] dark:hover:bg-[#1B2B26]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#DFE1D8] dark:border-[#35443D] flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentTab('dashboard');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs text-center shadow-xs cursor-pointer"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-[#292F2C] dark:text-[#F4F0E7] font-semibold text-xs text-center cursor-pointer hover:bg-[#DCE5DF]/40"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signup');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#172D29] hover:bg-[#223F3A] text-[#F4F0E7] font-bold text-xs text-center shadow-xs cursor-pointer"
              >
                Get Started Free
              </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
