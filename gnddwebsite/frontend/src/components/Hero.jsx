import React from 'react';
import { ChevronDown } from 'lucide-react';
import { personalInfo, stats } from '../data/mock';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${personalInfo.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-blue-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8 animate-fade-in">
            <span className="text-blue-400 text-sm font-medium">
              {personalInfo.cadcrowdRank}
            </span>
            <span className="text-gray-400">-</span>
            <span className="text-yellow-400 text-sm font-medium">
              {personalInfo.rating} Rating
            </span>
          </div>

          {/* Main Content */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            {personalInfo.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-400 mb-8 animate-fade-in-up animation-delay-200">
            {personalInfo.title}
          </h2>
          <p className="text-xl text-gray-300 mb-4 animate-fade-in-up animation-delay-300">
            {personalInfo.tagline}
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
            {personalInfo.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-500">
            <a
              href="#portfolio"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-600/50"
            >
              Portfolyomu İncele
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
            >
              İletişime Geç
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;