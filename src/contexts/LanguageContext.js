// src/contexts/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../services/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Try to get language from localStorage, default to English
    const savedLanguage = localStorage.getItem('moljo-language');
    return savedLanguage || 'en';
  });

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('moljo-language', language);
  };

  const t = (key, params = {}) => {
    return getTranslation(key, currentLanguage, params);
  };

  useEffect(() => {
    // Update document title based on language
    document.title = currentLanguage === 'en' ? 'Moljo - Job Quest Platform' :
                    currentLanguage === 'ru' ? 'Moljo - Платформа квестов' :
                    'Moljo - Квест платформасы';
  }, [currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

