import React, { useState } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';

interface PostJobViewProps {
  onNavigate: (view: PageView) => void;
}

export const PostJobView: React.FC<PostJobViewProps> = ({ onNavigate }) => {
  const { addJob } = useApp();
  const [jobTitle, setJobTitle] = useState('Senior Full Stack Engineer for AI SaaS Platform');
  const [category, setCategory] = useState('Full Stack Development');
  const [description, setDescription] = useState(
    'We are seeking an experienced Full Stack Engineer to build out core features for our next-gen AI platform. You will work closely with our product and design teams to develop scalable microservices, intuitive user interfaces, and robust backend integrations.'
  );
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');
  const [budgetType, setBudgetType] = useState<'fixed' | 'hourly'>('fixed');
  const [minBudget, setMinBudget] = useState('5000');
  const [maxBudget, setMaxBudget] = useState('12000');
  const [projectType, setProjectType] = useState('Contract (1-3 months)');
  const [deadline, setDeadline] = useState('2025-06-30');
  const [activeSidebar, setActiveSidebar] = useState('post-job');
  const [isPostedSuccess, setIsPostedSuccess] = useState(false);
  const [draftToast, setDraftToast] = useState<string | null>(null);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      id: `job-${Date.now()}`,
      title: jobTitle,
      department: category,
      location: 'Remote (Global)',
      type: budgetType === 'hourly' ? 'Part-time' : 'Full-time',
      experience: 'Senior (5+ yrs)',
      salary: `$${Number(minBudget).toLocaleString()} - $${Number(maxBudget).toLocaleString()} ${budgetType === 'hourly' ? '/hr' : 'Fixed'}`,
      description,
      skills,
      postedDate: 'Just now'
    });
    setIsPostedSuccess(true);
    setTimeout(() => {
      setIsPostedSuccess(false);
    }, 4500);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex antialiased w-full">
      {/* Toast Notification */}
      {isPostedSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-primary text-on-primary px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300 text-2xl">check_circle</span>
          <div>
            <p className="font-semibold text-body-md">Job Posted to Marketplace!</p>
            <p className="text-label-sm text-primary-fixed-dim">
              Vetted candidates in the network are now receiving your brief.
            </p>
          </div>
        </div>
      )}
      {draftToast && (
        <div className="fixed top-6 right-6 z-50 bg-primary text-on-primary px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300 text-2xl">save</span>
          <div>
            <p className="font-semibold text-body-md">{draftToast}</p>
            <p className="text-label-sm text-primary-fixed-dim">
              You can return and finish publishing this brief anytime.
            </p>
          </div>
        </div>
      )}

      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col justify-between h-[calc(100vh-65px)] w-64 bg-surface-container-low border-r border-outline-variant shadow-sm sticky top-[65px] left-0 z-30 p-4 shrink-0">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-xl">hub</span>
            </div>
            <div>
              <h1 className="text-headline-sm font-headline-sm font-extrabold text-primary">
                Sudora
              </h1>
              <p className="text-label-sm text-on-surface-variant">Freelance Talent &amp; SaaS</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => onNavigate('my-projects')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">dashboard</span>
              <span className="text-label-md font-label-md">Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('careers')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">search</span>
              <span className="text-label-md font-label-md">Find Jobs</span>
            </button>
            <button
              className="flex items-center gap-3 bg-primary-container text-on-primary font-bold rounded-lg px-3 py-2 shadow-sm text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                add_circle
              </span>
              <span className="text-label-md font-label-md">Post a Job</span>
            </button>
            <button
              onClick={() => onNavigate('my-projects')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">work</span>
              <span className="text-label-md font-label-md">My Projects</span>
            </button>
            <button
              onClick={() => onNavigate('messages')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">message</span>
              <span className="text-label-md font-label-md">Messages</span>
            </button>
            <button
              onClick={() => onNavigate('payments')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">payments</span>
              <span className="text-label-md font-label-md">Payments</span>
            </button>
            <button
              onClick={() => onNavigate('notifications')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="text-label-md font-label-md">Notifications</span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">person</span>
              <span className="text-label-md font-label-md">Profile</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="flex items-center gap-3 text-on-surface-variant px-3 py-2 rounded-lg hover:bg-surface-variant hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
              <span className="text-label-md font-label-md">Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-9 h-9 rounded-full object-cover"
              alt="Alex Mercer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2ASzzHTUyL2hG8fTRq2vH4ZsmS13AC9018LM9BGtb9UEVClYUlE6YvDbSN_PfY2-KETAyl2HjuPFE_79R2RrCe3aivYzVdJg9zlDlnlrZj84zaWNzFT8_J5DQ9K4GAQR9InqHdn7yU7KkwGwnL94qQcXNq8YryY_HiCgDU8jDv-pQoar5WEXsDqIGgovLG20oYYuZ-YVhI4W95j4E7foB2FN1AUbWkYroHZPbm-3nUf7hoGSPgIzE"
            />
            <div className="overflow-hidden">
              <p className="text-label-md font-label-md font-semibold text-on-surface truncate">Alex Mercer</p>
              <p className="text-label-sm text-on-surface-variant truncate">alex@startupplat.io</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-on-surface-variant hover:text-error transition-colors cursor-pointer"
            title="Logout / Exit Portal"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopAppBar */}
        <div className="bg-surface border-b border-outline-variant shadow-xs px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-headline-md font-headline-md text-primary font-bold">
                Post a Job
              </h2>
              <button
                onClick={() => onNavigate('admin-jobs')}
                className="text-label-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-sm">work_history</span>
                <span>Manage Careers CMS</span>
              </button>
            </div>
            <p className="text-body-sm text-on-surface-variant mt-0.5">
              Create a detailed project posting to attract top-tier freelance engineers and vetted SaaS experts.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-72">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="Search projects, talent, skills..."
                type="text"
              />
            </div>
            <button className="relative p-2 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-outline-variant">
              <img
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-container"
                alt="Alex Mercer avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiaYuBk3OlHN1B1oW3o0u5gSRy1Ueaqhdt02O5DznC9FS1IerCbI1ZFtOVX7zI42bhjsHwFy0-oo9f7uVle51bKCmSEpilLfgeLhafUtKxIYTKeZwkH061p7uzMnkR-107uX9NrkJT_WyjBbJaU-8_eiPkvtWdlzw1ZjVjZy1Pc2WQBDd0AzzDLiE25TNqIlz4qYrnnJ565Pcava25at2Ehy0-6utw_EmvNs0jpmpczsHSz3VszfgA"
              />
              <div className="hidden lg:block text-left">
                <span className="block text-label-md font-label-md font-semibold text-on-surface">
                  Alex Mercer
                </span>
                <span className="block text-label-sm text-on-surface-variant">Product Lead</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Canvas */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Job Title */}
                <div className="space-y-2">
                  <label className="block text-label-md font-label-md font-semibold text-on-surface">
                    Job Title <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Full Stack Engineer for AI SaaS Platform"
                    type="text"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-label-md font-label-md font-semibold text-on-surface">
                    Category <span className="text-error">*</span>
                  </label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Full Stack Development</option>
                    <option>AI &amp; Machine Learning</option>
                    <option>Cloud Infrastructure &amp; DevOps</option>
                    <option>UI/UX Design &amp; Architecture</option>
                    <option>Smart Contracts &amp; Web3</option>
                  </select>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-label-md font-label-md font-semibold text-on-surface">
                      Project Description <span className="text-error">*</span>
                    </label>
                    <span className="text-label-sm text-outline">Rich formatting enabled</span>
                  </div>
                  <div className="border border-outline-variant rounded-lg overflow-hidden bg-surface-container-low">
                    {/* Rich formatting toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-outline-variant bg-surface-container">
                      <button className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant" type="button" title="Bold">
                        <span className="material-symbols-outlined text-sm">format_bold</span>
                      </button>
                      <button className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant" type="button" title="Italic">
                        <span className="material-symbols-outlined text-sm">format_italic</span>
                      </button>
                      <button className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant" type="button" title="List">
                        <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                      </button>
                      <button className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant" type="button" title="Link">
                        <span className="material-symbols-outlined text-sm">link</span>
                      </button>
                      <button className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant" type="button" title="Code">
                        <span className="material-symbols-outlined text-sm">code</span>
                      </button>
                    </div>
                    <textarea
                      className="w-full bg-transparent p-4 text-body-md text-on-surface focus:outline-none resize-y"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>
                </div>

                {/* Required Skills */}
                <div className="space-y-2">
                  <label className="block text-label-md font-label-md font-semibold text-on-surface">
                    Required Skills (Press Enter to add)
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 bg-surface-container-low border border-outline-variant rounded-lg min-h-[48px] items-center">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 bg-primary-container text-on-primary px-3 py-1 rounded-full text-label-md font-medium"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:opacity-75 cursor-pointer ml-1"
                        >
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </span>
                    ))}
                    <input
                      className="bg-transparent border-none text-body-md text-on-surface focus:outline-none flex-1 min-w-[140px] px-2 py-1"
                      placeholder="+ Add skill (press enter)"
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                  </div>
                </div>

                {/* Budget Type Selector */}
                <div className="space-y-2">
                  <label className="block text-label-md font-label-md font-semibold text-on-surface">
                    Budget Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setBudgetType('fixed')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border font-medium text-label-md transition-all cursor-pointer ${
                        budgetType === 'fixed'
                          ? 'border-primary bg-primary-container text-on-primary'
                          : 'border-outline-variant bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: budgetType === 'fixed' ? "'FILL' 1" : "'FILL' 0" }}>
                        payments
                      </span>
                      Fixed Price
                    </button>
                    <button
                      type="button"
                      onClick={() => setBudgetType('hourly')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border font-medium text-label-md transition-all cursor-pointer ${
                        budgetType === 'hourly'
                          ? 'border-primary bg-primary-container text-on-primary'
                          : 'border-outline-variant bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: budgetType === 'hourly' ? "'FILL' 1" : "'FILL' 0" }}>
                        schedule
                      </span>
                      Hourly Rate
                    </button>
                  </div>
                </div>

                {/* Budget Range / Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md font-semibold text-on-surface">
                      {budgetType === 'fixed' ? 'Minimum Budget ($)' : 'Min Hourly Rate ($/hr)'}
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                      type="number"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md font-semibold text-on-surface">
                      {budgetType === 'fixed' ? 'Maximum Budget ($)' : 'Max Hourly Rate ($/hr)'}
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                      type="number"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                    />
                  </div>
                </div>

                {/* Project Type & Deadline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md font-semibold text-on-surface">
                      Project Type
                    </label>
                    <select
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                    >
                      <option>Contract (1-3 months)</option>
                      <option>Full-time Permanent</option>
                      <option>Short-term Task (&lt; 1 month)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md font-semibold text-on-surface">
                      Deadline Date
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </div>

                {/* Attachments Drop Zone */}
                <div className="space-y-2">
                  <label className="block text-label-md font-label-md font-semibold text-on-surface">
                    Project Brief &amp; Attachments
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center bg-surface-container-low hover:bg-surface-variant transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-3xl text-primary mb-2">cloud_upload</span>
                    <p className="text-body-md font-medium text-on-surface">
                      Drag and drop files here, or <span className="text-primary underline">browse</span>
                    </p>
                    <p className="text-label-sm text-on-surface-variant mt-1">PDF, DOCX, ZIP up to 50MB</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center justify-end gap-4 border-t border-outline-variant">
                  <button
                    className="px-6 py-3 rounded-lg border border-outline-variant text-on-surface font-medium text-body-md hover:bg-surface-variant transition-colors cursor-pointer"
                    type="button"
                    onClick={() => {
                      setDraftToast('Draft saved to your company dashboard!');
                      setTimeout(() => setDraftToast(null), 4000);
                    }}
                  >
                    Save Draft
                  </button>
                  <button
                    className="px-6 py-3 rounded-lg bg-primary text-on-primary font-bold text-body-md shadow-md hover:opacity-90 active:scale-98 transition-all duration-200 cursor-pointer"
                    type="submit"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Live Preview Panel */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">visibility</span>
                  Live Marketplace Preview
                </h3>
                <span className="text-label-sm bg-secondary-fixed text-on-secondary-fixed font-medium px-2.5 py-1 rounded-full">
                  Freelancer View
                </span>
              </div>

              {/* Preview Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container opacity-10 rounded-bl-full pointer-events-none" />
                {/* Header inside preview */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-label-sm font-semibold text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
                        {category}
                      </span>
                      <span className="text-label-sm text-on-surface-variant">• Posted 2m ago</span>
                    </div>
                    <h4 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                      {jobTitle || 'Untitled Job Position'}
                    </h4>
                  </div>
                </div>

                {/* Client Info & Verified Badge */}
                <div className="flex items-center gap-3 py-3 border-y border-outline-variant mb-4">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Alex Mercer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmLOQpFoh0tWrINcbHJjgXVF8PvXHKCC2meYeeAnLso7GHU5VH71YjtrtdDcZxj8fWgHYgVW59U9dK0rT6sj_CKwxt4nhGL2gHGyzhhlx5mnvFrMIfor2c5iiZexSNXuQ7xC-L6GFOZadjWMD940hkjI5QeH-v76CnZPBXprP7_iMdjwmpbe89_ZbQKOCg714VvMgXEJsOcVMZF86ooNF8EcyWX0WV3Te6XRwLimoReUgCRXs6OT6u"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-body-md font-semibold text-on-surface">Alex Mercer</span>
                      <span
                        className="material-symbols-outlined text-primary text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        title="Verified Client"
                      >
                        verified
                      </span>
                    </div>
                    <p className="text-label-sm text-on-surface-variant">
                      Sudora • 12 Jobs Posted • 100% Hire Rate
                    </p>
                  </div>
                </div>

                {/* Description Preview */}
                <p className="text-body-md text-on-surface-variant line-clamp-3 mb-4">
                  {description || 'No description provided yet.'}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-md text-label-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Budget & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                  <div>
                    <span className="block text-label-sm text-on-surface-variant">
                      {budgetType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                    </span>
                    <span className="text-headline-sm font-bold text-primary">
                      {budgetType === 'fixed'
                        ? `$${Number(minBudget || 0).toLocaleString()} - $${Number(maxBudget || 0).toLocaleString()}`
                        : `$${minBudget} - $${maxBudget} / hr`}
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 bg-primary-container text-on-primary rounded-lg text-label-md font-bold pointer-events-none"
                    type="button"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Quick Tips Card */}
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-5 space-y-3">
                <h5 className="text-label-md font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
                  Tips for a Great Job Post
                </h5>
                <ul className="space-y-2 text-body-sm text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                    <span>Be specific about technical stack requirements to attract qualified senior talent.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                    <span>Include clear project milestones and deliverables in the description.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
