import React, { useState } from 'react';

export const SettingsPortalView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'security' | 'notifications' | 'payments' | 'privacy' | 'danger'>('profile');
  const [fullName, setFullName] = useState('Alex Morgan');
  const [title, setTitle] = useState('Senior Full Stack Architect');
  const [bio, setBio] = useState('Building scalable distributed systems and high-performance React architectures for elite startups and enterprise clients.');
  const [location, setLocation] = useState('San Francisco, CA');
  const [email, setEmail] = useState('alex@startup.io');
  const [username, setUsername] = useState('alexmorgan_dev');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('Settings saved successfully!');

  // Notification checkboxes
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(true);
  const [notifMarketing, setNotifMarketing] = useState(false);

  // Privacy checkboxes
  const [privacyVisible, setPrivacyVisible] = useState(true);
  const [privacySearch, setPrivacySearch] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handleSave = () => {
    showToast('Settings & preferences saved successfully!');
  };

  return (
    <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-8 relative">
      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 bg-inverse-surface text-inverse-on-surface px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom duration-300 border border-white/10">
          <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span className="text-label-md font-label-md font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Left Settings Sub-Menu Navigation */}
      <nav className="w-full md:w-64 flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 shrink-0">
        <button
          onClick={() => setActiveSection('profile')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all ${
            activeSection === 'profile'
              ? 'bg-surface-container font-bold text-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-label-md font-label-md">Profile</span>
        </button>

        <button
          onClick={() => setActiveSection('account')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all ${
            activeSection === 'account'
              ? 'bg-surface-container font-bold text-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">manage_accounts</span>
          <span className="text-label-md font-label-md">Account</span>
        </button>

        <button
          onClick={() => setActiveSection('security')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all ${
            activeSection === 'security'
              ? 'bg-surface-container font-bold text-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">security</span>
          <span className="text-label-md font-label-md">Security</span>
        </button>

        <button
          onClick={() => setActiveSection('notifications')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all ${
            activeSection === 'notifications'
              ? 'bg-surface-container font-bold text-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">notifications_active</span>
          <span className="text-label-md font-label-md">Notifications</span>
        </button>

        <button
          onClick={() => setActiveSection('payments')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all ${
            activeSection === 'payments'
              ? 'bg-surface-container font-bold text-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">credit_card</span>
          <span className="text-label-md font-label-md">Payments</span>
        </button>

        <button
          onClick={() => setActiveSection('privacy')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all ${
            activeSection === 'privacy'
              ? 'bg-surface-container font-bold text-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">visibility_off</span>
          <span className="text-label-md font-label-md">Privacy</span>
        </button>

        <button
          onClick={() => setActiveSection('danger')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer transition-all mt-4 ${
            activeSection === 'danger'
              ? 'bg-error-container/30 font-bold text-error'
              : 'text-error hover:bg-error-container/20'
          }`}
        >
          <span className="material-symbols-outlined">warning</span>
          <span className="text-label-md font-label-md">Danger Zone</span>
        </button>
      </nav>

      {/* Main Content Cards Container */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Profile Settings Card */}
        <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-6" id="profile-section">
          <div className="border-b border-outline-variant pb-4">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">Profile Settings</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Manage your public persona, avatar, and professional metadata.</p>
          </div>

          <div className="flex items-center gap-6">
            <img
              className="w-20 h-20 rounded-full object-cover ring-2 ring-primary"
              alt="Alex Morgan Avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjvaQH8hCLNCIQLztS3FeisrT-HP-JtcVqw6mPYaIoIMsJUEK4ZB6a7IhG0SFrOIQykrjnzLi2uy1r-b3sh3JP4pbtg3nVJQoIndSqxvLxYcX1JnqIwryTULj0T4V4YJwToZ35dskDuyYp46hZP6VGMt3kSmFPbGpr6DXoOTuQ3vGYyqRNGagBr5Iks1ynLCvll-qK80UGKY-TY7WT9LlNSsGUCuOxjeRAV7aO8Wshd_DMJ34EXjkV"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={() => showToast('Avatar updated: image optimized and synced across all enterprise teams.')}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:bg-primary/90 transition-all shadow-sm cursor-pointer w-fit font-semibold"
              >
                Change Avatar
              </button>
              <p className="text-label-sm text-on-surface-variant">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Full Name</label>
              <input
                className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Professional Title</label>
              <input
                className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-md font-label-md text-on-surface font-bold">Bio</label>
            <textarea
              className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Location</label>
              <input
                className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Email & Account Settings Card */}
        <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-6" id="account-section">
          <div className="border-b border-outline-variant pb-4">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">Email &amp; Account Settings</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Configure your primary contact parameters and localization preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Email Address</label>
              <input
                className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Username</label>
              <input
                className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Language</label>
              <select className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Timezone</label>
              <select className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                <option>(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                <option>(GMT+00:00) Universal Time Coordinated</option>
                <option>(GMT+01:00) Central European Time</option>
              </select>
            </div>
          </div>
        </section>

        {/* Password & Security Card */}
        <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-6" id="security-section">
          <div className="border-b border-outline-variant pb-4">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">Password &amp; Security</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Protect your account with robust credentials and multi-factor authentication.</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Current Password</label>
              <input
                className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="••••••••••••"
                type="password"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-label-md font-label-md text-on-surface font-bold">New Password</label>
                <input
                  className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="••••••••••••"
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-md font-label-md text-on-surface font-bold">Confirm New Password</label>
                <input
                  className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="••••••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
            <div className="flex flex-col">
              <span className="text-label-md font-label-md font-bold text-on-surface">Two-Factor Authentication (2FA)</span>
              <span className="text-body-sm text-on-surface-variant">Secure your account using an authenticator app (TOTP).</span>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                twoFactorEnabled ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Notification Preferences Card */}
        <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-6" id="notifications-section">
          <div className="border-b border-outline-variant pb-4">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">Notification Preferences</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Choose how and when you receive alerts across platform channels.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-label-md font-label-md font-bold text-on-surface">Email Notifications</p>
                <p className="text-body-sm text-on-surface-variant">Receive direct platform updates via your registered email.</p>
              </div>
              <input
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-outline-variant">
              <div>
                <p className="text-label-md font-label-md font-bold text-on-surface">Push Notifications</p>
                <p className="text-body-sm text-on-surface-variant">Receive real-time alerts in your browser or desktop application.</p>
              </div>
              <input
                checked={notifPush}
                onChange={(e) => setNotifPush(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-outline-variant">
              <div>
                <p className="text-label-md font-label-md font-bold text-on-surface">Project Update Alerts</p>
                <p className="text-body-sm text-on-surface-variant">Get notified instantly when project milestones or deliverables are updated.</p>
              </div>
              <input
                checked={notifUpdates}
                onChange={(e) => setNotifUpdates(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-outline-variant">
              <div>
                <p className="text-label-md font-label-md font-bold text-on-surface">Marketing Emails</p>
                <p className="text-body-sm text-on-surface-variant">Receive product news, engineering articles, and promotional offers.</p>
              </div>
              <input
                checked={notifMarketing}
                onChange={(e) => setNotifMarketing(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </div>
          </div>
        </section>

        {/* Payment & Billing Card */}
        <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-6" id="payments-section">
          <div className="border-b border-outline-variant pb-4">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">Payment &amp; Billing</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Manage payout destinations, billing addresses, and tax documentation.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-lg border border-outline-variant bg-surface flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-primary-container rounded flex items-center justify-center text-on-primary-container font-bold text-xs text-white">
                  VISA
                </div>
                <div>
                  <p className="text-label-md font-label-md font-bold text-on-surface">•••• •••• •••• 4242</p>
                  <p className="text-label-sm text-on-surface-variant">Expires 12/26 • Default Payout</p>
                </div>
              </div>
              <button
                onClick={() => showToast('Editing default payout card details for •••• 4242.')}
                className="text-primary text-label-md font-label-md font-bold hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <button
              onClick={() => showToast('Connecting new enterprise wire destination / bank account.')}
              className="self-start px-4 py-2 border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant transition-all cursor-pointer font-medium"
            >
              Add New Payout Method
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant">
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Billing Address</label>
              <input className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="text" defaultValue="100 Market St, Suite 400" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Tax ID / VAT Number</label>
              <input className="px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="text" defaultValue="US998877665" />
            </div>
          </div>
        </section>

        {/* Privacy Controls Card */}
        <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-6" id="privacy-section">
          <div className="border-b border-outline-variant pb-4">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">Privacy Controls</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Control your discoverability, search indexation, and active device sessions.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-label-md font-label-md font-bold text-on-surface">Profile Visibility</p>
                <p className="text-body-sm text-on-surface-variant">Allow your profile to be viewed by verified platform members.</p>
              </div>
              <input
                checked={privacyVisible}
                onChange={(e) => setPrivacyVisible(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-outline-variant">
              <div>
                <p className="text-label-md font-label-md font-bold text-on-surface">Search Engine Indexing</p>
                <p className="text-body-sm text-on-surface-variant">Allow public search engines to index your developer profile.</p>
              </div>
              <input
                checked={privacySearch}
                onChange={(e) => setPrivacySearch(e.target.checked)}
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                type="checkbox"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant flex flex-col gap-4">
            <p className="text-label-md font-label-md font-bold text-on-surface">Active Sessions</p>
            <div className="flex items-center justify-between p-3 rounded-lg border border-outline-variant bg-surface">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">laptop_mac</span>
                <div>
                  <p className="text-label-md font-label-md font-bold text-on-surface">Chrome on macOS • San Francisco, US</p>
                  <p className="text-label-sm text-on-surface-variant">Active now • Current Session</p>
                </div>
              </div>
              <span className="text-label-sm font-label-sm font-bold text-primary">This device</span>
            </div>
          </div>
        </section>

        {/* Danger Zone Card */}
        <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-error/40 shadow-sm flex flex-col gap-6" id="danger-section">
          <div className="border-b border-error/20 pb-4">
            <h3 className="text-headline-sm font-headline-sm text-error font-bold">Danger Zone</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">Irreversible actions regarding your account lifecycle.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
            <div>
              <p className="text-label-md font-label-md font-bold text-on-surface">Deactivate Account</p>
              <p className="text-body-sm text-on-surface-variant">Temporarily hide your profile and pause all active contracts.</p>
            </div>
            <button
              onClick={() => showToast('Account deactivation requested. Session remains active for 24 hours.')}
              className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant transition-all cursor-pointer font-medium"
            >
              Deactivate
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-t border-error/20">
            <div>
              <p className="text-label-md font-label-md font-bold text-error">Delete Account</p>
              <p className="text-body-sm text-on-surface-variant">Permanently erase your account, code repositories, and payout records.</p>
            </div>
            <button
              onClick={() => showToast('Permanent deletion request submitted for enterprise security review.')}
              className="px-4 py-2 bg-error text-on-error rounded-lg text-label-md font-label-md hover:bg-error/90 transition-all shadow-sm cursor-pointer font-bold"
            >
              Delete Account
            </button>
          </div>
        </section>

        {/* Save Changes Action Bar */}
        <div className="flex items-center justify-end gap-4 pt-4 pb-12">
          <button
            onClick={() => showToast('Changes reverted to previous saved state.')}
            className="px-6 py-3 border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:bg-primary/90 transition-all shadow-md font-bold cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
};
