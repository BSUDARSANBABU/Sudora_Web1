import React, { useState } from 'react';
import { PageView, ServiceItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminServicesViewProps {
  onNavigate: (view: PageView) => void;
}

export const AdminServicesView: React.FC<AdminServicesViewProps> = ({ onNavigate }) => {
  const { services, addService, updateService, deleteService } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formIcon, setFormIcon] = useState('code');
  const [formDesc, setFormDesc] = useState('');
  const [formTags, setFormTags] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormTitle('');
    setFormIcon('code');
    setFormDesc('');
    setFormTags('');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (svc: ServiceItem) => {
    setEditingService(svc);
    setFormTitle(svc.title);
    setFormIcon(svc.icon);
    setFormDesc(svc.description);
    setFormTags((svc.tags || []).join(', '));
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        title: formTitle,
        icon: formIcon,
        description: formDesc,
        tags: tagsArray
      });
      showToast(`Service "${formTitle}" updated successfully! Changes reflected on public website.`);
      setEditingService(null);
    } else {
      const newId = formTitle.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
      addService({
        id: newId,
        title: formTitle,
        icon: formIcon,
        description: formDesc,
        tags: tagsArray
      });
      showToast(`New service "${formTitle}" created and published to public website!`);
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteService = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete service "${title}" from the public site?`)) {
      deleteService(id);
      showToast(`Service "${title}" removed from public site.`);
    }
  };

  const filteredServices = services.filter((s) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.tags && s.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
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
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Manage Services CMS</h2>
            <span className="text-label-sm font-bold bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full">
              Public Page Manager
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Create, edit, and organize services displayed to public visitors on the <code>/services</code> page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('services')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Public Services
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add New Service
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Total Public Services</span>
          <p className="text-headline-md font-bold text-primary mt-1">{services.length}</p>
          <span className="text-label-sm text-emerald-600 font-semibold">Live on marketplace</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Engineering Categories</span>
          <p className="text-headline-md font-bold text-on-surface mt-1">8 Core Domains</p>
          <span className="text-label-sm text-outline">React, AI, Cloud, Python, Mobile</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Synced Target Page</span>
          <p className="text-headline-md font-bold text-secondary mt-1">/services</p>
          <span className="text-label-sm text-primary font-semibold">Real-time CMS sync active</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services by title, tags or description..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>
        <span className="text-label-md text-on-surface-variant">
          Showing {filteredServices.length} of {services.length} services
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((svc) => (
          <div
            key={svc.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">{svc.icon}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(svc)}
                    className="p-1.5 hover:bg-surface-variant rounded-lg text-outline hover:text-primary transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteService(svc.id, svc.title)}
                    className="p-1.5 hover:bg-error-container/20 rounded-lg text-outline hover:text-error transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>

              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">{svc.title}</h3>
              <p className="text-body-sm text-on-surface-variant line-clamp-3 mb-4">{svc.description}</p>
            </div>

            <div className="pt-4 border-t border-outline-variant/60">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(svc.tags || []).slice(0, 4).map((t) => (
                  <span key={t} className="text-[11px] font-semibold bg-surface-container-high px-2 py-0.5 rounded text-on-surface">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-label-sm">
                <span className="text-outline">ID: {svc.id}</span>
                <button
                  onClick={() => handleOpenEdit(svc)}
                  className="text-primary font-bold hover:underline cursor-pointer"
                >
                  Edit Scope →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {(isCreateModalOpen || editingService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-outline-variant shadow-2xl relative">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingService(null);
              }}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-headline-md font-bold text-on-surface mb-1">
              {editingService ? 'Edit Public Service' : 'Add New Public Service'}
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              This service will be immediately rendered on the public website.
            </p>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Service Title *</label>
                <input
                  required
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. AI Workflow Engineering"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Icon (Material Symbols Name)</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl">{formIcon || 'code'}</span>
                  </div>
                  <input
                    type="text"
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    placeholder="code, cloud, psychology, palette..."
                    className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Comprehensive service description for client prospects..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="React 19, TypeScript, PyTorch, AWS..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 shadow-sm cursor-pointer"
                >
                  {editingService ? 'Save Changes' : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
