import React, { useState } from 'react';
import {
  LogIn,
  UserPlus,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  User as UserIcon,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface LandingAuthCardProps {
  onSuccess?: () => void;
  className?: string;
  defaultMode?: 'login' | 'signup';
}

export const LandingAuthCard: React.FC<LandingAuthCardProps> = ({
  onSuccess,
  className = '',
  defaultMode = 'signup'
}) => {
  const { login, signup, usersList, currentUser } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Engineer');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    'Full Stack Engineer',
    'Frontend Developer',
    'Backend Systems Engineer',
    'Machine Learning / AI Engineer',
    'DevOps / SRE'
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email.trim()) {
      setErrorMsg('Please enter your candidate email address.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsSubmitting(false);
      if (res.success) {
        setSuccessMsg(`Authenticated! Launching workspace...`);
        setTimeout(() => {
          onSuccess?.();
        }, 500);
      } else {
        setErrorMsg(res.message || 'Login failed. Please verify credentials.');
      }
    }, 250);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = signup(name, email, password || 'password123', targetRole);
      setIsSubmitting(false);
      if (res.success) {
        setSuccessMsg(`Welcome aboard, ${name.trim()}! Preparing workspace...`);
        setTimeout(() => {
          onSuccess?.();
        }, 500);
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    }, 250);
  };

  const handleQuickDemo = (demoEmail: string) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    setTimeout(() => {
      login(demoEmail, 'password123');
      setIsSubmitting(false);
      setSuccessMsg(`Signed in with demo profile! Redirecting...`);
      setTimeout(() => {
        onSuccess?.();
      }, 400);
    }, 200);
  };

  return (
    <div
      id="auth-portal"
      className={`relative rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xl p-6 sm:p-8 backdrop-blur-md transition-all ${className}`}
    >
      {/* Subtle Forest highlight */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#172D29]/10 dark:bg-[#C6D58A]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header and Toggle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#172D29] dark:bg-[#24362F] flex items-center justify-center text-[#C6D58A] shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                Candidate Access Portal
              </h3>
              <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8]">All features are 100% free with account</p>
            </div>
          </div>

          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#DFE1D8] dark:border-[#35443D] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
            <span>Encrypted Vault</span>
          </span>
        </div>

        {/* Mode Segmented Switch */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg(null);
            }}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'signup'
                ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg(null);
            }}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'login'
                ? 'bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#C6D58A] shadow-xs font-bold'
                : 'text-[#727A73] dark:text-[#B6C0B8] hover:text-[#172D29] dark:hover:text-[#F4F0E7]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Candidate Sign In</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-xl bg-[#F7EDE8] dark:bg-[#24362F] border border-[#C47759]/40 text-[#C47759] dark:text-[#D18A6D] text-xs flex items-center gap-2 animate-fade-in font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mt-4 p-3 rounded-xl bg-[#F3F7E5] dark:bg-[#24362F] border border-[#C6D58A]/50 text-[#172D29] dark:text-[#C6D58A] text-xs flex items-center gap-2 animate-fade-in font-bold">
          <Check className="w-4 h-4 shrink-0 text-[#172D29] dark:text-[#C6D58A]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={authMode === 'signup' ? handleSignup : handleLogin}
        className="mt-5 space-y-3.5"
      >
        <AnimatePresence mode="wait">
          {authMode === 'signup' && (
            <motion.div
              key="signup-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] block mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#727A73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-xs text-[#292F2C] dark:text-[#F4F0E7] focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] block mb-1">
                  Target Engineering Role
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-[#727A73] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-xs font-semibold text-[#292F2C] dark:text-[#F4F0E7] focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] block mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#727A73] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="candidate@company.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-xs text-[#292F2C] dark:text-[#F4F0E7] focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] block">
              Password
            </label>
            {authMode === 'login' && (
              <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8]">Default demo: password123</span>
            )}
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#727A73] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-xs text-[#292F2C] dark:text-[#F4F0E7] focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-[#172D29] hover:bg-[#223F3A] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] text-[#F4F0E7] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
        >
          <span>
            {isSubmitting
              ? 'Verifying...'
              : authMode === 'signup'
              ? 'Create Free Account & Start'
              : 'Sign In to Workspace'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* 1-Click Fast Track Demo Profiles */}
      <div className="mt-5 pt-4 border-t border-[#DFE1D8] dark:border-[#35443D] space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#727A73] dark:text-[#B6C0B8] block text-center">
          Or 1-Click Test as Verified Demo Candidate:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {usersList.slice(0, 2).map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => handleQuickDemo(user.email)}
              className="p-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] hover:bg-[#EBE9DF] dark:hover:bg-[#35443D] text-left transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-[#DFE1D8] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] block truncate group-hover:text-[#C47759]">
                  {user.name}
                </span>
                <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8] truncate block">
                  {user.targetRole}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
