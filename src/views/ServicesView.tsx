import React, { useState, useMemo } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ServicesViewProps {
  onNavigate: (view: PageView) => void;
  onOpenGetStarted: (mode?: 'hire' | 'start') => void;
  onSelectProject: (projectId: string) => void;
  initialServiceId?: string;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onOpenGetStarted,
  onSelectProject,
  initialServiceId
}) => {
  const { services } = useApp();
  const [activeTab, setActiveTab] = useState<'catalog' | 'web-dev'>(
    initialServiceId === 'web-dev' ? 'web-dev' : 'catalog'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const serviceCategories = [
    { label: 'All Capabilities', key: 'All' },
    { label: 'Software & Web', key: 'web' },
    { label: 'Mobile Apps', key: 'mobile' },
    { label: 'AI & Data', key: 'ai-data' },
    { label: 'Cloud & DevOps', key: 'cloud' },
    { label: 'Design & Growth', key: 'design' },
  ];

  const popularServiceTags = [
    'React',
    'Python',
    'AWS',
    'FastAPI',
    'Docker',
    'Kubernetes',
    'React Native',
    'PostgreSQL',
    'LLM Integration',
    'Figma'
  ];

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      // Category check
      if (selectedCategory !== 'All') {
        const id = srv.id.toLowerCase();
        const title = srv.title.toLowerCase();
        let matchesCategory = false;

        if (selectedCategory === 'web') {
          matchesCategory =
            id.includes('web') ||
            id.includes('software') ||
            id.includes('react') ||
            id.includes('python') ||
            title.includes('web') ||
            title.includes('software') ||
            title.includes('react');
        } else if (selectedCategory === 'mobile') {
          matchesCategory =
            id.includes('mobile') ||
            title.includes('mobile') ||
            Boolean(srv.tags?.some((t) => t.toLowerCase().includes('react native') || t.toLowerCase().includes('flutter') || t.toLowerCase().includes('ios')));
        } else if (selectedCategory === 'ai-data') {
          matchesCategory =
            id.includes('ai') ||
            id.includes('data') ||
            title.includes('ai') ||
            title.includes('data');
        } else if (selectedCategory === 'cloud') {
          matchesCategory =
            id.includes('cloud') ||
            title.includes('cloud') ||
            Boolean(srv.tags?.some((t) => t.toLowerCase().includes('aws') || t.toLowerCase().includes('kubernetes') || t.toLowerCase().includes('docker')));
        } else if (selectedCategory === 'design') {
          matchesCategory =
            id.includes('ui-ux') ||
            id.includes('marketing') ||
            title.includes('design') ||
            title.includes('marketing');
        }

        if (!matchesCategory) return false;
      }

      // Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inTitle = srv.title.toLowerCase().includes(q);
      const inDesc = srv.description.toLowerCase().includes(q);
      const inTags = srv.tags && srv.tags.some((t) => t.toLowerCase().includes(q));
      const inCategory = srv.category ? srv.category.toLowerCase().includes(q) : false;

      return inTitle || inDesc || inTags || inCategory;
    });
  }, [services, selectedCategory, searchQuery]);

  const faqs = [
    {
      q: "How long does a typical web development project take?",
      a: "Standard MVPs and custom web applications typically range from 4 to 8 weeks depending on integration complexity, UI customisation depth, and backend architectural scope."
    },
    {
      q: "Do we own the source code upon completion?",
      a: "Yes, 100%. Upon final project milestone sign-off and completion, full intellectual property rights and complete GitHub repository access are transferred directly to your organization."
    },
    {
      q: "What kind of post-launch maintenance is provided?",
      a: "We provide 30 days of complimentary warranty support covering bug fixes and minor adjustments, followed by optional tiered SLA maintenance contracts for ongoing feature growth and infrastructure monitoring."
    }
  ];

  return (
    <div className="w-full">
      {/* Sub-navigation pills between All Services and Web Development Deep-Dive */}
      <div className="bg-surface-container-low border-b border-outline-variant/30 py-3 px-gutter">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-1.5 rounded-lg text-label-md font-medium transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:text-primary'
              }`}
            >
              All Capabilities ({services.length} Services)
            </button>
            <button
              onClick={() => setActiveTab('web-dev')}
              className={`px-4 py-1.5 rounded-lg text-label-md font-medium transition-all cursor-pointer ${
                activeTab === 'web-dev'
                  ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:text-primary'
              }`}
            >
              Featured: Web Development Deep Dive
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-label-sm text-on-surface-variant">
              Full Enterprise SLA &amp; IP Protection
            </span>
            <button
              onClick={() => onNavigate('admin-services')}
              className="text-label-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              <span>Manage Services in Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        <>
          {/* Hero Section */}
          <section className="relative pt-space-xl pb-space-xl px-gutter max-w-7xl mx-auto text-center overflow-hidden">
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-[600px] h-[600px] bg-gradient-to-tr from-secondary-fixed-dim/30 to-primary-container/20 rounded-full blur-3xl" />
            </div>
            <div className="max-w-3xl mx-auto space-y-space-md">
              <div className="inline-flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full text-primary text-label-sm font-semibold">
                <span className="material-symbols-outlined text-sm">hub</span>
                <span>Sudora Enterprise Engineering Services</span>
              </div>
              <h1 className="text-headline-xl font-headline-xl text-on-surface">
                Engineering Solutions Built for High-Growth Scale
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant">
                Sudora delivers end-to-end software development, senior talent augmentation, and dedicated technical squads tailored for high-growth startups and enterprise platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-space-md pt-space-sm">
                <button
                  onClick={() => onOpenGetStarted('start')}
                  className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-lg font-medium text-body-md transition-all shadow-sm cursor-pointer"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setActiveTab('web-dev')}
                  className="bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant px-6 py-3 rounded-lg font-medium text-body-md transition-all cursor-pointer"
                >
                  Explore Pricing
                </button>
              </div>
            </div>
          </section>

          {/* Search & Filter Toolbar for Services */}
          <section className="px-gutter max-w-7xl mx-auto mb-space-lg">
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
                  placeholder="Search capabilities by title, technology (e.g. React, Python, AWS, Docker), or deliverables..."
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

              {/* Category Tabs & Counter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1 mr-1">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                    <span>Domain:</span>
                  </span>
                  {serviceCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedCategory === cat.key
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
                    Showing <strong className="text-on-surface">{filteredServices.length}</strong> of {services.length} capabilities
                  </span>
                  {(searchQuery || selectedCategory !== 'All') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="text-primary hover:underline font-semibold cursor-pointer"
                    >
                      Reset All
                    </button>
                  )}
                </div>
              </div>

              {/* Popular Tech Filter Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-outline-variant/20 text-xs">
                <span className="text-on-surface-variant font-medium mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Popular Tech:</span>
                </span>
                {popularServiceTags.map((tag) => {
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

          {/* Services Grid (10 cards) */}
          <section className="py-space-md pb-space-xl px-gutter max-w-7xl mx-auto">
            {filteredServices.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">No Capabilities Found</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                  {searchQuery
                    ? `We couldn't find any engineering capabilities matching "${searchQuery}"${selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}.`
                    : `No capabilities currently found in the selected domain.`}
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
                      setSelectedCategory('All');
                    }}
                    className="bg-surface-container text-on-surface px-4 py-2 rounded-lg text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/40"
                  >
                    View All {services.length} Capabilities
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                {filteredServices.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined">{srv.icon}</span>
                        </div>
                        {srv.tags && srv.tags.length > 0 && (
                          <span className="text-[11px] font-semibold text-primary/80 bg-primary/10 px-2.5 py-1 rounded-md">
                            {srv.tags[0]}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-headline-sm font-headline-sm text-on-surface group-hover:text-primary transition-colors">
                          {srv.title}
                        </h3>
                        <p className="text-body-md font-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                          {srv.description}
                        </p>
                      </div>

                      {/* Tech Stack Tags */}
                      {srv.tags && srv.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {srv.tags.map((tag) => {
                            const isHighlighted =
                              searchQuery.trim() &&
                              tag.toLowerCase().includes(searchQuery.toLowerCase().trim());
                            return (
                              <button
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSearchQuery(tag);
                                }}
                                className={`text-[11px] font-medium px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                  isHighlighted
                                    ? 'bg-primary/20 text-primary font-bold ring-1 ring-primary/40'
                                    : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high border border-outline-variant/30'
                                }`}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="pt-space-md mt-space-md border-t border-outline-variant/20 flex items-center justify-between">
                      <button
                        onClick={() => setActiveTab('web-dev')}
                        className="inline-flex items-center gap-1 text-primary font-medium text-label-md hover:underline cursor-pointer"
                      >
                        <span>Capability Specs</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                      <button
                        onClick={() => onOpenGetStarted('hire')}
                        className="text-xs font-semibold text-on-surface-variant hover:text-primary cursor-pointer"
                      >
                        Deploy Squad
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* How We Deliver Section */}
          <section className="py-space-xl bg-surface-container-low px-gutter">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-space-xl">
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-space-sm">
                  How We Deliver
                </h2>
                <p className="text-body-lg font-body-lg text-on-surface-variant">
                  A transparent, milestone-driven development process designed for velocity and precision.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 relative">
                  <span className="absolute top-4 right-4 text-headline-md font-headline-md text-outline-variant/40 font-bold">
                    01
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">
                    Discover
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    Understanding your business goals, technical requirements, and product vision.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 relative">
                  <span className="absolute top-4 right-4 text-headline-md font-headline-md text-outline-variant/40 font-bold">
                    02
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">
                    Plan
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    Architecture design, tech stack selection, and detailed sprint roadmapping.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 relative">
                  <span className="absolute top-4 right-4 text-headline-md font-headline-md text-outline-variant/40 font-bold">
                    03
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">
                    Design
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    Wireframing, UI/UX prototyping, and interactive design system setup.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 relative">
                  <span className="absolute top-4 right-4 text-headline-md font-headline-md text-outline-variant/40 font-bold">
                    04
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">
                    Develop
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    Agile engineering sprints with clean, tested, production-grade code.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 relative">
                  <span className="absolute top-4 right-4 text-headline-md font-headline-md text-outline-variant/40 font-bold">
                    05
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">
                    Test
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    Comprehensive QA, automated testing, security audits, and performance tuning.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 relative">
                  <span className="absolute top-4 right-4 text-headline-md font-headline-md text-outline-variant/40 font-bold">
                    06
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-space-xs">
                    Launch
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">
                    Seamless deployment, monitoring setup, and continuous post-launch support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-space-xl px-gutter max-w-5xl mx-auto text-center">
            <div className="bg-primary text-on-primary rounded-2xl p-space-xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/40 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-space-md max-w-2xl mx-auto">
                <h2 className="text-headline-lg font-headline-lg text-on-primary">
                  Ready to Start Your Project?
                </h2>
                <p className="text-body-lg font-body-lg text-on-primary-container">
                  Partner with elite engineering teams to bring your vision to life.
                </p>
                <div className="pt-space-sm">
                  <button
                    onClick={() => onOpenGetStarted('start')}
                    className="bg-surface text-primary hover:bg-surface-bright px-8 py-3 rounded-lg font-medium text-body-md transition-all shadow-md inline-block cursor-pointer font-semibold"
                  >
                    Start Your Project
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Web Development Detail Screen (Screen 3 HTML) */
        <div className="w-full">
          {/* HERO SECTION */}
          <section className="relative overflow-hidden pt-space-xl pb-space-xl px-gutter max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low via-surface to-surface-container-high -z-10 opacity-70" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-7 space-y-space-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full text-primary text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    code
                  </span>
                  <span>Enterprise Web Engineering</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Web Development Solutions
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Build bespoke, high-performance web applications designed for scale. We merge enterprise-grade system architecture with elite frontend design to deliver resilient digital products.
                </p>
                <div className="flex flex-wrap gap-space-sm pt-space-sm">
                  <button
                    onClick={() => onOpenGetStarted('start')}
                    className="px-6 py-3 bg-primary-container text-on-primary-container font-headline-sm rounded-xl hover:bg-primary hover:text-on-primary transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Start Your Project</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <a
                    href="#process"
                    className="px-6 py-3 bg-surface-container text-on-surface font-headline-sm rounded-xl hover:bg-surface-container-high transition-all border border-outline-variant/40 flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Process</span>
                    <span className="material-symbols-outlined text-[18px]">engineering</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container-lowest p-space-md">
                  <div
                    className="w-full h-80 bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzDp1c76L-53kBBgY3z1uShK5qrT4bjrScg2Tc1SmLJQm_PaYuiIzq0AAfr3XdFN6B1ybzSNw8aGQ0H9vDFIx3MT9pKvsUJCVT8iHJZlrjJ2p_TayEmcg5QOuIj03LnvFKwTL-xiT6Xi9bNWvbv6ruxvWwY4nqh-kMFQkCKy2IiWnavhCshEllZo-y7GmKg31YwxQGYEr99e9faZaB5pdhjNaIjvLaJFPcrHNDNioE1pz52cvH_R8P')`
                    }}
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-surface/90 backdrop-blur-md rounded-lg border border-outline-variant/20 flex items-center justify-between">
                    <div>
                      <p className="text-label-md font-label-md text-on-surface-variant">Client Satisfaction</p>
                      <p className="font-headline-md text-headline-md text-primary">99.4% Delivery Rate</p>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TECHNOLOGY BADGES */}
          <section className="py-space-lg bg-surface-container-low/50 border-y border-outline-variant/20">
            <div className="max-w-7xl mx-auto px-gutter">
              <p className="text-center font-label-md text-on-surface-variant uppercase tracking-widest mb-space-md">
                Powered By Elite Tech Stack
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                {['React', 'Django', 'Python', 'Node.js', 'PostgreSQL', 'Docker'].map((tech, idx) => {
                  const icons = ['bolt', 'dns', 'terminal', 'hub', 'database', 'deployed_code'];
                  return (
                    <div key={tech} className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-full border border-outline-variant/30 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {icons[idx]}
                      </span>
                      <span className="font-headline-sm text-on-surface">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* COMPREHENSIVE SERVICE DESCRIPTION & KEY FEATURES */}
          <section className="py-space-xl px-gutter max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-space-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
                Comprehensive Architecture &amp; Capabilities
              </h2>
              <p className="font-body-lg text-on-surface-variant">
                Engineered for high concurrency, flawless responsiveness, and robust security posture from day one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    architecture
                  </span>
                </div>
                <h3 className="font-headline-sm text-on-surface mb-space-sm">Scalable System Design</h3>
                <p className="font-body-md text-on-surface-variant">
                  Microservices and modular monolith architectures configured to scale horizontally under heavy traffic demands.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    speed
                  </span>
                </div>
                <h3 className="font-headline-sm text-on-surface mb-space-sm">High Performance &amp; SEO</h3>
                <p className="font-body-md text-on-surface-variant">
                  Optimized Core Web Vitals, server-side rendering, and advanced asset caching ensuring instantaneous load times.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    security
                  </span>
                </div>
                <h3 className="font-headline-sm text-on-surface mb-space-sm">Enterprise Security</h3>
                <p className="font-body-md text-on-surface-variant">
                  Rigorous compliance protocols, encrypted data transit and storage, automated vulnerability scanning, and secure auth pipelines.
                </p>
              </div>
            </div>
          </section>

          {/* DEVELOPMENT PROCESS */}
          <section className="py-space-xl bg-surface-container-low px-gutter" id="process">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-space-xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
                  Our Development Process
                </h2>
                <p className="font-body-lg text-on-surface-variant">
                  A streamlined, transparent roadmap from initial concept to production deployment.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md">
                {[
                  { step: '01', title: 'Discovery', desc: 'Requirements gathering, technical scoping, and architectural mapping.' },
                  { step: '02', title: 'UI/UX', desc: 'Wireframing interactive prototypes and high-fidelity design systems.' },
                  { step: '03', title: 'Development', desc: 'Iterative agile coding sprints with continuous integration pipelines.' },
                  { step: '04', title: 'Testing', desc: 'Automated unit testing, load testing, and comprehensive QA audits.' },
                  { step: '05', title: 'Deployment', desc: 'Zero-downtime production release and ongoing infrastructure monitoring.' },
                ].map((s) => (
                  <div key={s.step} className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 shadow-sm relative">
                    <span className="absolute top-4 right-4 font-headline-xl text-surface-container-high/60 font-bold">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center mb-space-md font-headline-sm">
                      {s.step}
                    </div>
                    <h3 className="font-headline-sm text-on-surface mb-space-xs">{s.title}</h3>
                    <p className="font-body-sm text-on-surface-variant">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING & STARTING PRICE CARD */}
          <section className="py-space-xl px-gutter max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-6 space-y-space-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full text-primary text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    payments
                  </span>
                  <span>Transparent Investment</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Flexible Engagement Models
                </h2>
                <p className="font-body-lg text-on-surface-variant">
                  Whether you need a dedicated engineering squad for a complete overhaul or a specialized web application MVP, we offer structured pricing tailored to your milestone targets.
                </p>
                <ul className="space-y-space-sm font-body-md text-on-surface">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>Dedicated Senior Developers &amp; Tech Leads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>Full Source Code Ownership &amp; IP Transfer</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>Post-Launch Maintenance &amp; SLA Support</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <div className="bg-surface-container-lowest p-space-xl rounded-xl border border-outline-variant/30 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-on-primary px-4 py-1 text-label-md font-label-md rounded-bl-xl font-semibold">
                    Most Popular
                  </div>
                  <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-2">
                    Web Application Package
                  </p>
                  <div className="flex items-baseline gap-2 mb-space-md">
                    <span className="font-headline-xl text-headline-xl text-on-surface">$4,500</span>
                    <span className="text-body-md text-on-surface-variant">/ starting price</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-space-lg">
                    Complete custom web app design, frontend architecture, secure backend API, and database setup.
                  </p>
                  <div className="space-y-space-sm mb-space-lg border-t border-b border-outline-variant/20 py-space-md">
                    <div className="flex justify-between text-body-md">
                      <span className="text-on-surface-variant">Timeline:</span>
                      <span className="font-semibold text-on-surface">4 - 6 Weeks</span>
                    </div>
                    <div className="flex justify-between text-body-md">
                      <span className="text-on-surface-variant">Team:</span>
                      <span className="font-semibold text-on-surface">UI/UX, Full-Stack Dev, QA</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenGetStarted('start')}
                    className="w-full py-3 bg-primary-container text-on-primary-container font-headline-sm rounded-xl hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Secure Your Slot</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* RELATED PROJECTS SECTION */}
          <section className="py-space-xl bg-surface-container-low px-gutter">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-space-xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
                  Related Projects
                </h2>
                <p className="font-body-lg text-on-surface-variant">
                  Explore successful web applications engineered by our expert teams.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {[
                  {
                    title: "Aura Financial Analytics",
                    badge: "Fintech SaaS",
                    desc: "High-frequency trading dashboard built with React, Django, and PostgreSQL.",
                    time: "Delivered in 5 wks",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUd1pzTB0PDutwP8CPNyldrEidZl0JKrUIbK_tZtFoqpbaQyyEATfd53tvwrDaIxIQzQxTkUoeiMBIJStNKtZLA6RfxAXOs4rjB0x1WlRuMsf83pDfrIdzxWSMkAxa-7Crgjf4_xizCz6gqtqITVPMYKFupH9L-tN6H1Xyp-XFDZChQZ_DNK9Tci_ylEjOd3IRZ4NBhDkUfqKY8PFEjDXo3mU9m_NpIr8xxI93dc57kao86xoVTMGs"
                  },
                  {
                    title: "MediFlow Telehealth System",
                    badge: "HealthTech Portal",
                    desc: "HIPAA-compliant web app featuring real-time video consultations and scheduling.",
                    time: "Delivered in 8 wks",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCR5dGD6ynZNAMSrrBk4ulBgTF5-6zfvv1RRx9d1-5lSwDh-rhUQTRyrN7j97dcgDctAXPOKjHxwNKQOgjLTDsshqXHwEWblmzRn5cQ-5Qbzlr2Dwx5q6yVZIxe3bVQxrwbx8Q2m4tJSCpWpOlK5lTsGvhYVyuuIMidcSLT_h5yqigoNV67C4b9iqxc8DKiHTlx9qmv0RErFtAwRygP4GRsVA3GJQpewOGInbUTjB2iRxpaO2RM9sSp"
                  },
                  {
                    title: "LogiTrack Global Control Tower",
                    badge: "Supply Chain",
                    desc: "Real-time GPS tracking and logistics optimization platform built with Node.js and React.",
                    time: "Delivered in 6 wks",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTmkmFmYF9olIP1SK7EXxEXGDGLFJSvrgNZcv2PT9s4rJMOnH1Ng0PQReTesSwPyQdD3EXKRBa02adpZC9MJD1iuny2Ke38WqQ_ftpYIIC08rZTHNhVesSUic5cS4z7FBZwxgMEbjlaeQvtAKSmDLqF7UiSEfok8_55WYcCvH-JqeQjjztB1gwcAozGJWmV5btGVHTkyY4hfGeewB1zr1uax9ULu42sTwPtcVJehVGu-h9mkDULdzo"
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    onClick={() => onSelectProject('smart-business-platform')}
                    className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
                  >
                    <div
                      className="w-full h-48 bg-cover bg-center group-hover:scale-102 transition-transform duration-300"
                      style={{ backgroundImage: `url('${item.img}')` }}
                    />
                    <div className="p-space-lg flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-label-md font-label-md text-primary bg-primary-container/20 px-2.5 py-1 rounded-full">
                          {item.badge}
                        </span>
                        <h3 className="font-headline-sm text-on-surface mt-space-sm mb-space-xs group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-body-sm text-on-surface-variant">
                          {item.desc}
                        </p>
                      </div>
                      <div className="pt-space-md border-t border-outline-variant/20 mt-space-md flex items-center justify-between">
                        <span className="text-label-sm font-label-sm text-on-surface-variant">
                          {item.time}
                        </span>
                        <span className="text-primary font-headline-sm text-body-sm flex items-center gap-1">
                          <span>Case Study</span>
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ ACCORDION */}
          <section className="py-space-xl px-gutter max-w-4xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-space-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
                Frequently Asked Questions
              </h2>
              <p className="font-body-lg text-on-surface-variant">
                Everything you need to know about our web development engagement process.
              </p>
            </div>
            <div className="space-y-space-md">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-space-md shadow-sm"
                  >
                    <button
                      className="flex justify-between items-center w-full text-left font-headline-sm text-on-surface cursor-pointer"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span>{faq.q}</span>
                      <span
                        className="material-symbols-outlined transition-transform duration-200"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pt-space-sm font-body-md text-on-surface-variant animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* FINAL CTA SECTION */}
          <section className="py-space-xl bg-gradient-to-r from-primary-container to-primary text-on-primary px-gutter text-center relative overflow-hidden" id="cta">
            <div className="max-w-4xl mx-auto space-y-space-md relative z-10">
              <h2 className="font-headline-xl text-headline-xl text-on-primary tracking-tight">
                Ready to Build Your Next Web App?
              </h2>
              <p className="font-body-lg text-on-primary-container max-w-2xl mx-auto">
                Schedule a technical scoping call with our lead architects and turn your product vision into production reality.
              </p>
              <div className="pt-space-sm">
                <button
                  onClick={() => onOpenGetStarted('start')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-surface-container-lowest text-primary font-headline-sm rounded-xl hover:bg-surface-container-low transition-all shadow-lg font-semibold cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <span className="material-symbols-outlined text-[18px] ml-2">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
