import React, { useState } from 'react';
import { ShieldCheck, X, Key, Lock, Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EncryptionVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EncryptionVaultModal: React.FC<EncryptionVaultModalProps> = ({ isOpen, onClose }) => {
  const { vaultFingerprint, isVaultEncrypted, setIsVaultEncrypted } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(vaultFingerprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172D29]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] rounded-xl border border-[#C6D58A]/40">
              <ShieldCheck className="w-5 h-5 text-[#C47759]" />
            </div>
            <div>
              <h3 className="font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">End-to-End Encryption (E2E) Vault</h3>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">Zero-knowledge client-side data isolation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Status Box */}
          <div className="p-4 rounded-xl border border-[#C6D58A]/40 bg-[#C6D58A]/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#C6D58A]/30 text-[#172D29] dark:text-[#C6D58A]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#172D29] dark:text-[#C6D58A]">
                  AES-GCM 256-Bit Active
                </div>
                <div className="text-xs text-[#727A73] dark:text-[#DFE1D8]">
                  Resumes, transcripts, & mentor peer reviews are encrypted in your local browser sandbox
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isVaultEncrypted}
                onChange={(e) => setIsVaultEncrypted(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#DFE1D8] peer-focus:outline-hidden rounded-full peer dark:bg-[#35443D] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-[#DFE1D8] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#35443D] peer-checked:bg-[#172D29] dark:peer-checked:bg-[#C6D58A]"></div>
            </label>
          </div>

          {/* Cryptographic Fingerprint */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#172D29] dark:text-[#F4F0E7] uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#C47759]" />
              Cryptographic Key Fingerprint (SHA-256)
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] font-mono text-xs text-[#172D29] dark:text-[#F4F0E7]">
              <span className="flex-1 truncate select-all">{vaultFingerprint}</span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-[#EBE9DF] dark:hover:bg-[#35443D] text-[#727A73] transition-colors"
                title="Copy fingerprint"
              >
                {copied ? <Check className="w-4 h-4 text-[#C6D58A]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-2 text-xs text-[#727A73] dark:text-[#B6C0B8]">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#172D29] dark:bg-[#C6D58A]"></span>
              <strong className="text-[#172D29] dark:text-[#F4F0E7]">Web Crypto API:</strong> Keys are derived and stored in your device's non-exportable hardware vault.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#172D29] dark:bg-[#C6D58A]"></span>
              <strong className="text-[#172D29] dark:text-[#F4F0E7]">Zero Leakage:</strong> Candidate answers are never cached unencrypted across multi-user environments.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#172D29] dark:bg-[#C6D58A]"></span>
              <strong className="text-[#172D29] dark:text-[#F4F0E7]">Cross-Device Sync:</strong> End-to-end envelope architecture enables secure export to PDF/JSON.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4F0E7] dark:bg-[#24362F] border-t border-[#DFE1D8] dark:border-[#35443D] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs hover:bg-[#233f3a] transition-all"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};

