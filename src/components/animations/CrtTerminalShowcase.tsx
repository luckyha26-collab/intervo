import React, { useState, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Power, Shield, CheckCircle2, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export const CrtTerminalShowcase: React.FC = () => {
  const [phosphor, setPhosphor] = useState<'green' | 'amber' | 'cyan'>('green');
  const [isOn, setIsOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'coding' | 'system' | 'radar'>('coding');
  const [outputLines, setOutputLines] = useState<string[]>([
    'INTERVO OS v4.2 // BAR RAISER CORE ONLINE',
    'Initializing isolated execution sandbox (cgroups v2)... OK',
    'Loaded 50 curated technical challenges.',
    'Ready. Select a test or run simulation below:'
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const phosphorColors = {
    green: {
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(52,211,153,0.35)]',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/20'
    },
    amber: {
      text: 'text-amber-400',
      glow: 'shadow-[0_0_20px_rgba(251,191,36,0.35)]',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/20'
    },
    cyan: {
      text: 'text-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.35)]',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-950/20'
    }
  };

  const currentTheme = phosphorColors[phosphor];

  const runCommand = (cmdType: 'two-sum' | 'lru-cache' | 'eval') => {
    if (isRunning) return;
    setIsRunning(true);

    if (cmdType === 'two-sum') {
      setOutputLines([
        '$ intervo test --problem 01-two-sum --lang python3',
        'Running 3 public + 5 hidden test cases against O(n) hash map...',
        '  [PASS] Test 1: nums=[2,7,11,15], target=9 -> [0, 1] (0.4ms)',
        '  [PASS] Test 2: nums=[3,2,4], target=6 -> [1, 2] (0.2ms)',
        '  [PASS] Test 3: nums=[3,3], target=6 -> [0, 1] (0.1ms)',
        '  [PASS] Hidden Case 4-8: Large arrays (N=10^5) -> OK (38ms)',
        '-------------------------------------------------------',
        'EVALUATION: ALL 8 TEST CASES PASSED ✓',
        'COMPLEXITY: Time: O(N) | Space: O(N) | Memory: 14.8 MB',
        'BAR RAISER RATING: Strong Hire (Trade-off clarity 9.6/10)'
      ]);
    } else if (cmdType === 'lru-cache') {
      setOutputLines([
        '$ intervo test --problem 12-lru-cache --lang cpp',
        'Compiling Doubly-Linked List + Unordered Map implementation...',
        '  [PASS] put(1, 1), put(2, 2), get(1) -> returns 1',
        '  [PASS] put(3, 3) -> evicts key 2 (least recently used)',
        '  [PASS] get(2) -> returns -1 (evicted)',
        '  [PASS] Concurrent eviction pressure test -> OK (12ms)',
        '-------------------------------------------------------',
        'EVALUATION: O(1) GET / O(1) PUT INVARIANTS VERIFIED ✓',
        'BAR RAISER RATING: Exceptional Architecture'
      ]);
    } else {
      setOutputLines([
        '$ intervo bar-raiser --evaluate "STAR System Design Defense"',
        'Auditing candidate answer against FAANG L6 bar...',
        '  -> Idempotency key handling: EXCELLENT (Redis distributed locks)',
        '  -> Database write-ahead logging: SOUND (Postgres transaction block)',
        '  -> Backpressure strategy: RECOMMENDED (Token bucket with jitter)',
        '-------------------------------------------------------',
        'OVERALL READINESS: 94.2% OFFER PROBABILITY INDEX'
      ]);
    }

    setTimeout(() => {
      setIsRunning(false);
    }, 450);
  };

  return (
    <div className="relative max-w-4xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-4 border-slate-700/80 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Outer CRT Plastic Monitor Frame */}
      <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-700/60 text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-slate-300">
            INTERVO CRT-77 // VINTAGE SANDBOX TERMINAL
          </span>
        </div>

        {/* Phosphor toggles & Power */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={() => setPhosphor('green')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                phosphor === 'green' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              P1 Green
            </button>
            <button
              onClick={() => setPhosphor('amber')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                phosphor === 'amber' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Amber
            </button>
            <button
              onClick={() => setPhosphor('cyan')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                phosphor === 'cyan' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Cyan
            </button>
          </div>

          <button
            onClick={() => setIsOn(!isOn)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isOn
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
            title="Toggle CRT Power"
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Curved CRT Screen Glass Container */}
      <div
        className={`relative mt-3 rounded-2xl p-5 sm:p-6 transition-all duration-300 min-h-[340px] flex flex-col justify-between overflow-hidden border ${
          isOn ? currentTheme.border : 'border-slate-800'
        } ${isOn ? currentTheme.bg : 'bg-black'} ${isOn ? currentTheme.glow : ''}`}
        style={{
          boxShadow: isOn
            ? 'inset 0 0 80px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)'
            : 'inset 0 0 100px rgba(0,0,0,0.95)'
        }}
      >
        {/* Subtle Scanlines effect overlay */}
        {isOn && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30 z-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 2px)'
            }}
          />
        )}

        {/* Screen Content */}
        {isOn ? (
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px]">
              <span className={`uppercase font-bold ${currentTheme.text}`}>
                INTERVO SANDBOX • CPU: 0.8% • HEAP: 14.8MB • PASS 100%
              </span>
              <span className="text-slate-500">TTY: /dev/pts/4</span>
            </div>

            {/* Terminal Lines with typewriter feel */}
            <div className={`space-y-1.5 font-mono leading-relaxed ${currentTheme.text}`}>
              {outputLines.map((line, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="opacity-40 select-none">&gt;</span>
                  <span className="font-medium">{line}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 pt-1">
                <span className="opacity-40 select-none">&gt;</span>
                <span className="w-2.5 h-4 bg-current animate-pulse inline-block" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center my-auto text-slate-600">
            <Power className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs">CRT DISPLAY POWER OFF</p>
            <button
              onClick={() => setIsOn(true)}
              className="mt-3 px-3 py-1 text-[11px] rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              Power On Display
            </button>
          </div>
        )}

        {/* Interactive Quick-Run Command Triggers */}
        {isOn && (
          <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Simulate:</span>
              <button
                onClick={() => runCommand('two-sum')}
                disabled={isRunning}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Run Two-Sum (Py3)</span>
              </button>

              <button
                onClick={() => runCommand('lru-cache')}
                disabled={isRunning}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Cpu className="w-3 h-3 text-sky-400" />
                <span>Run LRU Cache (C++)</span>
              </button>

              <button
                onClick={() => runCommand('eval')}
                disabled={isRunning}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Shield className="w-3 h-3 text-amber-400" />
                <span>Bar Raiser Audit</span>
              </button>
            </div>

            <button
              onClick={() =>
                setOutputLines([
                  'INTERVO OS v4.2 // BUFFER CLEARED',
                  'Ready. Select a test or run simulation above.'
                ])
              }
              className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Buffer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
