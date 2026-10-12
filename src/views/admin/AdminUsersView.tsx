import React, { useState } from 'react';
import { PageView } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminUsersViewProps {
  onNavigate?: (view: PageView) => void;
}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({ onNavigate }) => {
  const { users: appUsers, addUser, updateUserStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'clients' | 'freelancers' | 'blocked'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Freelancer');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const users = appUsers.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role === 'client' ? 'Client' : u.role === 'admin' ? 'Admin' : 'Freelancer',
    status: u.status === 'active' ? 'Active' : u.status === 'suspended' ? 'Blocked' : 'Pending',
    joined: u.createdAt || 'Recent',
    avatar: u.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMkZggjyLIbf7yBK5HdbkjJknhcLMFR3SxBgCTS1Sarc3wMDPONo1O2PWuvVevkRsuH-CNVmR1o6ThH3aFiDa3jxT28IxW6c4lofJ9FgY5z5iG1HULppGW0NdSaIk8vzgp1YrzsG0-6C2FrsnuBlGYNTI7uDUGn6fsD1Zu5TAKpf-0DXj-tJDF6FtawOQ2geEeHn4VHuD6g0oXK_ccR-FSHvo8fQ0Am-vs6wmaAjz_9t1jqW-4mHki',
  }));

  const toggleUserStatus = (id: string) => {
    const target = users.find((u) => u.id === id);
    if (!target) return;
    const nextStatus = target.status === 'Blocked' ? 'active' : 'suspended';
    updateUserStatus(id, nextStatus);
    showToast(`${target.name} status updated to ${nextStatus === 'active' ? 'Active' : 'Blocked'}.`);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    addUser({
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim().toLowerCase(),
      role: newUserRole === 'Client' ? 'client' : newUserRole === 'Admin' ? 'admin' : 'freelancer',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMkZggjyLIbf7yBK5HdbkjJknhcLMFR3SxBgCTS1Sarc3wMDPONo1O2PWuvVevkRsuH-CNVmR1o6ThH3aFiDa3jxT28IxW6c4lofJ9FgY5z5iG1HULppGW0NdSaIk8vzgp1YrzsG0-6C2FrsnuBlGYNTI7uDUGn6fsD1Zu5TAKpf-0DXj-tJDF6FtawOQ2geEeHn4VHuD6g0oXK_ccR-FSHvo8fQ0Am-vs6wmaAjz_9t1jqW-4mHki',
    });

    setAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    showToast(`User ${newUserName} created and registered to platform.`);
  };

  const filtered = users.filter((u) => {
    if (activeTab === 'clients' && u.role !== 'Client') return false;
    if (activeTab === 'freelancers' && u.role !== 'Freelancer') return false;
    if (activeTab === 'blocked' && u.status !== 'Blocked') return false;
    if (searchTerm) {
      const match =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  return (
    <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-300 border border-white/20">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h2 className="text-headline-lg font-headline-lg text-on-background mb-1">User Management</h2>
        <p className="text-body-md text-on-surface-variant">
          Manage platform users, verify accounts, and moderate access levels.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/50 shadow-sm">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px]">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
            <input
              className="w-full bg-surface-container-low border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-sm text-on-surface focus:ring-primary focus:border-primary"
              placeholder="Search by name, email, or company..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdowns */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-sm text-on-surface focus:ring-primary focus:border-primary cursor-pointer"
          >
            <option>Role: All Roles</option>
            <option>Client</option>
            <option>Freelancer</option>
            <option>Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-sm text-on-surface focus:ring-primary focus:border-primary cursor-pointer"
          >
            <option>Status: All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Blocked</option>
          </select>
          <select className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-sm text-on-surface focus:ring-primary focus:border-primary cursor-pointer">
            <option>Date: Anytime</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('Platform user database CSV export generated.')}
            className="flex items-center gap-2 bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant px-4 py-2 rounded-lg text-label-md font-label-md transition-all duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export Data
          </button>
          <button
            onClick={() => setAddUserModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-label-md font-label-md shadow-sm transition-all duration-200 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Add User
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-outline-variant/60 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 pb-3 text-label-md font-label-md whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'all'
              ? 'border-b-2 border-primary text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>All Users</span>
          <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full text-xs font-bold">1,428</span>
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex items-center gap-2 pb-3 text-label-md font-label-md whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'clients'
              ? 'border-b-2 border-primary text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Clients</span>
          <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-xs">842</span>
        </button>
        <button
          onClick={() => setActiveTab('freelancers')}
          className={`flex items-center gap-2 pb-3 text-label-md font-label-md whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'freelancers'
              ? 'border-b-2 border-primary text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Freelancers</span>
          <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-xs">536</span>
        </button>
        <button
          onClick={() => setActiveTab('blocked')}
          className={`flex items-center gap-2 pb-3 text-label-md font-label-md whitespace-nowrap cursor-pointer transition-colors ${
            activeTab === 'blocked'
              ? 'border-b-2 border-primary text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Blocked</span>
          <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded-full text-xs">50</span>
        </button>
      </div>

      {/* Data Table Container */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/40 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">
                  <input className="rounded border-outline text-primary focus:ring-primary cursor-pointer" type="checkbox" />
                </th>
                <th className="py-3 px-4 font-semibold">User / Name &amp; Email</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Joined Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm text-on-surface">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-3 px-4">
                    <input className="rounded border-outline text-primary focus:ring-primary cursor-pointer" type="checkbox" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img className="w-9 h-9 rounded-full object-cover" alt={user.name} src={user.avatar} />
                      <div>
                        <div className="font-semibold text-on-background">{user.name}</div>
                        <div className="text-on-surface-variant text-body-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'Freelancer'
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-secondary-fixed/30 text-on-secondary-container'
                          : user.status === 'Pending'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-secondary'
                            : user.status === 'Pending'
                            ? 'bg-tertiary'
                            : 'bg-error'
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">{user.joined}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => showToast(`Viewing profile & KYC verification documents for ${user.name}`)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                        title="View details"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                      <button
                        onClick={() => showToast(`Edit permissions & role for ${user.name}`)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                        title="Edit user"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          user.status === 'Blocked'
                            ? 'text-secondary hover:bg-secondary-fixed/20'
                            : 'text-error hover:bg-error-container/30'
                        }`}
                        title={user.status === 'Blocked' ? 'Activate user' : 'Suspend user'}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {user.status === 'Blocked' ? 'check_circle' : 'block'}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 bg-surface-container-low border-t border-outline-variant/40 gap-4">
          <div className="text-body-sm text-on-surface-variant">
            Showing <span className="font-medium text-on-background">1</span> to{' '}
            <span className="font-medium text-on-background">5</span> of{' '}
            <span className="font-medium text-on-background">1,428</span> results
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container text-body-sm disabled:opacity-50 cursor-pointer" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-body-sm font-medium">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container text-body-sm cursor-pointer">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container text-body-sm cursor-pointer">3</button>
            <span className="px-2 text-on-surface-variant">...</span>
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container text-body-sm cursor-pointer">286</button>
            <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface-variant bg-surface-container-lowest hover:bg-surface-container text-body-sm cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {addUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-outline-variant">
            <button
              onClick={() => setAddUserModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline-md font-bold text-on-surface mb-1">Add Platform User</h3>
            <p className="text-body-sm text-on-surface-variant mb-4">
              Provision a new enterprise account with immediate permissions.
            </p>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rachel Adams"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md"
                />
              </div>
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Work Email</label>
                <input
                  required
                  type="email"
                  placeholder="rachel@company.io"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md"
                />
              </div>
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Platform Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md"
                >
                  <option value="Freelancer">Freelance Engineer / Designer</option>
                  <option value="Client">Enterprise Client / Hiring Manager</option>
                  <option value="Admin">System Administrator</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold text-body-md shadow-md cursor-pointer mt-2"
              >
                Create &amp; Send Invite
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
