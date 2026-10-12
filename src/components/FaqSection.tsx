import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  Search,
  HelpCircle,
  ShieldCheck,
  Users,
  CreditCard,
  Lock,
  Sparkles,
  MessageCircle,
  X
} from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'vetting' | 'escrow' | 'ip' | 'squads';
  categoryLabel: string;
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'vetting',
    categoryLabel: 'Hiring & Vetting',
    question: 'How does Sudora vet and verify software engineers?',
    answer: 'Every engineer on our platform undergoes a rigorous 4-stage screening gauntlet. We evaluate algorithmic mastery, live distributed system design, code quality and security practices, and professional communication. Only the top 1.5% of applicants are verified and admitted into our talent network.',
    highlight: 'Top 1.5% acceptance bar with multi-stage technical benchmarks'
  },
  {
    id: 'faq-2',
    category: 'vetting',
    categoryLabel: 'Hiring & Vetting',
    question: 'How fast can an engineer or dedicated squad start on our project?',
    answer: 'Individual verified engineers can be matched and mobilised in as little as 24 to 48 hours. For pre-assembled engineering squads, our technical directors typically complete codebase onboarding and plug directly into your GitHub repos and Slack channels within 48 hours.',
    highlight: 'Squad mobilization ready in 24–48 hours'
  },
  {
    id: 'faq-3',
    category: 'vetting',
    categoryLabel: 'Hiring & Vetting',
    question: 'Can I interview candidates before committing to a contract?',
    answer: 'Yes, absolutely. Before signing or depositing funds into milestone escrow, you can review detailed developer dossiers, check validated code metrics, and conduct 30-minute technical fit interviews with prospective candidates.',
    highlight: 'Zero-obligation candidate review and live interviews'
  },
  {
    id: 'faq-4',
    category: 'escrow',
    categoryLabel: 'Payments & Escrow',
    question: 'How does milestone escrow payment protection work?',
    answer: 'Your project funds remain securely held in escrow until agreed project deliverables and milestones are reviewed and approved by your team. Engineers only receive payment once you confirm the pull request or milestone meets your technical acceptance criteria.',
    highlight: '100% payment security with milestone-based approval'
  },
  {
    id: 'faq-5',
    category: 'escrow',
    categoryLabel: 'Payments & Escrow',
    question: 'What happens if a milestone deliverable does not meet our requirements?',
    answer: 'You have full control during the review window to request revisions based on agreed specifications. If code quality or delivery standards are not met, our dedicated engineering dispute team conducts a code audit. Unreleased escrow funds can be credited back or refunded.',
    highlight: 'Risk-free revisions and dispute resolution policy'
  },
  {
    id: 'faq-6',
    category: 'escrow',
    categoryLabel: 'Payments & Escrow',
    question: 'What payment methods and international currencies do you support?',
    answer: 'We support all major corporate credit cards, ACH transfers, bank wires, and SEPA payments. Billing is available in USD, EUR, GBP, CAD, AUD, and over 45 local currencies with automated, audit-ready VAT/GST invoices.',
    highlight: 'ACH, Wire, Cards, and 45+ international currencies'
  },
  {
    id: 'faq-7',
    category: 'ip',
    categoryLabel: 'Security & IP',
    question: 'Who owns the intellectual property and code written by talent?',
    answer: 'You retain 100% exclusive intellectual property and copyright ownership over all code, documentation, architectures, and assets created. Every contract includes strict IP assignment and confidentiality agreements by default.',
    highlight: '100% full intellectual property transfer to your company'
  },
  {
    id: 'faq-8',
    category: 'ip',
    categoryLabel: 'Security & IP',
    question: 'Are engagements protected by non-disclosure agreements (NDAs) and SOC2 compliance?',
    answer: 'Yes. All talent must execute mutual enterprise-grade NDAs before accessing any client codebases or proprietary documentation. Our platform operates with SOC2 Type II security principles and strict zero-trust data access controls.',
    highlight: 'Ironclad NDAs and SOC2 Type II compliance'
  },
  {
    id: 'faq-9',
    category: 'squads',
    categoryLabel: 'Squads & Delivery',
    question: 'Can I hire an entire autonomous engineering squad rather than solo developers?',
    answer: 'Yes. You can deploy cross-functional squads containing a Lead Systems Architect, Senior Full-Stack Engineers, Cloud/DevOps Leads, and QA Automation specialists. Squads are managed under unified milestones to deliver turnkey features.',
    highlight: 'Autonomous turnkey squads with architect leadership'
  },
  {
    id: 'faq-10',
    category: 'squads',
    categoryLabel: 'Squads & Delivery',
    question: 'Can we hire a freelancer full-time as a permanent employee later?',
    answer: 'Yes! We offer transparent contract-to-hire conversion paths. After working with a contractor on our marketplace for a standard duration, you can seamlessly bring them onto your payroll as a permanent team member.',
    highlight: 'Contract-to-hire direct employment flexibility'
  }
];

