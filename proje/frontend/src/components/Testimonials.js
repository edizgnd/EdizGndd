import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/mock';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const { language } = useLanguage();
  const content = siteContent[language];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            {content.testimonials.title}
          </h2>
          <p className="text-xl text-gray-600">{content.testimonials.subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-4xl mx-auto">
          {content.testimonials.items.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 md:p-12 rounded-2xl shadow-lg relative">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-gray-200" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;