import React, { useState } from 'react';
import { PageView } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminDashboardViewProps {
  onNavigate: (view: PageView) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const { services, projects, jobs, blogPosts, teamMembers, inquiries, cmsSettings } = useApp();
  const [selectedYear, setSelectedYear] = useState<'2024' | '2023'>('2024');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const activities = [
    {
      id: '#ACT-9824',
      user: 'John Developer',
      initials: 'JD',
      userClass: 'bg-primary-fixed text-primary',
      desc: 'Milestone payment released for Project Alpha',
      time: '2 mins ago',
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: '#ACT-9823',
      user: 'TechCorp Inc.',
      initials: 'TC',
      userClass: 'bg-secondary-fixed text-secondary',
      desc: 'New enterprise job posting: Senior Cloud Architect',
      time: '15 mins ago',
      status: 'Active',
      statusBadge: 'bg-primary-fixed text-primary',
    },
    {
      id: '#ACT-9822',
      user: 'Sarah Ahmed',
      initials: 'SA',
      userClass: 'bg-surface-variant text-primary',
      desc: 'Identity verification document submitted',
      time: '42 mins ago',
      status: 'Pending Review',
      statusBadge: 'bg-amber-100 text-amber-800',
    },
    {
      id: '#ACT-9821',
      user: 'ErrorBot',
      initials: 'EX',
      userClass: 'bg-error-container text-error',
      desc: 'API Rate limit exceeded on payment gateway webhook',
      time: '1 hour ago',
      status: 'Failed',
      statusBadge: 'bg-error-container text-error',
    },
    {
      id: '#ACT-9820',
      user: 'Mark Lee',
      initials: 'ML',
      userClass: 'bg-primary-container text-on-primary-container',
      desc: 'New client account registered and verified',
      time: '3 hours ago',
      status: 'Completed',
      statusBadge: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <div className="flex-1 p-6 space-y-8 max-w-7xl w-full mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-300 border border-white/20">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Statistics Grid (8 key metrics) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigate('admin-users')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Total Users</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">24,892</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary-fixed text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-emerald-600 font-medium">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            <span>+12.4% from last month</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigate('admin-users')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Freelancers</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">14,210</h3>
            </div>
            <div className="p-2 rounded-lg bg-secondary-fixed text-secondary">
              <span className="material-symbols-outlined">badge</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-emerald-600 font-medium">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            <span>+8.2% from last month</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigate('admin-users')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Clients</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">10,682</h3>
            </div>
            <div className="p-2 rounded-lg bg-surface-variant text-primary">
              <span className="material-symbols-outlined">apartment</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-emerald-600 font-medium">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            <span>+15.3% from last month</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => onNavigate('admin-projects')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Active Projects</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">1,845</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined">work</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-emerald-600 font-medium">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            <span>+4.1% active load</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div
          onClick={() => onNavigate('admin-projects')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Completed Projects</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">9,430</h3>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-on-surface-variant">
            <span>Lifetime delivery milestone</span>
          </div>
        </div>

        {/* Metric 6 */}
        <div
          onClick={() => onNavigate('admin-payments')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Total Revenue</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">$1.42M</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary-fixed text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-emerald-600 font-medium">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            <span>+19.8% YoY growth</span>
          </div>
        </div>

        {/* Metric 7 */}
        <div
          onClick={() => onNavigate('admin-payments')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Pending Payments</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">$48,250</h3>
            </div>
            <div className="p-2 rounded-lg bg-error-container text-error">
              <span className="material-symbols-outlined">schedule</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-on-surface-variant">
            <span>12 invoices awaiting clearance</span>
          </div>
        </div>

        {/* Metric 8 */}
        <div
          onClick={() => onNavigate('admin-support')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-md font-label-md text-on-surface-variant">Open Support Tickets</p>
              <h3 className="text-headline-md font-headline-md text-on-surface mt-1 font-bold">24</h3>
            </div>
            <div className="p-2 rounded-lg bg-surface-variant text-primary">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-label-sm text-error font-medium">
            <span className="material-symbols-outlined text-sm mr-1">warning</span>
            <span>3 high priority flags</span>
          </div>
        </div>
      </section>

      {/* Public Pages CMS Management Hub */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-outline-variant/60 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                Public Pages Management Hub (CMS)
              </h3>
              <span className="text-label-sm font-bold bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full">
                7 Public Pages Active
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant mt-1">
              All public website pages are dynamically connected to admin management. Edit copy, add items, and preview live changes instantly.
            </p>
          </div>
          <button
            onClick={() => onNavigate('admin-cms')}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span>Open Global CMS</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
          {/* Card 1: Homepage */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">web</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /home
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Homepage</h4>
              <p className="text-body-xs text-on-surface-variant mt-1 line-clamp-2">
                Hero banner, credibility metrics ({cmsSettings.successRate || '99.8%'}, {cmsSettings.engineersCount || '10k+'}), and value propositions.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin-cms')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Manage CMS</span>
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Card 2: Services */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">design_services</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /services
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Services Catalog</h4>
              <p className="text-body-xs text-on-surface-variant mt-1">
                <strong className="text-primary font-bold">{services.length}</strong> service capabilities configured with icons, descriptions, and tags.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin-services')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Manage CMS</span>
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Card 3: Portfolio Projects */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">folder_special</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /projects
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Portfolio Projects</h4>
              <p className="text-body-xs text-on-surface-variant mt-1">
                <strong className="text-primary font-bold">{projects.length}</strong> case studies, deliverables, tech tags, and quantifiable metrics.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin-projects')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Manage CMS</span>
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Card 4: Careers */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-surface-variant text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">work_history</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /careers
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Careers &amp; Jobs</h4>
              <p className="text-body-xs text-on-surface-variant mt-1">
                <strong className="text-primary font-bold">{jobs.length}</strong> job postings across engineering, design, and product departments.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin-jobs')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Manage CMS</span>
              </button>
              <button
                onClick={() => onNavigate('careers')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Card 5: Blog */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">newspaper</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /blog
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Blog &amp; Articles</h4>
              <p className="text-body-xs text-on-surface-variant mt-1">
                <strong className="text-primary font-bold">{blogPosts.length}</strong> technical articles and industry thought-leadership pieces.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin-blog')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Manage CMS</span>
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Card 6: Team & About */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">group</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /about
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">About &amp; Team</h4>
              <p className="text-body-xs text-on-surface-variant mt-1">
                <strong className="text-primary font-bold">{teamMembers.length}</strong> executive and technical leadership members &amp; company story.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin-team')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Manage CMS</span>
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Card 7: Leads & Inquiries */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">contact_mail</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /contact
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Leads &amp; Inquiries</h4>
              <p className="text-body-xs text-on-surface-variant mt-1">
                <strong className="text-emerald-700 font-bold">{inquiries.length}</strong> inbound inquiries (<span className="text-primary font-bold">{inquiries.filter((i) => i.status === 'New').length} new</span>) from contact form &amp; intakes.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin-support')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>View Leads</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">visibility</span>
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Card 8: Post a Job Intake */}
          <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">add_circle</span>
                </div>
                <span className="text-[10px] font-mono bg-surface-container px-2 py-0.5 rounded text-outline">
                  /post-job
                </span>
              </div>
              <h4 className="font-headline-sm font-bold text-on-surface text-base">Client Job Intake</h4>
              <p className="text-body-xs text-on-surface-variant mt-1">
                Multi-step enterprise requisition workflow for scoping projects and hiring talent.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
              <button
                onClick={() => onNavigate('post-job')}
                className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">open_in_new</span>
                <span>Open Intake</span>
              </button>
              <button
                onClick={() => onNavigate('admin-jobs')}
                className="text-label-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">settings</span>
                <span>Job CMS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart Card */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">User Growth Overview</h3>
              <p className="text-body-sm text-on-surface-variant">Monthly active registrations across freelancers and clients</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedYear('2024')}
                className={`px-3 py-1 text-label-md rounded-lg font-medium cursor-pointer transition-all ${
                  selectedYear === '2024'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                2024
              </button>
              <button
                onClick={() => setSelectedYear('2023')}
                className={`px-3 py-1 text-label-md rounded-lg font-medium cursor-pointer transition-all ${
                  selectedYear === '2023'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                2023
              </button>
            </div>
          </div>
          <div className="h-64 w-full flex items-end justify-between space-x-3 pt-4 px-4 bg-surface-container-low rounded-xl border border-outline-variant">
            {/* Columns */}
            <div className="w-full bg-surface-variant rounded-t flex flex-col justify-end h-[40%] hover:bg-primary-container transition-all group relative cursor-pointer">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                12k
              </span>
            </div>
            <div className="w-full bg-surface-variant rounded-t flex flex-col justify-end h-[55%] hover:bg-primary-container transition-all group relative cursor-pointer">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                14.5k
              </span>
            </div>
            <div className="w-full bg-surface-variant rounded-t flex flex-col justify-end h-[50%] hover:bg-primary-container transition-all group relative cursor-pointer">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                13.8k
              </span>
            </div>
            <div className="w-full bg-surface-variant rounded-t flex flex-col justify-end h-[68%] hover:bg-primary-container transition-all group relative cursor-pointer">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                17.2k
              </span>
            </div>
            <div className="w-full bg-surface-variant rounded-t flex flex-col justify-end h-[75%] hover:bg-primary-container transition-all group relative cursor-pointer">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                19.1k
              </span>
            </div>
            <div className="w-full bg-primary-container rounded-t flex flex-col justify-end h-[90%] hover:bg-primary transition-all group relative cursor-pointer">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                24.8k
              </span>
            </div>
          </div>
          <div className="flex justify-between text-label-sm text-on-surface-variant mt-3 px-3">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Platform Activity Summary Card */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface mb-1">Platform Activity</h3>
            <p className="text-body-sm text-on-surface-variant">Real-time resource utilization</p>
          </div>
          <div className="space-y-4 my-6">
            <div>
              <div className="flex justify-between text-label-md font-label-md mb-1">
                <span className="text-on-surface">Server CPU Load</span>
                <span className="text-primary font-bold">42%</span>
              </div>
              <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-label-md font-label-md mb-1">
                <span className="text-on-surface">Database IOPS</span>
                <span className="text-secondary font-bold">78%</span>
              </div>
              <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-label-md font-label-md mb-1">
                <span className="text-on-surface">API Gateway Latency</span>
                <span className="text-emerald-600 font-bold">24ms</span>
              </div>
              <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-label-md font-label-md font-medium text-on-surface">All Systems Operational</span>
            </div>
            <span className="text-label-sm text-outline">99.99% uptime</span>
          </div>
        </div>
      </section>

      {/* Recent Activity Table */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-12">
        <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">Recent Activity Log</h3>
            <p className="text-body-sm text-on-surface-variant">Track all platform transactions, user signups, and system alerts</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => showToast('Activity filter drawer enabled.')}
              className="px-3 py-2 bg-surface-container-low text-on-surface-variant border border-outline-variant rounded-lg text-label-md font-medium hover:bg-surface-variant flex items-center space-x-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>Filter</span>
            </button>
            <button
              onClick={() => showToast('Audit activity log CSV exported successfully.')}
              className="px-3 py-2 bg-primary text-on-primary rounded-lg text-label-md font-medium hover:bg-primary-container transition-all cursor-pointer shadow-xs"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-label-md font-label-md border-b border-outline-variant">
                <th className="py-3 px-6">Activity ID / Type</th>
                <th className="py-3 px-6">User / Entity</th>
                <th className="py-3 px-6">Details / Description</th>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-body-md text-on-surface">
              {activities.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-primary">{row.id}</td>
                  <td className="py-4 px-6 flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${row.userClass}`}>
                      {row.initials}
                    </div>
                    <span>{row.user}</span>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">{row.desc}</td>
                  <td className="py-4 px-6 text-outline">{row.time}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-label-sm font-medium ${row.statusBadge}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => showToast(`Inspecting details for activity ${row.id}`)}
                      className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      title="Inspect record"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                    <button
                      onClick={() => showToast(`Quick options for ${row.id}`)}
                      className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
          <span className="text-label-md text-on-surface-variant">Showing 5 of 1,482 entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-label-md font-medium text-on-surface hover:bg-surface-variant disabled:opacity-50 cursor-pointer" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-primary text-on-primary rounded text-label-md font-medium">1</button>
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer">2</button>
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer">3</button>
            <button className="px-3 py-1 bg-surface border border-outline-variant rounded text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer">Next</button>
          </div>
        </div>
      </section>
    </div>
  );
};
