import React, { useState } from 'react';
import { PageView, ServiceItem, ProjectItem, JobItem, BlogPost, TeamMember } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminCmsViewProps {
  onNavigate: (view: PageView) => void;
}

type CmsTab = 'home' | 'services' | 'projects' | 'careers' | 'about' | 'blog' | 'contact' | 'post-job';

export const AdminCmsView: React.FC<AdminCmsViewProps> = ({ onNavigate }) => {
  const {
    cmsSettings,
    updateCmsSettings,
    resetToDefaults,
    services,
    addService,
    deleteService,
    projects,
    addProject,
    deleteProject,
    jobs,
    addJob,
    deleteJob,
    blogPosts,
    addBlogPost,
    deleteBlogPost,
    teamMembers,
    addTeamMember,
    deleteTeamMember,
    inquiries,
    updateInquiryStatus,
    deleteInquiry
  } = useApp();

  const [activeTab, setActiveTab] = useState<CmsTab>('home');
  const [formData, setFormData] = useState({ ...cmsSettings });
  const [toast, setToast] = useState<string | null>(null);

  // New item modal or inline states
  const [newService, setNewService] = useState({
    title: '',
    category: 'Full Stack',
    icon: 'code',
    description: '',
    tags: 'React, Node, Cloud',
    startingPrice: '$4,500'
  });

  const [newProject, setNewProject] = useState({
    title: '',
    category: 'SaaS Platform',
    client: 'Acme Corp',
    description: '',
    tags: 'React, TypeScript, GraphQL',
    metric: '+350% Growth',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  });

  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: 'Senior (5+ yrs)',
    salary: '$140k - $175k',
    description: '',
    skills: 'React, TypeScript, Next.js'
  });

  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    category: 'Technology',
    author: 'Alex Morgan',
    readTime: '5 min read',
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  });

  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Staff Architect',
    bio: 'Pioneering cloud computing systems and distributed applications.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveHomeCms = (e: React.FormEvent) => {
    e.preventDefault();
    updateCmsSettings(formData);
    showToast('Homepage CMS settings updated and live!');
  };

  const handleReset = () => {
    if (confirm('Reset all CMS content and data across all pages to initial defaults?')) {
      resetToDefaults();
      setFormData({ ...cmsSettings });
      showToast('All CMS content restored to factory defaults.');
    }
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title.trim()) return;
    const item: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: newService.title,
      category: newService.category,
      icon: newService.icon || 'code',
      description: newService.description || 'Enterprise grade engineering deliverables.',
      features: ['Production-ready code', 'Continuous CI/CD deployment', 'Dedicated Tech Lead', 'Code Review SLA'],
      tags: newService.tags.split(',').map((t) => t.trim()).filter(Boolean),
      startingPrice: newService.startingPrice
    };
    addService(item);
    setNewService({ title: '', category: 'Full Stack', icon: 'code', description: '', tags: 'React, Node, Cloud', startingPrice: '$4,500' });
    showToast(`Service "${item.title}" published to /services!`);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const item: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      category: newProject.category,
      client: newProject.client,
      description: newProject.description || 'Scalable enterprise application engineered for high-availability.',
      tags: newProject.tags.split(',').map((t) => t.trim()).filter(Boolean),
      metric: newProject.metric,
      image: newProject.image
    };
    addProject(item);
    setNewProject({ title: '', category: 'SaaS Platform', client: 'Acme Corp', description: '', tags: 'React, TypeScript, GraphQL', metric: '+350% Growth', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' });
    showToast(`Project "${item.title}" published to /projects!`);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title.trim()) return;
    const item: JobItem = {
      id: `job-${Date.now()}`,
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      type: newJob.type,
      experience: newJob.experience,
      salary: newJob.salary,
      description: newJob.description || 'Join our elite cohort of engineers.',
      skills: newJob.skills.split(',').map((s) => s.trim()).filter(Boolean),
      postedDate: 'Today'
    };
    addJob(item);
    setNewJob({ title: '', department: 'Engineering', location: 'Remote (Global)', type: 'Full-time', experience: 'Senior (5+ yrs)', salary: '$140k - $175k', description: '', skills: 'React, TypeScript, Next.js' });
    showToast(`Job opening "${item.title}" published to /careers!`);
  };

  const handleCreateBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogPost.title.trim()) return;
    const item: BlogPost = {
      id: `post-${Date.now()}`,
      title: newBlogPost.title,
      category: newBlogPost.category,
      author: newBlogPost.author,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: newBlogPost.readTime,
      excerpt: newBlogPost.excerpt || 'Analysis of cutting edge technology trends and architecture.',
      image: newBlogPost.image
    };
    addBlogPost(item);
    setNewBlogPost({ title: '', category: 'Technology', author: 'Alex Morgan', readTime: '5 min read', excerpt: '', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' });
    showToast(`Article "${item.title}" published to /blog!`);
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name.trim()) return;
    const item: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newMember.name,
      role: newMember.role,
      bio: newMember.bio,
      image: newMember.image,
      socials: { linkedin: 'https://linkedin.com', github: 'https://github.com' }
    };
    addTeamMember(item);
    setNewMember({ name: '', role: 'Staff Architect', bio: 'Pioneering cloud computing systems and distributed applications.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' });
    showToast(`Team member "${item.name}" added to /about!`);
  };

  const tabsConfig: { id: CmsTab; label: string; icon: string; path: string; count?: number }[] = [
    { id: 'home', label: 'Homepage', icon: 'web', path: '/home' },
    { id: 'services', label: 'Services', icon: 'design_services', path: '/services', count: services.length },
    { id: 'projects', label: 'Portfolio', icon: 'folder_special', path: '/projects', count: projects.length },
    { id: 'careers', label: 'Careers & Jobs', icon: 'work_history', path: '/careers', count: jobs.length },
    { id: 'about', label: 'About & Team', icon: 'group', path: '/about', count: teamMembers.length },
    { id: 'blog', label: 'Blog & Articles', icon: 'newspaper', path: '/blog', count: blogPosts.length },
    { id: 'contact', label: 'Inquiries CRM', icon: 'contact_mail', path: '/contact', count: inquiries.length },
    { id: 'post-job', label: 'Job Intake Form', icon: 'post_add', path: '/post-job' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-300 border border-white/20">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">
              Public Pages Management (CMS)
            </h2>
            <span className="text-label-sm font-extrabold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
              All 8 Public Pages Managed
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1 max-w-3xl">
            Live content management hub for every public page. Edit copy, add and remove items, and see updates instantly reflected on public views.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate(activeTab === 'careers' ? 'careers' : activeTab === 'projects' ? 'projects' : activeTab === 'services' ? 'services' : activeTab === 'about' ? 'about' : activeTab === 'blog' ? 'blog' : activeTab === 'contact' ? 'contact' : activeTab === 'post-job' ? 'post-job' : 'home')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            <span>View Public Page</span>
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-error/30 text-error hover:bg-error-container/20 rounded-lg text-label-md font-semibold cursor-pointer transition-colors"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Public Pages Nav Tabs */}
      <div className="border-b border-outline-variant/60 flex overflow-x-auto gap-1 pb-1">
        {tabsConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-label-md font-medium transition-all whitespace-nowrap cursor-pointer border-b-2 -mb-1 ${
                isActive
                  ? 'border-primary text-primary font-bold bg-primary/5'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: HOMEPAGE CMS */}
      {activeTab === 'home' && (
        <form onSubmit={handleSaveHomeCms} className="space-y-6">
          <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-label-md font-bold text-primary">Homepage Live Content Editor (/home)</p>
                <p className="text-body-xs text-on-surface-variant">Changes saved here are instantly visible to visitors on the landing page.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-label-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              <span>Preview /home</span>
            </button>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="font-headline-sm font-bold text-on-surface">Hero Section &amp; Headlines</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Top Announcement Ribbon</label>
                <input
                  type="text"
                  value={formData.announcementText}
                  onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Hero Title (H1) *</label>
                <input
                  required
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-headline-sm font-bold text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Hero Subtitle &amp; Mission Narrative *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Hero Right-Side Image */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface">Hero Right-Side Image</h3>
                <p className="text-body-xs text-on-surface-variant">
                  Control the visual display and focal imagery on the right side of the homepage hero banner.
                </p>
              </div>
              <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full">
                Live on Homepage
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Hero Right-Side Image URL</label>
                <input
                  type="text"
                  value={formData.heroImage || '/src/assets/images/tech_campus_hq_1791383133762.jpg'}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="/src/assets/images/... or https://..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-sm font-mono text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-sm font-semibold text-on-surface-variant mb-2">
                  Select from Pre-Configured Architectural Workspace Visuals:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      label: 'Silicon Valley Campus HQ',
                      badge: 'Flagship Glass Atrium',
                      path: '/src/assets/images/tech_campus_hq_1791383133762.jpg'
                    },
                    {
                      label: 'Creative Dev Studio',
                      badge: 'Agile Dual-Screen Pods',
                      path: '/src/assets/images/creative_dev_studio_1791383145874.jpg'
                    },
                    {
                      label: 'AI Research & Robotics Lab',
                      badge: 'Smartboard War Rooms',
                      path: '/src/assets/images/ai_research_lab_1791383156822.jpg'
                    },
                    {
                      label: 'Penthouse Skyline Center',
                      badge: 'Panoramic Executive Deck',
                      path: '/src/assets/images/executive_skyline_hub_1791383167599.jpg'
                    },
                    {
                      label: 'London Tech Hub',
                      badge: 'European Engineering',
                      path: '/src/assets/images/office_innovation_lab_1791382653331.jpg'
                    },
                    {
                      label: 'Singapore APAC Lounge',
                      badge: 'Biophilic Workspace',
                      path: '/src/assets/images/office_workspace_hub_1791382668134.jpg'
                    }
                  ].map((preset) => {
                    const isSelected = (formData.heroImage || '/src/assets/images/tech_campus_hq_1791383133762.jpg') === preset.path;
                    return (
                      <button
                        type="button"
                        key={preset.path}
                        onClick={() => setFormData({ ...formData, heroImage: preset.path })}
                        className={`text-left rounded-xl border p-2 overflow-hidden transition-all flex flex-col gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                            : 'border-outline-variant hover:border-primary/50 bg-surface-container-low'
                        }`}
                      >
                        <div className="h-24 w-full rounded-lg overflow-hidden bg-surface-container">
                          <img
                            src={preset.path}
                            alt={preset.label}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-on-surface truncate">{preset.label}</p>
                          {isSelected && (
                            <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                          )}
                        </div>
                        <p className="text-[10px] text-on-surface-variant truncate">{preset.badge}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Preview Card */}
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center gap-4">
                <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-outline-variant bg-surface-container">
                  <img
                    src={formData.heroImage || '/src/assets/images/tech_campus_hq_1791383133762.jpg'}
                    alt="Active hero visual preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-on-surface">Active Hero Visual Setting</p>
                  <p className="text-[11px] text-on-surface-variant font-mono truncate">
                    {formData.heroImage || '/src/assets/images/tech_campus_hq_1791383133762.jpg'}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Rendered live on homepage hero with sleek focused presentation
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="font-headline-sm font-bold text-on-surface">Marketplace Credibility Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Success Rate (%)</label>
                <input
                  type="text"
                  value={formData.successRate}
                  onChange={(e) => setFormData({ ...formData, successRate: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-headline-sm font-bold text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Verified Engineers Count</label>
                <input
                  type="text"
                  value={formData.engineersCount}
                  onChange={(e) => setFormData({ ...formData, engineersCount: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-headline-sm font-bold text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Global Countries Served</label>
                <input
                  type="text"
                  value={formData.countriesCount}
                  onChange={(e) => setFormData({ ...formData, countriesCount: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-headline-sm font-bold text-primary focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
            <h3 className="font-headline-sm font-bold text-on-surface">Mission Statement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Mission Headline</label>
                <input
                  type="text"
                  value={formData.missionTitle}
                  onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1">Mission Statement Narrative</label>
                <textarea
                  rows={3}
                  value={formData.missionDesc}
                  onChange={(e) => setFormData({ ...formData, missionDesc: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={() => setFormData({ ...cmsSettings })}
              className="px-5 py-2.5 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 shadow-md cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Save Homepage CMS</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SERVICES CMS */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 gap-3">
            <div>
              <p className="text-label-md font-bold text-primary">Public Services Catalog Manager (/services)</p>
              <p className="text-body-xs text-on-surface-variant">
                Currently displaying <strong className="text-on-surface">{services.length}</strong> active service capabilities.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin-services')}
                className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Open Advanced Services View</span>
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-3.5 py-1.5 border border-outline-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Preview /services</span>
              </button>
            </div>
          </div>

          {/* Quick Add Service Form */}
          <form onSubmit={handleCreateService} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              Add New Service to Catalog
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Service Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. AI Agents & Machine Learning"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Artificial Intelligence"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Starting Price</label>
                <input
                  type="text"
                  placeholder="e.g. $6,000"
                  value={newService.startingPrice}
                  onChange={(e) => setNewService({ ...newService, startingPrice: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-label-sm font-bold text-on-surface mb-1">Description</label>
              <textarea
                rows={2}
                placeholder="Key value, delivery milestones, and technology..."
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Publish Service Live</span>
              </button>
            </div>
          </form>

          {/* Current Services List */}
          <div className="space-y-3">
            <h4 className="text-label-md font-bold text-on-surface uppercase tracking-wider text-outline">
              Active Services ({services.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="material-symbols-outlined text-primary text-2xl">{srv.icon || 'code'}</span>
                      <span className="text-label-xs bg-surface-container px-2 py-0.5 rounded text-outline font-mono">
                        {srv.startingPrice || '$4,000'}
                      </span>
                    </div>
                    <h5 className="font-bold text-on-surface text-base">{srv.title}</h5>
                    <p className="text-body-xs text-on-surface-variant mt-1 line-clamp-2">{srv.description}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
                    <span className="text-label-xs text-primary font-bold">{srv.category}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${srv.title}"?`)) {
                          deleteService(srv.id);
                          showToast(`Removed "${srv.title}"`);
                        }
                      }}
                      className="text-error hover:bg-error-container/20 p-1 rounded cursor-pointer"
                      title="Delete Service"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PORTFOLIO PROJECTS CMS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 gap-3">
            <div>
              <p className="text-label-md font-bold text-primary">Public Portfolio &amp; Case Studies Manager (/projects)</p>
              <p className="text-body-xs text-on-surface-variant">
                Currently showcasing <strong className="text-on-surface">{projects.length}</strong> enterprise case studies.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin-projects')}
                className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Open Advanced Portfolio View</span>
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="px-3.5 py-1.5 border border-outline-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Preview /projects</span>
              </button>
            </div>
          </div>

          {/* Quick Add Project Form */}
          <form onSubmit={handleCreateProject} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              Add New Project Case Study
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Project Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. NextGen FinTech Exchange"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global"
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Impact Metric</label>
                <input
                  type="text"
                  placeholder="e.g. +420% Throughput"
                  value={newProject.metric}
                  onChange={(e) => setNewProject({ ...newProject, metric: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-label-sm font-bold text-on-surface mb-1">Description</label>
              <textarea
                rows={2}
                placeholder="Architecture, deliverables, and outcome..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Publish Project Live</span>
              </button>
            </div>
          </form>

          {/* Current Projects List */}
          <div className="space-y-3">
            <h4 className="text-label-md font-bold text-on-surface uppercase tracking-wider text-outline">
              Featured Case Studies ({projects.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${proj.image})` }} />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-label-xs font-bold text-primary">{proj.client}</span>
                        <span className="text-label-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {proj.metric}
                        </span>
                      </div>
                      <h5 className="font-bold text-on-surface text-base">{proj.title}</h5>
                      <p className="text-body-xs text-on-surface-variant mt-1 line-clamp-2">{proj.description}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
                      <span className="text-label-xs text-outline">{proj.category}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showToast(`Removed "${proj.title}"`);
                          }
                        }}
                        className="text-error hover:bg-error-container/20 p-1 rounded cursor-pointer"
                        title="Delete Project"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CAREERS CMS */}
      {activeTab === 'careers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 gap-3">
            <div>
              <p className="text-label-md font-bold text-primary">Public Careers &amp; Open Positions Manager (/careers)</p>
              <p className="text-body-xs text-on-surface-variant">
                Currently open: <strong className="text-on-surface">{jobs.length}</strong> engineering &amp; product positions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin-jobs')}
                className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Open Advanced Careers View</span>
              </button>
              <button
                onClick={() => onNavigate('careers')}
                className="px-3.5 py-1.5 border border-outline-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Preview /careers</span>
              </button>
            </div>
          </div>

          {/* Quick Add Job Form */}
          <form onSubmit={handleCreateJob} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              Add New Job Opening
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Job Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lead Distributed Systems Engineer"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g. Backend Engineering"
                  value={newJob.department}
                  onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Salary Range</label>
                <input
                  type="text"
                  placeholder="e.g. $150k - $190k"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-label-sm font-bold text-on-surface mb-1">Required Skills (comma separated)</label>
              <input
                type="text"
                placeholder="Go, Rust, Kubernetes, Distributed Systems"
                value={newJob.skills}
                onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Publish Job Opening</span>
              </button>
            </div>
          </form>

          {/* Current Jobs List */}
          <div className="space-y-3">
            <h4 className="text-label-md font-bold text-on-surface uppercase tracking-wider text-outline">
              Open Positions ({jobs.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-label-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {job.department}
                      </span>
                      <span className="text-label-xs text-outline">{job.location}</span>
                    </div>
                    <h5 className="font-bold text-on-surface text-base">{job.title}</h5>
                    <p className="text-body-xs text-on-surface-variant mt-1 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.skills.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-on-surface font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
                    <span className="text-label-sm font-bold text-on-surface">{job.salary}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete job opening "${job.title}"?`)) {
                          deleteJob(job.id);
                          showToast(`Removed "${job.title}"`);
                        }
                      }}
                      className="text-error hover:bg-error-container/20 p-1 rounded cursor-pointer"
                      title="Delete Job"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ABOUT & TEAM CMS */}
      {activeTab === 'about' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 gap-3">
            <div>
              <p className="text-label-md font-bold text-primary">Public About &amp; Leadership Team Manager (/about)</p>
              <p className="text-body-xs text-on-surface-variant">
                Managing company vision and <strong className="text-on-surface">{teamMembers.length}</strong> public leadership profiles.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin-team')}
                className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Open Advanced Team View</span>
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-3.5 py-1.5 border border-outline-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Preview /about</span>
              </button>
            </div>
          </div>

          {/* Quick Add Team Member */}
          <form onSubmit={handleCreateMember} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_add</span>
              Add Team Member Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Role / Position *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Chief Technology Officer"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-label-sm font-bold text-on-surface mb-1">Bio</label>
              <textarea
                rows={2}
                placeholder="Background and technological impact..."
                value={newMember.bio}
                onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Publish Member Profile</span>
              </button>
            </div>
          </form>

          {/* Current Team Members */}
          <div className="space-y-3">
            <h4 className="text-label-md font-bold text-on-surface uppercase tracking-wider text-outline">
              Team Profiles ({teamMembers.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                      <div>
                        <h5 className="font-bold text-on-surface text-base">{member.name}</h5>
                        <p className="text-label-xs text-primary font-medium">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-body-xs text-on-surface-variant line-clamp-2">{member.bio}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-outline-variant/40 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Remove member "${member.name}"?`)) {
                          deleteTeamMember(member.id);
                          showToast(`Removed "${member.name}"`);
                        }
                      }}
                      className="text-error hover:bg-error-container/20 p-1 rounded cursor-pointer"
                      title="Remove Member"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BLOG CMS */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 gap-3">
            <div>
              <p className="text-label-md font-bold text-primary">Public Blog &amp; Insights Manager (/blog)</p>
              <p className="text-body-xs text-on-surface-variant">
                Managing <strong className="text-on-surface">{blogPosts.length}</strong> technical articles and industry publications.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin-blog')}
                className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Open Advanced Blog View</span>
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="px-3.5 py-1.5 border border-outline-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Preview /blog</span>
              </button>
            </div>
          </div>

          {/* Quick Add Blog Post */}
          <form onSubmit={handleCreateBlogPost} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-headline-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">post_add</span>
              Publish New Article
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Article Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. The Architecture of AI Microservices"
                  value={newBlogPost.title}
                  onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. AI & Engineering"
                  value={newBlogPost.category}
                  onChange={(e) => setNewBlogPost({ ...newBlogPost, category: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1">Read Time</label>
                <input
                  type="text"
                  placeholder="e.g. 6 min read"
                  value={newBlogPost.readTime}
                  onChange={(e) => setNewBlogPost({ ...newBlogPost, readTime: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-label-sm font-bold text-on-surface mb-1">Article Excerpt</label>
              <textarea
                rows={2}
                placeholder="High level overview and key takeaways..."
                value={newBlogPost.excerpt}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-body-sm text-on-surface"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Publish Article Live</span>
              </button>
            </div>
          </form>

          {/* Current Articles */}
          <div className="space-y-3">
            <h4 className="text-label-md font-bold text-on-surface uppercase tracking-wider text-outline">
              Published Articles ({blogPosts.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-label-xs font-bold text-primary">{post.category}</span>
                        <span className="text-label-xs text-outline">{post.readTime}</span>
                      </div>
                      <h5 className="font-bold text-on-surface text-base">{post.title}</h5>
                      <p className="text-body-xs text-on-surface-variant mt-1 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
                      <span className="text-label-xs text-outline">{post.date}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete article "${post.title}"?`)) {
                            deleteBlogPost(post.id);
                            showToast(`Removed "${post.title}"`);
                          }
                        }}
                        className="text-error hover:bg-error-container/20 p-1 rounded cursor-pointer"
                        title="Delete Article"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CONTACT & INQUIRIES CMS */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 gap-3">
            <div>
              <p className="text-label-md font-bold text-primary">Contact Us &amp; Inbound Leads Manager (/contact)</p>
              <p className="text-body-xs text-on-surface-variant">
                Submissions from the public Contact page and modals arrive here in real time.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('admin-support')}
                className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Open Advanced Inquiries CRM</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-3.5 py-1.5 border border-outline-variant rounded-lg text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Preview /contact</span>
              </button>
            </div>
          </div>

          {/* Inquiries list */}
          <div className="space-y-3">
            <h4 className="text-label-md font-bold text-on-surface uppercase tracking-wider text-outline">
              Inbound Inquiries ({inquiries.length})
            </h4>
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h5 className="font-bold text-on-surface text-base">{inq.name}</h5>
                      <span className="text-label-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">
                        {inq.company || 'Enterprise Lead'}
                      </span>
                      <span className="text-label-xs text-outline">{inq.email}</span>
                      <span className="text-label-xs text-outline">• {inq.date}</span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant max-w-2xl">{inq.message}</p>
                    <div className="flex items-center gap-4 text-label-xs text-on-surface font-medium pt-1">
                      <span>Service: <strong className="text-primary">{inq.service}</strong></span>
                      {inq.budget && <span>Budget: <strong>{inq.budget}</strong></span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={inq.status}
                      onChange={(e) => {
                        updateInquiryStatus(inq.id, e.target.value as any);
                        showToast(`Status updated to "${e.target.value}"`);
                      }}
                      className="bg-surface-container-low border border-outline-variant rounded-lg px-2.5 py-1.5 text-label-sm font-bold text-on-surface cursor-pointer"
                    >
                      <option value="New">Status: New</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <button
                      onClick={() => {
                        if (confirm(`Delete inquiry from "${inq.name}"?`)) {
                          deleteInquiry(inq.id);
                          showToast('Inquiry removed');
                        }
                      }}
                      className="text-error hover:bg-error-container/20 p-2 rounded-lg cursor-pointer"
                      title="Delete inquiry"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: POST A JOB INTAKE CMS */}
      {activeTab === 'post-job' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 gap-3">
            <div>
              <p className="text-label-md font-bold text-primary">Job Intake &amp; Requisition Workflow (/post-job)</p>
              <p className="text-body-xs text-on-surface-variant">
                Enterprise requisition intake form where clients and hiring managers specify briefs, skills, and budgets.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('post-job')}
                className="px-3.5 py-1.5 bg-primary text-on-primary rounded-lg text-label-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Open Public Intake Page</span>
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-headline-sm font-bold text-on-surface">Client Intake Configuration</h3>
            <p className="text-body-sm text-on-surface-variant">
              Every job submitted via the Public Job Intake page automatically joins the marketplace career listings and notifies registered talent in the network.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60">
                <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                <h5 className="font-bold text-on-surface mt-2">Vetted Talent Matching</h5>
                <p className="text-body-xs text-on-surface-variant mt-1">
                  Intakes match against top 1% engineers vetted across system design and coding assessments.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60">
                <span className="material-symbols-outlined text-secondary text-2xl">lock</span>
                <h5 className="font-bold text-on-surface mt-2">Enterprise Escrow &amp; Milestones</h5>
                <p className="text-body-xs text-on-surface-variant mt-1">
                  Automated milestone agreements and IP assignments protect client confidentiality.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60">
                <span className="material-symbols-outlined text-emerald-600 text-2xl">speed</span>
                <h5 className="font-bold text-on-surface mt-2">48-Hour Shortlist SLA</h5>
                <p className="text-body-xs text-on-surface-variant mt-1">
                  Clients receive customized candidate dossiers within 48 hours of brief submission.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => onNavigate('post-job')}
                className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">post_add</span>
                <span>Test Post a Job Flow</span>
              </button>
              <button
                onClick={() => onNavigate('admin-jobs')}
                className="px-5 py-2.5 border border-outline-variant rounded-lg text-label-md font-semibold hover:bg-surface-container flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">work_history</span>
                <span>Review All Marketplace Jobs</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
