import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/mock';
import { Globe, Menu, X } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const content = siteContent[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: content.nav.home, href: '#home' },
    { label: content.nav.about, href: '#about' },
    { label: content.nav.skills, href: '#skills' },
    { label: content.nav.portfolio, href: '#portfolio' },
    { label: content.nav.experience, href: '#experience' },
    { label: content.nav.contact, href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-lg">
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <div className="relative">
              {/* Logo Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform group-hover:scale-110 transition-transform duration-300"></div>
              
              {/* Logo Text */}
              <div className="relative px-3 py-2">
                <span className="text-2xl font-bold text-white tracking-tight">
                  E<span className="text-blue-200">G</span>
                </span>
              </div>
            </div>
            
            {/* Name (hidden on mobile) */}
            <div className="ml-3 hidden sm:block">
              <span className="text-white font-semibold text-lg">Ediz Gündoğdu</span>
              <div className="text-xs text-gray-400">Mechanical Engineer</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-200 hover:text-white transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-200 hover:text-white transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
