// src/components/LanguageSwitcher.js
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + 8,
        left: buttonRect.right - 192 // 192px = w-48
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="language-switcher-button px-3 py-2 flex items-center space-x-2 hover:glow-blue transition-all duration-200"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="fantasy-text text-sm font-medium uppercase tracking-wider">
          {currentLang.code.toUpperCase()}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed w-48 bg-card-bg border border-border-subtle rounded-lg shadow-lg"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            zIndex: 99999
          }}
        >
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-secondary-bg transition-all duration-200 ${
                  currentLanguage === language.code ? 'bg-blue-50 text-accent-blue' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="fantasy-text text-sm font-medium">
                  {language.name}
                </span>
                {currentLanguage === language.code && (
                  <div className="ml-auto">
                    <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
