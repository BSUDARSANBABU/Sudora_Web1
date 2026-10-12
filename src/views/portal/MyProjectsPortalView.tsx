import React, { useState } from 'react';
import { PageView } from '../../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';

interface MyProjectsPortalViewProps {
  onNavigate: (view: PageView) => void;
  onSelectProject?: (projectId: string) => void;
}

export const MyProjectsPortalView: React.FC<MyProjectsPortalViewProps> = ({
  onNavigate,
  onSelectProject
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [sortBy, setSortBy] = useState('Deadline');
  const [currentPage, setCurrentPage] = useState(1);
  const [reportToast, setReportToast] = useState<string | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<any | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [chartMetric, setChartMetric] = useState<'progress' | 'milestones' | 'budget'>('progress');
  const [showChart, setShowChart] = useState(true);

  const projects = [
    {
      id: 'core-banking',
      title: 'NextGen Core Banking API',
      shortName: 'Core Banking',
      status: 'In Progress',
      badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
      desc: 'Architecting secure microservices and high-throughput ledger transaction processing pipelines for regional bank.',
      client: 'NovaPay FinTech',
      lead: 'Lead: Sarah Jenkins',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2pBHN5t0LmGbEjStUDX2OEi0-8f_jle363VEE5vho7zvz23a3fhfEbiyKDLwDC86MF6j6ZwOy1it6vJm-zpX_x7S31EkjHvUUfTRnJxMhfgaOuI7JdaDincEpFLoulvwmVIVBWMMt0ExYTHU4SsQpAUSJeTxsscUtgpE9m2-8IDscbtMFbH90WTf4xbKPjgbtwJ5bUQ4BqOLGkA0--mcrqWAX2N5QVf9KbHCTpu_aHG_P857mcnMx',
      progress: 75,
      completedMilestones: 2,
      totalMilestones: 3,
      budget: '$28,500',
      budgetNum: 28.5,
      deadline: 'Oct 24, 2024',
      daysLeft: '12 days left',
      isCompleted: false,
      isCancelled: false
    },
    {
      id: 'cloud-migration',
      title: 'Enterprise Cloud Migration',
      shortName: 'Cloud Migration',
      status: 'Review',
      badgeClass: 'bg-amber-100 text-amber-800',
      desc: 'Migrating legacy monolith application infrastructure to AWS Kubernetes clusters with zero-downtime strategy.',
      client: 'Apex Global',
      lead: 'Lead: Marcus Vance',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGmBCmvgMYvneIU0qyiXpQr2_Sbd0pP6HvK3y-UmgfzDWgbTodVdfqfv2vN5LF9qOtqCDEhcv2FD8_He0C4W5QzN7bkz5TXhQNTofNqEIT6zBtTAcNE1NtYkZj2QbfXtoE12wo_WcFzARWJjS8Uc3EzYRS3fdaKPIRTfXPquFwfyQI6JSpyXiXlbdg2v5sg9DS_5irbHsvZOsf2g9NqmosCknsl5wkD8vTypRX861qPn3sGZdnQv_5',
      progress: 90,
      completedMilestones: 3,
      totalMilestones: 4,
      budget: '$45,000',
      budgetNum: 45.0,
      deadline: 'Nov 02, 2024',
      daysLeft: '3 days left',
      isCompleted: false,
      isCancelled: false
    },
    {
      id: 'cybersecurity-audit',
      title: 'Cybersecurity Audit & Patch',
      shortName: 'Security Audit',
      status: 'Completed',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      desc: 'Comprehensive penetration testing, vulnerability assessment, and remediation blueprint for SaaS product suite.',
      client: 'CyberShield Inc.',
      lead: 'Lead: Elena Rostova',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQDqUPbY5nDZmkdXUXp4HIIo16az6B8VYkqPwl8AKmY6ySp7lkE0J8lHwut0r5smAVX7PIx2qLWLnTMDti_9YHJRdQASo4dXyknKyaptYi2ezhJ6rBUoHp18M_qpk1XgWTNXmtZ8Cb5bLHW0fHz84bH4u_GAOXWn_8iLV0aBH0i5TjdCmwZxGsGYn5EG4xq4me-horfKbwTTQw0pvsNh5LfIlzxx_KlAfCxmZ6FYXc0H1hquoRJGcw',
      progress: 100,
      completedMilestones: 3,
      totalMilestones: 3,
      budget: '$15,000',
      budgetNum: 15.0,
      deadline: 'Sep 15, 2024',
      daysLeft: 'Delivered',
      isCompleted: true,
      isCancelled: false
    },
    {
      id: 'ai-recommendation',
      title: 'AI Recommendation Engine',
      shortName: 'AI Engine',
      status: 'In Progress',
      badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
      desc: 'Developing custom transformer-based recommendation model for e-commerce discovery pipeline.',
      client: 'DataPulse AI',
      lead: 'Lead: Kenji Sato',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVCN6C4IFO7MsM06MrX76fBym-Fcvo6YG-SZrYFMzEAuJB-XKhuvAkh-npvWaNQyfWS8ExhyI6BLS7ZsaWiDoYIer9BHlTp_afuGXRYevrvsXDuj9WL4kp9H2a-XbsmSmoYXPuAuKDAknXagKc6LptGAYTvRgyaIM65jSRycXAUEHWVgTMXYbBXKnbj8E4uWl9mhDH8s0ZCiwBJdEPnX7738ZgbiH1fSOB1lJN9EZfbN9TGAKKXZ1K',
      progress: 45,
      completedMilestones: 1,
      totalMilestones: 3,
      budget: '$32,000',
      budgetNum: 32.0,
      deadline: 'Dec 15, 2024',
      daysLeft: '45 days left',
      isCompleted: false,
      isCancelled: false
    },
    {
      id: 'legacy-refactor',
      title: 'Legacy Refactor Script',
      shortName: 'Legacy Script',
      status: 'Cancelled',
      badgeClass: 'bg-error-container text-on-error-container',
      desc: 'Automated migration scripts for legacy COBOL system databases. Cancelled due to scope pivot.',
      client: 'LegacyCorp',
      lead: 'Lead: Amanda Wright',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnDOELgD3l6ZUmFjgDR_9jmWAiQGZPVx__YLwv8Uqt4AK4w6n8shVJbl4hxpHqT3Uak5GJayLtXjIQfbmbOBZJRr4kGvLPahyn6itM8sHraDxF7YhKFapZamKZGHvSF9zQXIkfoy2QHIUIz2JXUXO7zjaRrTpCFV5w5sVhlJfi-EhMJZaeF7Aiy3d_r8gYBoYwwoxN-kycOnTSdpaq8gHwe0ShNqOCOrEcEdlPSvdl00pek-GXuDcP',
      progress: 15,
      completedMilestones: 1,
      totalMilestones: 2,
      budget: '$12,000',
      budgetNum: 12.0,
      deadline: 'Aug 10, 2024',
      daysLeft: 'Closed',
      isCompleted: false,
      isCancelled: true
    },
    {
      id: 'mobile-sdk',
      title: 'Mobile SDK Integration',
      shortName: 'Mobile SDK',
      status: 'Completed',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      desc: 'Cross-platform React Native SDK wrapper for biometric verification and secure token exchange.',
      client: 'FinTech Mobile',
      lead: 'Lead: David Miller',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBHzUEekK_QaQojk9KFh_9gbwg9jXawSwpNfv5MICC-qH4uovhGEC2h3-qJ4WeHQL-odvxKWf9NlImNj_niiQlhUT9VzoBk4qup0qcreDxNZwzhDL-iDEZGR35_dxq-VrVPjZW5u_uQ4j26FrEj58AHpbGHkf4ucOTXiQdQj_PtRLB-dQ5rE8zQEX1CMup5K_hLcv5KyNuXiW1mGL-mp8MmkN-HFpgx9LaBlKluyDCP8tpBYisby8Z',
      progress: 100,
      completedMilestones: 4,
      totalMilestones: 4,
      budget: '$22,000',
      budgetNum: 22.0,
      deadline: 'Jul 28, 2024',
      daysLeft: 'Delivered',
      isCompleted: true,
      isCancelled: false
    }
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'active' && !(p.status === 'In Progress' || p.status === 'Review')) return false;
    if (activeTab === 'completed' && p.status !== 'Completed') return false;
    if (activeTab === 'cancelled' && p.status !== 'Cancelled') return false;
    if (statusFilter !== 'All' && statusFilter !== 'Status: All' && p.status !== statusFilter) return false;
    if (clientFilter !== 'All Clients' && clientFilter !== 'Client: All Clients' && p.client !== clientFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.client.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'Budget: High to Low') {
      const aVal = parseInt(a.budget.replace(/[^0-9]/g, ''));
      const bVal = parseInt(b.budget.replace(/[^0-9]/g, ''));
      return bVal - aVal;
    }
    if (sortBy === 'Name: A to Z') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'Progress') {
      return b.progress - a.progress;
    }
    return 0;
  });

  const chartData = projects.map((p) => ({
    id: p.id,
    name: p.shortName,
    fullName: p.title,
    client: p.client,
    progress: p.progress,
    completedMilestones: p.completedMilestones,
    totalMilestones: p.totalMilestones,
    remainingMilestones: Math.max(0, p.totalMilestones - p.completedMilestones),
    budget: p.budgetNum,
    status: p.status,
    raw: p
  }));

  return (
    <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto flex flex-col gap-8">
      {reportToast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{reportToast}</p>
        </div>
      )}
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Admin Dashboard</h2>
            <span className="text-label-sm font-bold text-primary bg-primary-fixed/60 px-2.5 py-0.5 rounded-md">
              My Projects &amp; Overview
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Manage company contracts, project milestones, budgets, and talent deliverables.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setReportToast('Milestone summary report generated and downloaded.');
              setTimeout(() => setReportToast(null), 4000);
            }}
            className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md rounded-lg hover:bg-surface-variant transition-all duration-200 flex items-center gap-2 cursor-pointer font-medium"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export Report
          </button>
          <button
            onClick={() => onNavigate('post-job')}
            className="px-4 py-2 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Project
          </button>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-label-md uppercase tracking-wider font-semibold">Total Projects</span>
            <span className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg">
              <span className="material-symbols-outlined">work</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-headline-md font-headline-md text-on-surface font-bold">24</span>
            <span className="text-label-sm text-emerald-600 font-semibold flex items-center">+3 this month</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-label-md uppercase tracking-wider font-semibold">Active Contracts</span>
            <span className="p-2 bg-secondary-fixed text-on-secondary-fixed rounded-lg">
              <span className="material-symbols-outlined">bolt</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-headline-md font-headline-md text-on-surface font-bold">8</span>
            <span className="text-label-sm text-primary font-semibold">In progress</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-label-md uppercase tracking-wider font-semibold">Total Spent / Earned</span>
            <span className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg">
              <span className="material-symbols-outlined">payments</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-headline-md font-headline-md text-on-surface font-bold">$142,500</span>
            <span className="text-label-sm text-emerald-600 font-semibold">+18% vs last qtr</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-label-md uppercase tracking-wider font-semibold">Completion Rate</span>
            <span className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg">
              <span className="material-symbols-outlined">task_alt</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-headline-md font-headline-md text-on-surface font-bold">96.8%</span>
            <span className="text-label-sm text-emerald-600 font-semibold">Top tier</span>
          </div>
        </div>
      </div>

      {/* Recharts Progress & Milestones Analytics */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-xl">bar_chart</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                  Project Progress &amp; Milestone Analytics
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                  Recharts Analytics
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant">
                Visualizing milestone completion, deliverables pacing, and contract allocations across enterprise teams.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-outline-variant/50">
              <button
                type="button"
                onClick={() => setChartMetric('progress')}
                className={`px-3 py-1.5 rounded-md text-label-sm font-semibold transition-all cursor-pointer ${
                  chartMetric === 'progress'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Progress (%)
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('milestones')}
                className={`px-3 py-1.5 rounded-md text-label-sm font-semibold transition-all cursor-pointer ${
                  chartMetric === 'milestones'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Milestones
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('budget')}
                className={`px-3 py-1.5 rounded-md text-label-sm font-semibold transition-all cursor-pointer ${
                  chartMetric === 'budget'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Budget ($k)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowChart(!showChart)}
              className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors cursor-pointer"
              title={showChart ? 'Collapse Chart' : 'Expand Chart'}
            >
              <span className="material-symbols-outlined text-lg">
                {showChart ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Live KPI Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-outline-variant/40">
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">Average Progress</span>
            <span className="text-headline-sm font-bold text-primary mt-0.5 block">70.8%</span>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">Milestones Completed</span>
            <span className="text-headline-sm font-bold text-emerald-600 mt-0.5 block">14 / 19</span>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">Active Milestones</span>
            <span className="text-headline-sm font-bold text-on-surface mt-0.5 block">5 Pending</span>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">Escrow Allocation</span>
            <span className="text-headline-sm font-bold text-primary mt-0.5 block">$154.5k</span>
          </div>
        </div>

        {showChart && (
          <div className="w-full pt-2">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: -10, bottom: 25 }}
                  onClick={(state: any) => {
                    if (state && state.activePayload && state.activePayload.length) {
                      setSelectedProjectModal(state.activePayload[0].payload.raw);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={chartMetric === 'progress' ? [0, 100] : chartMetric === 'milestones' ? [0, 5] : [0, 50]}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => {
                      if (chartMetric === 'progress') return `${v}%`;
                      if (chartMetric === 'budget') return `$${v}k`;
                      return `${v}`;
                    }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(28, 68, 178, 0.06)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant shadow-xl text-left text-on-surface min-w-[220px]">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-body-sm text-on-surface truncate">{d.fullName}</span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  d.status === 'Completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : d.status === 'Review'
                                    ? 'bg-amber-100 text-amber-800'
                                    : d.status === 'Cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-primary-fixed text-on-primary-fixed'
                                }`}
                              >
                                {d.status}
                              </span>
                            </div>
                            <p className="text-label-sm text-on-surface-variant mb-2">Client: {d.client}</p>
                            <div className="space-y-1.5 pt-2 border-t border-outline-variant/60 text-label-sm">
                              <div className="flex justify-between">
                                <span className="text-on-surface-variant">Progress:</span>
                                <span className="font-bold text-primary">{d.progress}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-on-surface-variant">Milestones:</span>
                                <span className="font-bold text-on-surface">
                                  {d.completedMilestones} of {d.totalMilestones} done
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-on-surface-variant">Budget:</span>
                                <span className="font-bold text-emerald-600">${d.budget}k</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-primary mt-2 font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">touch_app</span>
                              Click bar to inspect project
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {chartMetric === 'progress' && (
                    <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label={{ value: '100% Target', fill: '#10b981', fontSize: 11, position: 'top' }} />
                  )}

                  {chartMetric === 'progress' && (
                    <Bar
                      dataKey="progress"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                    >
                      {chartData.map((entry) => {
                        const color =
                          entry.progress === 100
                            ? '#10b981'
                            : entry.progress >= 75
                            ? '#1c44b2'
                            : entry.progress >= 40
                            ? '#3b82f6'
                            : '#f59e0b';
                        return <Cell key={`cell-${entry.id}`} fill={color} className="cursor-pointer hover:opacity-85 transition-opacity" />;
                      })}
                    </Bar>
                  )}

                  {chartMetric === 'milestones' && (
                    <>
                      <Bar
                        dataKey="completedMilestones"
                        name="Completed Milestones"
                        fill="#1c44b2"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                        className="cursor-pointer"
                      />
                      <Bar
                        dataKey="remainingMilestones"
                        name="Remaining Milestones"
                        fill="#cbd5e1"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                        className="cursor-pointer"
                      />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12, paddingBottom: 8 }} />
                    </>
                  )}

                  {chartMetric === 'budget' && (
                    <Bar
                      dataKey="budget"
                      name="Budget ($k)"
                      fill="#059669"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                      className="cursor-pointer"
                    >
                      {chartData.map((entry) => (
                        <Cell
                          key={`budget-${entry.id}`}
                          fill={entry.status === 'Completed' ? '#10b981' : entry.status === 'Review' ? '#f59e0b' : '#1c44b2'}
                          className="cursor-pointer hover:opacity-85 transition-opacity"
                        />
                      ))}
                    </Bar>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </section>

      {/* Tabs & Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-label-md font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            All (24)
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg text-label-md font-medium transition-all cursor-pointer ${
              activeTab === 'active'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            Active (8)
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg text-label-md font-medium transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            Completed (13)
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-lg text-label-md font-medium transition-all cursor-pointer ${
              activeTab === 'cancelled'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            Cancelled (3)
          </button>
        </div>

        {/* Filter Dropdowns & Search */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <span className="absolute left-3 top-2.5 pointer-events-none text-outline material-symbols-outlined text-sm">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects..."
              className="w-48 sm:w-56 bg-surface-container-lowest border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-label-md text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 pr-8 text-label-md text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option>Status: All</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <span className="absolute right-2 top-2.5 pointer-events-none text-outline material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 pr-8 text-label-md text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option>Client: All Clients</option>
              <option>Apex Global</option>
              <option>NovaPay FinTech</option>
              <option>CyberShield Inc.</option>
              <option>DataPulse AI</option>
              <option>LegacyCorp</option>
              <option>FinTech Mobile</option>
            </select>
            <span className="absolute right-2 top-2.5 pointer-events-none text-outline material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 pr-8 text-label-md text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            >
              <option>Sort by: Deadline</option>
              <option>Budget: High to Low</option>
              <option>Name: A to Z</option>
              <option>Progress</option>
            </select>
            <span className="absolute right-2 top-2.5 pointer-events-none text-outline material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Project Cards / Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((p) => (
          <div
            key={p.id}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-6 relative"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-label-sm font-semibold ${p.badgeClass}`}>
                    {p.status}
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mt-2 font-semibold">
                    {p.title}
                  </h3>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
                    className="text-outline hover:text-on-surface cursor-pointer p-1 rounded-md hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                  {openMenuId === p.id && (
                    <div className="absolute right-0 top-8 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl py-1.5 w-48 z-20 animate-in fade-in">
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          setSelectedProjectModal(p);
                        }}
                        className="w-full text-left px-4 py-2 text-body-sm hover:bg-surface-container flex items-center gap-2 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-base">visibility</span>
                        Project Overview
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          onNavigate('messages');
                        }}
                        className="w-full text-left px-4 py-2 text-body-sm hover:bg-surface-container flex items-center gap-2 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-base">chat</span>
                        Message Team Lead
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuId(null);
                          setReportToast(`Scope of work downloaded for ${p.title}.`);
                          setTimeout(() => setReportToast(null), 3500);
                        }}
                        className="w-full text-left px-4 py-2 text-body-sm hover:bg-surface-container flex items-center gap-2 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-base">description</span>
                        Download Scope
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-body-sm text-on-surface-variant line-clamp-2">
                {p.desc}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Client Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-outline-variant/50">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  alt={p.client}
                  src={p.clientAvatar}
                />
                <div className="flex flex-col">
                  <span className="text-label-md font-bold text-on-surface">{p.client}</span>
                  <span className="text-label-sm text-outline">{p.lead}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-label-sm">
                  <span className="text-on-surface-variant">Progress</span>
                  <span
                    className={`font-bold ${
                      p.isCompleted ? 'text-emerald-600' : p.isCancelled ? 'text-error' : 'text-primary'
                    }`}
                  >
                    {p.progress}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.isCompleted ? 'bg-emerald-500' : p.isCancelled ? 'bg-error' : 'bg-primary'
                    }`}
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              {/* Budget & Deadline */}
              <div className="flex items-center justify-between text-body-sm pt-2">
                <div>
                  <span className="text-outline block text-label-sm">Budget</span>
                  <span className="font-bold text-on-surface">{p.budget}</span>
                </div>
                <div className="text-right">
                  <span className="text-outline block text-label-sm">
                    {p.isCompleted ? 'Completed On' : p.isCancelled ? 'Terminated' : 'Deadline'}
                  </span>
                  <span className="font-medium text-on-surface">{p.deadline}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-outline-variant/50 flex items-center justify-between">
              <span
                className={`text-label-sm flex items-center gap-1 ${
                  p.isCompleted ? 'text-emerald-600 font-medium' : p.isCancelled ? 'text-error font-medium' : 'text-outline'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {p.isCompleted ? 'check_circle' : p.isCancelled ? 'cancel' : 'schedule'}
                </span>
                {p.daysLeft}
              </span>
              <button
                onClick={() => setSelectedProjectModal(p)}
                className="px-4 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-lg text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
        <span className="text-label-md text-on-surface-variant">Showing 1-6 of 24 projects</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-3 py-1.5 border border-outline-variant rounded-lg text-label-md text-outline disabled:opacity-50 cursor-pointer"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded-lg text-label-md font-semibold cursor-pointer ${
                currentPage === page
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant text-on-surface hover:bg-surface-variant'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
            className="px-3 py-1.5 border border-outline-variant rounded-lg text-label-md text-on-surface hover:bg-surface-variant cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-outline-variant shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2.5 py-1 rounded-full text-label-sm font-semibold ${selectedProjectModal.badgeClass}`}>
                {selectedProjectModal.status}
              </span>
              <span className="text-label-sm text-outline">ID: {selectedProjectModal.id}</span>
            </div>

            <h2 className="text-headline-md font-headline-md font-bold text-on-surface">
              {selectedProjectModal.title}
            </h2>

            <p className="text-body-md text-on-surface-variant mt-2 leading-relaxed">
              {selectedProjectModal.desc}
            </p>

            {/* Client & Lead info */}
            <div className="flex items-center gap-4 py-4 my-4 border-y border-outline-variant/50">
              <img
                src={selectedProjectModal.clientAvatar}
                alt={selectedProjectModal.client}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <p className="font-bold text-body-md text-on-surface">{selectedProjectModal.client}</p>
                <p className="text-label-sm text-on-surface-variant">{selectedProjectModal.lead}</p>
              </div>
              <div className="text-right">
                <p className="text-label-sm text-outline">Contract Budget</p>
                <p className="font-bold text-headline-sm text-primary">{selectedProjectModal.budget}</p>
              </div>
            </div>

            {/* Milestones Breakdown */}
            <div className="space-y-3 mb-6">
              <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface">
                Milestones &amp; Deliverables
              </h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                    <div>
                      <p className="text-body-sm font-semibold text-on-surface">Milestone 1: Architectural Blueprint</p>
                      <p className="text-label-sm text-on-surface-variant">Specs approved &amp; signed off</p>
                    </div>
                  </div>
                  <span className="text-label-sm font-bold text-emerald-600">Funded &amp; Released</span>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-lg">pending</span>
                    <div>
                      <p className="text-body-sm font-semibold text-on-surface">Milestone 2: Core Microservices &amp; Ledger</p>
                      <p className="text-label-sm text-on-surface-variant">In active testing staging cluster</p>
                    </div>
                  </div>
                  <span className="text-label-sm font-bold text-primary">In Progress (75%)</span>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-outline text-lg">radio_button_unchecked</span>
                    <div>
                      <p className="text-body-sm font-semibold text-on-surface">Milestone 3: Production Deployment &amp; Audit</p>
                      <p className="text-label-sm text-on-surface-variant">Scheduled for deadline completion</p>
                    </div>
                  </div>
                  <span className="text-label-sm font-medium text-outline">Pending</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-outline-variant">
              <button
                onClick={() => {
                  setSelectedProjectModal(null);
                  setReportToast(`Audit report downloaded for ${selectedProjectModal.title}`);
                  setTimeout(() => setReportToast(null), 3500);
                }}
                className="w-full sm:w-auto px-4 py-2.5 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Export Report
              </button>
              <button
                onClick={() => {
                  setSelectedProjectModal(null);
                  onNavigate('messages');
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary/90 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Message Team Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