interface FaqSectionProps {
  onOpenGetStarted?: (mode?: 'hire' | 'start') => void;
  onNavigate?: (view: any) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenGetStarted,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true
  });

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'vetting', label: 'Hiring & Vetting', icon: Users },
    { id: 'escrow', label: 'Payments & Escrow', icon: CreditCard },
    { id: 'ip', label: 'Security & IP', icon: Lock },
    { id: 'squads', label: 'Squads & Delivery', icon: ShieldCheck }
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenIds(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenIds({});
  };

  return (
    <section className="px-gutter max-w-7xl mx-auto py-4" id="faq">
      {/* Header Container */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-primary uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Everything You Need to Know About the Marketplace
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
          Quick answers regarding engineer vetting, milestone escrow protection, IP ownership, and squad deployment.
        </p>
      </div>

      {/* Search and Category Control Bar */}
      <div className="bg-surface-container-low border border-outline-variant/60 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search answers (e.g. escrow, vetting, IP, squads, refund)..."
              className="w-full pl-10 pr-9 py-2.5 bg-surface-container-lowest border border-outline-variant/70 rounded-xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer p-0.5"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Expand / Collapse Controls */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-xs">
            <button
              onClick={handleExpandAll}
              className="px-3 py-2 text-primary font-semibold hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-outline-variant">|</span>
            <button
              onClick={handleCollapseAll}
              className="px-3 py-2 text-on-surface-variant hover:text-on-surface font-medium hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? FAQ_DATA.length
                : FAQ_DATA.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className={`bg-surface-container-lowest border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-primary/50 shadow-sm'
                    : 'border-outline-variant/60 hover:border-outline-variant'
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary/70 shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-on-surface tracking-tight">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded hidden sm:inline-block">
                      {faq.categoryLabel}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        isOpen
                          ? 'bg-primary/10 text-primary rotate-180'
                          : 'bg-surface-container text-outline'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30 animate-in fade-in duration-200">
                    <p className="mt-2 text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.highlight && (
                      <div className="mt-3.5 inline-flex items-center gap-1.5 bg-primary/5 border border-primary/20 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span>{faq.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-2xl p-10 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-outline mx-auto" />
            <h3 className="text-base font-bold text-on-surface">
              No matching questions found
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto">
              We couldn't find any questions matching "{searchQuery}". Try a different keyword or reset the category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-primary font-bold hover:underline cursor-pointer pt-1"
            >
              Reset Filters &amp; View All
            </button>
          </div>
        )}
      </div>

      {/* Still Have Questions Contact Box */}
      <div className="mt-10 bg-surface-container-low border border-outline-variant/60 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface">
              Have a specific technical question?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Our engineering directors and talent specialists can scope your project requirements directly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onOpenGetStarted && (
            <button
              onClick={() => onOpenGetStarted('hire')}
              className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              Talk to an Architect
            </button>
          )}
          {onNavigate && (
            <button
              onClick={() => onNavigate('contact')}
              className="bg-surface-container-highest hover:bg-surface-container-high text-on-surface border border-outline-variant px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
