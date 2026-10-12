import React from 'react';
import { PageView } from '../types';
import { LOGO_URL } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { currentOption } = useLanguage();

  const handleNav = (view: PageView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqNav = () => {
    onNavigate('about');
    setTimeout(() => {
      const el = document.getElementById('about-faq');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-surface-container-low/70 border-t border-outline-variant/30 text-on-surface-variant mt-auto">
      {/* Main Navigation & Contact Links */}
      <div className="max-w-7xl mx-auto px-gutter py-12 lg:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand & Direct Contact (Spans 2 columns on large screens) */}
          <div className="col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <img
                src={LOGO_URL}
                alt="Sudora logo"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-outline-variant/40"
              />
              <span className="text-lg font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                Sudora
              </span>
            </button>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-sm">
              Sudora connects fast-scaling enterprises with top 1% software engineering talent and autonomous pods with milestone escrow protection.
            </p>

            {/* Direct Contact Information */}
            <div className="space-y-1.5 text-xs text-on-surface-variant pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <a
                  href="mailto:contact@sudora.io"
                  className="hover:text-primary transition-colors hover:underline"
                >
                  contact@sudora.io
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <a
                  href="tel:+18005550199"
                  className="hover:text-primary transition-colors hover:underline"
                >
                  +1 (800) 555-0199
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('careers')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Find Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Web Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Mobile Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Cloud &amp; DevOps
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  AI &amp; Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Dedicated Squads
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('my-projects')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Enterprise Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('post-job')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Post a Job Brief
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('payments')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Escrow Billing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Engineering Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Contact Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & FAQ Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={handleFaqNav}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Marketplace FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Escrow Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  IP Ownership Agreement
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-primary transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Minimal Standard Bottom Bar */}
      <div className="border-t border-outline-variant/20 py-5">
        <div className="max-w-7xl mx-auto px-gutter flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant/80">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Sudora Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* Social Links (Minimal icons without excess container borders) */}
            <div className="flex items-center gap-3 text-on-surface-variant">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <span className="hidden sm:inline text-outline-variant/60">•</span>

            {/* Language Indicator */}
            <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <Globe className="w-3.5 h-3.5 text-outline" />
              <span>{currentOption.flag} {currentOption.nativeName}</span>
            </span>

            <span className="hidden sm:inline text-outline-variant/60">•</span>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
