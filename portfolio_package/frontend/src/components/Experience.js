import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/mock';
import { Briefcase, GraduationCap, Award, MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  const { language } = useLanguage();
  const content = siteContent[language];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            {content.experience.title}
          </h2>
          <p className="text-xl text-gray-600">{content.experience.subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Work Experience */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <Briefcase className="w-8 h-8 text-gray-900" />
              <h3 className="text-3xl font-bold text-gray-900">
                {language === 'tr' ? 'İş Deneyimi' : 'Work Experience'}
              </h3>
            </div>
            <div className="space-y-8">
              {content.experience.work.map((job, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-gray-900">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h4>
                      <p className="text-xl font-semibold text-gray-700 mb-2">{job.company}</p>
                    </div>
                    <div className="text-gray-600 space-y-1 text-sm md:text-right">
                      <div className="flex items-center md:justify-end space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{job.period}</span>
                      </div>
                      <div className="flex items-center md:justify-end space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start text-gray-700">
                        <span className="mr-2 text-gray-900 font-bold">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <GraduationCap className="w-8 h-8 text-gray-900" />
              <h3 className="text-3xl font-bold text-gray-900">
                {language === 'tr' ? 'Eğitim' : 'Education'}
              </h3>
            </div>
            <div className="space-y-8">
              {content.experience.education.map((edu, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-gray-900">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h4>
                      <p className="text-xl font-semibold text-gray-700 mb-2">{edu.school}</p>
                    </div>
                    <div className="text-gray-600 space-y-1 text-sm md:text-right">
                      <div className="flex items-center md:justify-end space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{edu.period}</span>
                      </div>
                      <div className="flex items-center md:justify-end space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{edu.description}</p>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, hlIndex) => (
                      <li key={hlIndex} className="flex items-start text-gray-700">
                        <span className="mr-2 text-gray-900 font-bold">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <Award className="w-8 h-8 text-gray-900" />
              <h3 className="text-3xl font-bold text-gray-900">
                {language === 'tr' ? 'Sertifikalar' : 'Certificates'}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {content.experience.certificates.map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h4>
                  <p className="text-gray-600 font-semibold mb-1">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;