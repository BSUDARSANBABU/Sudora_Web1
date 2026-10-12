import React, { useState } from 'react';
import { PageView, JobItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminJobsViewProps {
  onNavigate: (view: PageView) => void;
}

export const AdminJobsView: React.FC<AdminJobsViewProps> = ({ onNavigate }) => {
  const { jobs, addJob, updateJob, deleteJob } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('Full-time');
  const [formLocation, setFormLocation] = useState('Remote (Worldwide)');
  const [formExp, setFormExp] = useState('5+ years');
  const [formDept, setFormDept] = useState('Engineering');
  const [formSkills, setFormSkills] = useState('React, TypeScript, Node.js');
  const [formDesc, setFormDesc] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormTitle('');
    setFormType('Full-time');
    setFormLocation('Remote (Worldwide)');
    setFormExp('5+ years');
    setFormDept('Engineering');
    setFormSkills('React, TypeScript, Node.js');
    setFormDesc('Seeking an experienced professional to lead high-velocity product execution.');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (job: JobItem) => {
    setEditingJob(job);
    setFormTitle(job.title);
    setFormType(job.type);
    setFormLocation(job.location);
    setFormExp(job.experience);
    setFormDept(job.department);
    setFormSkills((job.skills || []).join(', '));
    setFormDesc(job.description || '');
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formSkills.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingJob) {
      updateJob(editingJob.id, {
        title: formTitle,
        type: formType,
        location: formLocation,
        experience: formExp,
        department: formDept,
        skills: skillsArray,
        description: formDesc
      });
      showToast(`Position "${formTitle}" updated! Public /careers board updated.`);
      setEditingJob(null);
    } else {
      const newId = 'job-' + Date.now().toString().slice(-6);
      addJob({
        id: newId,
        title: formTitle,
        type: formType,
        location: formLocation,
        experience: formExp,
        department: formDept,
        skills: skillsArray,
        description: formDesc
      });
      showToast(`New job "${formTitle}" published to public /careers page!`);
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (confirm(`Are you sure you want to close position "${title}"?`)) {
      deleteJob(id);
      showToast(`Position "${title}" closed and removed from public careers.`);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    if (selectedDept !== 'All' && j.department !== selectedDept) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      j.title.toLowerCase().includes(q) ||
      j.department.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      (j.skills && j.skills.some((s) => s.toLowerCase().includes(q)))
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
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Manage Careers &amp; Jobs CMS</h2>
            <span className="text-label-sm font-bold bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full">
              Public Page Manager
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Publish and manage job postings and opportunities visible to applicants on <code>/careers</code>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('careers')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Public Careers
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Post New Opening
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Active Open Roles</span>
          <p className="text-headline-md font-bold text-primary mt-1">{jobs.length}</p>
          <span className="text-label-sm text-emerald-600 font-semibold">Accepting candidate applications</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Hiring Departments</span>
          <p className="text-headline-md font-bold text-on-surface mt-1">Engineering, AI, Cloud, Design</p>
          <span className="text-label-sm text-outline">Across 5 global zones</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Public Target View</span>
          <p className="text-headline-md font-bold text-secondary mt-1">/careers</p>
          <span className="text-label-sm text-primary font-semibold">Real-time candidate pipeline</span>
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
            placeholder="Search job titles, locations or skills..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Engineering', 'AI & Data', 'Cloud & DevOps', 'Design'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-label-sm font-semibold transition-all cursor-pointer ${
                selectedDept === dept ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-variant'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Table & Cards */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs">
        <div className="divide-y divide-outline-variant/60">
          {filteredJobs.map((j) => (
            <div key={j.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-container/30 transition-colors">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-headline-sm font-bold text-on-surface text-base">{j.title}</h3>
                  <span className="bg-primary-fixed/60 text-primary text-label-sm font-bold px-2 py-0.5 rounded-md">
                    {j.department}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {j.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {j.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    {j.experience}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {(j.skills || []).map((s) => (
                    <span key={s} className="text-[10px] font-semibold bg-surface-container px-2 py-0.5 rounded text-on-surface">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleOpenEdit(j)}
                  className="px-3 py-1.5 border border-outline-variant hover:bg-surface-variant rounded-lg text-label-md font-semibold text-on-surface cursor-pointer"
                >
                  Edit Role
                </button>
                <button
                  onClick={() => handleDeleteJob(j.id, j.title)}
                  className="px-3 py-1.5 border border-error/30 text-error hover:bg-error-container/20 rounded-lg text-label-md font-semibold cursor-pointer"
                >
                  Close Opening
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {(isCreateModalOpen || editingJob) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-outline-variant shadow-2xl relative">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingJob(null);
              }}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-headline-md font-bold text-on-surface mb-1">
              {editingJob ? 'Edit Career Opening' : 'Post New Job Opening'}
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              This job will be listed on <code>/careers</code> for engineers and specialists.
            </p>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Role Title *</label>
                <input
                  required
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Lead Distributed Systems Engineer"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Department</label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option>Engineering</option>
                    <option>AI &amp; Data</option>
                    <option>Cloud &amp; DevOps</option>
                    <option>Design</option>
                    <option>Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Employment Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option>Full-time</option>
                    <option>Contract (3-6 mo)</option>
                    <option>Part-time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Remote (Worldwide)"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={formExp}
                    onChange={(e) => setFormExp(e.target.value)}
                    placeholder="e.g. 5+ years"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="React 19, TypeScript, PostgreSQL, AWS..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Description &amp; Key Responsibilities</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Brief role overview and key deliverables..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingJob(null);
                  }}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 shadow-sm cursor-pointer"
                >
                  {editingJob ? 'Save Role' : 'Publish Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
