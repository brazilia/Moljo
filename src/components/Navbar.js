import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="fantasy-nav bg-card-bg border-b border-border-subtle backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/moljo-logo.svg" 
                alt="Moljo" 
                className="w-10 h-10"
              />
              <span className="fantasy-title text-xl">Moljo</span>
            </Link>
          </div>

          {/* Navigation Links - Only show if user is authenticated */}
          {currentUser && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="fantasy-nav-link">{t('nav.dashboard')}</Link>
                <Link to="/jobs" className="fantasy-nav-link">{t('nav.matches')}</Link>
                <Link to="/applications" className="fantasy-nav-link">{t('nav.applications')}</Link>
                <Link to="/profile" className="fantasy-nav-link">{t('nav.profile')}</Link>
                <Link to="/community" className="fantasy-nav-link">{t('nav.interviews')}</Link>
              </div>
            </div>
          )}

          {/* Right side - Language Switcher and Auth */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {currentUser ? (
              /* User Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 fantasy-nav-link hover:bg-card-bg rounded-lg px-3 py-2"
                >
                  <div className="fantasy-icon silver w-8 h-8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="fantasy-text text-sm">{currentUser.displayName || currentUser.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="language-switcher-dropdown right-0 mt-2 min-w-48">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-border-subtle">
                        <p className="fantasy-text text-sm text-gray-400">Signed in as</p>
                        <p className="fantasy-text text-sm font-medium">{currentUser.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="language-option"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile Settings</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="language-option w-full text-left"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons */
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="fantasy-text text-gray-300 hover:text-white font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="fantasy-button"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

