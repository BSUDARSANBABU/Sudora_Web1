import React, { useState, useMemo } from 'react';
import { PageView } from '../types';
import { SMART_BUSINESS_PROJECT } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ProjectsViewProps {
  onNavigate: (view: PageView) => void;
  onOpenGetStarted: (mode?: 'hire' | 'start') => void;
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onNavigate,
  onOpenGetStarted,
  selectedProjectId,
  onClearSelectedProject
}) => {
  const { projects } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewingDetail, setViewingDetail] = useState<boolean>(Boolean(selectedProjectId));

  const filterCategories = [
    { label: 'All', key: 'All' },
    { label: 'Web Apps', key: 'web' },
    { label: 'Mobile Apps', key: 'mobile' },
    { label: 'AI', key: 'ai' },
    { label: 'E-Commerce', key: 'ecommerce' },
    { label: 'Business Solutions', key: 'business' },
  ];

  const popularTags = [
    'React',
    'AI',
    'Python',
    'AWS',
    'FinTech',
    'Healthcare',
    'Node.js',
    'PostgreSQL'
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category match
      const matchesCategory =
        activeFilter === 'All' ||
        p.categorySlug === activeFilter ||
        p.category.toLowerCase().includes(activeFilter.toLowerCase());

      if (!matchesCategory) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
      const inCat = p.category.toLowerCase().includes(q);
      const inClient = p.client ? p.client.toLowerCase().includes(q) : false;

      return inTitle || inDesc || inTags || inCat || inClient;
    });
  }, [projects, activeFilter, searchQuery]);

  if (viewingDetail || selectedProjectId) {
    // Project Detail Screen: Smart Business Management Platform
    return (
      <main className="max-w-7xl mx-auto px-gutter py-space-xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-space-sm text-body-sm text-on-surface-variant mb-space-lg">
          <button
            onClick={() => {
              setViewingDetail(false);
              onClearSelectedProject?.();
              onNavigate('home');
            }}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button
            onClick={() => {
              setViewingDetail(false);
              onClearSelectedProject?.();
            }}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Projects
          </button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface font-medium">Smart Business Management Platform</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-space-xl">
          <div className="inline-flex items-center gap-space-sm bg-primary-fixed/40 text-on-primary-fixed px-space-md py-space-xs rounded-full text-label-sm font-label-sm mb-space-md font-semibold">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            {SMART_BUSINESS_PROJECT.categoryBadge}
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">
            {SMART_BUSINESS_PROJECT.title}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-space-lg">
            {SMART_BUSINESS_PROJECT.subtitle}
          </p>

          {/* Large project hero image */}
          <div className="rounded-xl overflow-hidden shadow-lg border border-outline-variant/30 bg-surface-container-low h-[480px] relative">
            <img
              className="w-full h-full object-cover"
              alt="Smart Business Management Platform Boardroom Overview"
              src={SMART_BUSINESS_PROJECT.heroImage}
            />
          </div>
        </section>

        {/* Main Content Layout (Two columns on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl items-start">
          {/* Left Column (Span 2) */}
          <div className="lg:col-span-2 space-y-space-xl">
            {/* Project Overview */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/20 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">
                Project Overview
              </h2>
              {SMART_BUSINESS_PROJECT.overview.map((para, i) => (
                <p key={i} className={`text-body-lg text-on-surface-variant ${i === 0 ? 'mb-space-md' : ''}`}>
                  {para}
                </p>
              ))}
            </div>

            {/* Client Requirement and Challenge */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/20 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">
                Client Requirement &amp; Challenge
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                <div className="bg-surface-container-low p-space-md rounded-lg">
                  <div className="flex items-center gap-space-sm text-primary mb-space-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      error
                    </span>
                    <h3 className="font-headline-sm text-headline-sm">The Challenge</h3>
                  </div>
                  <p className="text-body-md text-on-surface-variant">
                    {SMART_BUSINESS_PROJECT.challenge}
                  </p>
                </div>
                <div className="bg-surface-container-low p-space-md rounded-lg">
                  <div className="flex items-center gap-space-sm text-primary mb-space-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      task_alt
                    </span>
                    <h3 className="font-headline-sm text-headline-sm">Core Requirements</h3>
                  </div>
                  <p className="text-body-md text-on-surface-variant">
                    {SMART_BUSINESS_PROJECT.coreRequirements}
                  </p>
                </div>
              </div>
            </div>

            {/* Our Solution Architecture */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/20 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">
                Our Solution Architecture
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-space-md">
                {SMART_BUSINESS_PROJECT.architecture}
              </p>
              <div className="flex flex-wrap gap-space-sm">
                {SMART_BUSINESS_PROJECT.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-container text-on-surface px-space-md py-space-sm rounded-lg text-label-md font-label-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features Grid */}
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">
                Key Platform Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {SMART_BUSINESS_PROJECT.features.map((feat) => (
                  <div
                    key={feat.title}
                    className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/20 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center mb-space-md">
                      <span className="material-symbols-outlined">{feat.icon}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                      {feat.title}
                    </h3>
                    <p className="text-body-md text-on-surface-variant">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Process Timeline */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/20 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-lg">
                Development Process Timeline
              </h2>
              <div className="space-y-space-lg relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-outline-variant/30">
                {SMART_BUSINESS_PROJECT.timeline.map((step) => (
                  <div key={step.step} className="flex items-start gap-space-md relative">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 z-10 text-label-md font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {step.title}
                      </h3>
                      <p className="text-body-md text-on-surface-variant">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Screenshots */}
            <div className="space-y-space-md">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Dashboard Views &amp; Interface Mockups
              </h2>
              <div className="grid grid-cols-1 gap-space-md">
                <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low h-[360px]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Financial analytics dashboard"
                    src={SMART_BUSINESS_PROJECT.mockups.main}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low h-[240px]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Inventory management view"
                      src={SMART_BUSINESS_PROJECT.mockups.inventory}
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low h-[240px]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Administrative role-based control view"
                      src={SMART_BUSINESS_PROJECT.mockups.settings}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quantifiable Results & Impact */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/20 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-lg">
                Quantifiable Results &amp; Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg text-center">
                {SMART_BUSINESS_PROJECT.quantifiableResults.map((res) => (
                  <div key={res.label} className="bg-surface-container-low p-space-lg rounded-xl">
                    <div className="font-headline-xl text-headline-xl text-primary mb-space-xs font-bold">
                      {res.value}
                    </div>
                    <div className="text-body-md text-on-surface-variant font-medium">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Sticky Information Card */}
          <div className="lg:col-span-1 sticky top-28 space-y-space-md">
            <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/20 shadow-md space-y-space-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/20 pb-space-md">
                Project Details
              </h3>
              <div className="space-y-space-md">
                <div>
                  <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Industry
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface mt-1">
                    {SMART_BUSINESS_PROJECT.sidebar.industry}
                  </p>
                </div>
                <div>
                  <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Duration
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface mt-1">
                    {SMART_BUSINESS_PROJECT.sidebar.duration}
                  </p>
                </div>
                <div>
                  <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Team Composition
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface mt-1">
                    {SMART_BUSINESS_PROJECT.sidebar.team}
                  </p>
                </div>
                <div>
                  <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {SMART_BUSINESS_PROJECT.sidebar.stack.map((item) => (
                      <span
                        key={item}
                        className="bg-surface-container text-on-surface px-2.5 py-1 rounded text-label-sm font-label-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-space-md border-t border-outline-variant/20">
                <button
                  onClick={() => onOpenGetStarted('start')}
                  className="w-full bg-primary hover:bg-primary/90 text-on-primary py-3 px-space-md rounded-lg font-label-md text-center block transition-all shadow-sm cursor-pointer font-semibold"
                >
                  Build Something Similar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Banner */}
        <section className="my-space-xl">
          <div className="bg-primary text-on-primary rounded-2xl p-space-xl text-center relative overflow-hidden shadow-lg flex flex-col items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none" />
            <h2 className="font-headline-lg text-headline-lg mb-space-sm relative z-10">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-body-lg text-on-primary-container max-w-xl mb-space-lg relative z-10">
              Connect with elite freelance engineering talent or partner with our expert product teams to bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-space-md relative z-10">
              <button
                onClick={() => onOpenGetStarted('hire')}
                className="bg-surface text-on-surface hover:bg-surface-container px-space-lg py-3 rounded-lg text-label-md font-label-md transition-all shadow-sm cursor-pointer"
              >
                Hire Talent
              </button>
              <button
                onClick={() => onOpenGetStarted('start')}
                className="bg-transparent hover:bg-white/10 text-on-primary border border-on-primary/40 px-space-lg py-3 rounded-lg text-label-md font-label-md transition-all cursor-pointer"
              >
                Start a Project
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Projects Gallery Screen (Screen 5 HTML)
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="px-gutter py-space-xl max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full mb-space-md">
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider font-semibold">
            Sudora Portfolio
          </span>
        </div>
        <h1 className="text-headline-lg md:text-headline-xl font-headline-lg md:font-headline-xl text-on-background max-w-3xl mx-auto mb-space-md tracking-tight">
          Engineered by Sudora Specialists
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Explore production digital systems, modern cloud architectures, and scalable web platforms engineered and shipped by Sudora's elite teams.
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => onNavigate('admin-projects')}
            className="text-label-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span>Manage Portfolio in Admin CMS</span>
          </button>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="px-gutter max-w-7xl mx-auto mb-space-xl">
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          {/* Main Search Input */}
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center pointer-events-none text-on-surface-variant">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portfolio projects by title, tech stack (e.g. React, Python, AWS), or domain..."
              className="w-full bg-surface-container-lowest text-on-surface border border-outline-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl pl-12 pr-12 py-3.5 text-sm sm:text-base outline-none transition-all placeholder:text-on-surface-variant/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs & Result Counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                <span>Category:</span>
              </span>
              {filterCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeFilter === cat.key
                      ? 'bg-primary text-on-primary shadow-sm font-semibold'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Counter & Clear All */}
            <div className="flex items-center gap-3 text-xs text-on-surface-variant shrink-0">
              <span>
                Showing <strong className="text-on-surface">{filteredProjects.length}</strong> of {projects.length} projects
              </span>
              {(searchQuery || activeFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('All');
                  }}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Tag Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-outline-variant/20 text-xs">
            <span className="text-on-surface-variant font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Quick Tech Filters:</span>
            </span>
            {popularTags.map((tag) => {
              const isSelected = searchQuery.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(isSelected ? '' : tag)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary/15 text-primary font-bold border border-primary/30'
                      : 'bg-surface-container-lowest/80 text-on-surface-variant hover:text-primary hover:bg-surface-container border border-outline-variant/30'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Column Project Grid or Empty State */}
      <section className="px-gutter max-w-7xl mx-auto mb-space-xl">
        {filteredProjects.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-on-surface">No Projects Found</h3>
            <p className="text-sm text-on-surface-variant max-w-md mx-auto">
              {searchQuery
                ? `We couldn't find any portfolio projects matching "${searchQuery}"${activeFilter !== 'All' ? ` in the "${activeFilter}" category` : ''}.`
                : `No projects currently found in the "${activeFilter}" category.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Clear Search Query
                </button>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                }}
                className="bg-surface-container text-on-surface px-4 py-2 rounded-lg text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/40"
              >
                View All Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer"
                onClick={() => setViewingDetail(true)}
              >
                <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${proj.image}')` }}
                  />
                  <div className="absolute top-space-md left-space-md">
                    <span className="bg-primary/90 text-on-primary backdrop-blur-sm text-label-sm font-label-sm px-space-md py-space-xs rounded-full">
                      {proj.category}
                    </span>
                  </div>
                  {proj.duration && (
                    <div className="absolute top-space-md right-space-md">
                      <span className="bg-black/60 text-white backdrop-blur-sm text-xs px-2.5 py-1 rounded-md">
                        {proj.duration}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-space-lg flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex flex-wrap gap-space-xs mb-space-md">
                      {proj.tags.map((t) => {
                        const isHighlighted =
                          searchQuery.trim() &&
                          t.toLowerCase().includes(searchQuery.toLowerCase().trim());
                        return (
                          <span
                            key={t}
                            className={`text-label-sm font-label-sm px-space-sm py-1 rounded transition-colors ${
                              isHighlighted
                                ? 'bg-primary/20 text-primary font-bold ring-1 ring-primary/40'
                                : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                    <h3 className="text-headline-sm font-headline-sm text-on-background mb-space-xs group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-lg">
                      {proj.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-space-xs text-primary text-label-md font-label-md font-semibold">
                    <span>View Case Study</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Final CTA Section */}
      <section className="px-gutter py-space-xl bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-headline-lg font-headline-lg text-on-background mb-space-md">
            Have a Project in Mind?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-xl">
            Let's discuss how our elite engineering teams can bring your digital product vision to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-space-md">
            <button
              onClick={() => onOpenGetStarted('start')}
              className="w-full sm:w-auto bg-primary text-on-primary text-label-md font-label-md px-space-lg py-space-md rounded-lg hover:bg-primary-container transition-colors shadow-sm text-center cursor-pointer font-semibold"
            >
              Start Your Project
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto bg-surface border border-outline-variant text-on-surface text-label-md font-label-md px-space-lg py-space-md rounded-lg hover:bg-surface-container transition-colors text-center cursor-pointer font-semibold"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
