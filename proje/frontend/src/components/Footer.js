import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent, socialLinks } from '../data/mock';
import { Linkedin, Github, Mail } from 'lucide-react';

const iconMap = {
  Linkedin: Linkedin,
  Github: Github,
  Mail: Mail
};

const Footer = () => {
  const { language } = useLanguage();
  const content = siteContent[language];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="text-3xl font-black">EG</div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-gray-900 transition-all hover:scale-110"
                  aria-label={link.platform}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-center">{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;