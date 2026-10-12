import React, { useState } from 'react';
import { PageView } from '../types';
import { TESTIMONIALS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { NewsletterSection } from '../components/NewsletterSection';
import {
  BadgeCheck,
  Star,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  onOpenGetStarted: (mode?: 'hire' | 'start') => void;
  onSelectProject: (projectId: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenGetStarted,
  onSelectProject,
  onSelectService,
}) => {
  const { services, projects, cmsSettings } = useApp();
  const [searchSkill, setSearchSkill] = useState('');

  const POPULAR_SKILLS = ['React 19', 'TypeScript', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'AI/ML', 'DevOps'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchSkill.trim()) {
      onNavigate('services');
    }
  };

  return (
    <div className="w-full space-y-16 sm:space-y-20">
      {/* =========================================================
          HERO SECTION: Clean, Normal, Simple & Realistic Enterprise Hero
         ========================================================= */}
      <section className="px-gutter max-w-7xl mx-auto pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clear Value Proposition & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Simple, Realistic Brand Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold w-fit border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sudora · Vetted Software Engineering Network</span>
            </div>

            {/* Realistic Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.18]">
              {cmsSettings.heroHeadline || 'Hire Top Software Engineers & Dedicated Tech Teams'}
            </h1>

            {/* Clear, Grounded Subtitle */}
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl font-normal">
              {cmsSettings.heroSubtitle ||
                'Sudora connects high-growth companies with pre-vetted senior software engineers, systems architects, and agile delivery squads in under 48 hours. Build faster with guaranteed milestone delivery and escrow protection.'}
            </p>

            {/* Clean, Simple Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onOpenGetStarted('hire')}
                className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Hire Engineers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-outline-variant px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-primary" />
                <span>Explore Services</span>
              </button>

              <button
                onClick={() => onNavigate('post-job')}
                className="text-on-surface-variant hover:text-on-surface text-sm font-semibold px-2 py-3.5 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>or Post a Job Brief →</span>
              </button>
            </div>

            {/* Realistic Quick Skill Search & Filter Bar */}
            <div className="pt-2">
              <form onSubmit={handleSearchSubmit} className="relative max-w-md">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchSkill}
                  onChange={(e) => setSearchSkill(e.target.value)}
                  placeholder="Search skills (e.g. React, Python, Cloud, AI)..."
                  className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm bg-surface-container-lowest border border-outline-variant/60 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-on-surface"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold px-3 py-1.5 rounded-lg border border-outline-variant/40 transition-colors cursor-pointer"
                >
                  Find Talent
                </button>
              </form>

              {/* Popular Skill Badges */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-[11px] font-semibold text-on-surface-variant/80 mr-1">Popular:</span>
                {POPULAR_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      setSearchSkill(skill);
                      onNavigate('services');
                    }}
                    className="text-xs bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface px-2.5 py-0.5 rounded-md border border-outline-variant/40 transition-colors cursor-pointer"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Realistic Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-outline-variant/50 mt-1">
              <div>
                <p className="text-2xl font-extrabold text-primary tracking-tight">
                  &lt; 48 Hours
                </p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Average Match Time</p>
              </div>

              <div>
                <p className="text-2xl font-extrabold text-primary tracking-tight">
                  Top 1.5%
                </p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Vetting Acceptance Bar</p>
              </div>

              <div>
                <p className="text-2xl font-extrabold text-primary tracking-tight">
                  100%
                </p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Escrow Protection</p>
              </div>

              <div>
                <p className="text-2xl font-extrabold text-primary tracking-tight">
                  4.98 / 5.0
                </p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Realistic Sudora Verified Talent Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl shadow-md p-6 space-y-5">
              {/* Header: Talent Info & Status */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN_yRrsynH_pAMY7iiAQxbVq-vuD_xgLFWz-dcnSOD3LY9WL7Fd_Rn4tZ5r5eQX3C6p6gC5EJqJuwR9GmygD53OgJd9F0updL247bvZNxJvk6EzGDRx9J8iaj4yf-G-7857m8L9Yus-3HAnoiu1eE9bRNeHsIvh5lALVXk-3dgHqeNFQ2v2uCZcpWw_YQBbEnF_d69wCJf04zboRTo-Mt-eq5WyZZBumjEWM7bVWlVyY6hib3FIxeF"
                      alt="Sarah Jenkins"
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/20 bg-surface-container"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-on-surface">Sarah Jenkins</h3>
                      <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium">
                      Lead Full-Stack &amp; Systems Architect
                    </p>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>4.98</span>
                      </span>
                      <span>·</span>
                      <span>11+ Yrs Exp</span>
                      <span>·</span>
                      <span className="font-bold text-on-surface">$145/hr</span>
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 rounded-full shrink-0 border border-emerald-200 dark:border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available Now
                </span>
              </div>

              {/* Bio Summary */}
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Specialized in distributed microservices, TypeScript/React architectures, cloud infrastructure on AWS, and zero-downtime event streaming pipelines.
              </p>

              {/* Verified Core Skills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Verified Technical Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['React 19', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS Cloud', 'Docker'].map((tech) => (
                    <span
                      key={tech}
                      className="bg-surface-container text-on-surface text-xs px-2.5 py-1 rounded-lg border border-outline-variant/40 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Verified Deliverable */}
              <div className="bg-surface-container-low/70 border border-outline-variant/50 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Recent Milestone Delivered</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Architected high-throughput payment processing engine handling 250k req/min with 99.99% uptime.
                </p>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onOpenGetStarted('hire')}
                  className="flex-1 bg-primary hover:bg-primary/90 text-on-primary py-2.5 rounded-xl font-bold text-xs sm:text-sm text-center shadow-xs transition-colors cursor-pointer"
                >
                  Hire Directly
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className="bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/60 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-center transition-colors cursor-pointer"
                >
                  View Profile
                </button>
              </div>

              {/* Escrow Guarantee Footer */}
              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Protected by Milestone Escrow</span>
                </div>
                <span className="font-medium text-outline">SOC2 Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean, Realistic Client Trust Bar */}
        <div className="pt-12 mt-12 border-t border-outline-variant/40">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-on-surface-variant/70 mb-6">
            Trusted by engineering teams and fast-growing companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-on-surface-variant font-bold text-sm sm:text-base opacity-75">
            <span className="flex items-center gap-2 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              Strata Cloud
            </span>
            <span className="flex items-center gap-2 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
              Veloce Labs
            </span>
            <span className="flex items-center gap-2 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              Horizon Pay
            </span>
            <span className="flex items-center gap-2 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/40" />
              Acorn Health
            </span>
            <span className="flex items-center gap-2 tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              Nova Systems
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          CORE SERVICES SECTION
         ========================================================= */}
      <section className="px-gutter max-w-7xl mx-auto" id="services">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-1.5">
              Service Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Our Core Engineering Services
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              Scalable web architectures, mobile development, cloud systems, and elite freelance squads tailored to your goals.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-primary font-bold text-sm flex items-center gap-1.5 hover:underline cursor-pointer shrink-0"
          >
            <span>View Full Service Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(0, 8).map((srv) => (
            <div
              key={srv.id}
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl">{srv.icon}</span>
                </div>
                <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1.5 line-clamp-3 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-outline-variant/30 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(srv.id)}
                  className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Explore Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenGetStarted('hire')}
                  className="text-[11px] bg-surface-container hover:bg-surface-container-high px-2 py-1 rounded text-on-surface font-medium cursor-pointer"
                >
                  Hire Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          FEATURED PROJECTS & DELIVERABLES
         ========================================================= */}
      <section className="px-gutter max-w-7xl mx-auto" id="projects">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-1.5">
              Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Featured Case Studies &amp; Projects
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
              Proven digital platforms engineered and deployed by our verified freelance network.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="text-primary font-bold text-sm flex items-center gap-1.5 hover:underline cursor-pointer shrink-0"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-56 w-full bg-surface-container relative overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white text-xs font-semibold">
                  {proj.category}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="bg-surface-container text-on-surface text-[11px] px-2 py-0.5 rounded font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs text-primary font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          WHAT OUR CLIENTS SAY (Restored Testimonials Section)
         ========================================================= */}
      <section className="px-gutter max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-primary uppercase mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
            Real feedback from engineering executives and product leaders who built scalable digital solutions with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">{t.name}</h4>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          NEWSLETTER SUBSCRIPTION BAR (INDUSTRY TRENDS)
         ========================================================= */}
      <NewsletterSection />

      {/* =========================================================
          CLOSING CTA BANNER
         ========================================================= */}
      <section className="px-gutter max-w-7xl mx-auto pb-12">
        <div className="bg-primary text-on-primary rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-semibold tracking-wider text-primary-fixed-dim uppercase block">
              Build Better · Hire Smarter · Grow Faster
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Accelerate with Sudora?
            </h2>
            <p className="text-xs sm:text-sm text-on-primary-container leading-relaxed">
              Empower your business with Sudora's elite software engineering squads and top-tier freelance talent for mission-critical digital systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenGetStarted('start')}
              className="bg-white hover:bg-slate-100 text-primary px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => onNavigate('post-job')}
              className="bg-primary-container hover:bg-primary-container/80 text-on-primary border border-white/20 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
