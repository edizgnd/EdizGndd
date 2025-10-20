import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/mock';
import { Award, Target } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();
  const content = siteContent[language];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            {content.about.title}
          </h2>
          <p className="text-xl text-gray-600">{content.about.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=800"
                alt="Ediz Gündoğdu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gray-900 text-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-black">3.5+</div>
              <div className="text-sm font-medium">{language === 'tr' ? 'Yıl Deneyim' : 'Years Experience'}</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Biography */}
            <div className="prose prose-lg">
              {content.about.bio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Vision */}
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-gray-900">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-gray-900 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'tr' ? 'Vizyon' : 'Vision'}
                  </h3>
                  <p className="text-gray-700">{content.about.vision}</p>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-gray-900 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {language === 'tr' ? 'Uzmanlık Alanları' : 'Expertise Areas'}
                  </h3>
                  <ul className="space-y-2">
                    {content.about.expertise.map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="mr-2 text-gray-900">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;