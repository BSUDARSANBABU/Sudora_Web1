import React, { useState } from 'react';
import {
  Pencil,
  Trash2,
  Plus,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  FolderGit2,
  MessageSquare,
  CheckCircle2,
  Building,
  ExternalLink,
  Eye,
  RotateCcw,
  Code,
  Share2,
  Sparkles,
  Phone,
  Mail,
  Clock,
  Globe,
  ShieldCheck,
  Layers,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  UserProfile,
  SkillItem,
  ExperienceItem,
  EducationItem,
  TalentProjectItem,
  ReviewItem
} from '../../types';

export const ProfilePortalView: React.FC = () => {
  // Connect directly to Global App State
  const {
    userProfile,
    updateUserProfile,
    resetUserProfile,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addProfileProject,
    updateProfileProject,
    deleteProfileProject,
    addReview,
    updateReview,
    deleteReview
  } = useApp();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'career' | 'academic' | 'projects' | 'feedback'>('about');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<string>('All');

  // Interactive feedback toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Modals for CRUD operations
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPublicPreviewOpen, setIsPublicPreviewOpen] = useState(false);
  const [contactProposalOpen, setContactProposalOpen] = useState(false);

  // Skill CRUD Modal State
  const [skillModal, setSkillModal] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    item?: SkillItem;
  }>({ isOpen: false, mode: 'create' });

  // Experience CRUD Modal State
  const [experienceModal, setExperienceModal] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    item?: ExperienceItem;
  }>({ isOpen: false, mode: 'create' });

  // Education CRUD Modal State
  const [educationModal, setEducationModal] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    item?: EducationItem;
  }>({ isOpen: false, mode: 'create' });

  // Project CRUD Modal State
  const [projectModal, setProjectModal] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    item?: TalentProjectItem;
  }>({ isOpen: false, mode: 'create' });

  // Review CRUD Modal State
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    item?: ReviewItem;
  }>({ isOpen: false, mode: 'create' });

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  // ==========================================
  // CRUD Action Handlers Connected to App State
  // ==========================================

  // 1. Profile Core Details (UPDATE)
  const handleSaveProfile = (updated: Partial<UserProfile>) => {
    updateUserProfile(updated);
    setIsEditProfileOpen(false);
    showToast('Profile information successfully saved to app state!');
  };

  // 2. Reset Profile (RESET)
  const handleResetProfile = () => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Reset Profile to Defaults?',
      message: 'This will reset all your profile data, skills, experiences, and projects back to the default sample profile.',
      onConfirm: () => {
        resetUserProfile();
        setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        showToast('Profile reset to original default state.');
      }
    });
  };

  // 3. Skills CRUD
  const handleSaveSkill = (skillData: Omit<SkillItem, 'id'>, id?: string) => {
    if (id) {
      updateSkill(id, skillData);
      showToast(`Skill "${skillData.name}" updated!`);
    } else {
      addSkill(skillData);
      showToast(`New skill "${skillData.name}" added!`);
    }
    setSkillModal({ isOpen: false, mode: 'create' });
  };

  const handleDeleteSkill = (skillId: string, skillName: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Skill?',
      message: `Are you sure you want to remove "${skillName}" from your profile?`,
      onConfirm: () => {
        deleteSkill(skillId);
        setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        showToast(`Skill "${skillName}" removed.`);
      }
    });
  };

  // 4. Experience CRUD
  const handleSaveExperience = (expData: Omit<ExperienceItem, 'id'>, id?: string) => {
    if (id) {
      updateExperience(id, expData);
      showToast(`Role at "${expData.company}" updated!`);
    } else {
      addExperience(expData);
      showToast(`Career role "${expData.role}" added!`);
    }
    setExperienceModal({ isOpen: false, mode: 'create' });
  };

  const handleDeleteExperience = (expId: string, roleName: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Experience Entry?',
      message: `Are you sure you want to remove "${roleName}" from your career history?`,
      onConfirm: () => {
        deleteExperience(expId);
        setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        showToast(`Experience entry deleted.`);
      }
    });
  };

  // 5. Education CRUD
  const handleSaveEducation = (eduData: Omit<EducationItem, 'id'>, id?: string) => {
    if (id) {
      updateEducation(id, eduData);
      showToast(`Education credential updated!`);
    } else {
      addEducation(eduData);
      showToast(`Education credential added!`);
    }
    setEducationModal({ isOpen: false, mode: 'create' });
  };

  const handleDeleteEducation = (eduId: string, degreeName: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Education Entry?',
      message: `Are you sure you want to remove "${degreeName}"?`,
      onConfirm: () => {
        deleteEducation(eduId);
        setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        showToast(`Education credential removed.`);
      }
    });
  };

  // 6. Project CRUD
  const handleSaveProject = (projData: Omit<TalentProjectItem, 'id'>, id?: string) => {
    if (id) {
      updateProfileProject(id, projData);
      showToast(`Project "${projData.title}" updated!`);
    } else {
      addProfileProject(projData);
      showToast(`Portfolio project "${projData.title}" added!`);
    }
    setProjectModal({ isOpen: false, mode: 'create' });
  };

  const handleDeleteProject = (projId: string, projectTitle: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Featured Project?',
      message: `Are you sure you want to remove "${projectTitle}" from your portfolio?`,
      onConfirm: () => {
        deleteProfileProject(projId);
        setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        showToast(`Project "${projectTitle}" removed.`);
      }
    });
  };

  // 7. Review CRUD
  const handleSaveReview = (reviewData: Omit<ReviewItem, 'id' | 'date'>, id?: string) => {
    if (id) {
      updateReview(id, reviewData);
      showToast(`Review by ${reviewData.author} updated!`);
    } else {
      addReview(reviewData);
      showToast(`Review by ${reviewData.author} added!`);
    }
    setReviewModal({ isOpen: false, mode: 'create' });
  };

  const handleDeleteReview = (revId: string, author: string) => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Delete Client Review?',
      message: `Are you sure you want to delete the review by ${author}?`,
      onConfirm: () => {
        deleteReview(revId);
        setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} });
        showToast(`Review removed.`);
      }
    });
  };

  // Filter skills based on category filter
  const filteredSkills = skillCategoryFilter === 'All'
    ? userProfile.skills
    : userProfile.skills.filter((s) => s.category === skillCategoryFilter);

  const categories = [
    'All',
    'Cloud & Infrastructure',
    'Languages & Runtimes',
    'Data & Messaging',
    'Frontend & Mobile',
    'DevOps & Security'
  ];

  return (
    <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-300 border border-white/20">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <p className="text-body-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Profile Banner Card */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
        {/* Cover Backdrop */}
        <div
          className="h-44 md:h-60 w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url('${userProfile.coverImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Change Cover</span>
            </button>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 md:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between -mt-16 md:-mt-20 mb-6 gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
              {/* Profile Avatar */}
              <div className="relative group">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover ring-4 ring-surface-container-lowest shadow-xl bg-surface-container"
                />
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-2xl flex flex-col items-center justify-center transition-opacity cursor-pointer text-xs font-semibold"
                >
                  <Pencil className="w-5 h-5 mb-1" />
                  Edit Photo
                </button>
              </div>

              {/* Name & Titles */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                    {userProfile.name}
                  </h1>
                  <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Verified Talent
                  </span>
                </div>

                <p className="text-base text-on-surface-variant font-medium">
                  {userProfile.title}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-on-surface-variant pt-1">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-on-surface font-bold">4.98</span>
                    <span className="text-on-surface-variant font-normal">({userProfile.reviews.length} client reviews)</span>
                  </div>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{userProfile.location}</span>
                  </div>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{userProfile.availability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Header Action Buttons (CRUD Trigger) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsPublicPreviewOpen(true)}
                className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs md:text-sm font-semibold px-4 py-2.5 rounded-lg border border-outline-variant flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-on-surface-variant" />
                <span>View Public Card</span>
              </button>

              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="bg-primary hover:bg-primary/90 text-on-primary text-xs md:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit Profile Info</span>
              </button>

              <button
                onClick={handleResetProfile}
                title="Reset to default sample profile"
                className="p-2.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 border border-outline-variant rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 border-t border-outline-variant">
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Hourly Rate</p>
              <p className="text-xl md:text-2xl font-bold text-on-surface mt-1">${userProfile.hourlyRate} <span className="text-xs font-normal text-on-surface-variant">/ hr</span></p>
            </div>
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Completed Projects</p>
              <p className="text-xl md:text-2xl font-bold text-on-surface mt-1">{userProfile.projects.length} <span className="text-xs font-normal text-on-surface-variant">portfolio</span></p>
            </div>
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Success Score</p>
              <p className="text-xl md:text-2xl font-bold text-on-surface mt-1">{userProfile.jobSuccessScore}% <span className="text-xs font-normal text-emerald-600 font-semibold">Top Rated</span></p>
            </div>
            <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Experience</p>
              <p className="text-xl md:text-2xl font-bold text-on-surface mt-1">{userProfile.totalExperience}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-outline-variant overflow-x-auto scrollbar-none">
        <nav className="flex space-x-6 min-w-max">
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <span>Overview &amp; Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-3.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Technical Skills</span>
            <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant font-mono">
              {userProfile.skills.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className={`pb-3.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'career'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Career History</span>
            <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant font-mono">
              {userProfile.experiences.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`pb-3.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'academic'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
            <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant font-mono">
              {userProfile.education.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Projects</span>
            <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant font-mono">
              {userProfile.projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-3.5 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'feedback'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant hover:text-on-surface border-transparent'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Client Reviews</span>
            <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant font-mono">
              {userProfile.reviews.length}
            </span>
          </button>
        </nav>
      </div>

      {/* ==========================================
          Tab 1: Overview & Bio
         ========================================== */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          {/* Main Bio Card */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <span>Professional Overview</span>
              </h2>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit Bio &amp; Specs
              </button>
            </div>

            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed whitespace-pre-line">
              {userProfile.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-outline-variant">
              <div>
                <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  Primary Specialization
                </p>
                <p className="text-sm font-semibold text-on-surface mt-0.5">{userProfile.specialization}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Preferred Methodology
                </p>
                <p className="text-sm font-semibold text-on-surface mt-0.5">{userProfile.methodology}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Languages Spoken</p>
                <p className="text-sm font-semibold text-on-surface mt-0.5">{userProfile.languages}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Security Clearance &amp; Compliance</p>
                <p className="text-sm font-semibold text-on-surface mt-0.5">{userProfile.clearance}</p>
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-on-surface">At a Glance</h2>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/40">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Response Time
                </span>
                <span className="font-semibold text-on-surface">{userProfile.responseTime}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/40">
                <span className="text-on-surface-variant">Weekly Capacity</span>
                <span className="font-semibold text-on-surface">{userProfile.weeklyAvailability}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/40">
                <span className="text-on-surface-variant">Contract Type</span>
                <span className="font-semibold text-on-surface">{userProfile.contractType}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/40">
                <span className="text-on-surface-variant">Timezone</span>
                <span className="font-semibold text-on-surface">{userProfile.timezone}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/40">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  Email
                </span>
                <span className="font-mono text-xs text-on-surface truncate max-w-[150px]">{userProfile.email}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  Direct Phone
                </span>
                <span className="font-mono text-xs text-on-surface">{userProfile.phone}</span>
              </div>
            </div>

            <button
              onClick={() => setContactProposalOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary text-sm py-3 rounded-xl font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Request Contract Proposal</span>
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          Tab 2: Technical Skills (CRUD)
         ========================================== */}
      {activeTab === 'skills' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header controls: Filter + Create Skill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSkillCategoryFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    skillCategoryFilter === cat
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* CREATE Skill Button */}
            <button
              onClick={() => setSkillModal({ isOpen: true, mode: 'create' })}
              className="bg-primary hover:bg-primary/90 text-on-primary text-xs md:text-sm font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Skill</span>
            </button>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/60 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                      {skill.category}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-mono">
                      {skill.level}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface">
                    {skill.name}
                  </h3>
                </div>

                {/* UPDATE & DELETE Controls */}
                <div className="flex items-center justify-end gap-1.5 pt-3 mt-2 border-t border-outline-variant/30">
                  <button
                    onClick={() => setSkillModal({ isOpen: true, mode: 'edit', item: skill })}
                    className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                    title="Edit Skill"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id, skill.name)}
                    className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-md transition-colors cursor-pointer"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
              <Code className="w-10 h-10 text-outline mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-on-surface">No skills in this category</p>
              <button
                onClick={() => setSkillModal({ isOpen: true, mode: 'create' })}
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                + Add a skill now
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          Tab 3: Career History (CRUD)
         ========================================== */}
      {activeTab === 'career' && (
        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Professional Experience</h2>
              <p className="text-xs text-on-surface-variant">Roles, leadership milestones, and enterprise impact</p>
            </div>

            {/* CREATE Experience Button */}
            <button
              onClick={() => setExperienceModal({ isOpen: true, mode: 'create' })}
              className="bg-primary hover:bg-primary/90 text-on-primary text-xs md:text-sm font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="relative pl-6 md:pl-8 border-l-2 border-outline-variant space-y-8">
            {userProfile.experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Node Icon */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-surface-container-lowest" />

                <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/60 shadow-xs space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-on-surface">{exp.role}</h3>
                      <p className="text-xs md:text-sm font-semibold text-primary flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                        <span className="text-outline-variant">•</span>
                        <span className="text-on-surface-variant font-normal">{exp.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-surface-container-high px-2.5 py-1 rounded-md font-mono text-on-surface-variant">
                        {exp.period}
                      </span>
                      {/* UPDATE & DELETE Controls */}
                      <button
                        onClick={() => setExperienceModal({ isOpen: true, mode: 'edit', item: exp })}
                        className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                        title="Edit Experience"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id, exp.role)}
                        className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-md transition-colors cursor-pointer"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed pt-1">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {userProfile.experiences.length === 0 && (
            <div className="text-center py-12 border border-dashed border-outline-variant rounded-xl">
              <Briefcase className="w-10 h-10 text-outline mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-on-surface">No career history entries yet</p>
              <button
                onClick={() => setExperienceModal({ isOpen: true, mode: 'create' })}
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                + Add your first role
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          Tab 4: Academic Background (CRUD)
         ========================================== */}
      {activeTab === 'academic' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div>
              <h2 className="text-lg font-bold text-on-surface">Academic &amp; Certifications</h2>
              <p className="text-xs text-on-surface-variant">Degrees, university honors, and formal accreditations</p>
            </div>

            {/* CREATE Education Button */}
            <button
              onClick={() => setEducationModal({ isOpen: true, mode: 'create' })}
              className="bg-primary hover:bg-primary/90 text-on-primary text-xs md:text-sm font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant flex flex-col justify-between hover:border-primary/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEducationModal({ isOpen: true, mode: 'edit', item: edu })}
                        className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                        title="Edit Education"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(edu.id, edu.degree)}
                        className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-md transition-colors cursor-pointer"
                        title="Delete Education"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-primary font-semibold">{edu.period}</span>
                    <h3 className="text-base font-bold text-on-surface mt-0.5">{edu.degree}</h3>
                    <p className="text-sm font-medium text-on-surface-variant">{edu.institution}</p>
                  </div>

                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {userProfile.education.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
              <GraduationCap className="w-10 h-10 text-outline mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-on-surface">No education credentials added</p>
              <button
                onClick={() => setEducationModal({ isOpen: true, mode: 'create' })}
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                + Add degree or certification
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          Tab 5: Featured Projects (CRUD)
         ========================================== */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div>
              <h2 className="text-lg font-bold text-on-surface">Featured Portfolio Projects</h2>
              <p className="text-xs text-on-surface-variant">Production applications, open-source repositories, and case studies</p>
            </div>

            {/* CREATE Project Button */}
            <button
              onClick={() => setProjectModal({ isOpen: true, mode: 'create' })}
              className="bg-primary hover:bg-primary/90 text-on-primary text-xs md:text-sm font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userProfile.projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="h-48 w-full bg-surface-container relative overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-lg p-1">
                      <button
                        onClick={() => setProjectModal({ isOpen: true, mode: 'edit', item: proj })}
                        className="p-1.5 text-white hover:text-primary transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="p-1.5 text-white hover:text-error transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-on-surface">{proj.title}</h3>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline text-xs flex items-center gap-1 shrink-0 mt-1"
                        >
                          <span>Live Repo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="bg-surface-container text-on-surface text-xs font-mono px-2.5 py-0.5 rounded-md border border-outline-variant/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {userProfile.projects.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
              <FolderGit2 className="w-10 h-10 text-outline mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-on-surface">No projects added yet</p>
              <button
                onClick={() => setProjectModal({ isOpen: true, mode: 'create' })}
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                + Add your first project
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          Tab 6: Client Reviews (CRUD)
         ========================================== */}
      {activeTab === 'feedback' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div>
              <h2 className="text-lg font-bold text-on-surface">Client Reviews &amp; Testimonials</h2>
              <p className="text-xs text-on-surface-variant">Verified enterprise feedback, ratings, and endorsements</p>
            </div>

            {/* CREATE Review Button */}
            <button
              onClick={() => setReviewModal({ isOpen: true, mode: 'create' })}
              className="bg-primary hover:bg-primary/90 text-on-primary text-xs md:text-sm font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Client Review</span>
            </button>
          </div>

          <div className="space-y-4">
            {userProfile.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant space-y-3 relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-11 h-11 rounded-full object-cover bg-surface-container"
                    />
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-on-surface">{rev.author}</h3>
                      <p className="text-xs text-on-surface-variant">{rev.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-outline-variant'}`}
                        />
                      ))}
                    </div>

                    {/* UPDATE & DELETE Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setReviewModal({ isOpen: true, mode: 'edit', item: rev })}
                        className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                        title="Edit Review"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(rev.id, rev.author)}
                        className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-md transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-on-surface-variant italic leading-relaxed pt-1">
                  "{rev.comment}"
                </p>

                <div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant/30">
                  <span>Project: {rev.project}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          {userProfile.reviews.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
              <MessageSquare className="w-10 h-10 text-outline mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-on-surface">No reviews currently listed</p>
              <button
                onClick={() => setReviewModal({ isOpen: true, mode: 'create' })}
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                + Add a client testimonial
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          MODALS FOR CRUD OPERATIONS
         ========================================== */}

      {/* 1. EDIT BASIC PROFILE MODAL */}
      {isEditProfileOpen && (
        <EditProfileModal
          profile={userProfile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditProfileOpen(false)}
        />
      )}

      {/* 2. SKILL MODAL (Create & Edit) */}
      {skillModal.isOpen && (
        <SkillFormModal
          mode={skillModal.mode}
          initialData={skillModal.item}
          onSave={handleSaveSkill}
          onClose={() => setSkillModal({ isOpen: false, mode: 'create' })}
        />
      )}

      {/* 3. EXPERIENCE MODAL (Create & Edit) */}
      {experienceModal.isOpen && (
        <ExperienceFormModal
          mode={experienceModal.mode}
          initialData={experienceModal.item}
          onSave={handleSaveExperience}
          onClose={() => setExperienceModal({ isOpen: false, mode: 'create' })}
        />
      )}

      {/* 4. EDUCATION MODAL (Create & Edit) */}
      {educationModal.isOpen && (
        <EducationFormModal
          mode={educationModal.mode}
          initialData={educationModal.item}
          onSave={handleSaveEducation}
          onClose={() => setEducationModal({ isOpen: false, mode: 'create' })}
        />
      )}

      {/* 5. PROJECT MODAL (Create & Edit) */}
      {projectModal.isOpen && (
        <ProjectFormModal
          mode={projectModal.mode}
          initialData={projectModal.item}
          onSave={handleSaveProject}
          onClose={() => setProjectModal({ isOpen: false, mode: 'create' })}
        />
      )}

      {/* 6. REVIEW MODAL (Create & Edit) */}
      {reviewModal.isOpen && (
        <ReviewFormModal
          mode={reviewModal.mode}
          initialData={reviewModal.item}
          onSave={handleSaveReview}
          onClose={() => setReviewModal({ isOpen: false, mode: 'create' })}
        />
      )}

      {/* 7. DELETE CONFIRMATION MODAL */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-on-surface">{deleteConfirm.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{deleteConfirm.message}</p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirm({ isOpen: false, title: '', message: '', onConfirm: () => {} })}
                className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={deleteConfirm.onConfirm}
                className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-error text-on-error hover:bg-error/90 cursor-pointer shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. PUBLIC PROFILE PREVIEW MODAL */}
      {isPublicPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative my-6">
            <button
              onClick={() => setIsPublicPreviewOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              className="h-32 w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${userProfile.coverImage}')` }}
            />
            <div className="px-6 pb-6 pt-0 relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-20 h-20 rounded-xl object-cover ring-4 ring-surface-container-lowest shadow-md -mt-10 mb-3"
              />
              <h3 className="text-xl font-bold text-on-surface">{userProfile.name}</h3>
              <p className="text-xs text-primary font-semibold">{userProfile.title}</p>
              <p className="text-xs text-on-surface-variant mt-1">{userProfile.location}</p>

              <div className="flex items-center justify-between bg-surface-container p-3 rounded-lg my-4 text-xs font-semibold">
                <span>Rate: ${userProfile.hourlyRate} / hr</span>
                <span className="text-emerald-600">• {userProfile.availability}</span>
              </div>

              <p className="text-xs text-on-surface-variant line-clamp-3 mb-4">
                {userProfile.bio}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Public profile link copied to clipboard!');
                    setIsPublicPreviewOpen(false);
                  }}
                  className="flex-1 bg-primary text-on-primary py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Copy Share Link
                </button>
                <button
                  onClick={() => setIsPublicPreviewOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. CONTRACT PROPOSAL MODAL */}
      {contactProposalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-outline-variant">
            <button
              onClick={() => setContactProposalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-on-surface mb-1">Engage {userProfile.name}</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Rate: ${userProfile.hourlyRate} / hr • {userProfile.title}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast(`Proposal sent! ${userProfile.name} typically responds in ${userProfile.responseTime}.`);
                setContactProposalOpen(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Company / Organization *</label>
                <input required type="text" placeholder="Acme Technologies" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Target Hours / Week</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary">
                  <option>Full-Time (40 hrs/wk)</option>
                  <option>Part-Time (20 hrs/wk)</option>
                  <option>Advisory / Scoping (10 hrs/wk)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Project Summary</label>
                <textarea rows={3} placeholder="Describe requirements, target architecture, or timeline..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary resize-y" />
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-bold text-xs md:text-sm shadow-sm cursor-pointer mt-2 hover:bg-primary/90">
                Send Engagement Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

// ==========================================
// SUBCOMPONENTS: MODALS FOR CRUD
// ==========================================

// 1. Edit Profile Information Modal (Full UI fields connected)
const EditProfileModal: React.FC<{
  profile: UserProfile;
  onSave: (data: Partial<UserProfile>) => void;
  onClose: () => void;
}> = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-3xl w-full shadow-2xl relative my-8 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-on-surface mb-1">Edit User Profile</h2>
        <p className="text-xs text-on-surface-variant mb-6">Modify all profile properties connected directly to the application state.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section A: Core Identity */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-outline-variant pb-1">
              General Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Professional Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Section B: Rates & Metrics */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-outline-variant pb-1">
              Rates, Performance &amp; Capacity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Hourly Rate ($) *</label>
                <input
                  type="number"
                  min="1"
                  max="5000"
                  required
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Success Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.jobSuccessScore}
                  onChange={(e) => setFormData({ ...formData, jobSuccessScore: Number(e.target.value) })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Total Experience</label>
                <input
                  type="text"
                  value={formData.totalExperience}
                  onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Availability Status</label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Response Time</label>
                <input
                  type="text"
                  value={formData.responseTime}
                  onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Weekly Capacity</label>
                <input
                  type="text"
                  value={formData.weeklyAvailability}
                  onChange={(e) => setFormData({ ...formData, weeklyAvailability: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Contract Type</label>
                <input
                  type="text"
                  value={formData.contractType}
                  onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Timezone</label>
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Section C: Domains & Compliance */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-outline-variant pb-1">
              Domain Expertise &amp; Compliance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Primary Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Preferred Methodology</label>
                <input
                  type="text"
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Languages Spoken</label>
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Security Clearance / Compliance</label>
                <input
                  type="text"
                  value={formData.clearance}
                  onChange={(e) => setFormData({ ...formData, clearance: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Section D: Visuals & Bio */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-outline-variant pb-1">
              Visuals &amp; Biography
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Professional Bio *</label>
              <textarea
                rows={4}
                required
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary resize-y"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Skill Form Modal (Create / Edit)
const SkillFormModal: React.FC<{
  mode: 'create' | 'edit';
  initialData?: SkillItem;
  onSave: (skill: Omit<SkillItem, 'id'>, id?: string) => void;
  onClose: () => void;
}> = ({ mode, initialData, onSave, onClose }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState<SkillItem['category']>(initialData?.category || 'Cloud & Infrastructure');
  const [level, setLevel] = useState<SkillItem['level']>(initialData?.level || 'Expert');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), category, level }, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-on-surface mb-1">
          {mode === 'edit' ? 'Edit Technical Skill' : 'Add Technical Skill'}
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Categorize your expertise level and domain</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Skill Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Kubernetes, React, Go..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SkillItem['category'])}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option>Cloud & Infrastructure</option>
              <option>Languages & Runtimes</option>
              <option>Data & Messaging</option>
              <option>Frontend & Mobile</option>
              <option>DevOps & Security</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Proficiency Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as SkillItem['level'])}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              {mode === 'edit' ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Experience Form Modal (Create / Edit)
const ExperienceFormModal: React.FC<{
  mode: 'create' | 'edit';
  initialData?: ExperienceItem;
  onSave: (exp: Omit<ExperienceItem, 'id'>, id?: string) => void;
  onClose: () => void;
}> = ({ mode, initialData, onSave, onClose }) => {
  const [role, setRole] = useState(initialData?.role || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [period, setPeriod] = useState(initialData?.period || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) return;
    onSave({ role: role.trim(), company: company.trim(), location, period, description }, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-on-surface mb-1">
          {mode === 'edit' ? 'Edit Career Role' : 'Add Career Role'}
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Record engineering tenure, leadership milestones, and impact</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Role Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Principal Cloud Architect"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                placeholder="e.g. StellarScale Technologies"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Location</label>
              <input
                type="text"
                placeholder="San Francisco, CA or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Time Period *</label>
              <input
                type="text"
                required
                placeholder="e.g. 2021 - Present"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Description &amp; Highlights</label>
            <textarea
              rows={3}
              placeholder="Key responsibilities, team scale, technologies deployed, and metrics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              {mode === 'edit' ? 'Update Experience' : 'Save Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Education Form Modal (Create / Edit)
const EducationFormModal: React.FC<{
  mode: 'create' | 'edit';
  initialData?: EducationItem;
  onSave: (edu: Omit<EducationItem, 'id'>, id?: string) => void;
  onClose: () => void;
}> = ({ mode, initialData, onSave, onClose }) => {
  const [degree, setDegree] = useState(initialData?.degree || '');
  const [institution, setInstitution] = useState(initialData?.institution || '');
  const [period, setPeriod] = useState(initialData?.period || '');
  const [details, setDetails] = useState(initialData?.details || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree.trim() || !institution.trim()) return;
    onSave({ degree: degree.trim(), institution: institution.trim(), period, details }, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-on-surface mb-1">
          {mode === 'edit' ? 'Edit Education' : 'Add Education / Cert'}
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Degree, certificate, or academic institution</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Degree / Certification *</label>
            <input
              type="text"
              required
              placeholder="e.g. Master of Science in Computer Science"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Institution / Issuer *</label>
            <input
              type="text"
              required
              placeholder="e.g. Stanford University"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Period / Year</label>
            <input
              type="text"
              placeholder="e.g. 2009 - 2013"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Honors / Details</label>
            <textarea
              rows={2}
              placeholder="Specialization, GPA, published capstones, or credential ID..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              {mode === 'edit' ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 5. Project Form Modal (Create / Edit)
const ProjectFormModal: React.FC<{
  mode: 'create' | 'edit';
  initialData?: TalentProjectItem;
  onSave: (proj: Omit<TalentProjectItem, 'id'>, id?: string) => void;
  onClose: () => void;
}> = ({ mode, initialData, onSave, onClose }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(
    initialData?.image ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuASX8pDX0swP3GX8-yPmlouUYuFBqPOuhOtV4Nnw46xQ18M1W1Qno3KBID3N9AX7AlZnigtKd-VWOelhCKKCWSfyzBELNAldLE1-bpzmvL0r3mQ2jOZPib7533ANF-pxiEuD3DHyoBPFnaB1EjbcSosOCMpADXpq4nDXRkHRiG4gonTbPZPOyTNS0T4SKBo1PdhcmBpXU9t4h6LOUiQgPuzU5-w5kVtbNvkYD4bu_CN5qCrLs8CuWKf'
  );
  const [techInput, setTechInput] = useState(initialData?.technologies?.join(', ') || 'Go, Kubernetes, Kafka, AWS');
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({ title: title.trim(), description, image, technologies, liveUrl }, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-on-surface mb-1">
          {mode === 'edit' ? 'Edit Featured Project' : 'Add Featured Project'}
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Showcase system architecture, code, and live deliverables</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed FinTech API Engine"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Thumbnail Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Go, Kubernetes, Kafka, AWS"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Repository / Live Demo Link</label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Project Description</label>
            <textarea
              rows={3}
              placeholder="Explain the problem solved, architecture choices, performance benchmarks..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              {mode === 'edit' ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 6. Review Form Modal (Create / Edit)
const ReviewFormModal: React.FC<{
  mode?: 'create' | 'edit';
  initialData?: ReviewItem;
  onSave: (review: Omit<ReviewItem, 'id' | 'date'>, id?: string) => void;
  onClose: () => void;
}> = ({ mode = 'create', initialData, onSave, onClose }) => {
  const [author, setAuthor] = useState(initialData?.author || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [rating, setRating] = useState(initialData?.rating ?? 5);
  const [project, setProject] = useState(initialData?.project || '');
  const [comment, setComment] = useState(initialData?.comment || '');
  const [avatar, setAvatar] = useState(
    initialData?.avatar ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB_0oddsrGFWapW2pty_xC_yVyC-fLIE62m9DwLklCzwHU2BHW14lzQ1NbGlDRMoPTD3ZnhqXCREz-OG0T6rlt_V1PA4XRp-NxvxFbl3WSj_c3fiFumcLMryHl_8QQorhW27U5ELOAYRa09r8WP6NzwZEhV2Dn1KfL1AI8KA4CONYRv7QC2dXrownGM5IvteG99EyYQWaXkmqvutPrCvvTWgBLu-_9h1dRx7H3lCxjafuJLRP5V0-fM'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    onSave(
      {
        author: author.trim(),
        role: role.trim() || 'Enterprise Client',
        rating,
        project: project.trim() || 'Cloud Infrastructure',
        comment: comment.trim(),
        avatar
      },
      initialData?.id
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-on-surface mb-1">
          {mode === 'edit' ? 'Edit Client Review' : 'Add Client Testimonial'}
        </h3>
        <p className="text-xs text-on-surface-variant mb-5">Record client feedback and ratings</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Client Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Jonathan Vance"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Client Title / Company *</label>
              <input
                type="text"
                required
                placeholder="e.g. VP of Eng at FinTech"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value={5}>5 Stars (Exceptional)</option>
                <option value={4}>4 Stars (Very Good)</option>
                <option value={3}>3 Stars (Good)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Project Name</label>
              <input
                type="text"
                placeholder="e.g. Cloud Migration"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Client Avatar URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Testimonial Quote *</label>
            <textarea
              rows={3}
              required
              placeholder="What did the client say about the quality, velocity, and communication?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border border-outline-variant hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/90 shadow-sm cursor-pointer"
            >
              {mode === 'edit' ? 'Update Review' : 'Save Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
