import React, { useState } from 'react';
import { PageView } from '../types';

interface AdminLayoutProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  title?: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentView,
  onNavigate,
  title = 'Admin Portal',
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { label: string; view: PageView; icon: string }[] = [
    { label: 'Dashboard', view: 'admin-dashboard', icon: 'dashboard' },
    { label: 'Users', view: 'admin-users', icon: 'group' },
    { label: 'Jobs', view: 'admin-jobs', icon: 'work' },
    { label: 'Projects', view: 'admin-projects', icon: 'folder' },
    { label: 'Services', view: 'services', icon: 'mobile_arrow_right' },
    { label: 'Payments', view: 'admin-payments', icon: 'payments' },
    { label: 'Support', view: 'admin-support', icon: 'support' },
    { label: 'Blog', view: 'admin-blog', icon: 'article' },
    { label: 'Reports', view: 'admin-reports', icon: 'assessment' },
    { label: 'Settings', view: 'admin-settings', icon: 'settings' },
  ];

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex w-full">
      {/* SideNavBar (Docked Left Dark Navy) */}
      <aside className="hidden md:flex flex-col justify-between h-screen w-64 bg-inverse-surface text-inverse-on-surface shadow-md sticky left-0 top-0 p-4 border-r border-outline/20 z-40 shrink-0">
        <div className="flex flex-col space-y-6">
          {/* Header Brand */}
          <button
            onClick={() => onNavigate('portal-hub')}
            className="flex items-center space-x-3 px-3 py-2 text-left cursor-pointer hover:opacity-90 transition-opacity"
            title="Switch to Master Portal Hub"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-headline-md font-extrabold shadow-sm shrink-0">
              SP
            </div>
            <div className="overflow-hidden">
              <h2 className="text-headline-sm font-headline-sm font-bold text-inverse-primary truncate">
                Enterprise Portal
              </h2>
              <p className="text-label-sm text-surface-variant truncate">Sudora Admin</p>
            </div>
          </button>

          {/* Nav Items */}
          <nav className="flex flex-col space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] pr-1 scrollbar-none">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.view)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-label-md font-label-md transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'text-surface-variant hover:bg-inverse-surface/80 hover:text-inverse-on-surface hover:bg-surface-variant/15'
                  }`}
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

        {/* Bottom Profile & Exit */}
        <div className="pt-4 border-t border-outline/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div
              onClick={() => onNavigate('admin-settings')}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-85 transition-opacity overflow-hidden"
            >
              <img
                className="w-9 h-9 rounded-full object-cover shrink-0"
                alt="Alex Morgan"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZvPwiXlwYI5XL6UeIRFBwPn78Xf0E4E1oFUF8ASxMD2iaY6wEKy2Kbev8yIODXAvXj4J8aR8NFL7y474_EBnrwz_iRMnu3w2aqn6oTyeMMRpMemp7c6mi1zl0VrmLNTMjFTmHiDL-YgQ60ZzpjMyQWvt-8BcrzGp1u5DW9LrR13qUEeLTSsHzQlcroGcysIPhqOiK5MBkhP0uP_jYmIpcQi9KYoWnFSKycJ57QySrws1HiFL_OqMV"
              />
              <div className="overflow-hidden">
                <p className="text-label-md font-label-md font-bold text-inverse-on-surface truncate">
                  Alex Morgan
                </p>
                <p className="text-label-sm text-surface-variant truncate">System Admin</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('portal-hub')}
              className="text-surface-variant hover:text-inverse-on-surface p-1.5 rounded-lg transition-colors cursor-pointer"
              title="Return to Master Portal Hub"
            >
              <span className="material-symbols-outlined text-xl">hub</span>
            </button>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-surface-dim hover:text-error text-xs pt-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Exit to Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopAppBar */}
        <header className="bg-surface sticky top-0 z-30 shadow-xs border-b border-outline-variant/40">
          <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="md:hidden text-on-surface p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="text-headline-md font-headline-md text-primary font-bold">
                {title}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Portal Hub Quick Switcher Pill */}
              <button
                onClick={() => onNavigate('portal-hub')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-semibold text-xs border border-primary/20 hover:bg-primary-fixed/80 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">hub</span>
                <span>Master Hub (34 Screens)</span>
              </button>

              <div className="relative hidden lg:block w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-sm">search</span>
                </span>
                <input
                  className="w-full pl-9 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-all"
                  placeholder="Global search..."
                  type="text"
                />
              </div>

              <button
                onClick={() => onNavigate('admin-support')}
                className="relative p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-all cursor-pointer"
                title="Support tickets & notifications"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"></span>
              </button>

              <div
                onClick={() => onNavigate('admin-settings')}
                className="flex items-center space-x-2 pl-2 border-l border-outline-variant cursor-pointer hover:opacity-85 transition-opacity"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  alt="Alex Morgan"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP7A7XsZ1cM_XqmNqr2ucmUeNN_vOECeWcqF-03_UFpKAjJnXyeT_MTGKgR9u02i81fRxkqkoCxNffTbUGpcraP8OPaHFNAFr7Qf34TlbJ0LtokYDUlFjAm7EkYAD9_jr5V_GGLrQZSUJbVRES2p7Eogz5djyVj13y-lQF5oLxQRQwlyUmv2IgqS64l8eoAE_DO0xTifHRcx34qFSRFjnaMLw4-z3d1ytfkqohNUlpk1Qjm1C3DZW_"
                />
                <span className="hidden md:inline text-label-md font-label-md font-bold text-on-surface">
                  Alex Morgan
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-inverse-surface text-inverse-on-surface border-b border-outline p-4 space-y-2 shadow-xl z-50">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onNavigate(item.view);
                }}
                className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-left text-body-md ${
                  currentView === item.view
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-surface-variant hover:text-inverse-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <div className="pt-2 border-t border-outline flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onNavigate('portal-hub');
                }}
                className="flex items-center space-x-2 text-primary-fixed text-sm font-bold text-left px-3 py-1.5"
              >
                <span className="material-symbols-outlined text-sm">hub</span>
                <span>Master Portal Hub</span>
              </button>
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onNavigate('home');
                }}
                className="flex items-center space-x-2 text-error text-sm text-left px-3 py-1.5"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Exit to Public Website</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};
