import React, { useState } from 'react';
import { PageView } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PortalLayout } from './components/PortalLayout';
import { GetStartedModal } from './components/Modals';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { ProjectsView } from './views/ProjectsView';
import { CareersView } from './views/CareersView';
import { PostJobView } from './views/PostJobView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { BlogView } from './views/BlogView';
import { MyProjectsPortalView } from './views/portal/MyProjectsPortalView';
import { MessagesPortalView } from './views/portal/MessagesPortalView';
import { PaymentsPortalView } from './views/portal/PaymentsPortalView';
import { ProfilePortalView } from './views/portal/ProfilePortalView';
import { SettingsPortalView } from './views/portal/SettingsPortalView';
import { NotificationsPortalView } from './views/portal/NotificationsPortalView';
import { AdminServicesView } from './views/admin/AdminServicesView';
import { AdminProjectsView } from './views/admin/AdminProjectsView';
import { AdminJobsView } from './views/admin/AdminJobsView';
import { AdminBlogView } from './views/admin/AdminBlogView';
import { AdminInquiriesView } from './views/admin/AdminInquiriesView';
import { AdminCmsView } from './views/admin/AdminCmsView';
import { AdminTeamView } from './views/admin/AdminTeamView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { AdminUsersView } from './views/admin/AdminUsersView';
import { useApp } from './context/AppContext';

