import React, { useState } from 'react';
import {
  UserCheck,
  X,
  UserPlus,
  LogIn,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  User as UserIcon,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalInitialMode,
    currentUser,
    usersList,
    login,
    signup,
    switchUser,
    logout,
    isLoggedIn
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'switch'>(authModalInitialMode || 'login');

  React.useEffect(() => {
    if (isAuthModalOpen && authModalInitialMode) {
      setMode(authModalInitialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [isAuthModalOpen, authModalInitialMode]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('Frontend Developer');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email.trim()) {
      setErrorMsg('Please enter your email.');
      return;
    }
    const res = login(email, password);
    if (res.success) {
      setSuccessMsg(`Welcome back, ${currentUser.name}!`);
      setTimeout(() => {
        setSuccessMsg(null);
        setIsAuthModalOpen(false);
      }, 700);
    } else {
      setErrorMsg(res.message || 'Login failed.');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    const res = signup(name, email, password || 'password123', targetRole);
    if (res.success) {
      setSuccessMsg(`Profile created! Welcome, ${name.trim()}!`);
      setTimeout(() => {
        setSuccessMsg(null);
        setIsAuthModalOpen(false);
      }, 700);
    } else {
      setErrorMsg(res.message || 'Signup failed.');
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setErrorMsg(null);
    login(demoEmail, 'password123');
    setSuccessMsg('Logged in successfully!');
    setTimeout(() => {
      setSuccessMsg(null);
      setIsAuthModalOpen(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172D29]/60 backdrop-blur-xs animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] rounded-2xl w-full max-w-md shadow-xl overflow-hidden transition-all"
      >
        
        {/* Header with Editorial Forest banner */}
        <div className="p-6 border-b border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#EBE9DF] dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] rounded-xl border border-[#DFE1D8] dark:border-[#35443D]">
              <ShieldCheck className="w-5 h-5 text-[#C47759]" />
            </div>
            <div>
              <h3 className="font-bold text-[#172D29] dark:text-[#F4F0E7] text-base font-display">
                {mode === 'login' ? 'Candidate Login' : mode === 'signup' ? 'Create Candidate Account' : 'Switch Candidate Profile'}
              </h3>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
                User-isolated interview vaults & history
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] rounded-xl hover:bg-[#EBE9DF] dark:hover:bg-[#35443D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-3 p-1.5 m-5 mb-2 bg-[#F4F0E7] dark:bg-[#24362F] rounded-xl text-xs font-semibold border border-[#DFE1D8] dark:border-[#35443D]">
          <button
            onClick={() => { setMode('login'); setErrorMsg(null); }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29]'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMsg(null); }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29]'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => { setMode('switch'); setErrorMsg(null); }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'switch'
                ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29]'
            }`}
          >
            Profiles
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-2 space-y-4">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#C47759]/10 border border-[#C47759]/30 text-[#C47759] text-xs">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-[#C6D58A]/20 border border-[#C6D58A]/40 text-[#172D29] dark:text-[#C6D58A] text-xs flex items-center gap-1.5 font-bold">
              <Check className="w-4 h-4 text-[#C6D58A]" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#C47759]" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aarav.sharma@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#111D1A] text-[#172D29] dark:text-[#F4F0E7] text-xs focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-1">
                  <Lock className="w-3.5 h-3.5 text-[#C47759]" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password (e.g. password123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#111D1A] text-[#172D29] dark:text-[#F4F0E7] text-xs focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to INTERVO</span>
              </button>

              {/* 1-Click Instant Demo Login */}
              <div className="pt-2 border-t border-[#DFE1D8] dark:border-[#35443D]">
                <span className="text-[11px] font-semibold text-[#727A73] dark:text-[#B6C0B8] block mb-2 uppercase tracking-wider">
                  Quick 1-Click Demo Profiles:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('aarav.sharma@example.com')}
                    className="p-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 hover:bg-[#EBE9DF] text-left text-xs text-[#172D29] dark:text-[#F4F0E7] transition-colors"
                  >
                    <div className="font-bold truncate">Aarav (Fresher)</div>
                    <div className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate">Frontend Dev</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('priya.patel@example.com')}
                    className="p-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 hover:bg-[#EBE9DF] text-left text-xs text-[#172D29] dark:text-[#F4F0E7] transition-colors"
                  >
                    <div className="font-bold truncate">Priya (Senior)</div>
                    <div className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate">Full Stack</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-1">
                  <UserIcon className="w-3.5 h-3.5 text-[#C47759]" />
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#111D1A] text-[#172D29] dark:text-[#F4F0E7] text-xs focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#C47759]" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul.verma@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#111D1A] text-[#172D29] dark:text-[#F4F0E7] text-xs focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#C47759]" />
                  Target Job Role
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#111D1A] text-[#172D29] dark:text-[#F4F0E7] text-xs focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Full Stack Engineer">Full Stack Engineer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="DevOps / SRE">DevOps / SRE</option>
                  <option value="Product Manager">Product Manager</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-1">
                  <Lock className="w-3.5 h-3.5 text-[#C47759]" />
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#111D1A] text-[#172D29] dark:text-[#F4F0E7] text-xs focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register & Launch Practice</span>
              </button>
            </form>
          )}

          {mode === 'switch' && (
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] block mb-1">
                Active & Saved Candidate Profiles:
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {usersList.map((u) => {
                  const isCurrent = u.id === currentUser.id && isLoggedIn;
                  return (
                    <div
                      key={u.id}
                      onClick={() => { switchUser(u.id); setIsAuthModalOpen(false); }}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-[#172D29] bg-[#EBE9DF]/60 dark:border-[#C6D58A] dark:bg-[#24362F]'
                          : 'border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F]/40'
                      }`}
                    >
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#DFE1D8] dark:border-[#35443D]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] truncate font-display">
                            {u.name}
                          </p>
                          {isCurrent && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate">
                          {u.email} · {u.targetRole}
                        </p>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-[#172D29] dark:text-[#C6D58A]" />}
                    </div>
                  );
                })}
              </div>

              {isLoggedIn && (
                <div className="pt-2 border-t border-[#DFE1D8] dark:border-[#35443D] flex justify-end">
                  <button
                    onClick={() => { logout(); setIsAuthModalOpen(false); }}
                    className="text-xs font-semibold text-[#C47759] hover:underline"
                  >
                    Log Out of Current Session
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
