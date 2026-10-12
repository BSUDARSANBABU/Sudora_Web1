import React, { useState, useEffect, useRef } from 'react';
import { PageView } from '../types';
import { LOGO_URL } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
  Plus,
  Sparkles,
  Layers,
  FolderGit2,
  Briefcase,
  Users,
  Phone,
  ShieldCheck,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenGetStarted
}) => {
  const { currentLanguage, setLanguage, currentOption, languages, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownOpen]);

  const navLinks: { label: string; view: PageView; icon: React.ReactNode }[] = [
    { label: t('nav.home', 'Home'), view: 'home', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: t('nav.services', 'Services'), view: 'services', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: t('nav.projects', 'Projects'), view: 'projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { label: t('nav.careers', 'Find Jobs'), view: 'careers', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { label: t('nav.about', 'About'), view: 'about', icon: <Users className="w-3.5 h-3.5" /> },
    { label: t('nav.contact', 'Contact'), view: 'contact', icon: <Phone className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/95 backdrop-blur-xl border-b border-outline-variant/40 shadow-sm'
          : 'bg-surface/85 backdrop-blur-md border-b border-outline-variant/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-gutter h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* =========================================================
            LEFT: Brand Identity & Network Badge
           ========================================================= */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer text-left group focus:outline-none"
          >
            <div className="relative">
              <img
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-outline-variant/50 group-hover:ring-primary/50 transition-all shadow-xs"
                alt="Sudora logo"
                src={LOGO_URL}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                Sudora
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium tracking-wide -mt-0.5 flex items-center gap-1.5">
                <span className="text-primary font-semibold">Top 1%</span>
                <span>{t('nav.subBrand', 'Engineering Network')}</span>
              </span>
            </div>
          </button>
        </div>

        {/* =========================================================
            CENTER: Segmented Island Nav Links (Desktop)
           ========================================================= */}
        <nav className="hidden lg:flex items-center bg-surface-container-low/70 border border-outline-variant/30 rounded-xl p-1 shadow-2xs">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-surface text-primary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* =========================================================
            RIGHT: Action Hierarchy & Language Toggle (Desktop)
           ========================================================= */}
        <div className="hidden md:flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Toggle Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title={`Current Language: ${currentOption.name}`}
              aria-label="Switch Language"
            >
              <span className="text-sm leading-none">{currentOption.flag}</span>
              <span className="uppercase text-[11px] font-bold text-on-surface tracking-wider">
                {currentOption.code}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-on-surface-variant transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/50 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-on-surface-variant/70 border-b border-outline-variant/30 flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-primary" />
                  <span>{t('nav.language', 'Language')}</span>
                </div>
                <div className="p-1 space-y-0.5">
                  {languages.map((lang) => {
                    const isSelected = lang.code === currentLanguage;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{lang.flag}</span>
                          <div>
                            <p className="leading-tight">{lang.nativeName}</p>
                            <p className="text-[10px] text-on-surface-variant">{lang.name}</p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Post a Job Button */}
          <button
            onClick={() => handleNavClick('post-job')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'post-job'
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-transparent'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-primary" />
            <span>{t('nav.postJob', 'Post a Job')}</span>
          </button>

          {/* Enterprise Portal Switcher */}
          <button
            onClick={() => handleNavClick('my-projects')}
            className="bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/60 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-2xs cursor-pointer group"
            title="Open Enterprise Portal"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <LayoutDashboard className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            <span className="hidden xl:inline">{t('nav.portal', 'Enterprise Portal')}</span>
            <span className="xl:hidden">Portal</span>
          </button>

          {/* Standout Primary CTA */}
          <button
            onClick={onOpenGetStarted}
            className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer group"
          >
            <span>{t('nav.getStarted', 'Get Started')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* =========================================================
            MOBILE: Header Controls (Lang Button + Drawer Toggle)
           ========================================================= */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Button Quick Toggle */}
          <button
            onClick={() => {
              // Cycle to next language on single click
              const nextIdx = (languages.findIndex(l => l.code === currentLanguage) + 1) % languages.length;
              setLanguage(languages[nextIdx].code);
            }}
            className="bg-surface-container text-on-surface px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer border border-outline-variant/40"
            title="Switch Language"
          >
            <span className="text-xs leading-none">{currentOption.flag}</span>
            <span className="text-[10px] uppercase font-mono">{currentOption.code}</span>
          </button>

          <button
            onClick={onOpenGetStarted}
            className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            {t('nav.start', 'Start')}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-on-surface p-2 rounded-lg hover:bg-surface-container transition-colors focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* =========================================================
          MOBILE: Slide-Down Frosted Drawer
         ========================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/40 px-6 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Quick Portal Switcher Banner */}
          <button
            onClick={() => handleNavClick('my-projects')}
            className="w-full text-left p-3.5 rounded-xl bg-surface-container border border-outline-variant/50 hover:border-primary/50 text-on-surface font-semibold flex items-center justify-between shadow-2xs cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">{t('nav.portal', 'Enterprise Portal')}</p>
                <p className="text-[11px] text-on-surface-variant">Manage squad milestones &amp; briefs</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold bg-primary text-on-primary px-2 py-0.5 rounded-md">
              OPEN
            </span>
          </button>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className={isActive ? 'text-primary' : 'text-on-surface-variant'}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Language Selector Full Row */}
          <div className="pt-2 border-t border-outline-variant/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>{t('nav.language', 'Language')}</span>
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium">
                {currentOption.flag} {currentOption.nativeName}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {languages.map((lang) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`py-2 rounded-xl text-center flex flex-col items-center justify-center transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-primary text-on-primary border-primary font-bold shadow-xs'
                        : 'bg-surface-container hover:bg-surface-container-high border-outline-variant/40 text-on-surface'
                    }`}
                    title={lang.name}
                  >
                    <span className="text-base leading-none mb-0.5">{lang.flag}</span>
                    <span className="text-[10px] font-mono uppercase font-bold">{lang.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Actions */}
          <div className="pt-2 border-t border-outline-variant/30 space-y-2">
            <button
              onClick={() => handleNavClick('post-job')}
              className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-primary bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('nav.postJob', 'Post a Job')}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary py-3 rounded-xl text-xs font-bold text-center cursor-pointer shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>{t('nav.getStarted', 'Get Started')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Enterprise Security Pill */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-on-surface-variant font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>SOC2 Type II • 100% Milestone Escrow • 48h SLA</span>
          </div>
        </div>
      )}
    </header>
  );
};
