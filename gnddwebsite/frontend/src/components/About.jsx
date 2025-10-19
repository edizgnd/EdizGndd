import React from 'react';
import { Award, Target, Briefcase } from 'lucide-react';
import { about, services } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hakkımda
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581092333203-42374bcf7d89"
                alt="Ediz Gündoğdu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
              <div className="text-4xl font-bold">{about.yearsExperience}</div>
              <div className="text-sm">Yıl Deneyim</div>
            </div>
            <div className="absolute -top-6 -left-6 bg-gray-900 text-white p-6 rounded-lg shadow-xl">
              <div className="text-4xl font-bold">{about.projectsCount}</div>
              <div className="text-sm">Proje</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Biyografi</h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {about.biography.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Vision Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mt-8">
              <div className="flex items-start space-x-3">
                <Target className="text-blue-600 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Vizyon</h4>
                  <p className="text-gray-700">{about.vision}</p>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="text-blue-600" size={24} />
                <h4 className="text-xl font-semibold text-gray-900">Uzmanlık Alanları</h4>
              </div>
              <ul className="space-y-3">
                {about.expertise.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Yetenekler & Uzmanlık
            </h3>
            <p className="text-gray-600">Geniş teknik bilgi ve deneyimle profesyonel mühendislik çözümleri sunuyorum</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Briefcase className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;