export default function App() {
  const { addInquiry } = useApp();
  const getInitialView = (): PageView => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as PageView;
      const validViews: PageView[] = [
        'home', 'services', 'service-detail', 'projects', 'project-detail',
        'careers', 'post-job', 'about', 'contact', 'blog', 'team',
        'my-projects', 'messages', 'payments', 'profile', 'settings', 'notifications',
        'admin-services', 'admin-projects', 'admin-jobs', 'admin-blog',
        'admin-support', 'admin-cms', 'admin-team', 'admin-dashboard', 'admin-users'
      ];
      if (validViews.includes(hash)) return hash;
    }
    // Company website defaults to Home page
    return 'home';
  };

  const [currentView, setCurrentView] = useState<PageView>(getInitialView);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Modal States
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  const [getStartedMode, setGetStartedMode] = useState<'hire' | 'start'>('start');
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view;
    }
    if (view !== 'project-detail') {
      setSelectedProjectId(null);
    }
    if (view !== 'service-detail') {
      setSelectedServiceId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGetStarted = (mode: 'hire' | 'start' = 'start') => {
    setGetStartedMode(mode);
    setGetStartedModalOpen(true);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentView('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectScopeSubmitted = (details: any) => {
    addInquiry({
      name: details.name || 'Enterprise Client',
      email: details.email || 'client@enterprise.com',
      company: details.company || 'Enterprise Partner',
      service: details.service || 'Web Development',
      budget: details.budget || '$25k - $50k',
      message: details.projectDescription || 'Submitted project scope via Get Started modal.'
    });
    setGlobalToast(`Thank you, ${details.name || 'there'}! Your request for "${details.service}" has been received and logged to the admin leads pipeline.`);
    setTimeout(() => setGlobalToast(null), 6000);
  };

  const isPortalView = [
    'my-projects',
    'messages',
    'payments',
    'profile',
    'settings',
    'notifications',
    'admin-services',
    'admin-projects',
    'admin-jobs',
    'admin-blog',
    'admin-support',
    'admin-cms',
    'admin-team',
    'admin-dashboard',
    'admin-users'
  ].includes(currentView);

  const isStandaloneAppView = isPortalView || currentView === 'post-job';

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body antialiased selection:bg-primary-container selection:text-on-primary">
      {/* Global Notification Toast */}
      {globalToast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md border border-white/20">
          <span className="material-symbols-outlined text-green-300 text-2xl">check_circle</span>
          <p className="text-body-sm font-medium flex-1">{globalToast}</p>
          <button
            onClick={() => setGlobalToast(null)}
            className="text-on-primary/70 hover:text-on-primary cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Public Navbar (shown on public site pages) */}
      {!isStandaloneAppView && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenGetStarted={() => handleOpenGetStarted('start')}
        />
      )}

      {/* Main View Router */}
      <main className="flex-grow flex flex-col">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenGetStarted={handleOpenGetStarted}
            onSelectProject={handleSelectProject}
            onSelectService={handleSelectService}
          />
        )}

        {(currentView === 'services' || currentView === 'service-detail') && (
          <ServicesView
            onNavigate={handleNavigate}
            onOpenGetStarted={handleOpenGetStarted}
            onSelectProject={handleSelectProject}
            initialServiceId={selectedServiceId || undefined}
          />
        )}

        {(currentView === 'projects' || currentView === 'project-detail') && (
          <ProjectsView
            onNavigate={handleNavigate}
            onOpenGetStarted={handleOpenGetStarted}
            selectedProjectId={selectedProjectId}
            onClearSelectedProject={() => setSelectedProjectId(null)}
          />
        )}

        {currentView === 'careers' && (
          <CareersView onNavigate={handleNavigate} />
        )}

        {currentView === 'post-job' && (
          <PostJobView onNavigate={handleNavigate} />
        )}

        {/* Enterprise Portal Screens */}
        {currentView === 'my-projects' && (
          <PortalLayout
            currentView="my-projects"
            onNavigate={handleNavigate}
            title="My Projects"
          >
            <MyProjectsPortalView
              onNavigate={handleNavigate}
              onSelectProject={handleSelectProject}
            />
          </PortalLayout>
        )}

        {currentView === 'messages' && (
          <PortalLayout
            currentView="messages"
            onNavigate={handleNavigate}
            title="Messages"
          >
            <MessagesPortalView />
          </PortalLayout>
        )}

        {currentView === 'payments' && (
          <PortalLayout
            currentView="payments"
            onNavigate={handleNavigate}
            title="Payments &amp; Financials"
          >
            <PaymentsPortalView />
          </PortalLayout>
        )}

        {currentView === 'profile' && (
          <PortalLayout
            currentView="profile"
            onNavigate={handleNavigate}
            title="Talent Profile"
          >
            <ProfilePortalView />
          </PortalLayout>
        )}

        {currentView === 'settings' && (
          <PortalLayout
            currentView="settings"
            onNavigate={handleNavigate}
            title="Settings &amp; Preferences"
          >
            <SettingsPortalView />
          </PortalLayout>
        )}

        {currentView === 'notifications' && (
          <PortalLayout
            currentView="notifications"
            onNavigate={handleNavigate}
            title="Activity &amp; Notifications"
          >
            <NotificationsPortalView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {/* Public Pages CMS Management Views */}
        {currentView === 'admin-services' && (
          <PortalLayout
            currentView="admin-services"
            onNavigate={handleNavigate}
            title="Manage Services CMS"
          >
            <AdminServicesView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-projects' && (
          <PortalLayout
            currentView="admin-projects"
            onNavigate={handleNavigate}
            title="Manage Portfolio CMS"
          >
            <AdminProjectsView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-jobs' && (
          <PortalLayout
            currentView="admin-jobs"
            onNavigate={handleNavigate}
            title="Manage Careers CMS"
          >
            <AdminJobsView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-blog' && (
          <PortalLayout
            currentView="admin-blog"
            onNavigate={handleNavigate}
            title="Manage Blog CMS"
          >
            <AdminBlogView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-support' && (
          <PortalLayout
            currentView="admin-support"
            onNavigate={handleNavigate}
            title="Manage Leads &amp; Inquiries"
          >
            <AdminInquiriesView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-cms' && (
          <PortalLayout
            currentView="admin-cms"
            onNavigate={handleNavigate}
            title="Homepage CMS"
          >
            <AdminCmsView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-team' && (
          <PortalLayout
            currentView="admin-team"
            onNavigate={handleNavigate}
            title="Manage Team CMS"
          >
            <AdminTeamView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-dashboard' && (
          <PortalLayout
            currentView="admin-dashboard"
            onNavigate={handleNavigate}
            title="Admin System Overview"
          >
            <AdminDashboardView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {currentView === 'admin-users' && (
          <PortalLayout
            currentView="admin-users"
            onNavigate={handleNavigate}
            title="Enterprise Users &amp; Talent"
          >
            <AdminUsersView onNavigate={handleNavigate} />
          </PortalLayout>
        )}

        {(currentView === 'about' || currentView === 'team') && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenGetStarted={handleOpenGetStarted}
          />
        )}

        {currentView === 'contact' && <ContactView onNavigate={handleNavigate} />}

        {currentView === 'blog' && <BlogView onNavigate={handleNavigate} />}
      </main>

      {/* Public Footer (shown on public website pages) */}
      {!isStandaloneAppView && <Footer onNavigate={handleNavigate} />}

      {/* Global Modals */}
      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
        onSubmitted={handleProjectScopeSubmitted}
        defaultMode={getStartedMode}
      />
    </div>
  );
}
