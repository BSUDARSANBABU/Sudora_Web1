import React, { useState } from 'react';
import { PageView, ProjectItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminProjectsViewProps {
  onNavigate: (view: PageView) => void;
}

export const AdminProjectsView: React.FC<AdminProjectsViewProps> = ({ onNavigate }) => {
  const { projects, addProject, updateProject, deleteProject } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formCategory, setFormCategory] = useState('Full-Stack Web');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formDuration, setFormDuration] = useState('3 months');
  const [formMetricVal, setFormMetricVal] = useState('+250%');
  const [formMetricLabel, setFormMetricLabel] = useState('Speed Boost');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormTitle('');
    setFormClient('');
    setFormCategory('Full-Stack Web');
    setFormDesc('');
    setFormImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80');
    setFormTags('React, Node.js, AWS');
    setFormDuration('3 months');
    setFormMetricVal('+250%');
    setFormMetricLabel('Throughput');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectItem) => {
    setEditingProject(p);
    setFormTitle(p.title);
    setFormClient(p.client || '');
    setFormCategory(p.category);
    setFormDesc(p.description);
    setFormImage(p.image);
    setFormTags((p.tags || []).join(', '));
    setFormDuration(p.duration || '3 months');
    if (p.metrics && p.metrics.length > 0) {
      setFormMetricVal(p.metrics[0].value);
      setFormMetricLabel(p.metrics[0].label);
    } else {
      setFormMetricVal('+200%');
      setFormMetricLabel('Improvement');
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);
    const categorySlug = formCategory.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingProject) {
      updateProject(editingProject.id, {
        title: formTitle,
        client: formClient,
        category: formCategory,
        categorySlug,
        description: formDesc,
        image: formImage,
        tags: tagsArray,
        duration: formDuration,
        metrics: [{ label: formMetricLabel, value: formMetricVal }]
      });
      showToast(`Case study "${formTitle}" updated! Public /projects page refreshed.`);
      setEditingProject(null);
    } else {
      const newId = formTitle.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
      addProject({
        id: newId,
        title: formTitle,
        client: formClient,
        category: formCategory,
        categorySlug,
        description: formDesc,
        image: formImage,
        tags: tagsArray,
        duration: formDuration,
        metrics: [{ label: formMetricLabel, value: formMetricVal }]
      });
      showToast(`Case study "${formTitle}" published to public portfolio!`);
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Remove case study "${title}" from the public showcase?`)) {
      deleteProject(id);
      showToast(`Project "${title}" deleted from public portfolio.`);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.client && p.client.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Manage Portfolio &amp; Projects</h2>
            <span className="text-label-sm font-bold bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full">
              Public Page Manager
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Manage showcase case studies, client success stories, and metrics on <code>/projects</code>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Public Portfolio
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Case Study
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Showcase Case Studies</span>
          <p className="text-headline-md font-bold text-primary mt-1">{projects.length}</p>
          <span className="text-label-sm text-emerald-600 font-semibold">Active in public gallery</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Verified Enterprise Clients</span>
          <p className="text-headline-md font-bold text-on-surface mt-1">100% Verified</p>
          <span className="text-label-sm text-outline">NovaPay, Apex Global, CyberShield</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Target Public URL</span>
          <p className="text-headline-md font-bold text-secondary mt-1">/projects</p>
          <span className="text-label-sm text-primary font-semibold">Instant CMS Synchronization</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1 w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by title, client or tech..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Full-Stack Web', 'Cloud & DevOps', 'Mobile Apps', 'Cybersecurity'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-label-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full relative overflow-hidden bg-surface-container-high">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-inverse-surface/80 text-inverse-on-surface text-label-sm font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {p.category}
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-surface-container-lowest/90 rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-1 hover:bg-surface-variant rounded text-on-surface cursor-pointer"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(p.id, p.title)}
                    className="p-1 hover:bg-error-container/30 rounded text-error cursor-pointer"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-label-sm text-outline">
                  <span>Client: <strong className="text-on-surface">{p.client || 'Enterprise'}</strong></span>
                  <span>{p.duration || '3 mo'}</span>
                </div>

                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-1">{p.title}</h3>
                <p className="text-body-sm text-on-surface-variant line-clamp-2">{p.description}</p>

                {p.metrics && p.metrics.length > 0 && (
                  <div className="p-2.5 bg-primary-fixed/30 rounded-lg flex items-center justify-between">
                    <span className="text-label-sm text-primary font-medium">{p.metrics[0].label}</span>
                    <span className="text-headline-sm font-bold text-primary">{p.metrics[0].value}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {(p.tags || []).slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] font-semibold bg-surface-container-high px-2 py-0.5 rounded text-on-surface">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleOpenEdit(p)}
                className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-lg text-label-sm font-bold transition-colors cursor-pointer"
              >
                Edit Case Study
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isCreateModalOpen || editingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-outline-variant shadow-2xl relative">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingProject(null);
              }}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-headline-md font-bold text-on-surface mb-1">
              {editingProject ? 'Edit Public Project' : 'Create Showcase Project'}
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Published case studies appear in the gallery at <code>/projects</code>.
            </p>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Project Title *</label>
                <input
                  required
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. NextGen Core Banking Microservices"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    placeholder="e.g. NovaPay FinTech"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option>Full-Stack Web</option>
                    <option>Cloud &amp; DevOps</option>
                    <option>Mobile Apps</option>
                    <option>AI &amp; Machine Learning</option>
                    <option>Cybersecurity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Executive overview of the architecture and deliverables..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Key Metric Value</label>
                  <input
                    type="text"
                    value={formMetricVal}
                    onChange={(e) => setFormMetricVal(e.target.value)}
                    placeholder="e.g. +300% or $1.2M"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Metric Label</label>
                  <input
                    type="text"
                    value={formMetricLabel}
                    onChange={(e) => setFormMetricLabel(e.target.value)}
                    placeholder="e.g. Throughput or Cost Savings"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Tech Stack Tags</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="React 19, TypeScript, PostgreSQL..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 shadow-sm cursor-pointer"
                >
                  {editingProject ? 'Save Case Study' : 'Publish to Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
