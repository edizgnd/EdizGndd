import React from 'react';
import { Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { experience, education, certifications } from '../data/mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Deneyim & Eğitim
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            Profesyonel kariyer yolculuğum ve eğitim geçmişim
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Section */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="text-blue-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">İş Deneyimi</h3>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-4 border-blue-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full"></div>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h4>
                    <div className="flex items-center space-x-2 text-blue-600 mb-2">
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{exp.period}</div>
                    <div className="text-sm text-gray-500 mb-4">{exp.location}</div>
                    <p className="text-gray-700 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-gray-700 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            {/* Education */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-green-100 rounded-lg">
                <GraduationCap className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Eğitim</h3>
            </div>

            <div className="space-y-8 mb-12">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l-4 border-green-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-green-600 rounded-full"></div>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h4>
                    <div className="flex items-center space-x-2 text-green-600 mb-2">
                      <span className="font-semibold">{edu.school}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{edu.period}</div>
                    <div className="text-sm text-gray-500 mb-4">{edu.location}</div>
                    <p className="text-gray-700 mb-4">{edu.description}</p>
                    <div className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-gray-700 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="text-purple-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Sertifikalar</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-purple-100"
                >
                  <h4 className="font-bold text-gray-900 mb-1">{cert.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 font-medium">{cert.issuer}</span>
                    <span className="text-xs text-gray-500">{cert.date}</span>
                  </div>
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