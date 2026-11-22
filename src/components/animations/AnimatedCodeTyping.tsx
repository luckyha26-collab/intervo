import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle2, RefreshCw, Cpu, Sparkles, Terminal } from 'lucide-react';

interface AnimatedCodeTypingProps {
  className?: string;
}

export const AnimatedCodeTyping: React.FC<AnimatedCodeTypingProps> = ({ className = '' }) => {
  const [activeLanguage, setActiveLanguage] = useState<'python' | 'javascript' | 'cpp'>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState(false);
  const [executionStats, setExecutionStats] = useState({ runtime: 24, memory: 14.2 });

  const codeSnippets = {
    python: [
      { text: 'def two_sum(nums: list[int], target: int) -> list[int]:', color: 'text-indigo-400' },
      { text: '    lookup = {}', color: 'text-sky-300' },
      { text: '    for i, num in enumerate(nums):', color: 'text-indigo-400' },
      { text: '        complement = target - num', color: 'text-sky-200' },
      { text: '        if complement in lookup:', color: 'text-indigo-400' },
      { text: '            return [lookup[complement], i]', color: 'text-emerald-400 font-bold' },
      { text: '        lookup[num] = i', color: 'text-sky-200' },
      { text: '    return []', color: 'text-slate-400' }
    ],
    javascript: [
      { text: 'function twoSum(nums, target) {', color: 'text-indigo-400' },
      { text: '  const map = new Map();', color: 'text-sky-300' },
      { text: '  for (let i = 0; i < nums.length; i++) {', color: 'text-indigo-400' },
      { text: '    const complement = target - nums[i];', color: 'text-sky-200' },
      { text: '    if (map.has(complement)) {', color: 'text-indigo-400' },
      { text: '      return [map.get(complement), i];', color: 'text-emerald-400 font-bold' },
      { text: '    }', color: 'text-indigo-400' },
      { text: '    map.set(nums[i], i);', color: 'text-sky-200' },
      { text: '  }', color: 'text-indigo-400' },
      { text: '  return [];', color: 'text-slate-400' },
      { text: '}', color: 'text-indigo-400' }
    ],
    cpp: [
      { text: 'vector<int> twoSum(vector<int>& nums, int target) {', color: 'text-indigo-400' },
      { text: '    unordered_map<int, int> lookup;', color: 'text-sky-300' },
      { text: '    for (int i = 0; i < nums.size(); ++i) {', color: 'text-indigo-400' },
      { text: '        int complement = target - nums[i];', color: 'text-sky-200' },
      { text: '        if (lookup.count(complement)) {', color: 'text-indigo-400' },
      { text: '            return {lookup[complement], i};', color: 'text-emerald-400 font-bold' },
      { text: '        }', color: 'text-indigo-400' },
      { text: '        lookup[nums[i]] = i;', color: 'text-sky-200' },
      { text: '    }', color: 'text-indigo-400' },
      { text: '    return {};', color: 'text-slate-400' },
      { text: '}', color: 'text-indigo-400' }
    ]
  };

  const handleRun = () => {
    setIsRunning(true);
    setTestsPassed(false);
    setTimeout(() => {
      setIsRunning(false);
      setTestsPassed(true);
      setExecutionStats({
        runtime: Math.floor(Math.random() * 20) + 12,
        memory: Number((13.5 + Math.random() * 2).toFixed(1))
      });
    }, 600);
  };

  useEffect(() => {
    // Initial passed state
    setTestsPassed(true);
  }, []);

  return (
    <div className={`rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs ${className}`}>
      {/* Editor Header Bar */}
      <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            solution.{activeLanguage === 'python' ? 'py' : activeLanguage === 'javascript' ? 'js' : 'cpp'}
          </span>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
          {(['python', 'javascript', 'cpp'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setActiveLanguage(lang);
                setTestsPassed(true);
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeLanguage === lang
                  ? 'bg-sky-500 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'python' ? 'Python 3' : lang === 'javascript' ? 'JavaScript' : 'C++ 20'}
            </button>
          ))}
        </div>

        {/* Run Button */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs hover:shadow-emerald-500/20 transition-all cursor-pointer"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Tests</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-5 space-y-1 bg-slate-950 min-h-[220px]">
        {codeSnippets[activeLanguage].map((line, idx) => (
          <motion.div
            key={`${activeLanguage}-${idx}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18, delay: idx * 0.03 }}
            className="flex items-center gap-4 leading-relaxed"
          >
            <span className="text-slate-600 select-none w-5 text-right font-mono text-[11px]">
              {idx + 1}
            </span>
            <span className={line.color}>{line.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Test Execution Result Strip */}
      <AnimatePresence mode="wait">
        {testsPassed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>All 3 Public & 5 Hidden Test Cases Passed ✓</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                <span>{executionStats.runtime}ms runtime</span>
                <span>•</span>
                <span>{executionStats.memory} MB memory</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/50 text-emerald-400">
                Case 1: nums=[2,7,11,15] ✓
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/50 text-emerald-400">
                Case 2: nums=[3,2,4] ✓
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-emerald-900/50 text-emerald-400">
                Hidden 3-8: Large arrays ✓
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
