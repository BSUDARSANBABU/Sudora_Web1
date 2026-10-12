import React, { useState } from 'react';
import { PageView, TeamMember } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminTeamViewProps {
  onNavigate: (view: PageView) => void;
}

export const AdminTeamView: React.FC<AdminTeamViewProps> = ({ onNavigate }) => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formLinkedin, setFormLinkedin] = useState('');
  const [formGithub, setFormGithub] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormName('');
    setFormRole('Principal Architect');
    setFormBio('');
    setFormImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
    setFormLinkedin('https://linkedin.com');
    setFormGithub('https://github.com');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember(m);
    setFormName(m.name);
    setFormRole(m.role);
    setFormBio(m.bio);
    setFormImage(m.image);
    setFormLinkedin(m.socials?.linkedin || '');
    setFormGithub(m.socials?.github || '');
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMember) {
      updateTeamMember(editingMember.id, {
        name: formName,
        role: formRole,
        bio: formBio,
        image: formImage,
        socials: {
          linkedin: formLinkedin,
          github: formGithub
        }
      });
      showToast(`Team profile for "${formName}" updated! Public /about refreshed.`);
      setEditingMember(null);
    } else {
      const newId = 'team-' + Date.now().toString().slice(-6);
      addTeamMember({
        id: newId,
        name: formName,
        role: formRole,
        bio: formBio,
        image: formImage,
        socials: {
          linkedin: formLinkedin,
          github: formGithub
        }
      });
      showToast(`Team member "${formName}" added to public About page!`);
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (confirm(`Remove ${name} from public leadership list?`)) {
      deleteTeamMember(id);
      showToast(`${name} removed from public team roster.`);
    }
  };

  const filteredMembers = teamMembers.filter((m) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.bio.toLowerCase().includes(q)
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
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Manage Leadership &amp; Team CMS</h2>
            <span className="text-label-sm font-bold bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full">
              About Page Manager
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Maintain leadership bios, profiles, and team member rosters displayed on <code>/about</code>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('about')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Public About
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Team Member
          </button>
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
            placeholder="Search team members by name or role..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>
        <span className="text-label-md text-on-surface-variant">
          Showing {filteredMembers.length} team members
        </span>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((m) => (
          <div
            key={m.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="text-center space-y-3">
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary-fixed/40">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{m.name}</h3>
                <p className="text-label-sm font-semibold text-primary">{m.role}</p>
              </div>

              <p className="text-body-sm text-on-surface-variant line-clamp-3 text-left">{m.bio}</p>
            </div>

            <div className="pt-4 border-t border-outline-variant/60 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-outline">ID: {m.id}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(m)}
                  className="p-1.5 hover:bg-surface-variant rounded-lg text-outline hover:text-primary transition-colors cursor-pointer"
                  title="Edit Profile"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  onClick={() => handleDeleteMember(m.id, m.name)}
                  className="p-1.5 hover:bg-error-container/20 rounded-lg text-outline hover:text-error transition-colors cursor-pointer"
                  title="Delete Profile"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isCreateModalOpen || editingMember) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-outline-variant shadow-2xl relative">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingMember(null);
              }}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-headline-md font-bold text-on-surface mb-1">
              {editingMember ? 'Edit Team Profile' : 'Add Team Member'}
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              This member profile appears on the public leadership board at <code>/about</code>.
            </p>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Dr. Elena Rostova"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Professional Role *</label>
                <input
                  required
                  type="text"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder="e.g. VP of Security & Infrastructure"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Bio Summary *</label>
                <textarea
                  required
                  rows={3}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Executive background, past achievements and domain authority..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formLinkedin}
                    onChange={(e) => setFormLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formGithub}
                    onChange={(e) => setFormGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingMember(null);
                  }}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 shadow-sm cursor-pointer"
                >
                  {editingMember ? 'Save Profile' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
