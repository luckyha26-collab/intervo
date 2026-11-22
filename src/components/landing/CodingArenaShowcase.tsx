import React, { useState } from 'react';
import {
  Code2,
  Play,
  CheckCircle2,
  Cpu,
  Sparkles,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Check,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedCodeTyping } from '../animations/AnimatedCodeTyping';

export const CodingArenaShowcase: React.FC = () => {
  const { navigateToProtected } = useApp();

  return (
    <section
      id="coding-arena"
      className="py-20 sm:py-28 bg-[#F4F0E7] dark:bg-[#111D1A] border-t border-[#DFE1D8] dark:border-[#35443D] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Headline & Description */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5DF] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5 text-[#C47759]" />
            <span>Dedicated Live Coding Arena</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] [text-wrap:balance] font-display">
            Code. Execute. Improve. Repeat.
          </h2>

          <p className="text-sm sm:text-base text-[#727A73] dark:text-[#B6C0B8] leading-relaxed [text-wrap:balance]">
            Experience real technical coding interviews with AI-generated challenges, secure code execution,
            and intelligent performance evaluation.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigateToProtected('coding-arena')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#172D29] hover:bg-[#223F3A] dark:bg-[#C6D58A] dark:text-[#172D29] dark:hover:bg-[#d8e59e] text-[#F4F0E7] font-bold text-xs shadow-md transition-all cursor-pointer group"
            >
              <span>Explore Coding Arena</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Realistic Coding Editor Mockup in Charcoal Ink & Forest */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#292F2C] dark:bg-[#1B2B26] border border-[#35443D] shadow-2xl overflow-hidden text-[#F4F0E7] font-sans">
          {/* Editor Header Bar */}
          <div className="px-5 py-3.5 bg-[#172D29] dark:bg-[#111D1A] border-b border-[#35443D] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C47759] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCE5DF]/60 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6D58A] inline-block" />
              </div>
              <span className="text-xs font-mono font-bold text-[#DCE5DF]">
                problem_01_two_sum.py
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#B6C0B8] font-mono">
              <span className="flex items-center gap-1.5 text-[#C6D58A]">
                <span className="w-2 h-2 rounded-full bg-[#C6D58A] animate-pulse" />
                Live Code Execution Sandbox Ready
              </span>
            </div>
          </div>

          {/* Split Workspace Preview (Left: Problem & AI Observation | Right: Code & Tests) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Left 5 Cols: Problem Statement & Interviewer Note */}
            <div className="lg:col-span-5 p-5 border-r border-[#35443D] bg-[#24362F]/70 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#F4F0E7] font-display">Two Sum & Complement Hashing</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#172D29] text-[#C6D58A] border border-[#35443D]">
                    Easy
                  </span>
                </div>
                <p className="text-xs text-[#B6C0B8]">Arrays & Hash Maps · O(n) Target</p>
              </div>

              <p className="text-xs text-[#DCE5DF] leading-relaxed">
                Given an array of integers <code className="text-[#C6D58A] font-mono">nums</code> and an integer{' '}
                <code className="text-[#C6D58A] font-mono">target</code>, return indices of the two numbers such that they add up to target.
              </p>

              <div className="p-3 rounded-xl bg-[#1B2B26] border border-[#35443D] text-xs font-mono space-y-1">
                <span className="text-[10px] text-[#B6C0B8] uppercase font-bold block">Example 1</span>
                <div>Input: nums = [2,7,11,15], target = 9</div>
                <div className="text-[#C6D58A]">Output: [0,1]</div>
              </div>

              {/* AI Interviewer Live Observation */}
              <div className="p-3.5 rounded-xl bg-[#172D29] border border-[#223F3A] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C6D58A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6D58A]" />
                  <span>AI Bar Raiser Feedback</span>
                </div>
                <p className="text-xs text-[#F4F0E7] leading-relaxed">
                  "Optimal single-pass hash map approach. Time complexity is O(n), auxiliary space is O(n). Excellent trade-off explanation."
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Monaco Animated Code Typing & Test Suite */}
            <div className="lg:col-span-7 bg-[#1B2B26] p-2 sm:p-3">
              <AnimatedCodeTyping className="border-0 shadow-none bg-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
