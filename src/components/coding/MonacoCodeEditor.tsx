import React, { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Sun,
  Moon,
  Sparkles,
  AlignLeft,
  Settings2,
  Trash2
} from 'lucide-react';
import { ProgrammingLanguage } from '../../types';

interface MonacoCodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: ProgrammingLanguage;
  onReset: () => void;
  onClear?: () => void;
  onRun?: () => void;
  onSubmit?: () => void;
  readOnly?: boolean;
  height?: string;
  theme?: 'vs-dark' | 'light';
}

export const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  code,
  onChange,
  language,
  onReset,
  onClear,
  onRun,
  onSubmit,
  readOnly = false,
  height = '520px',
  theme: controlledTheme
}) => {
  const editorRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'light'>(controlledTheme || 'vs-dark');
  const [fontSize, setFontSize] = useState<number>(14);
  const [showMinimap, setShowMinimap] = useState<boolean>(false);

  // Map our language to monaco language ID
  const getMonacoLanguage = (lang: ProgrammingLanguage): string => {
    switch (lang) {
      case 'python':
        return 'python';
      case 'javascript':
        return 'javascript';
      case 'java':
        return 'java';
      case 'cpp':
        return 'cpp';
      case 'c':
        return 'c';
      case 'sql':
        return 'sql';
      default:
        return 'plaintext';
    }
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun?.();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      onSubmit?.();
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-slate-900 flex flex-col p-4 backdrop-blur-md'
    : 'relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm overflow-hidden flex flex-col';

  return (
    <div className={containerClasses}>
      {/* Editor Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 gap-2">
        {/* Left: Language indicator and shortcuts */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono">
            {language}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400">
            · Ctrl+Enter to Run
          </span>
        </div>

        {/* Right: Actions (Theme, Font Size, Format, Copy, Reset, Fullscreen) */}
        <div className="flex items-center gap-1.5">
          {/* Format */}
          <button
            onClick={handleFormat}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-xs flex items-center gap-1 transition-colors"
            title="Auto-Format Code (Prettify)"
          >
            <AlignLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-medium">Format</span>
          </button>

          {/* Font size toggle */}
          <button
            onClick={() => setFontSize(prev => (prev === 14 ? 16 : prev === 16 ? 13 : 14))}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-mono font-medium transition-colors"
            title="Toggle Font Size (13px / 14px / 16px)"
          >
            {fontSize}px
          </button>

          {/* Minimap toggle */}
          <button
            onClick={() => setShowMinimap(!showMinimap)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              showMinimap
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Toggle Minimap"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>

          {/* Theme Switch */}
          <button
            onClick={() => setEditorTheme(prev => (prev === 'vs-dark' ? 'light' : 'vs-dark'))}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-xs transition-colors"
            title={editorTheme === 'vs-dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {editorTheme === 'vs-dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-xs flex items-center gap-1 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden md:inline text-[11px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Clear Code Editor (Empty) */}
          {!readOnly && onClear && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs transition-colors"
              title="Clear code editor to empty"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Reset Template */}
          {!readOnly && (
            <button
              onClick={onReset}
              className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-xs transition-colors"
              title="Reset code template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-xs transition-colors"
            title={isFullscreen ? 'Exit Full Screen' : 'Full Screen Editor'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Monaco Editor Mount Area */}
      <div className="flex-1 w-full min-h-[360px]">
        <Editor
          height={isFullscreen ? 'calc(100vh - 80px)' : height}
          language={getMonacoLanguage(language)}
          value={code}
          theme={editorTheme}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            tabSize: 4,
            insertSpaces: true,
            lineNumbers: 'on',
            readOnly,
            minimap: { enabled: showMinimap },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            bracketPairColorization: { enabled: true },
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true
          }}
        />
      </div>
    </div>
  );
};
