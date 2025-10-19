import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [hero, setHero] = useState(null);
  const [stats, setStats] = useState([]);
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contact, setContact] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [heroRes, statsRes, aboutRes, skillsRes, portfolioRes, expRes, certRes, testRes, contactRes] = await Promise.all([
        axios.get(`${API}/hero`),
        axios.get(`${API}/stats`),
        axios.get(`${API}/about`),
        axios.get(`${API}/skills`),
        axios.get(`${API}/portfolio`),
        axios.get(`${API}/experience`),
        axios.get(`${API}/certificates`),
        axios.get(`${API}/testimonials`),
        axios.get(`${API}/contact`)
      ]);

      setHero(heroRes.data);
      setStats(statsRes.data);
      setAbout(aboutRes.data);
      setSkills(skillsRes.data);
      setPortfolio(portfolioRes.data);
      setFilteredPortfolio(portfolioRes.data);
      setExperience(expRes.data);
      setCertificates(certRes.data);
      setTestimonials(testRes.data);
      setContact(contactRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filterPortfolio = (category) => {
    setActiveFilter(category);
    if (category === 'Tümü' || category === 'All') {
      setFilteredPortfolio(portfolio);
    } else {
      setFilteredPortfolio(portfolio.filter(item => item.category === category));
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact/message`, formData);
      alert(language === 'tr' ? 'Mesajınız gönderildi!' : 'Your message has been sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert(language === 'tr' ? 'Bir hata oluştu!' : 'An error occurred!');
    }
  };

  const categories = language === 'tr' 
    ? ['Tümü', 'Konveyör Sistemleri', 'Ürün Tasarımı', 'Otomasyon', 'Endüstriyel Sistemler', 'Mekanik Sistemler', 'Üretim']
    : ['All', 'Conveyor Systems', 'Product Design', 'Automation', 'Industrial Systems', 'Mechanical Systems', 'Production'];

  const groupedSkills = {};
  skills.forEach(skill => {
    const category = t(skill.category);
    if (!groupedSkills[category]) groupedSkills[category] = [];
    groupedSkills[category].push(skill);
  });

  return (
    <div data-testid="homepage">
      {/* Navigation */}
      <nav className="navbar" data-testid="navbar">
        <div className="nav-content">
          <div className="logo" data-testid="logo">EG</div>
          <ul className="nav-links">
            <li><a href="#home" data-testid="nav-home">{language === 'tr' ? 'Ana Sayfa' : 'Home'}</a></li>
            <li><a href="#about" data-testid="nav-about">{language === 'tr' ? 'Hakkımda' : 'About'}</a></li>
            <li><a href="#skills" data-testid="nav-skills">{language === 'tr' ? 'Yetenekler' : 'Skills'}</a></li>
            <li><a href="#portfolio" data-testid="nav-portfolio">{language === 'tr' ? 'Portfolyo' : 'Portfolio'}</a></li>
            <li><a href="#experience" data-testid="nav-experience">{language === 'tr' ? 'Deneyim' : 'Experience'}</a></li>
            <li><a href="#contact" data-testid="nav-contact">{language === 'tr' ? 'İletişim' : 'Contact'}</a></li>
          </ul>
          <button className="language-toggle" onClick={toggleLanguage} data-testid="language-toggle">
            {language === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {hero && (
        <section id="home" className="hero section" data-testid="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 data-testid="hero-name">{t(hero.name)}</h1>
                <h2 data-testid="hero-title">{t(hero.title)}</h2>
                <p data-testid="hero-description">{t(hero.description)}</p>
                <div className="hero-buttons">
                  <a href="#portfolio" className="btn-primary" data-testid="hero-portfolio-btn">
                    {language === 'tr' ? 'Portfolyomu İncele' : 'View Portfolio'}
                  </a>
                  <a href="#contact" className="btn-secondary" data-testid="hero-contact-btn">
                    {language === 'tr' ? 'İletişime Geç' : 'Contact Me'}
                  </a>
                </div>
              </div>
              <div className="hero-image">
                <img src={hero.image} alt={t(hero.name)} data-testid="hero-image" />
              </div>
            </div>

            {/* Stats */}
            <div className="stats" data-testid="stats-section">
              {stats.map((stat, index) => (
                <div key={stat.id} className="stat-item" data-testid={`stat-item-${index}`}>
                  <div className="stat-value" data-testid={`stat-value-${index}`}>{stat.value}</div>
                  <div className="stat-label" data-testid={`stat-label-${index}`}>{t(stat.label)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section id="about" className="section" data-testid="about-section">
          <div className="container">
            <h2 className="section-title" data-testid="about-title">{language === 'tr' ? 'Hakkımda' : 'About Me'}</h2>
            <div className="hero-content">
              <div className="hero-image">
                <img src={about.image} alt="About" data-testid="about-image" />
                <div className="stats" style={{ marginTop: '30px' }}>
                  <div className="stat-item">
                    <div className="stat-value" data-testid="about-experience">{about.experience}</div>
                    <div className="stat-label">{language === 'tr' ? 'Yıl Deneyim' : 'Years Experience'}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value" data-testid="about-projects">{about.projects}</div>
                    <div className="stat-label">{language === 'tr' ? 'Proje' : 'Projects'}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ marginBottom: '15px' }}>{language === 'tr' ? 'Biyografi' : 'Biography'}</h3>
                <p style={{ marginBottom: '30px', lineHeight: '1.8' }} data-testid="about-bio">{t(about.bio)}</p>
                <h4 style={{ marginBottom: '15px', color: '#667eea' }}>{language === 'tr' ? 'Vizyon' : 'Vision'}</h4>
                <p style={{ marginBottom: '30px', lineHeight: '1.8' }} data-testid="about-vision">{t(about.vision)}</p>
                <h4 style={{ marginBottom: '15px', color: '#667eea' }}>{language === 'tr' ? 'Uzmanlık Alanları' : 'Expertise Areas'}</h4>
                <ul style={{ paddingLeft: '20px' }} data-testid="about-expertise">
                  {(Array.isArray(t(about.expertise)) ? t(about.expertise) : []).map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px', lineHeight: '1.6' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section id="skills" className="section" style={{ background: '#f9f9f9' }} data-testid="skills-section">
        <div className="container">
          <h2 className="section-title" data-testid="skills-title">{language === 'tr' ? 'Yetenekler' : 'Skills'}</h2>
          <div className="skills-grid">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="skill-category" data-testid={`skill-category-${category}`}>
                <h3>{category}</h3>
                {categorySkills.map((skill, index) => (
                  <div key={skill.id} className="skill-item" data-testid={`skill-item-${index}`}>
                    <div className="skill-name">
                      <span data-testid={`skill-name-${index}`}>{skill.name}</span>
                      <span data-testid={`skill-percentage-${index}`}>{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section" data-testid="portfolio-section">
        <div className="container">
          <h2 className="section-title" data-testid="portfolio-title">{language === 'tr' ? 'Portfolyo' : 'Portfolio'}</h2>
          <div className="portfolio-filters" data-testid="portfolio-filters">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => filterPortfolio(cat)}
                data-testid={`filter-btn-${index}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="portfolio-grid">
            {filteredPortfolio.map((item, index) => (
              <div key={item.id} className="portfolio-item" data-testid={`portfolio-item-${index}`}>
                <img src={item.image} alt={t(item.title)} className="portfolio-image" data-testid={`portfolio-image-${index}`} />
                <div className="portfolio-content">
                  <div className="portfolio-category" data-testid={`portfolio-category-${index}`}>{item.category}</div>
                  <div style={{ fontSize: '0.9rem', color: '#999', marginBottom: '8px' }}>{item.year}</div>
                  <h3 className="portfolio-title" data-testid={`portfolio-title-${index}`}>{t(item.title)}</h3>
                  <p style={{ color: '#555', fontSize: '0.95rem' }} data-testid={`portfolio-description-${index}`}>{t(item.description)}</p>
                  <div className="portfolio-tags">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="tag" data-testid={`portfolio-tag-${index}-${idx}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section" style={{ background: '#f9f9f9' }} data-testid="experience-section">
        <div className="container">
          <h2 className="section-title" data-testid="experience-title">{language === 'tr' ? 'Deneyim & Eğitim' : 'Experience & Education'}</h2>
          <div className="hero-content">
            <div>
              <h3 style={{ marginBottom: '30px' }}>{language === 'tr' ? 'İş Deneyimi' : 'Work Experience'}</h3>
              <div className="timeline">
                {experience.filter(exp => exp.type === 'work').map((exp, index) => (
                  <div key={exp.id} className="timeline-item" data-testid={`work-exp-${index}`}>
                    <div className="timeline-content">
                      <div className="timeline-period" data-testid={`work-period-${index}`}>{t(exp.period)}</div>
                      <h3 className="timeline-title" data-testid={`work-position-${index}`}>{t(exp.position)}</h3>
                      <div className="timeline-company" data-testid={`work-company-${index}`}>{exp.company}</div>
                      <div style={{ color: '#555', marginBottom: '10px' }} data-testid={`work-location-${index}`}>{t(exp.location)}</div>
                      <p style={{ marginBottom: '15px' }} data-testid={`work-description-${index}`}>{t(exp.description)}</p>
                      <ul style={{ paddingLeft: '20px' }}>
                        {(Array.isArray(t(exp.achievements)) ? t(exp.achievements) : []).map((achievement, idx) => (
                          <li key={idx} style={{ marginBottom: '8px', color: '#555' }} data-testid={`work-achievement-${index}-${idx}`}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ marginBottom: '30px' }}>{language === 'tr' ? 'Eğitim' : 'Education'}</h3>
              <div className="timeline">
                {experience.filter(exp => exp.type === 'education').map((exp, index) => (
                  <div key={exp.id} className="timeline-item" data-testid={`education-${index}`}>
                    <div className="timeline-content">
                      <div className="timeline-period" data-testid={`education-period-${index}`}>{t(exp.period)}</div>
                      <h3 className="timeline-title" data-testid={`education-title-${index}`}>{t(exp.position)}</h3>
                      <div className="timeline-company" data-testid={`education-institution-${index}`}>{exp.company}</div>
                      <div style={{ color: '#555', marginBottom: '10px' }} data-testid={`education-location-${index}`}>{t(exp.location)}</div>
                      <p style={{ marginBottom: '15px' }} data-testid={`education-description-${index}`}>{t(exp.description)}</p>
                      <ul style={{ paddingLeft: '20px' }}>
                        {(Array.isArray(t(exp.achievements)) ? t(exp.achievements) : []).map((achievement, idx) => (
                          <li key={idx} style={{ marginBottom: '8px', color: '#555' }} data-testid={`education-achievement-${index}-${idx}`}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              {certificates.length > 0 && (
                <>
                  <h3 style={{ marginTop: '40px', marginBottom: '30px' }}>{language === 'tr' ? 'Sertifikalar' : 'Certificates'}</h3>
                  <div className="timeline">
                    {certificates.map((cert, index) => (
                      <div key={cert.id} className="timeline-item" data-testid={`certificate-${index}`}>
                        <div className="timeline-content">
                          <div className="timeline-period" data-testid={`certificate-date-${index}`}>{cert.date}</div>
                          <h3 className="timeline-title" data-testid={`certificate-title-${index}`}>{t(cert.title)}</h3>
                          <div className="timeline-company" data-testid={`certificate-issuer-${index}`}>{cert.issuer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section" data-testid="testimonials-section">
          <div className="container">
            <h2 className="section-title" data-testid="testimonials-title">{language === 'tr' ? 'Müşteri Görüşleri' : 'Client Testimonials'}</h2>
            <div className="testimonials-grid">
              {testimonials.map((test, index) => (
                <div key={test.id} className="testimonial-item" data-testid={`testimonial-${index}`}>
                  <div className="testimonial-header">
                    <img src={test.image} alt={test.name} className="testimonial-image" data-testid={`testimonial-image-${index}`} />
                    <div className="testimonial-author">
                      <h4 data-testid={`testimonial-name-${index}`}>{test.name}</h4>
                      <div className="testimonial-role" data-testid={`testimonial-role-${index}`}>{t(test.role)}</div>
                    </div>
                  </div>
                  <p className="testimonial-content" data-testid={`testimonial-content-${index}`}>"{t(test.content)}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact && (
        <section id="contact" className="section" style={{ background: '#f9f9f9' }} data-testid="contact-section">
          <div className="container">
            <h2 className="section-title" data-testid="contact-title">{language === 'tr' ? 'İletişime Geçin' : 'Get In Touch'}</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3 style={{ marginBottom: '30px' }}>{language === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}</h3>
                <div className="contact-item" data-testid="contact-email-item">
                  <div className="contact-icon"><Mail /></div>
                  <div className="contact-details">
                    <h4>{language === 'tr' ? 'E-posta' : 'Email'}</h4>
                    <p data-testid="contact-email">{contact.email}</p>
                  </div>
                </div>
                <div className="contact-item" data-testid="contact-phone-item">
                  <div className="contact-icon"><Phone /></div>
                  <div className="contact-details">
                    <h4>{language === 'tr' ? 'Telefon' : 'Phone'}</h4>
                    <p data-testid="contact-phone">{contact.phone}</p>
                  </div>
                </div>
                <div className="contact-item" data-testid="contact-location-item">
                  <div className="contact-icon"><MapPin /></div>
                  <div className="contact-details">
                    <h4>{language === 'tr' ? 'Konum' : 'Location'}</h4>
                    <p data-testid="contact-location">{t(contact.location)}</p>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1600869009498-8d429f88d4f5" alt="Engineering" style={{ width: '100%', borderRadius: '15px', marginTop: '30px' }} />
              </div>
              <form className="contact-form" onSubmit={handleFormSubmit} data-testid="contact-form">
                <h3 style={{ marginBottom: '20px' }}>{language === 'tr' ? 'Mesaj Gönder' : 'Send Message'}</h3>
                <div className="form-group">
                  <label>{language === 'tr' ? 'Adınız' : 'Your Name'}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleFormChange} required data-testid="contact-form-name" />
                </div>
                <div className="form-group">
                  <label>{language === 'tr' ? 'E-posta' : 'Email'}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} required data-testid="contact-form-email" />
                </div>
                <div className="form-group">
                  <label>{language === 'tr' ? 'Konu' : 'Subject'}</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleFormChange} required data-testid="contact-form-subject" />
                </div>
                <div className="form-group">
                  <label>{language === 'tr' ? 'Mesajınız' : 'Your Message'}</label>
                  <textarea name="message" value={formData.message} onChange={handleFormChange} required data-testid="contact-form-message"></textarea>
                </div>
                <button type="submit" className="btn-primary" data-testid="contact-form-submit">
                  {language === 'tr' ? 'Mesaj Gönder' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer" data-testid="footer">
        <div className="container">
          <p>&copy; 2025 {hero && t(hero.name)}. {language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;