import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/mock';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  const { language } = useLanguage();
  const content = siteContent[language];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Dark Gradient Background with Gears */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        {/* SVG Pattern for Gears - High Contrast */}
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gears" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Gear 1 */}
              <g transform="translate(50, 50)">
                <circle cx="0" cy="0" r="30" fill="none" stroke="white" strokeWidth="3"/>
                <circle cx="0" cy="0" r="15" fill="none" stroke="white" strokeWidth="3"/>
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45) * Math.PI / 180;
                  const x1 = Math.cos(angle) * 20;
                  const y1 = Math.sin(angle) * 20;
                  const x2 = Math.cos(angle) * 35;
                  const y2 = Math.sin(angle) * 35;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="4"/>;
                })}
              </g>
              {/* Gear 2 */}
              <g transform="translate(150, 150)">
                <circle cx="0" cy="0" r="25" fill="none" stroke="white" strokeWidth="2.5"/>
                <circle cx="0" cy="0" r="12" fill="none" stroke="white" strokeWidth="2.5"/>
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60) * Math.PI / 180;
                  const x1 = Math.cos(angle) * 16;
                  const y1 = Math.sin(angle) * 16;
                  const x2 = Math.cos(angle) * 30;
                  const y2 = Math.sin(angle) * 30;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3.5"/>;
                })}
              </g>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#gears)"/>
        </svg>
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
            {content.hero.name}
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6">
            {content.hero.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-medium text-white mb-6">
            {content.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {content.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#portfolio"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              {content.hero.cta1}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all hover:scale-105"
            >
              {content.hero.cta2}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-2xl">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium">
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