"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pl';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    shop: 'Shop',
    gallery: 'Gallery',
    contact: 'Contact',
    wroclaw: 'Wroclaw Based',
    hero_badge: 'Wroclaw Based • Professional Hair Art',
    hero_title_1: 'Express Your Style',
    hero_title_2: 'With Braids.',
    hero_desc: 'Give your hair the care it deserves with Kulama Hair Care & Braids.',
    hero_cta_shop: 'Shop Now',
    hero_cta_gallery: 'View Gallery',
  },
  pl: {
    home: 'Strona Główna',
    shop: 'Sklep',
    gallery: 'Galeria',
    contact: 'Kontakt',
    wroclaw: 'Baza we Wrocławiu',
    hero_badge: 'Baza we Wrocławiu • Profesjonalna Sztuka Włosów',
    hero_title_1: 'Wyraź Swój Styl',
    hero_title_2: 'Warkoczykami.',
    hero_desc: 'Podaruj swoim włosom to, na co zasługują, z Kulama Hair Care & Braids.',
    hero_cta_shop: 'Kup Teraz',
    hero_cta_gallery: 'Zobacz Galerię',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'pl' : 'en'));
  };

  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

