import React, { useState } from 'react';

export const PaymentsPortalView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [addMethodModal, setAddMethodModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('5000');
  const [actionToast, setActionToast] = useState<string | null>(null);

  const transactions = [
    {
      id: 'TXN-98241',
      desc: 'NextGen Core Banking API (Milestone 2)',
      date: 'Oct 24, 2024',
      amount: '+$12,500.00',
      status: 'Completed',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      amountClass: 'text-emerald-600',
    },
    {
      id: 'TXN-98240',
      desc: 'Enterprise Cloud Migration',
      date: 'Oct 18, 2024',
      amount: '+$15,000.00',
      status: 'Completed',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      amountClass: 'text-emerald-600',
    },
    {
      id: 'TXN-98239',
      desc: 'AWS Serverless Setup (Escrow)',
      date: 'Oct 14, 2024',
      amount: '+$4,200.00',
      status: 'Pending',
      badgeClass: 'bg-amber-100 text-amber-800',
      amountClass: 'text-amber-600',
    },
    {
      id: 'TXN-98238',
      desc: 'Monthly SaaS Platform Subscription',
      date: 'Oct 01, 2024',
      amount: '- $149.00',
      status: 'Completed',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      amountClass: 'text-on-surface',
    },
    {
      id: 'TXN-98237',
      desc: 'UI/UX Consultation Retainer',
      date: 'Sep 28, 2024',
      amount: '+$3,500.00',
      status: 'Completed',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      amountClass: 'text-emerald-600',
    },
    {
      id: 'TXN-98236',
      desc: 'Legacy Refactor Script (Refund)',
      date: 'Sep 15, 2024',
      amount: '- $2,000.00',
      status: 'Refunded',
      badgeClass: 'bg-purple-100 text-purple-800',
      amountClass: 'text-purple-600',
    },
    {
      id: 'TXN-98235',
      desc: 'Failed Wire Transfer (Routing # error)',
      date: 'Sep 10, 2024',
      amount: '- $5,000.00',
      status: 'Failed',
      badgeClass: 'bg-red-100 text-red-800',
      amountClass: 'text-error',
    },
  ];

  const filteredTxns = transactions.filter((t) => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (searchTerm && !t.desc.toLowerCase().includes(searchTerm.toLowerCase()) && !t.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setActionToast(`Withdrawal of $${Number(withdrawAmount).toLocaleString()} initiated to Visa ending in 4289.`);
    setWithdrawModal(false);
    setTimeout(() => setActionToast(null), 5000);
  };

  return (
    <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
      {/* Action Toast */}
      {actionToast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{actionToast}</p>
        </div>
      )}

      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">Payments &amp; Financials</h1>
          <p className="text-body-lg text-on-surface-variant mt-1">
            Manage payouts, connected payment methods, and transaction history.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddMethodModal(true)}
            className="px-4 py-2 rounded-lg border border-outline text-on-surface font-label-md hover:bg-surface-variant transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Payment Method
          </button>
          <button
            onClick={() => setWithdrawModal(true)}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md hover:bg-primary-container transition-all shadow-sm flex items-center gap-2 cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* 2. Top Financial Statistics (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-on-surface-variant font-label-md">Available Balance</span>
            <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                wallet
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-headline-md font-headline-md text-on-surface font-bold">$24,850.00</div>
            <div className="flex items-center gap-1.5 mt-2 text-body-sm text-emerald-600 font-medium">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12% this month</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-on-surface-variant font-label-md">Pending Balance</span>
            <div className="w-10 h-10 rounded-lg bg-secondary-fixed/50 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                schedule
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-headline-md font-headline-md text-on-surface font-bold">$4,200.00</div>
            <div className="flex items-center gap-1.5 mt-2 text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-amber-500">lock</span>
              <span>3 escrow milestones</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-on-surface-variant font-label-md">Total Earnings</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                monitoring
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-headline-md font-headline-md text-on-surface font-bold">$142,500.00</div>
            <div className="flex items-center gap-1.5 mt-2 text-body-sm text-on-surface-variant">
              <span>Lifetime earnings</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-on-surface-variant font-label-md">Total Spent</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                credit_card
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-headline-md font-headline-md text-on-surface font-bold">$32,100.00</div>
            <div className="flex items-center gap-1.5 mt-2 text-body-sm text-on-surface-variant">
              <span>Platform fees &amp; hires</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Payment Methods Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
            Connected Payment Methods
          </h2>
          <button
            onClick={() => setAddMethodModal(true)}
            className="text-primary text-label-md font-label-md hover:underline flex items-center gap-1 cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add New
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-primary/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-primary-container text-on-primary px-3 py-1 text-label-sm font-label-sm rounded-bl-lg font-bold">
              Primary
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-surface-container-high flex items-center justify-center font-bold text-xs text-primary">
                  VISA
                </div>
                <div>
                  <div className="text-label-md font-label-md text-on-surface font-bold">
                    Visa ending in ••4289
                  </div>
                  <div className="text-body-sm text-on-surface-variant">Expires 08/28</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-outline-variant/30 text-body-sm">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                Verified
              </span>
              <button
                onClick={() => {
                  setActionToast('Editing details for primary Visa ••4289.');
                  setTimeout(() => setActionToast(null), 3500);
                }}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-secondary-fixed/30 flex items-center justify-center font-bold text-xs text-secondary">
                  PP
                </div>
                <div>
                  <div className="text-label-md font-label-md text-on-surface font-bold">
                    PayPal account
                  </div>
                  <div className="text-body-sm text-on-surface-variant truncate max-w-[180px]">
                    alex.morgan@sudora.io
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-outline-variant/30 text-body-sm">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                Verified
              </span>
              <button
                onClick={() => {
                  setActionToast('PayPal set as primary payout destination.');
                  setTimeout(() => setActionToast(null), 3500);
                }}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Make Primary
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 rounded bg-surface-container-high flex items-center justify-center font-bold text-xs text-on-surface">
                  ACH
                </div>
                <div>
                  <div className="text-label-md font-label-md text-on-surface font-bold">
                    Chase Checking ••9912
                  </div>
                  <div className="text-body-sm text-on-surface-variant">Verified for ACH wire</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-outline-variant/30 text-body-sm">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                Verified
              </span>
              <button
                onClick={() => {
                  setActionToast('Chase Checking set as primary ACH wire destination.');
                  setTimeout(() => setActionToast(null), 3500);
                }}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Make Primary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Transaction History Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden">
        {/* Table Header / Filters */}
        <div className="p-6 border-b border-outline-variant/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
            Transaction Ledger
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-base">
                search
              </span>
              <input
                className="bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-1.5 text-body-sm focus:outline-none focus:border-primary text-on-surface"
                placeholder="Search transactions..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 text-body-sm focus:outline-none focus:border-primary text-on-surface cursor-pointer"
            >
              <option>Status: All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
              <option>Refunded</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 text-body-sm focus:outline-none focus:border-primary text-on-surface cursor-pointer"
            >
              <option>Date Range: Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Project / Description</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status Badge</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-body-sm text-on-surface">
              {filteredTxns.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs font-semibold text-primary">{row.id}</td>
                  <td className="py-4 px-6 font-medium">{row.desc}</td>
                  <td className="py-4 px-6 text-on-surface-variant">{row.date}</td>
                  <td className={`py-4 px-6 font-semibold ${row.amountClass}`}>{row.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm ${row.badgeClass}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => {
                        setActionToast(`Official tax invoice & receipt for ${row.id} downloaded.`);
                        setTimeout(() => setActionToast(null), 3500);
                      }}
                      className="text-on-surface-variant hover:text-primary p-1 cursor-pointer"
                      title="Download Invoice / Receipt"
                    >
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-body-sm text-on-surface-variant">Showing 1-7 of 48 transactions</div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-outline-variant text-body-sm text-on-surface-variant hover:bg-surface-variant disabled:opacity-50 cursor-pointer" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-primary text-on-primary text-body-sm font-medium">1</button>
            <button className="px-3 py-1 rounded border border-outline-variant text-body-sm text-on-surface hover:bg-surface-variant cursor-pointer">2</button>
            <button className="px-3 py-1 rounded border border-outline-variant text-body-sm text-on-surface hover:bg-surface-variant cursor-pointer">3</button>
            <button className="px-3 py-1 rounded border border-outline-variant text-body-sm text-on-surface hover:bg-surface-variant cursor-pointer">Next</button>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {addMethodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-outline-variant">
            <button
              onClick={() => setAddMethodModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline-md font-bold text-on-surface mb-2">Add Payment Method</h3>
            <p className="text-body-sm text-on-surface-variant mb-4">Connect a credit card or enterprise ACH wire account.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAddMethodModal(false);
                setActionToast('New payment card added successfully!');
                setTimeout(() => setActionToast(null), 4000);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Cardholder Name</label>
                <input required type="text" placeholder="Alex Morgan" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md" />
              </div>
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Card Number</label>
                <input required type="text" placeholder="•••• •••• •••• 8812" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Expires</label>
                  <input required type="text" placeholder="MM/YY" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md" />
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">CVC</label>
                  <input required type="text" placeholder="•••" className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md" />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold text-body-md shadow-md cursor-pointer mt-2">
                Save Payment Method
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {withdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-outline-variant">
            <button
              onClick={() => setWithdrawModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="font-headline-md font-bold text-on-surface mb-2">Withdraw Available Funds</h3>
            <p className="text-body-sm text-on-surface-variant mb-4">Available balance: <strong className="text-primary">$24,850.00</strong></p>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Amount ($ USD)</label>
                <input
                  type="number"
                  min="100"
                  max="24850"
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-headline-sm font-bold text-primary"
                />
              </div>
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Destination Payout</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md">
                  <option>Visa ending in ••4289 (Primary)</option>
                  <option>Chase Checking ••9912 (ACH)</option>
                  <option>PayPal (alex.morgan@sudora.io)</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold text-body-md shadow-md cursor-pointer mt-2">
                Confirm Withdrawal
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
