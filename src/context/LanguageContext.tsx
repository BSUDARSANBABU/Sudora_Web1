import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'es' | 'de' | 'fr' | 'ja';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.careers': 'Find Jobs',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.postJob': 'Post a Job',
    'nav.portal': 'Enterprise Portal',
    'nav.getStarted': 'Get Started',
    'nav.start': 'Start',
    'nav.language': 'Language',
    'nav.subBrand': 'Top 1% Engineering Network',
    'common.search': 'Search',
    'common.reset': 'Reset',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.careers': 'Empleos',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.postJob': 'Publicar Empleo',
    'nav.portal': 'Portal Empresarial',
    'nav.getStarted': 'Comenzar',
    'nav.start': 'Iniciar',
    'nav.language': 'Idioma',
    'nav.subBrand': 'Red de Ingeniería Top 1%',
    'common.search': 'Buscar',
    'common.reset': 'Restablecer',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.services': 'Dienstleistungen',
    'nav.projects': 'Projekte',
    'nav.careers': 'Karriere',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.postJob': 'Job ausschreiben',
    'nav.portal': 'Unternehmensportal',
    'nav.getStarted': 'Jetzt starten',
    'nav.start': 'Start',
    'nav.language': 'Sprache',
    'nav.subBrand': 'Top 1% Engineering-Netzwerk',
    'common.search': 'Suchen',
    'common.reset': 'Zurücksetzen',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.careers': 'Emplois',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.postJob': 'Publier un projet',
    'nav.portal': 'Portail Entreprise',
    'nav.getStarted': 'Démarrer',
    'nav.start': 'Départ',
    'nav.language': 'Langue',
    'nav.subBrand': 'Réseau d\'ingénieurs Top 1%',
    'common.search': 'Rechercher',
    'common.reset': 'Réinitialiser',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.services': 'サービス',
    'nav.projects': '開発実績',
    'nav.careers': '求人一覧',
    'nav.about': '会社概要',
    'nav.contact': 'お問い合わせ',
    'nav.postJob': '案件を投稿',
    'nav.portal': 'エンタープライズ',
    'nav.getStarted': '今すぐ相談',
    'nav.start': '開始',
    'nav.language': '言語設定',
    'nav.subBrand': '上位1%のエンジニアネットワーク',
    'common.search': '検索',
    'common.reset': 'リセット',
  },
};

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  currentOption: LanguageOption;
  languages: LanguageOption[];
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('sp_lang');
      if (saved && (saved === 'en' || saved === 'es' || saved === 'de' || saved === 'fr' || saved === 'ja')) {
        return saved as LanguageCode;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('sp_lang', currentLanguage);
      document.documentElement.lang = currentLanguage;
    } catch {
      // Ignore storage errors
    }
  }, [currentLanguage]);

  const currentOption = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    if (langDict[key]) return langDict[key];
    const enDict = TRANSLATIONS.en;
    if (enDict[key]) return enDict[key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        currentOption,
        languages: LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
