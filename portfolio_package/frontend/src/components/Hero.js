import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/mock';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  const { language } = useLanguage();
  const content = siteContent[language];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-4 tracking-tight">
            {content.hero.name}
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">
            {content.hero.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-medium text-gray-800 mb-6">
            {content.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {content.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#portfolio"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
            >
              {content.hero.cta1}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-all hover:scale-105"
            >
              {content.hero.cta2}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;