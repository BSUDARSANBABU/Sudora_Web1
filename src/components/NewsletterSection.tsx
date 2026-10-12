import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface NewsletterSectionProps {
  onSuccess?: (email: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    setStatus('loading');

    // Simulate network delay and save to localStorage
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('sp_newsletter_subscribers');
        const subscribers: string[] = stored ? JSON.parse(stored) : [];
        if (!subscribers.includes(trimmed)) {
          subscribers.push(trimmed);
          localStorage.setItem('sp_newsletter_subscribers', JSON.stringify(subscribers));
        }
      } catch (err) {
        console.error('Error saving subscriber:', err);
      }

      setSubscribedEmail(trimmed);
      setStatus('success');
      setEmail('');
      if (onSuccess) {
        onSuccess(trimmed);
      }
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    setSubscribedEmail('');
    setErrorMessage('');
  };

  return (
    <section className="px-gutter max-w-7xl mx-auto py-6" id="newsletter">
      <div className="bg-surface-container-low border border-outline-variant/70 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Bi-Weekly Executive Briefing</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
              Engineering Insights &amp; Market Trends
            </h2>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join 18,000+ CTOs, product leaders, and engineering directors. Receive curated deep dives into distributed system architectures, production AI deployments, and developer compensation benchmarks.
            </p>

            {/* Topics Included */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-on-surface-variant">
              <span className="font-semibold text-outline">Covering:</span>
              <span className="bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant/40 font-medium">
                Cloud Architecture
              </span>
              <span className="bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant/40 font-medium">
                Applied AI &amp; LLMOps
              </span>
              <span className="bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant/40 font-medium">
                Engineering Velocity
              </span>
              <span className="bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant/40 font-medium">
                Hiring Benchmarks
              </span>
            </div>
          </div>

          {/* Right Interactive Form Box */}
          <div className="lg:col-span-5">
            {status === 'success' ? (
              <div className="bg-surface-container-lowest border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface">
                    You're on the list!
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                    We've sent a welcome briefing and our Q3 System Architecture Benchmark to{' '}
                    <strong className="text-on-surface font-semibold">{subscribedEmail}</strong>.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                  >
                    Subscribe another email address
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Get briefings delivered directly to your inbox</span>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your corporate email address..."
                      className={`w-full px-4 py-3 bg-surface border rounded-xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 transition-all ${
                        status === 'error'
                          ? 'border-error ring-1 ring-error/30'
                          : 'border-outline-variant focus:ring-primary/40 focus:border-primary'
                      }`}
                      disabled={status === 'loading'}
                    />
                  </div>

                  {status === 'error' && errorMessage && (
                    <p className="text-xs text-error font-medium pl-1 animate-in fade-in">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-3 px-6 rounded-xl text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe to Industry Briefings</span>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No spam. Unsubscribe anytime.</span>
                  </div>
                  <span>100% Privacy Protected</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
