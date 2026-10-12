import React, { useState } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';

interface BlogViewProps {
  onNavigate: (view: PageView) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const { blogPosts } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedToast, setSubscribedToast] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const categories = ['All', 'Technology', 'Business', 'AI', 'Development', 'Design', 'Startup'];

  const featured = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  const filteredPosts = activeCategory === 'All'
    ? remainingPosts
    : remainingPosts.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribedToast(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribedToast(false), 4000);
    }
  };

  return (
    <main className="flex-grow w-full">
      {/* Toast Notification */}
      {subscribedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300">verified</span>
          <span className="text-body-md font-medium">Subscribed to weekly engineering insights!</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-gutter pt-16 pb-12 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-space-md">
          <span className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high text-primary font-label-md font-semibold">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Engineering &amp; Product Insights
          </span>
          <h1 className="text-headline-xl font-headline-xl text-on-surface tracking-tight">
            Insights, Ideas &amp; Technology
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Expert perspectives on engineering, design, and building scalable tech companies.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('admin-blog')}
              className="text-label-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              <span>Manage Blog &amp; Articles in Admin CMS</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <section className="px-gutter pb-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-space-sm pb-space-xs border-b border-outline-variant/20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-space-md py-space-sm rounded-full text-label-md font-label-md whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="px-gutter pb-16 max-w-7xl mx-auto">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 group">
          <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[400px] overflow-hidden bg-surface-container-high">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${featured.image}')` }}
            />
          </div>
          <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col justify-between space-y-space-md">
            <div className="space-y-space-md">
              <div className="flex items-center gap-space-md">
                <span className="px-space-md py-space-xs rounded bg-surface-container-high text-primary font-label-md font-medium">
                  {featured.category}
                </span>
                <span className="text-on-surface-variant text-body-sm">{featured.date}</span>
              </div>
              <h2 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-body-md text-on-surface-variant">
                {featured.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between pt-space-md border-t border-outline-variant/20">
              <div className="flex items-center gap-space-md">
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center border border-outline-variant/30"
                  style={{ backgroundImage: `url('${featured.authorAvatar}')` }}
                />
                <div>
                  <h4 className="text-body-md font-semibold text-on-surface">{featured.author}</h4>
                  <p className="text-label-sm text-on-surface-variant">{featured.authorRole}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticleId(featured.id)}
                className="inline-flex items-center gap-space-xs text-primary font-medium text-body-md hover:underline cursor-pointer"
              >
                Read Full Article <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Blog Grid */}
      <section className="px-gutter pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer"
              onClick={() => setSelectedArticleId(post.id)}
            >
              <div className="h-48 relative overflow-hidden bg-surface-container-high">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${post.image}')` }}
                />
              </div>
              <div className="p-space-lg flex flex-col flex-grow justify-between space-y-space-md">
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-space-md py-space-xs rounded bg-surface-container-high text-primary font-label-md font-medium">
                      {post.category}
                    </span>
                    <span className="text-on-surface-variant text-body-sm">{post.date}</span>
                  </div>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-md border-t border-outline-variant/20">
                  <span className="text-body-sm text-on-surface-variant">{post.author}</span>
                  <span className="text-primary font-medium text-body-md inline-flex items-center gap-space-xs group-hover:underline">
                    Read More <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article Detail Modal / Reader */}
      {selectedArticleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <span className="text-label-sm font-semibold text-primary uppercase tracking-wider">
              Engineering Whitepaper
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mt-2 mb-4">
              {blogPosts.find((p) => p.id === selectedArticleId)?.title}
            </h2>
            <div className="text-body-md text-on-surface-variant space-y-4 mb-6">
              <p>
                Modern distributed applications require zero-downtime database migrations, deterministic event sequencing, and isolated tenant environments. At Sudora, our engineering squads implement decoupled microservices utilizing Redis queues, Celery worker orchestration, and event bus streams.
              </p>
              <p>
                By establishing strict tenant isolation boundaries at the PostgreSQL connection pool layer, memory footprint is minimized by over 40% while preventing cross-tenant data leakage risks.
              </p>
              <p>
                To explore adopting this architecture within your organization, schedule a technical scoping call with our senior architects.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedArticleId(null);
                onNavigate('contact');
              }}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-body-md font-semibold cursor-pointer"
            >
              Consult an Architect
            </button>
          </div>
        </div>
      )}

      {/* Newsletter Subscription Section */}
      <section className="px-gutter pb-24 max-w-7xl mx-auto">
        <div className="bg-primary-container text-on-primary-container rounded-2xl p-space-xl relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-space-xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-xl space-y-space-sm z-10">
            <h2 className="text-headline-lg font-headline-lg text-white">
              Stay Ahead of the Tech Curve
            </h2>
            <p className="text-body-lg text-inverse-primary">
              Get curated engineering insights, expert architectural breakdowns, and startup strategies delivered to your inbox weekly.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto z-10 flex flex-col sm:flex-row gap-space-md">
            <input
              className="px-space-md py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-inverse-primary focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-80 text-body-md"
              placeholder="Enter your work email"
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-primary px-space-lg py-3 rounded-lg font-medium text-body-md hover:bg-surface-container-low transition-all duration-200 shadow-sm whitespace-nowrap cursor-pointer font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
