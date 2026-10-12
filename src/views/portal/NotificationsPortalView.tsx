import React, { useState } from 'react';
import { PageView } from '../../types';

interface NotificationsPortalViewProps {
  onNavigate: (view: PageView) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'milestone' | 'message' | 'system' | 'payment';
  unread: boolean;
  avatar?: string;
  actionView?: PageView;
}

export const NotificationsPortalView: React.FC<NotificationsPortalViewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'milestones'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Milestone 2 Approved by NovaPay FinTech',
      message: 'Client approved the high-throughput ledger transaction processing deliverables. $12,500 has been released to escrow.',
      time: '15 minutes ago',
      type: 'milestone',
      unread: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2pBHN5t0LmGbEjStUDX2OEi0-8f_jle363VEE5vho7zvz23a3fhfEbiyKDLwDC86MF6j6ZwOy1it6vJm-zpX_x7S31EkjHvUUfTRnJxMhfgaOuI7JdaDincEpFLoulvwmVIVBWMMt0ExYTHU4SsQpAUSJeTxsscUtgpE9m2-8IDscbtMFbH90WTf4xbKPjgbtwJ5bUQ4BqOLGkA0--mcrqWAX2N5QVf9KbHCTpu_aHG_P857mcnMx',
      actionView: 'payments',
    },
    {
      id: 'n2',
      title: 'New message from Sarah Jenkins',
      message: '"Hi Alex, I\'ve updated the specifications for the payment gateway integration. Could you take a look?"',
      time: '1 hour ago',
      type: 'message',
      unread: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_ILVGmL3qR3AYCJgXhm8hEN4BBkoMQmDT8hRwbCjhhZl40cGsD9cf_6aqCtoW7X2nCG9rA7p34NSOuaOeSEhOK-JMs5uJEGwsYgsBVHym4ES6A-TDlAjSDeZDXnPu1xSG_D5MMV4LF5vPxrzzjxPqvsALDCfCG7HeAzc6wStxUQDQMM7rZP52Y6FVGIyFR3fQNn1hoTflct64m_-iRQLzcGFWWY11N0x0_ti73VQfwYFB2xdsbgHo',
      actionView: 'messages',
    },
    {
      id: 'n3',
      title: 'Enterprise Cloud Migration: Code Review Ready',
      message: 'Marcus Vance marked Sprint 3 Kubernetes manifests ready for final staging cluster verification.',
      time: '3 hours ago',
      type: 'system',
      unread: false,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGmBCmvgMYvneIU0qyiXpQr2_Sbd0pP6HvK3y-UmgfzDWgbTodVdfqfv2vN5LF9qOtqCDEhcv2FD8_He0C4W5QzN7bkz5TXhQNTofNqEIT6zBtTAcNE1NtYkZj2QbfXtoE12wo_WcFzARWJjS8Uc3EzYRS3fdaKPIRTfXPquFwfyQI6JSpyXiXlbdg2v5sg9DS_5irbHsvZOsf2g9NqmosCknsl5wkD8vTypRX861qPn3sGZdnQv_5',
      actionView: 'my-projects',
    },
    {
      id: 'n4',
      title: 'Direct Deposit Cleared',
      message: 'Your payout of $15,000.00 for Apex Global milestone has completed ACH processing into Visa ••4289.',
      time: 'Yesterday',
      type: 'payment',
      unread: false,
      actionView: 'payments',
    },
    {
      id: 'n5',
      title: 'Security Alert: New Sign-In from San Francisco',
      message: 'Successful browser login authenticated on Chrome OS from IP 192.0.2.1.',
      time: '2 days ago',
      type: 'system',
      unread: false,
      actionView: 'settings',
    },
  ]);

  const [toast, setToast] = useState<string | null>(null);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    setToast('All notifications marked as read.');
    setTimeout(() => setToast(null), 3500);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return n.unread;
    if (filter === 'milestones') return n.type === 'milestone';
    return true;
  });

  return (
    <main className="flex-1 p-6 md:p-8 max-w-5xl w-full mx-auto space-y-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-headline-lg font-headline-lg font-bold text-on-surface">Notifications</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Stay up to date with contracts, deliverables, financial payouts, and messages.
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="self-start sm:self-auto px-4 py-2 border border-outline-variant hover:bg-surface-variant rounded-lg text-label-md font-semibold text-on-surface transition-colors cursor-pointer flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">done_all</span>
          Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-label-md font-semibold cursor-pointer transition-colors ${
            filter === 'all'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          All Activity ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-lg text-label-md font-semibold cursor-pointer transition-colors ${
            filter === 'unread'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          Unread ({notifications.filter((n) => n.unread).length})
        </button>
        <button
          onClick={() => setFilter('milestones')}
          className={`px-3 py-1.5 rounded-lg text-label-md font-semibold cursor-pointer transition-colors ${
            filter === 'milestones'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          Milestones &amp; Escrow
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            className={`p-5 rounded-xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
              item.unread
                ? 'bg-primary-container/10 border-primary/30 shadow-xs'
                : 'bg-surface-container-lowest border-outline-variant/60 hover:bg-surface-container-low'
            }`}
          >
            {item.avatar ? (
              <img
                src={item.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary/20"
              />
            ) : (
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'payment'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.type === 'milestone'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.type === 'payment'
                    ? 'payments'
                    : item.type === 'milestone'
                    ? 'verified'
                    : 'notifications'}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4
                  className={`text-body-md font-semibold ${
                    item.unread ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-label-sm text-outline">{item.time}</span>
                  {item.unread && (
                    <span className="w-2.5 h-2.5 bg-primary rounded-full shrink-0" />
                  )}
                </div>
              </div>
              <p className="text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                {item.message}
              </p>

              {item.actionView && (
                <div className="mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.actionView) onNavigate(item.actionView);
                    }}
                    className="text-label-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
