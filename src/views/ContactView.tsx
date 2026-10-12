import React, { useState } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';

interface ContactViewProps {
  onNavigate?: (view: PageView) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const { addInquiry } = useApp();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Direct Inquiry',
      service: formData.service || 'General Software Engineering',
      message: `${formData.message} (Phone: ${formData.phone || 'N/A'})`,
      budget: '$25k - $50k'
    });
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* Admin Quick Control Banner */}
      {onNavigate && (
        <div className="bg-primary/5 border-b border-primary/20 py-2 px-gutter">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-label-sm">
            <div className="flex items-center gap-2 text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Contact &amp; Inquiries • Submissions flow directly to Admin CRM</span>
            </div>
            <button
              onClick={() => onNavigate('admin-support')}
              className="text-primary hover:text-primary/80 font-bold flex items-center gap-1 cursor-pointer bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined text-sm">contact_mail</span>
              <span>Manage Inquiries in Admin</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-gutter pt-space-xl pb-space-lg max-w-7xl mx-auto w-full text-center">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
          <div className="w-[600px] h-[600px] bg-secondary-container/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto space-y-space-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary text-label-sm font-label-sm font-semibold">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>24/7 Global Engineering Support</span>
          </div>
          <h1 className="text-headline-lg md:text-headline-xl font-headline-lg md:font-headline-xl text-on-background tracking-tight">
            Let's Build Something Together
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Have a project in mind or want to explore an enterprise partnership? Get in touch with our engineering and strategy team.
          </p>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <main className="max-w-7xl mx-auto px-gutter py-space-xl w-full grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-start">
        {/* Left Column: Get in Touch */}
        <div className="space-y-space-lg">
          <div className="space-y-space-sm">
            <h2 className="text-headline-md font-headline-md text-on-background">Get in Touch</h2>
            <p className="text-body-md text-on-surface-variant">
              We combine high-performance software engineering with elite talent matching. Reach out directly through any of the channels below.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-space-md">
            {/* Email Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-space-lg flex items-start gap-space-md shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-headline-sm font-headline-sm text-on-background font-semibold">Email Us</h3>
                <p className="text-body-sm text-on-surface-variant">Support &amp; Partnerships</p>
                <a
                  className="text-body-md font-medium text-primary hover:underline inline-block pt-1"
                  href="mailto:contact@sudora.io"
                >
                  contact@sudora.io
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-space-lg flex items-start gap-space-md shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-headline-sm font-headline-sm text-on-background font-semibold">Call Us</h3>
                <p className="text-body-sm text-on-surface-variant">Mon-Fri 9am - 6pm PST</p>
                <a
                  className="text-body-md font-medium text-primary hover:underline inline-block pt-1"
                  href="tel:+15558901234"
                >
                  +1 (555) 890-1234
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-space-lg flex items-start gap-space-md shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-headline-sm font-headline-sm text-on-background font-semibold">Headquarters</h3>
                <p className="text-body-sm text-on-surface-variant">San Francisco Office</p>
                <p className="text-body-md text-on-surface pt-1">
                  100 Montgomery St, Suite 2400, San Francisco, CA 94104
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-space-lg flex items-start gap-space-md shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">schedule</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-headline-sm font-headline-sm text-on-background font-semibold">Working Hours</h3>
                <p className="text-body-sm text-on-surface-variant">Standard Availability</p>
                <p className="text-body-md text-on-surface pt-1">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-space-sm space-y-space-md">
            <h4 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Connect on Socials
            </h4>
            <div className="flex items-center gap-space-md">
              <a
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-lg">work</span>
              </a>
              <a
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-lg">code</span>
              </a>
              <a
                aria-label="Discord"
                className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-lg">forum</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form Card */}
        <div className="bg-surface border border-outline-variant/30 rounded-2xl shadow-md p-8 relative">
          <div className="space-y-2 mb-space-lg">
            <h2 className="text-headline-md font-headline-md text-on-background">Send Us a Message</h2>
            <p className="text-body-md text-on-surface-variant">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-primary-fixed/30 border border-primary/20 rounded-xl p-8 text-center space-y-3 animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-primary text-5xl">task_alt</span>
              <h3 className="font-headline-md text-primary font-bold">Message Sent!</h3>
              <p className="text-body-md text-on-surface">
                Thank you for reaching out. A senior solutions architect from our San Francisco team will contact you within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-lg text-body-sm font-semibold cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-space-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="block text-label-md font-label-md text-on-surface" htmlFor="name">
                    Your Name <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                {/* Email Field */}
                <div className="space-y-1">
                  <label className="block text-label-md font-label-md text-on-surface" htmlFor="email">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    id="email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Phone Field */}
                <div className="space-y-1">
                  <label className="block text-label-md font-label-md text-on-surface" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                {/* Company Name Field */}
                <div className="space-y-1">
                  <label className="block text-label-md font-label-md text-on-surface" htmlFor="company">
                    Company Name
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    id="company"
                    name="company"
                    placeholder="Startup Inc."
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              {/* Service Interested In */}
              <div className="space-y-1">
                <label className="block text-label-md font-label-md text-on-surface" htmlFor="service">
                  Service Interested In <span className="text-error">*</span>
                </label>
                <select
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="" disabled>Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Apps</option>
                  <option value="ai">AI &amp; Machine Learning</option>
                  <option value="enterprise">Enterprise Architecture</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="block text-label-md font-label-md text-on-surface" htmlFor="message">
                  Message <span className="text-error">*</span>
                </label>
                <textarea
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                  id="message"
                  name="message"
                  placeholder="Tell us about your project goals, timeline, and tech stack requirements..."
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-primary text-on-primary hover:bg-primary/90 font-label-md text-label-md py-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-space-md"
                type="submit"
              >
                <span>Send Message</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Map / Location Section */}
      <section className="max-w-7xl mx-auto px-gutter pb-space-xl w-full">
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="p-space-xl lg:col-span-1 flex flex-col justify-between space-y-space-lg">
              <div className="space-y-space-md">
                <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider font-semibold">
                  Global HQ
                </span>
                <h3 className="text-headline-md font-headline-md text-on-background font-semibold">
                  Visit Our San Francisco Studio
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Located in the heart of the Financial District, our headquarters hosts our core engineering leadership, client success squads, and architectural strategy groups.
                </p>
              </div>
              <div className="space-y-space-sm">
                <div className="flex items-center gap-3 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary">directions_subway</span>
                  <span>Near Montgomery St. BART Station</span>
                </div>
                <div className="flex items-center gap-3 text-body-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary">local_parking</span>
                  <span>Secure underground parking available</span>
                </div>
              </div>
              <div>
                <a
                  className="inline-flex items-center gap-2 text-label-md font-label-md text-primary font-semibold hover:underline"
                  href="https://maps.google.com/?q=100+Montgomery+St,+San+Francisco"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Get Directions in Google Maps</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-2 relative min-h-[350px] bg-surface-container flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdIRqQw3LFkYxBeCHzm7CLQUQkuRI5qT_QJA03WijYGn1lxU_O4i4s1fzohBDzvDsmGjZTHCP9FDHxp51MJg2PsryWjIPMT-Vd8gGX1TQ7JnRU5Tw2w22Ehl9hxVvwlkhBhuiCUJCXfy4GFWXYJP6ibvpNq6rwuvucz5oPcp971uip4Dyq9CGLm5dhNY9FgETIsPfmG20JYQiidsSy3nSzBsBP9UILZJ9a9CXHL8AikTUwCLzk3ow0')`
                }}
              />
              {/* Simulated Map Pin Overlay */}
              <div className="absolute z-10 flex flex-col items-center">
                <div className="bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-label-sm shadow-lg flex items-center gap-1 mb-1 font-semibold">
                  <span className="material-symbols-outlined text-xs">apartment</span>
                  <span>Sudora HQ</span>
                </div>
                <div className="w-4 h-4 bg-primary rotate-45 shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
