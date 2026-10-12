import React, { useState, useMemo } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Users,
  Building,
  CheckCircle2,
  X,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
  onOpenGetStarted: (mode?: 'hire' | 'start') => void;
}

interface AboutFaqItem {
  id: string;
  category: 'vetting' | 'escrow' | 'ip' | 'squads' | 'models' | 'campuses';
  categoryLabel: string;
  question: string;
  answer: string;
  highlight?: string;
}

const ABOUT_QUESTIONS: AboutFaqItem[] = [
  {
    id: 'faq-1',
    category: 'vetting',
    categoryLabel: 'Engineer Vetting',
    question: 'How does Sudora vet and verify software engineers?',
    answer: 'Every engineer on Sudora undergoes a rigorous 4-stage screening gauntlet. We evaluate algorithmic mastery, live distributed system design, code quality and security practices, and professional communication. Only the top 1.5% of applicants are verified and admitted into our talent network.',
    highlight: 'Top 1.5% acceptance bar with multi-stage technical benchmarks'
  },
  {
    id: 'faq-2',
    category: 'vetting',
    categoryLabel: 'Engineer Vetting',
    question: 'How fast can an engineer or dedicated squad start on our project?',
    answer: 'Individual verified engineers can be matched and mobilised in as little as 24 to 48 hours. For pre-assembled engineering squads, our technical directors typically complete codebase onboarding and plug directly into your GitHub repos and Slack channels within 48 hours.',
    highlight: 'Squad mobilization ready in 24–48 hours'
  },
  {
    id: 'faq-3',
    category: 'vetting',
    categoryLabel: 'Engineer Vetting',
    question: 'Can I interview candidates before committing to a contract?',
    answer: 'Yes, absolutely. Before signing or depositing funds into milestone escrow, you can review detailed developer dossiers, check validated code metrics, and conduct 30-minute technical fit interviews with prospective candidates.',
    highlight: 'Zero-obligation candidate review and live interviews'
  },
  {
    id: 'faq-4',
    category: 'escrow',
    categoryLabel: 'Milestone Escrow',
    question: 'How does milestone escrow payment protection work?',
    answer: 'Your project funds remain securely held in escrow until agreed project deliverables and milestones are reviewed and approved by your team. Engineers only receive payment once you confirm the pull request or milestone meets your technical acceptance criteria.',
    highlight: '100% payment security with milestone-based approval'
  },
  {
    id: 'faq-5',
    category: 'escrow',
    categoryLabel: 'Milestone Escrow',
    question: 'What happens if a milestone deliverable does not meet our requirements?',
    answer: 'You have full control during the review window to request revisions based on agreed specifications. If code quality or delivery standards are not met, our dedicated engineering dispute team conducts a code audit. Unreleased escrow funds can be credited back or refunded.',
    highlight: 'Risk-free revisions and dispute resolution policy'
  },
  {
    id: 'faq-6',
    category: 'escrow',
    categoryLabel: 'Milestone Escrow',
    question: 'What payment methods and international currencies do you support?',
    answer: 'We support all major corporate credit cards, ACH transfers, bank wires, and SEPA payments. Billing is available in USD, EUR, GBP, CAD, AUD, and over 45 local currencies with automated, audit-ready VAT/GST invoices.',
    highlight: 'ACH, Wire, Cards, and 45+ international currencies'
  },
  {
    id: 'faq-7',
    category: 'ip',
    categoryLabel: 'IP & Security',
    question: 'Who owns the intellectual property and code written by talent?',
    answer: 'You retain 100% exclusive intellectual property and copyright ownership over all code, documentation, architectures, and assets created. Every contract includes strict IP assignment and confidentiality agreements by default.',
    highlight: '100% full intellectual property transfer to your company'
  },
  {
    id: 'faq-8',
    category: 'ip',
    categoryLabel: 'IP & Security',
    question: 'Are engagements protected by non-disclosure agreements (NDAs) and SOC2 compliance?',
    answer: 'Yes. All talent must execute mutual enterprise-grade NDAs before accessing any client codebases or proprietary documentation. Our platform operates with SOC2 Type II security principles and strict zero-trust data access controls.',
    highlight: 'Ironclad NDAs and SOC2 Type II compliance'
  },
  {
    id: 'faq-9',
    category: 'squads',
    categoryLabel: 'Squad Deployment',
    question: 'Can I hire an entire autonomous engineering squad rather than solo developers?',
    answer: 'Yes. You can deploy cross-functional squads containing a Lead Systems Architect, Senior Full-Stack Engineers, Cloud/DevOps Leads, and QA Automation specialists. Squads are managed under unified milestones to deliver turnkey features.',
    highlight: 'Autonomous turnkey squads with architect leadership'
  },
  {
    id: 'faq-10',
    category: 'squads',
    categoryLabel: 'Squad Deployment',
    question: 'How do your distributed squads integrate with our internal team?',
    answer: 'Our engineers operate as a seamless extension of your engineering organization. We guarantee a minimum 4-hour working overlap with your primary time zone, plug directly into your GitHub/GitLab repositories, communicate across your Slack channels, and actively participate in your sprint planning and standups.',
    highlight: 'Direct GitHub integration with guaranteed 4h timezone overlap'
  },
  {
    id: 'faq-11',
    category: 'squads',
    categoryLabel: 'Squad Deployment',
    question: 'Can we convert freelance engineers to permanent full-time hires?',
    answer: 'Yes! We actively support contract-to-hire pathways. If an engineer becomes indispensable to your team, you can transition them to full-time internal employment after a standard 6-month engagement with transparent terms and zero hidden penalties.',
    highlight: 'Contract-to-hire supported with zero surprise buyout fees'
  },
  {
    id: 'faq-12',
    category: 'models',
    categoryLabel: 'Engagement Models',
    question: 'What engagement models and contracts do you offer?',
    answer: 'We provide three tailored engagement frameworks: (1) Dedicated Engineering Squads for end-to-end product builds, (2) Staff Augmentation for embedding senior specialists into your active sprints, and (3) Fixed-Scope Milestone Contracts with guaranteed delivery dates and escrow payment safety.',
    highlight: 'Flexible models: Turnkey Pods, Staff Aug, or Fixed Scope'
  },
  {
    id: 'faq-13',
    category: 'campuses',
    categoryLabel: 'Workspaces & Story',
    question: 'Where are your engineering campuses located and can clients visit?',
    answer: 'We operate dedicated technology campuses and hubs in San Francisco, Austin, London, and Singapore. These modern workspaces serve as collaboration headquarters for our staff architects and technical leads. Clients are always welcome to schedule in-person architecture sprint workshops or campus visits.',
    highlight: 'Global technology campuses in SF, Austin, London & Singapore'
  },
  {
    id: 'faq-14',
    category: 'campuses',
    categoryLabel: 'Workspaces & Story',
    question: 'Who is Sudora and what problem do you solve?',
    answer: 'Sudora was founded to bridge the critical talent gap between visionary enterprises and the world\'s top 1.5% software engineering talent. We provide pre-screened senior engineers and dedicated turnkey squads backed by milestone escrow, SOC2 compliance, and technical oversight.',
    highlight: 'Eliminating the 60+ day recruitment drag with 48h mobilization'
  }
];

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenGetStarted }) => {
  const { teamMembers, cmsSettings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true,
    'faq-7': true
  });

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'vetting', label: 'Engineer Vetting' },
    { key: 'escrow', label: 'Milestone Escrow' },
    { key: 'ip', label: 'IP & Security' },
    { key: 'squads', label: 'Squad Deployment' },
    { key: 'models', label: 'Engagement Models' },
    { key: 'campuses', label: 'Workspaces & Story' }
  ];

  const filteredQuestions = useMemo(() => {
    return ABOUT_QUESTIONS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        Boolean(item.highlight && item.highlight.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    ABOUT_QUESTIONS.forEach((q) => {
      allOpen[q.id] = true;
    });
    setOpenQuestions(allOpen);
  };

  const collapseAll = () => {
    setOpenQuestions({});
  };

  return (
    <main className="w-full">
      {/* Admin Quick Control Banner */}
      <div className="bg-primary/5 border-b border-primary/20 py-2 px-gutter">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-label-sm">
          <div className="flex items-center gap-2 text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>About &amp; Team Page • Content managed live via Admin CMS</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('admin-team')}
              className="text-primary hover:text-primary/80 font-bold flex items-center gap-1 cursor-pointer bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined text-sm">groups</span>
              <span>Manage Team CMS</span>
            </button>
            <button
              onClick={() => onNavigate('admin-cms')}
              className="text-primary hover:text-primary/80 font-bold flex items-center gap-1 cursor-pointer bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              <span>Edit Mission in CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-gutter py-space-xl max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-space-md">
          <div className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full text-primary text-label-md font-label-md font-semibold">
            <span className="material-symbols-outlined text-sm">verified</span> Elite Engineering Ecosystem
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-background tracking-tight">
            Building Technology That Moves Businesses Forward
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Empowering enterprises and high-growth startups with elite engineering teams, transparent processes, and world-class digital solutions.
          </p>
        </div>

        {/* Company team collaboration image */}
        <div className="mt-space-xl rounded-xl overflow-hidden border border-outline-variant/30 shadow-lg bg-surface-container-lowest">
          <div
            className="w-full h-96 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVXZYlXiAOtkePYSPmjnr_JuJLQ22NjmLXOrnpT5XKgycmuuX70efA8FiD6G45mCsGEUbqWwyvy0eb_F_7gBiAy0QfdyShObaoPDvziiLdsDpRqkQUlohmYs_DsAdAKyq4VLzHbFZ-H3E46xjM_NPxQWYg3svpJTlcYCgWJLrSByHeH_-ta07To6TZvR9UG0ixn0o3Q0fSjdeJHaUGPeqviY5mDahN21RKoAE1U_sxA_77YWMAZkpj')`
            }}
          />
        </div>
      </section>

      {/* Story, Mission & Vision Section */}
      <section className="bg-surface-container-low px-gutter py-space-xl border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Our Story */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">history</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Our Story</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                How Sudora was founded to bridge the top 1% tech talent gap. We believe elite software engineering shouldn't be locked inside tech giants; visionary companies everywhere deserve direct access to world-class builders.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">{cmsSettings.missionTitle || 'Mission'}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {cmsSettings.missionDesc || 'To accelerate global innovation by connecting visionary companies with elite software engineers and designers through seamless, high-velocity collaboration platforms.'}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Vision</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Shaping the future of work through seamless, agile, and secure engineering collaboration platforms that remove friction from digital product creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Grid */}
      <section className="px-gutter py-space-xl max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-space-xl space-y-space-sm">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Driven By Numbers</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Our track record speaks volumes about our commitment to engineering excellence.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg">
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 text-center shadow-sm">
            <div className="font-headline-xl text-headline-xl text-primary mb-space-xs font-bold">10+</div>
            <div className="font-body-md text-body-md text-on-surface-variant font-medium">Projects Delivered</div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 text-center shadow-sm">
            <div className="font-headline-xl text-headline-xl text-primary mb-space-xs font-bold">20+</div>
            <div className="font-body-md text-body-md text-on-surface-variant font-medium">Elite Professionals</div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 text-center shadow-sm">
            <div className="font-headline-xl text-headline-xl text-primary mb-space-xs font-bold">15+</div>
            <div className="font-body-md text-body-md text-on-surface-variant font-medium">Core Technologies</div>
          </div>
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 text-center shadow-sm">
            <div className="font-headline-xl text-headline-xl text-primary mb-space-xs font-bold">95%</div>
            <div className="font-body-md text-body-md text-on-surface-variant font-medium">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="bg-surface-container-low px-gutter py-space-xl border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-space-xl space-y-space-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-background">Our Core Values</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The guiding principles that dictate how we build, collaborate, and grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm space-y-space-md">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Innovation</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Push boundaries with cutting-edge tech and creative problem-solving.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm space-y-space-md">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Quality</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Relentless adherence to elite engineering standards and best practices.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm space-y-space-md">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Transparency</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                No hidden fees, clear milestones, and open communication.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm space-y-space-md">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">group</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Collaboration</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Working hand-in-hand as an extension of your core team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <section className="px-gutter py-space-xl max-w-7xl mx-auto" id="team">
        <div className="text-center max-w-2xl mx-auto mb-space-xl space-y-space-sm">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Leadership &amp; Experts</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Meet the experts steering Sudora toward technological excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {teamMembers.map((member) => {
            const memberSkills = member.skills && member.skills.length > 0 ? member.skills : [
              { name: 'System Architecture', level: 'Master' as const, percentage: 95, years: '10+ Yrs' },
              { name: 'Full-Stack Dev', level: 'Expert' as const, percentage: 92, years: '8+ Yrs' },
              { name: 'Cloud & DevOps', level: 'Expert' as const, percentage: 90, years: '7+ Yrs' },
              { name: 'API Security', level: 'Senior' as const, percentage: 88, years: '6+ Yrs' }
            ];

            return (
              <div
                key={member.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:border-primary/50 transition-all group"
              >
                <div className="relative h-64 overflow-hidden rounded-t-xl bg-surface-container-low">
                  <div
                    className="w-full h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${member.image}')` }}
                  />
                </div>
                <div className="p-space-lg space-y-space-sm flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-body-sm mb-2">{member.role}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {member.bio}
                    </p>

                    {/* Dynamic Skill Badges with Hover Proficiency Level Tooltips */}
                    <div className="pt-3.5 border-t border-outline-variant/20 mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Core Competencies</span>
                        </span>
                        <span className="text-[10px] text-on-surface-variant/70 italic">
                          Hover for proficiency
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {memberSkills.map((skill) => (
                          <div key={skill.name} className="relative group/skill">
                            {/* Skill Badge Pill */}
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 hover:border-primary/50 px-2.5 py-1 rounded-lg text-xs font-semibold text-on-surface transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  skill.level === 'Master'
                                    ? 'bg-emerald-500 shadow-emerald-500/50 shadow-xs'
                                    : skill.level === 'Expert'
                                    ? 'bg-blue-500 shadow-blue-500/50 shadow-xs'
                                    : 'bg-purple-500 shadow-purple-500/50 shadow-xs'
                                }`}
                              />
                              <span>{skill.name}</span>
                            </button>

                            {/* Interactive Hover Proficiency Card / Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-48 p-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-xl opacity-0 invisible group-hover/skill:opacity-100 group-hover/skill:visible transition-all duration-200 pointer-events-none z-40">
                              {/* Header: Skill Name & Level Badge */}
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span className="text-xs font-bold text-on-surface truncate">
                                  {skill.name}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                                    skill.level === 'Master'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : skill.level === 'Expert'
                                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                                  }`}
                                >
                                  {skill.level}
                                </span>
                              </div>

                              {/* Proficiency Progress Bar */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
                                  <span>Proficiency</span>
                                  <span className="font-bold text-primary">{skill.percentage}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      skill.level === 'Master'
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                        : skill.level === 'Expert'
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-400'
                                        : 'bg-gradient-to-r from-purple-600 to-indigo-400'
                                    }`}
                                    style={{ width: `${skill.percentage}%` }}
                                  />
                                </div>
                              </div>

                              {/* Track Record Tenure */}
                              {skill.years && (
                                <div className="mt-2 pt-1.5 border-t border-outline-variant/20 flex items-center justify-between text-[10px] text-on-surface-variant">
                                  <span>Track Record</span>
                                  <span className="font-semibold text-on-surface">{skill.years}</span>
                                </div>
                              )}

                              {/* Downward Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-surface-container-lowest border-r border-b border-outline-variant/60 rotate-45" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-md pt-space-md border-t border-outline-variant/20 mt-4">
                    <a
                      href={member.socials.linkedin || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-label-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-sm">share</span> LinkedIn
                    </a>
                    <a
                      href={member.socials.github || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-label-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-sm">code</span> GitHub
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Campuses & Office Hubs */}
      <section className="bg-surface-container-low px-gutter py-space-xl border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
            <div>
              <span className="text-label-sm font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                Global Workspaces
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-background mt-2">
                Our Corporate Offices &amp; Engineering Campuses
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Modern, high-velocity workspaces where our staff architects, security leads, and engineering cohorts collaborate.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="text-primary font-semibold text-label-md flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Schedule a Campus Visit</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {(cmsSettings.officeHubs || []).map((hub) => (
              <div
                key={hub.id}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="h-44 overflow-hidden relative bg-surface-container">
                  <img
                    src={hub.image}
                    alt={hub.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {hub.badge}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded">
                    {hub.capacity}
                  </div>
                </div>
                <div className="p-space-md flex flex-col flex-1 justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">
                      {hub.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                      <span>{hub.city}, {hub.country}</span>
                    </p>
                    <p className="text-[11px] text-outline mt-1 line-clamp-1">{hub.address}</p>
                  </div>
                  <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap gap-1">
                    {hub.specs.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="bg-surface-container text-on-surface-variant text-[10px] px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          QUESTIONS & FAQ: MARKETPLACE KNOWLEDGE BASE
         ========================================================= */}
      <section className="px-gutter py-space-xl max-w-7xl mx-auto" id="about-faq">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Marketplace Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            Everything You Need to Know About the Marketplace
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Quick answers regarding engineer vetting, milestone escrow protection, IP ownership, and squad deployment.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by topic (e.g. vetting, IP ownership, squads, campuses)..."
                className="w-full bg-surface-container-lowest text-on-surface text-sm border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all placeholder:text-on-surface-variant/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-md cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Actions: Expand/Collapse All */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={expandAll}
                className="px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer border border-primary/20"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-2 text-xs font-semibold text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors cursor-pointer border border-outline-variant/40"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Category Filter Pills & Results Counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 border-t border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeCategory === cat.key
                      ? 'bg-primary text-on-primary shadow-sm font-semibold'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant shrink-0">
              <span>
                Showing <strong className="text-on-surface">{filteredQuestions.length}</strong> questions
              </span>
              {(searchQuery || activeCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Questions Accordion List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-10 text-center max-w-lg mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-on-surface">No Questions Found</h3>
            <p className="text-xs text-on-surface-variant">
              No answers match "{searchQuery}" in category "{categories.find(c => c.key === activeCategory)?.label}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredQuestions.map((item) => {
              const isOpen = Boolean(openQuestions[item.id]);
              return (
                <div
                  key={item.id}
                  className={`bg-surface-container-lowest border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-primary/50 shadow-sm ring-1 ring-primary/20'
                      : 'border-outline-variant/40 hover:border-outline-variant'
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                          {item.categoryLabel}
                        </span>
                        {item.highlight && (
                          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md hidden sm:inline-block">
                            {item.highlight}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-on-surface tracking-tight leading-snug">
                        {item.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-primary text-on-primary rotate-180'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 bg-surface-container-lowest/50">
                      <p className="mt-2">{item.answer}</p>
                      {item.highlight && (
                        <div className="mt-3.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-xs font-semibold text-on-surface">
                            Key Standard: {item.highlight}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Help Desk Bar */}
        <div className="mt-10 bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 hidden sm:flex">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-on-surface">Have a project-specific question?</h4>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Our solutions architects are ready to review your technical requirements and team composition.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenGetStarted('hire')}
              className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Consult an Architect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/60 px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
            >
              Contact Advisory Team
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-on-primary py-space-xl px-gutter my-space-xl">
        <div className="max-w-4xl mx-auto text-center space-y-space-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-primary">
            Let's Build Something Great Together
          </h2>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-2xl mx-auto">
            Ready to accelerate your product roadmap with elite engineering talent? Get in touch with our team today.
          </p>
          <div className="flex flex-wrap justify-center gap-space-md">
            <button
              onClick={() => onOpenGetStarted('start')}
              className="bg-surface text-primary hover:bg-surface-bright px-space-lg py-space-md rounded-lg font-medium text-body-md transition-all shadow-sm cursor-pointer font-semibold"
            >
              Get Started
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-transparent border border-primary-fixed-dim text-on-primary hover:bg-primary-container px-space-lg py-space-md rounded-lg font-medium text-body-md transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
