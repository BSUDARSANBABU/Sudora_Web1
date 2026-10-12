import React, { useState } from 'react';
import { PageView, LeadInquiry } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminInquiriesViewProps {
  onNavigate: (view: PageView) => void;
}

export const AdminInquiriesView: React.FC<AdminInquiriesViewProps> = ({ onNavigate }) => {
  const { inquiries, updateInquiryStatus, deleteInquiry, addInquiry } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<LeadInquiry | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSimulateInquiry = () => {
    addInquiry({
      name: 'Elena Vance',
      email: 'e.vance@quantumcloud.ai',
      company: 'Quantum Cloud AI',
      service: 'AI & Automation',
      budget: '$50k - $100k',
      message: 'Need high-throughput inference caching microservices deployed across multi-cloud regions.'
    });
    showToast('New client inquiry received and added to admin CRM pipeline!');
  };

  const handleStatusChange = (id: string, status: LeadInquiry['status']) => {
    updateInquiryStatus(id, status);
    showToast(`Lead status updated to "${status}".`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete inquiry from ${name}?`)) {
      deleteInquiry(id);
      showToast(`Inquiry from ${name} removed.`);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter !== 'All' && inq.status !== statusFilter) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      inq.service.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q)
    );
  });

  const newCount = inquiries.filter((i) => i.status === 'New').length;
  const inDiscussionCount = inquiries.filter((i) => i.status === 'In Discussion' || i.status === 'Proposal Sent').length;
  const convertedCount = inquiries.filter((i) => i.status === 'Converted').length;

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
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Manage Client Leads &amp; Inquiries</h2>
            <span className="text-label-sm font-bold bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full">
              Contact Page CRM
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Review incoming project briefs and contact form requests submitted on <code>/contact</code>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Public Contact Form
          </button>
          <button
            onClick={handleSimulateInquiry}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add_alert</span>
            Simulate New Inquiry
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Total Inquiries</span>
          <p className="text-headline-md font-bold text-on-surface mt-1">{inquiries.length}</p>
          <span className="text-label-sm text-outline">All recorded leads</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">New Inquiries</span>
          <p className="text-headline-md font-bold text-primary mt-1">{newCount}</p>
          <span className="text-label-sm text-primary font-semibold">Requires immediate outreach</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">In Negotiation</span>
          <p className="text-headline-md font-bold text-amber-600 mt-1">{inDiscussionCount}</p>
          <span className="text-label-sm text-amber-700">Proposal &amp; scope review</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Converted Clients</span>
          <p className="text-headline-md font-bold text-emerald-600 mt-1">{convertedCount}</p>
          <span className="text-label-sm text-emerald-700 font-semibold">Contract signed &amp; funded</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1 w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, email, company, or service..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'New', 'In Discussion', 'Proposal Sent', 'Converted', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-label-sm font-semibold transition-all cursor-pointer ${
                statusFilter === st ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-variant'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
              <tr>
                <th className="p-4">Client / Prospect</th>
                <th className="p-4">Requested Service</th>
                <th className="p-4">Est. Budget</th>
                <th className="p-4">Received</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-surface-container/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-on-surface">{inq.name}</p>
                    <p className="text-label-sm text-outline">{inq.company || inq.email}</p>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-primary">{inq.service}</span>
                  </td>
                  <td className="p-4 font-medium text-on-surface">{inq.budget || 'Custom Scope'}</td>
                  <td className="p-4 text-on-surface-variant text-label-sm">{inq.date}</td>
                  <td className="p-4">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className={`text-label-sm font-bold px-2.5 py-1 rounded-full border border-transparent cursor-pointer ${
                        inq.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.status === 'In Discussion'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'Proposal Sent'
                          ? 'bg-purple-100 text-purple-800'
                          : inq.status === 'Converted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="px-3 py-1 bg-surface-container-high hover:bg-surface-variant rounded-lg text-label-sm font-semibold text-on-surface cursor-pointer"
                    >
                      View Scope
                    </button>
                    <button
                      onClick={() => handleDelete(inq.id, inq.name)}
                      className="p-1 hover:bg-error-container/20 rounded text-error cursor-pointer"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-outline-variant shadow-2xl relative">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span className="text-label-sm text-outline">Lead ID: {selectedInquiry.id}</span>
            <h3 className="text-headline-md font-bold text-on-surface mt-1">{selectedInquiry.name}</h3>
            <p className="text-body-sm text-secondary font-medium">{selectedInquiry.company || 'Enterprise Prospect'}</p>

            <div className="my-4 p-4 bg-surface-container-low rounded-xl space-y-2 border border-outline-variant/60">
              <div className="flex justify-between text-body-sm">
                <span className="text-outline">Email Address:</span>
                <span className="font-semibold text-on-surface">{selectedInquiry.email}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-outline">Requested Domain:</span>
                <span className="font-bold text-primary">{selectedInquiry.service}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-outline">Target Budget:</span>
                <span className="font-bold text-emerald-600">{selectedInquiry.budget || 'Custom Proposal'}</span>
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <span className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Message &amp; Project Brief:</span>
              <p className="text-body-md text-on-surface p-3 bg-surface-container-lowest border border-outline-variant rounded-lg leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
              <button
                onClick={() => {
                  handleStatusChange(selectedInquiry.id, 'In Discussion');
                  setSelectedInquiry(null);
                }}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 cursor-pointer shadow-sm"
              >
                Start Discussion
              </button>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
