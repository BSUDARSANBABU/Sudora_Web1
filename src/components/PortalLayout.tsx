import React, { useState } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';

interface PortalLayoutProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  title: string;
  children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  currentView,
  onNavigate,
  title,
  children,
}) => {
  const { userProfile } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const coreItems: { label: string; view: PageView; icon: string }[] = [
    { label: 'Projects Dashboard', view: 'my-projects', icon: 'dashboard' },
    { label: 'System Overview', view: 'admin-dashboard', icon: 'monitoring' },
    { label: 'Enterprise Users', view: 'admin-users', icon: 'groups' },
    { label: 'Post a Job', view: 'post-job', icon: 'add_circle' },
    { label: 'Messages', view: 'messages', icon: 'message' },
    { label: 'Payments', view: 'payments', icon: 'payments' },
    { label: 'Notifications', view: 'notifications', icon: 'notifications' },
    { label: 'Talent Profile', view: 'profile', icon: 'person' },
    { label: 'Settings', view: 'settings', icon: 'settings' },
  ];

  const cmsItems: { label: string; view: PageView; icon: string; target: string }[] = [
    { label: 'Homepage CMS', view: 'admin-cms', icon: 'web', target: '/home' },
    { label: 'Manage Services', view: 'admin-services', icon: 'design_services', target: '/services' },
    { label: 'Manage Portfolio', view: 'admin-projects', icon: 'folder_special', target: '/projects' },
    { label: 'Manage Careers', view: 'admin-jobs', icon: 'work_history', target: '/careers' },
    { label: 'Manage Blog', view: 'admin-blog', icon: 'newspaper', target: '/blog' },
    { label: 'Manage Team & Story', view: 'admin-team', icon: 'group', target: '/about' },
    { label: 'Manage Inquiries', view: 'admin-support', icon: 'contact_mail', target: '/contact' },
    { label: 'Job Intake Form', view: 'post-job', icon: 'post_add', target: '/post-job' },
  ];

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col md:flex-row w-full">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col justify-between h-screen w-64 bg-surface-container-low border-r border-outline-variant shadow-md sticky left-0 top-0 z-30 shrink-0">
        <div className="p-4 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-65px)]">
          <button
            onClick={() => onNavigate('my-projects')}
            className="flex items-center gap-3 px-3 py-1.5 text-left cursor-pointer hover:opacity-85 transition-opacity shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-headline-md font-extrabold shadow-sm">
              SP
            </div>
            <div>
              <h1 className="text-headline-sm font-headline-sm font-extrabold text-primary">
                Admin Dashboard
              </h1>
              <p className="text-label-sm text-on-surface-variant font-medium">Company Workspace</p>
            </div>
          </button>

          {/* Operations Navigation Group */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-3 block mb-1.5">
              Operations &amp; Projects
            </span>
            <nav className="flex flex-col gap-0.5">
              {coreItems.map((item) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.view)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-label-md font-label-md transition-all duration-200 text-left cursor-pointer ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                    }`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Public Pages CMS Navigation Group */}
          <div>
            <div className="flex items-center justify-between px-3 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
                Public Pages CMS
              </span>
              <span className="text-[9px] bg-primary/10 text-primary font-extrabold px-1.5 py-0.2 rounded font-mono">
                LIVE
              </span>
            </div>
            <nav className="flex flex-col gap-0.5">
              {cmsItems.map((item) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item.view)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-label-md font-label-md transition-all duration-200 text-left cursor-pointer ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                    }`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span className="text-[9px] font-mono text-outline opacity-70">
                      {item.target}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-3 border-t border-outline-variant bg-surface-container-low shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant px-3 py-2 rounded-lg transition-all duration-200 w-full cursor-pointer text-left"
          >
            <span className="material-symbols-outlined text-lg">public</span>
            <span className="text-label-md font-label-md font-medium">Exit to Public Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopAppBar */}
        <header className="sticky top-0 z-20 bg-surface shadow-xs px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden text-on-surface p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-headline-md font-headline-md font-bold text-primary">
                {title}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Company Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                <span className="material-symbols-outlined text-sm">search</span>
              </span>
              <input
                className="w-64 pl-9 pr-4 py-1.5 text-body-sm bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-on-surface"
                placeholder="Search projects..."
                type="text"
              />
            </div>
            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-2 rounded-full hover:bg-surface-variant text-on-surface-variant cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 pl-2 border-l border-outline-variant text-left cursor-pointer hover:opacity-85 transition-opacity"
            >
              <img
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                alt={userProfile.name}
                src={userProfile.avatar}
              />
              <div className="hidden lg:block text-left">
                <div className="text-label-md font-bold text-on-surface truncate max-w-[140px]">{userProfile.name}</div>
                <div className="text-label-sm text-outline truncate max-w-[140px]">{userProfile.title || 'Enterprise Admin'}</div>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-surface-container-low border-b border-outline-variant p-4 space-y-2 shadow-md max-h-[75vh] overflow-y-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-2 block">
              Operations
            </span>
            {coreItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onNavigate(item.view);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-body-md ${
                  currentView === item.view
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}

            <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-2 block pt-2 border-t border-outline-variant/60">
              Public Pages CMS
            </span>
            {cmsItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onNavigate(item.view);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-body-md ${
                  currentView === item.view
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface-variant'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-mono opacity-70">{item.target}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                onNavigate('home');
              }}
              className="flex items-center gap-3 w-full px-3 py-2 text-left text-error text-body-md border-t border-outline-variant pt-3"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span>Back to Public Website</span>
            </button>
          </div>
        )}

        {/* View children */}
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};
