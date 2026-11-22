import React from 'react';
import {
  Code2,
  Brain,
  ShieldCheck,
  Cpu,
  Sparkles
} from 'lucide-react';
import { AnimatedCounter } from '../animations/AnimatedCounter';
import { AnimatedSection } from '../animations/AnimatedSection';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 'challenges',
      number: 50,
      suffix: '+',
      label: 'Curated Coding Challenges',
      subtext: 'Across 10 structured DSA & System categories with automated test cases',
      icon: Code2,
      accent: 'text-sky-500'
    },
    {
      id: 'personas',
      number: 3,
      suffix: '',
      label: 'AI Bar Raiser Personas',
      subtext: 'Trained on Ex-Google, Stripe & Principal System Architect interview bars',
      icon: Brain,
      accent: 'text-indigo-500'
    },
    {
      id: 'languages',
      number: 10,
      suffix: '+',
      label: 'Supported Languages & SQL',
      subtext: 'Python 3, JavaScript, Java, C++, C, and SQL in an isolated sandbox',
      icon: Cpu,
      accent: 'text-teal-500'
    },
    {
      id: 'encryption',
      number: 100,
      suffix: '%',
      label: 'Client-Side AES-256 Vault',
      subtext: 'Zero-knowledge resume and answer storage encrypted in local browser memory',
      icon: ShieldCheck,
      accent: 'text-emerald-500'
    }
  ];

  return (
    <section
      className="py-16 sm:py-20 border-y border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#111D1A] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="p-6 rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] shadow-xs hover:border-[#172D29] dark:hover:border-[#C6D58A] transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#EBE9DF] dark:bg-[#24362F] text-[#172D29] dark:text-[#C6D58A] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#727A73] dark:text-[#B6C0B8] font-semibold uppercase">
                      Curated Scale
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#172D29] dark:text-[#F4F0E7] tabular-nums font-display">
                    <AnimatedCounter value={stat.number} suffix={stat.suffix} duration={1.6} />
                  </div>

                  <h3 className="text-sm font-bold text-[#292F2C] dark:text-[#F4F0E7] mt-1 font-display">
                    {stat.label}
                  </h3>

                  <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1.5 leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
