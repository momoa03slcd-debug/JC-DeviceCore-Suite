import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get saved language from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jc-language') || 'de';
    }
    return 'de';
  });

  const t = translations[language] || translations.de;
  const isRTL = language === 'ar';

  useEffect(() => {
    // Save language preference
    localStorage.setItem('jc-language', language);
    
    // Set document direction for RTL support
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const changeLanguage = (newLang) => {
    if (['de', 'en', 'ar'].includes(newLang)) {
      setLanguage(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
