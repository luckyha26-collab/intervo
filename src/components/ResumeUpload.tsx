import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  Edit3,
  Layers,
  Award,
  Code2,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SAMPLE_RESUMES, extractTextFromFile } from '../utils/resumeParser';

export const ResumeUpload: React.FC = () => {
  const { currentResume, setResumeText, loadSampleResume } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRawEditor, setShowRawEditor] = useState(false);
  const [rawTextDraft, setRawTextDraft] = useState(currentResume.rawText);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const extracted = await extractTextFromFile(file);
      setResumeText(extracted);
      setRawTextDraft(extracted);
    } catch (err) {
      console.error('File extraction error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApplyDraft = () => {
    setResumeText(rawTextDraft);
    setShowRawEditor(false);
  };

  return (
    <div className="space-y-6">
      {/* 1-Click Sample Resumes Bar */}
      <div className="p-4 rounded-3xl bg-[#EBE9DF]/70 dark:bg-[#24362F]/40 border border-[#DFE1D8] dark:border-[#35443D]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C47759]" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#172D29] dark:text-[#F4F0E7] font-sans">
              Quick Test: Select Industry Sample Resume
            </h4>
          </div>
          <span className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] font-sans">
            Instant 1-click load for live interview testing
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                loadSampleResume(sample.id);
                setRawTextDraft(sample.text);
              }}
              className="group p-3.5 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] hover:border-[#172D29] dark:hover:border-[#C6D58A] hover:shadow-xs transition-all text-left flex flex-col justify-between cursor-pointer"
            >
              <div>
                <span className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-bold rounded-md bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]">
                  {sample.highlightBadge}
                </span>
                <p className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] truncate font-sans">
                  {sample.name}
                </p>
                <p className="text-[11px] text-[#727A73] dark:text-[#B6C0B8] truncate font-sans">
                  {sample.title}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between text-[10px] text-[#172D29] dark:text-[#C6D58A] font-bold font-sans">
                <span>Load Profile</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload Dropzone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Dropzone & File Input */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] ${
              isDragging
                ? 'border-[#172D29] bg-[#EBE9DF] dark:border-[#C6D58A] dark:bg-[#24362F]'
                : 'border-[#DFE1D8] dark:border-[#35443D] hover:border-[#172D29] dark:hover:border-[#C6D58A] bg-[#F4F0E7]/40 dark:bg-[#24362F]/20'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.docx,.txt,.md"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            <div className="p-3.5 rounded-2xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] mb-3 shadow-xs">
              {isProcessing ? (
                <RefreshCw className="w-6 h-6 animate-spin text-[#C6D58A]" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>

            <p className="text-sm font-bold text-[#172D29] dark:text-[#F4F0E7] mb-1 font-display">
              {isProcessing ? 'Analyzing Resume Architecture...' : 'Upload your Resume (PDF or DOCX)'}
            </p>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] max-w-xs mb-3 font-sans">
              Drag and drop your file here, or click to browse files from your computer.
            </p>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#DCE5DF] text-[10px] font-semibold font-sans">
              <FolderOpen className="w-3 h-3" />
              PDF, DOCX, TXT supported
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#727A73] dark:text-[#B6C0B8] px-1 font-sans">
            <span>Client-side extraction with AES-256 E2E encryption</span>
            <button
              onClick={() => setShowRawEditor(!showRawEditor)}
              className="text-[#C47759] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              {showRawEditor ? 'Close Editor' : 'Edit Resume Text'}
            </button>
          </div>
        </div>

        {/* Right: Extracted Intelligence Preview */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1B2B26] rounded-3xl border border-[#DFE1D8] dark:border-[#35443D] p-5 shadow-xs">
          
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#DFE1D8] dark:border-[#35443D]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#172D29]/20 dark:border-[#C6D58A]/30">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#172D29] dark:text-[#F4F0E7] font-display">
                  Extracted Resume Intelligence
                </h4>
                <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] font-sans">
                  Detected for {currentResume.name} • ~{currentResume.wordCount} words
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7]">
                Exp: ~{currentResume.experienceYears} {currentResume.experienceYears === 1 ? 'Year' : 'Years'}
              </span>
            </div>
          </div>

          {!showRawEditor ? (
            <div className="space-y-4">
              {/* Detected Skills */}
              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-2 font-sans">
                  <Code2 className="w-3.5 h-3.5 text-[#172D29] dark:text-[#C6D58A]" />
                  Detected Core Technical Competencies ({currentResume.skills.length})
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {currentResume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] border border-[#DFE1D8] dark:border-[#35443D]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects & Highlights */}
              <div>
                <label className="text-xs font-bold text-[#172D29] dark:text-[#F4F0E7] flex items-center gap-1.5 mb-2 font-sans">
                  <Layers className="w-3.5 h-3.5 text-[#C47759]" />
                  Key Projects & Architectural Highlights
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {currentResume.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="text-xs p-2.5 rounded-2xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/50 border border-[#DFE1D8] dark:border-[#35443D] text-[#292F2C] dark:text-[#DCE5DF] font-sans"
                    >
                      {proj}
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Role Guidance */}
              <div className="p-3 rounded-2xl bg-[#DCE5DF]/60 dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] flex items-center justify-between text-xs text-[#172D29] dark:text-[#C6D58A] font-sans">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#2D5A46] dark:text-[#C6D58A]" />
                  AI will generate tailored questions matching: <strong>{currentResume.roleTarget}</strong>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Ready</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#172D29] dark:text-[#F4F0E7] block font-sans">
                Edit Raw Resume Content Directly:
              </label>
              <textarea
                value={rawTextDraft}
                onChange={(e) => setRawTextDraft(e.target.value)}
                rows={9}
                className="w-full p-3 rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F] text-xs text-[#292F2C] dark:text-[#F4F0E7] font-mono focus:outline-hidden focus:ring-2 focus:ring-[#172D29] dark:focus:ring-[#C6D58A]"
                placeholder="Paste or type resume text here..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowRawEditor(false)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] dark:text-[#B6C0B8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyDraft}
                  className="px-4 py-1.5 text-xs font-bold rounded-xl bg-[#172D29] hover:bg-[#24362F] text-[#F4F0E7] cursor-pointer font-sans"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
