import React from 'react';
import {
  Brain,
  FileText,
  Code2,
  Users,
  Target,
  Building2,
  LineChart,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../context/AppContext';
import { AnimatedSection } from '../animations/AnimatedSection';
import { SpotlightCard } from '../animations/SpotlightCard';

export const FeaturesSection: React.FC = () => {
  const { navigateToProtected } = useApp();

  const features: {
    id: string;
    targetTab: ActiveTab;
    title: string;
    kicker: string;
    description: string;
    bullets: string[];
    icon: any;
    accent: string;
    actionText: string;
  }[] = [
    {
      id: 'mock-interviews',
      targetTab: 'setup',
      title: 'AI Mock Interviews',
      kicker: 'Realistic Voice & Text Rounds',
      description:
        'Conduct full-length timed behavioral and technical interviews with AI bar raisers who probe your trade-offs in real time.',
      bullets: ['Personalized role-specific questions', 'Realistic interviewer personas', 'Instant rubrics & voice output'],
      icon: Brain,
      accent: 'from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400',
      actionText: 'Configure Interview'
    },
    {
      id: 'resume-intelligence',
      targetTab: 'setup',
      title: 'Resume Intelligence',
      kicker: 'Zero-Leak Candidate Context',
      description:
        'Upload your resume to extract key tech stacks and candidate projects, ensuring questions match your real background.',
      bullets: ['Resume-based questions', 'Automated skill extraction', 'Project discussion preparation'],
      icon: FileText,
      accent: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400',
      actionText: 'Analyze Resume'
    },
    {
      id: 'live-coding-arena',
      targetTab: 'coding-arena',
      title: 'Live Coding Arena',
      kicker: 'Monaco Sandbox & AI Reviewer',
      description:
        'Solve structured algorithmic challenges with a full Monaco code editor, sub-second code execution, and AI guidance.',
      bullets: ['Interactive Monaco code editor', 'Multiple programming languages', 'Real-time test execution & AI hints'],
      icon: Code2,
      accent: 'from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400',
      actionText: 'Enter Coding Arena'
    },
    {
      id: 'group-discussion',
      targetTab: 'gd-room',
      title: 'Group Discussion Arena',
      kicker: 'Multi-Participant Round Table',
      description:
        'Simulate multi-candidate group discussions with an AI moderator managing turn-taking and conversational relevance.',
      bullets: ['AI moderator with turn enforcement', 'Real-time peer interactions', 'Communication & leadership scores'],
      icon: Users,
      accent: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400',
      actionText: 'Join GD Arena'
    },
    {
      id: 'weakness-detector',
      targetTab: 'weaknesses',
      title: 'Weakness Detector',
      kicker: 'Root-Cause Remediation',
      description:
        'Automatically aggregate missed technical concepts across your interview attempts and generate targeted recovery drills.',
      bullets: ['Automatic gap identification', 'Root-cause diagnostic analysis', '1-click targeted practice drills'],
      icon: Target,
      accent: 'from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400',
      actionText: 'Inspect Weaknesses'
    },
    {
      id: 'company-intel',
      targetTab: 'setup',
      title: 'Company Interview Intelligence',
      kicker: 'Tier-1 Target Prep',
      description:
        'Prepare for specific tech giants and fast-growing startups with curated question patterns from public interview formats.',
      bullets: ['Company-specific question themes', 'Publicly reported interview formats', 'Role-specific domain challenges'],
      icon: Building2,
      accent: 'from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400',
      actionText: 'Target Companies'
    },
    {
      id: 'performance-analytics',
      targetTab: 'analytics',
      title: 'Performance Analytics',
      kicker: 'Longitudinal Growth Tracking',
      description:
        'Monitor your interview readiness trajectory, competency scores across four dimensions, and estimated job-offer readiness.',
      bullets: ['Competency breakdown radars', 'Readiness score index', 'Personalized learning roadmap'],
      icon: LineChart,
      accent: 'from-teal-500/10 to-emerald-500/10 text-teal-600 dark:text-teal-400',
      actionText: 'View Analytics'
    },
    {
      id: 'project-defense',
      targetTab: 'setup',
      title: 'Project Defense',
      kicker: 'Technical Architecture Defense',
      description:
        'Practice defending your actual architectural choices, database schema decisions, and production failure recoveries.',
      bullets: ['Explain complex resume projects', 'Defend technical decisions', 'Practice real-world edge cases'],
      icon: ShieldAlert,
      accent: 'from-indigo-500/10 to-sky-500/10 text-indigo-600 dark:text-indigo-400',
      actionText: 'Practice Defense'
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#EBE9DF]/30 dark:bg-[#111D1A] transition-colors border-t border-[#DFE1D8] dark:border-[#35443D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE5DF] dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] text-[#172D29] dark:text-[#C6D58A] text-xs font-semibold">
              <span className="text-[#C47759]">✦</span>
              <span>Integrated Preparation Suite</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#172D29] dark:text-[#F4F0E7] [text-wrap:balance] font-display">
              Everything You Need to Ace Your Next Interview
            </h2>

            <p className="text-sm sm:text-base text-[#727A73] dark:text-[#B6C0B8] leading-relaxed [text-wrap:balance]">
              From resume parsing and technical coding to multi-participant GD rounds and gap remediation,
              INTERVO gives you an end-to-end interview flight simulator.
            </p>
          </div>
        </AnimatedSection>

        {/* 8-Card Responsive Grid */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            // Restrained Editorial Forest icon accents: alternating Forest, Terracotta, and Matcha
            const iconBg = idx % 3 === 0 
              ? 'bg-[#DCE5DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A]' 
              : idx % 3 === 1 
              ? 'bg-[#F7EDE8] text-[#C47759] dark:bg-[#24362F] dark:text-[#D18A6D]' 
              : 'bg-[#F3F7E5] text-[#4F5E24] dark:bg-[#24362F] dark:text-[#C6D58A]';

            return (
              <SpotlightCard
                key={feature.id}
                spotlightColor="rgba(23, 45, 41, 0.08)"
                className="p-6 flex flex-col justify-between group rounded-2xl bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D]"
              >
                <div className="space-y-4">
                  {/* Icon & Kicker */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${iconBg} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#727A73] dark:text-[#B6C0B8] uppercase tracking-wider">
                      {feature.kicker}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#172D29] dark:text-[#F4F0E7] font-display group-hover:text-[#C47759] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 pt-2 border-t border-[#DFE1D8]/60 dark:border-[#35443D] text-xs text-[#727A73] dark:text-[#B6C0B8] font-medium">
                    {feature.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C47759] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Action */}
                <div className="pt-5 mt-4 border-t border-[#DFE1D8]/60 dark:border-[#35443D]">
                  <button
                    onClick={() => navigateToProtected(feature.targetTab)}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] hover:bg-[#172D29] hover:text-[#F4F0E7] dark:hover:bg-[#C6D58A] dark:hover:text-[#172D29] text-[#292F2C] dark:text-[#F4F0E7] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>{feature.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </SpotlightCard>
            );
          })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
