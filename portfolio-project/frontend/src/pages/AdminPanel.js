import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, Plus, Save, X, LogOut } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [activeTab, setActiveTab] = useState('hero');
  
  // Data states
  const [hero, setHero] = useState(null);
  const [stats, setStats] = useState([]);
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/admin/login`, { username, password });
      setToken(response.data.token);
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      loadAllData();
    } catch (error) {
      alert('Geçersiz kullanıcı adı veya şifre!');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const loadAllData = async () => {
    try {
      const [heroRes, statsRes, aboutRes, skillsRes, portfolioRes, expRes, certRes, testRes, contactRes, messagesRes] = await Promise.all([
        axios.get(`${API}/hero`),
        axios.get(`${API}/stats`),
        axios.get(`${API}/about`),
        axios.get(`${API}/skills`),
        axios.get(`${API}/portfolio`),
        axios.get(`${API}/experience`),
        axios.get(`${API}/certificates`),
        axios.get(`${API}/testimonials`),
        axios.get(`${API}/contact`),
        axios.get(`${API}/contact/messages`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setHero(heroRes.data);
      setStats(statsRes.data);
      setAbout(aboutRes.data);
      setSkills(skillsRes.data);
      setPortfolio(portfolioRes.data);
      setExperience(expRes.data);
      setCertificates(certRes.data);
      setTestimonials(testRes.data);
      setContact(contactRes.data);
      setMessages(messagesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveHero = async () => {
    try {
      await axios.post(`${API}/hero`, hero, { headers: { Authorization: `Bearer ${token}` } });
      alert('Hero kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const saveAbout = async () => {
    try {
      await axios.post(`${API}/about`, about, { headers: { Authorization: `Bearer ${token}` } });
      alert('Hakkımda kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const saveContact = async () => {
    try {
      await axios.post(`${API}/contact`, contact, { headers: { Authorization: `Bearer ${token}` } });
      alert('İletişim bilgileri kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const deleteStat = async (id) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`${API}/stats/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        loadAllData();
      } catch (error) {
        alert('Hata oluştu!');
      }
    }
  };

  const saveStat = async (stat) => {
    try {
      if (stat.id && stats.find(s => s.id === stat.id)) {
        await axios.put(`${API}/stats/${stat.id}`, stat, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        stat.id = `stat-${Date.now()}`;
        await axios.post(`${API}/stats`, stat, { headers: { Authorization: `Bearer ${token}` } });
      }
      setEditItem(null);
      loadAllData();
      alert('Kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const deleteSkill = async (id) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`${API}/skills/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        loadAllData();
      } catch (error) {
        alert('Hata oluştu!');
      }
    }
  };

  const saveSkill = async (skill) => {
    try {
      if (skill.id && skills.find(s => s.id === skill.id)) {
        await axios.put(`${API}/skills/${skill.id}`, skill, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        skill.id = `skill-${Date.now()}`;
        await axios.post(`${API}/skills`, skill, { headers: { Authorization: `Bearer ${token}` } });
      }
      setEditItem(null);
      loadAllData();
      alert('Kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const deletePortfolio = async (id) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`${API}/portfolio/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        loadAllData();
      } catch (error) {
        alert('Hata oluştu!');
      }
    }
  };

  const savePortfolio = async (item) => {
    try {
      if (item.id && portfolio.find(p => p.id === item.id)) {
        await axios.put(`${API}/portfolio/${item.id}`, item, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        item.id = `portfolio-${Date.now()}`;
        await axios.post(`${API}/portfolio`, item, { headers: { Authorization: `Bearer ${token}` } });
      }
      setEditItem(null);
      loadAllData();
      alert('Kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const deleteExperience = async (id) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`${API}/experience/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        loadAllData();
      } catch (error) {
        alert('Hata oluştu!');
      }
    }
  };

  const saveExperience = async (exp) => {
    try {
      if (exp.id && experience.find(e => e.id === exp.id)) {
        await axios.put(`${API}/experience/${exp.id}`, exp, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        exp.id = `exp-${Date.now()}`;
        await axios.post(`${API}/experience`, exp, { headers: { Authorization: `Bearer ${token}` } });
      }
      setEditItem(null);
      loadAllData();
      alert('Kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const deleteCertificate = async (id) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`${API}/certificates/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        loadAllData();
      } catch (error) {
        alert('Hata oluştu!');
      }
    }
  };

  const saveCertificate = async (cert) => {
    try {
      if (cert.id && certificates.find(c => c.id === cert.id)) {
        await axios.put(`${API}/certificates/${cert.id}`, cert, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        cert.id = `cert-${Date.now()}`;
        await axios.post(`${API}/certificates`, cert, { headers: { Authorization: `Bearer ${token}` } });
      }
      setEditItem(null);
      loadAllData();
      alert('Kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  const deleteTestimonial = async (id) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      try {
        await axios.delete(`${API}/testimonials/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        loadAllData();
      } catch (error) {
        alert('Hata oluştu!');
      }
    }
  };

  const saveTestimonial = async (test) => {
    try {
      if (test.id && testimonials.find(t => t.id === test.id)) {
        await axios.put(`${API}/testimonials/${test.id}`, test, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        test.id = `test-${Date.now()}`;
        await axios.post(`${API}/testimonials`, test, { headers: { Authorization: `Bearer ${token}` } });
      }
      setEditItem(null);
      loadAllData();
      alert('Kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer} data-testid="admin-login">
        <div style={styles.loginBox}>
          <h1 style={styles.loginTitle}>Admin Paneli</h1>
          <form onSubmit={handleLogin} style={styles.loginForm} data-testid="admin-login-form">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
              data-testid="admin-username-input"
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              data-testid="admin-password-input"
            />
            <button type="submit" style={styles.loginButton} data-testid="admin-login-submit">
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} data-testid="admin-panel">
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin Panel</h2>
        <button onClick={() => setActiveTab('hero')} style={activeTab === 'hero' ? styles.tabActive : styles.tab} data-testid="tab-hero">Ana Banner</button>
        <button onClick={() => setActiveTab('stats')} style={activeTab === 'stats' ? styles.tabActive : styles.tab} data-testid="tab-stats">İstatistikler</button>
        <button onClick={() => setActiveTab('about')} style={activeTab === 'about' ? styles.tabActive : styles.tab} data-testid="tab-about">Hakkımda</button>
        <button onClick={() => setActiveTab('skills')} style={activeTab === 'skills' ? styles.tabActive : styles.tab} data-testid="tab-skills">Yetenekler</button>
        <button onClick={() => setActiveTab('portfolio')} style={activeTab === 'portfolio' ? styles.tabActive : styles.tab} data-testid="tab-portfolio">Portfolyo</button>
        <button onClick={() => setActiveTab('experience')} style={activeTab === 'experience' ? styles.tabActive : styles.tab} data-testid="tab-experience">Deneyim</button>
        <button onClick={() => setActiveTab('certificates')} style={activeTab === 'certificates' ? styles.tabActive : styles.tab} data-testid="tab-certificates">Sertifikalar</button>
        <button onClick={() => setActiveTab('testimonials')} style={activeTab === 'testimonials' ? styles.tabActive : styles.tab} data-testid="tab-testimonials">Yorumlar</button>
        <button onClick={() => setActiveTab('contact')} style={activeTab === 'contact' ? styles.tabActive : styles.tab} data-testid="tab-contact">İletişim</button>
        <button onClick={() => setActiveTab('messages')} style={activeTab === 'messages' ? styles.tabActive : styles.tab} data-testid="tab-messages">Mesajlar</button>
        <button onClick={handleLogout} style={styles.logoutButton} data-testid="logout-button">
          <LogOut size={18} style={{ marginRight: '8px' }} />
          Çıkış Yap
        </button>
      </div>
      
      <div style={styles.content}>
        {activeTab === 'hero' && hero && (
          <div data-testid="hero-panel">
            <h2 style={styles.contentTitle}>Ana Banner</h2>
            <div style={styles.formGroup}>
              <label>İsim (TR)</label>
              <input type="text" value={hero.name.tr} onChange={(e) => setHero({...hero, name: {...hero.name, tr: e.target.value}})} style={styles.input} data-testid="hero-name-tr" />
            </div>
            <div style={styles.formGroup}>
              <label>İsim (EN)</label>
              <input type="text" value={hero.name.en} onChange={(e) => setHero({...hero, name: {...hero.name, en: e.target.value}})} style={styles.input} data-testid="hero-name-en" />
            </div>
            <div style={styles.formGroup}>
              <label>Başlık (TR)</label>
              <input type="text" value={hero.title.tr} onChange={(e) => setHero({...hero, title: {...hero.title, tr: e.target.value}})} style={styles.input} data-testid="hero-title-tr" />
            </div>
            <div style={styles.formGroup}>
              <label>Başlık (EN)</label>
              <input type="text" value={hero.title.en} onChange={(e) => setHero({...hero, title: {...hero.title, en: e.target.value}})} style={styles.input} data-testid="hero-title-en" />
            </div>
            <div style={styles.formGroup}>
              <label>Açıklama (TR)</label>
              <textarea value={hero.description.tr} onChange={(e) => setHero({...hero, description: {...hero.description, tr: e.target.value}})} style={{...styles.input, minHeight: '100px'}} data-testid="hero-description-tr" />
            </div>
            <div style={styles.formGroup}>
              <label>Açıklama (EN)</label>
              <textarea value={hero.description.en} onChange={(e) => setHero({...hero, description: {...hero.description, en: e.target.value}})} style={{...styles.input, minHeight: '100px'}} data-testid="hero-description-en" />
            </div>
            <div style={styles.formGroup}>
              <label>Resim URL</label>
              <input type="text" value={hero.image} onChange={(e) => setHero({...hero, image: e.target.value})} style={styles.input} data-testid="hero-image" />
            </div>
            <button onClick={saveHero} style={styles.saveButton} data-testid="hero-save">
              <Save size={18} style={{ marginRight: '8px' }} />
              Kaydet
            </button>
          </div>
        )}

        {activeTab === 'stats' && (
          <div data-testid="stats-panel">
            <div style={styles.headerRow}>
              <h2 style={styles.contentTitle}>İstatistikler</h2>
              <button onClick={() => setEditItem({ value: '', label: { tr: '', en: '' }, order: stats.length + 1 })} style={styles.addButton} data-testid="stats-add">
                <Plus size={18} style={{ marginRight: '8px' }} />
                Yeni Ekle
              </button>
            </div>
            {editItem && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <h3>İstatistik Düzenle</h3>
                  <div style={styles.formGroup}>
                    <label>Değer</label>
                    <input type="text" value={editItem.value} onChange={(e) => setEditItem({...editItem, value: e.target.value})} style={styles.input} data-testid="stat-edit-value" />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Etiket (TR)</label>
                    <input type="text" value={editItem.label.tr} onChange={(e) => setEditItem({...editItem, label: {...editItem.label, tr: e.target.value}})} style={styles.input} data-testid="stat-edit-label-tr" />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Etiket (EN)</label>
                    <input type="text" value={editItem.label.en} onChange={(e) => setEditItem({...editItem, label: {...editItem.label, en: e.target.value}})} style={styles.input} data-testid="stat-edit-label-en" />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Sıra</label>
                    <input type="number" value={editItem.order} onChange={(e) => setEditItem({...editItem, order: parseInt(e.target.value)})} style={styles.input} data-testid="stat-edit-order" />
                  </div>
                  <div style={styles.modalButtons}>
                    <button onClick={() => saveStat(editItem)} style={styles.saveButton} data-testid="stat-edit-save">Kaydet</button>
                    <button onClick={() => setEditItem(null)} style={styles.cancelButton} data-testid="stat-edit-cancel">İptal</button>
                  </div>
                </div>
              </div>
            )}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Değer</th>
                  <th style={styles.th}>Etiket (TR)</th>
                  <th style={styles.th}>Etiket (EN)</th>
                  <th style={styles.th}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => (
                  <tr key={stat.id}>
                    <td style={styles.td} data-testid={`stat-value-${index}`}>{stat.value}</td>
                    <td style={styles.td} data-testid={`stat-label-tr-${index}`}>{stat.label.tr}</td>
                    <td style={styles.td} data-testid={`stat-label-en-${index}`}>{stat.label.en}</td>
                    <td style={styles.td}>
                      <button onClick={() => setEditItem(stat)} style={styles.editButton} data-testid={`stat-edit-${index}`}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteStat(stat.id)} style={styles.deleteButton} data-testid={`stat-delete-${index}`}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'about' && about && (
          <div data-testid="about-panel">
            <h2 style={styles.contentTitle}>Hakkımda</h2>
            <div style={styles.formGroup}>
              <label>Resim URL</label>
              <input type="text" value={about.image} onChange={(e) => setAbout({...about, image: e.target.value})} style={styles.input} data-testid="about-image" />
            </div>
            <div style={styles.formGroup}>
              <label>Deneyim</label>
              <input type="text" value={about.experience} onChange={(e) => setAbout({...about, experience: e.target.value})} style={styles.input} data-testid="about-experience" />
            </div>
            <div style={styles.formGroup}>
              <label>Projeler</label>
              <input type="text" value={about.projects} onChange={(e) => setAbout({...about, projects: e.target.value})} style={styles.input} data-testid="about-projects" />
            </div>
            <div style={styles.formGroup}>
              <label>Biyografi (TR)</label>
              <textarea value={about.bio.tr} onChange={(e) => setAbout({...about, bio: {...about.bio, tr: e.target.value}})} style={{...styles.input, minHeight: '100px'}} data-testid="about-bio-tr" />
            </div>
            <div style={styles.formGroup}>
              <label>Biyografi (EN)</label>
              <textarea value={about.bio.en} onChange={(e) => setAbout({...about, bio: {...about.bio, en: e.target.value}})} style={{...styles.input, minHeight: '100px'}} data-testid="about-bio-en" />
            </div>
            <div style={styles.formGroup}>
              <label>Vizyon (TR)</label>
              <textarea value={about.vision.tr} onChange={(e) => setAbout({...about, vision: {...about.vision, tr: e.target.value}})} style={{...styles.input, minHeight: '100px'}} data-testid="about-vision-tr" />
            </div>
            <div style={styles.formGroup}>
              <label>Vizyon (EN)</label>
              <textarea value={about.vision.en} onChange={(e) => setAbout({...about, vision: {...about.vision, en: e.target.value}})} style={{...styles.input, minHeight: '100px'}} data-testid="about-vision-en" />
            </div>
            <div style={styles.formGroup}>
              <label>Uzmanlık Alanları (TR) - Her satıra bir alan</label>
              <textarea 
                value={Array.isArray(about.expertise.tr) ? about.expertise.tr.join('\n') : ''} 
                onChange={(e) => setAbout({...about, expertise: {...about.expertise, tr: e.target.value.split('\n')}})} 
                style={{...styles.input, minHeight: '100px'}}
                data-testid="about-expertise-tr"
              />
            </div>
            <div style={styles.formGroup}>
              <label>Uzmanlık Alanları (EN) - Her satıra bir alan</label>
              <textarea 
                value={Array.isArray(about.expertise.en) ? about.expertise.en.join('\n') : ''} 
                onChange={(e) => setAbout({...about, expertise: {...about.expertise, en: e.target.value.split('\n')}})} 
                style={{...styles.input, minHeight: '100px'}}
                data-testid="about-expertise-en"
              />
            </div>
            <button onClick={saveAbout} style={styles.saveButton} data-testid="about-save">
              <Save size={18} style={{ marginRight: '8px' }} />
              Kaydet
            </button>
          </div>
        )}

        {activeTab === 'contact' && contact && (
          <div data-testid="contact-panel">
            <h2 style={styles.contentTitle}>İletişim Bilgileri</h2>
            <div style={styles.formGroup}>
              <label>E-posta</label>
              <input type="email" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} style={styles.input} data-testid="contact-email" />
            </div>
            <div style={styles.formGroup}>
              <label>Telefon</label>
              <input type="text" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} style={styles.input} data-testid="contact-phone" />
            </div>
            <div style={styles.formGroup}>
              <label>Konum (TR)</label>
              <input type="text" value={contact.location.tr} onChange={(e) => setContact({...contact, location: {...contact.location, tr: e.target.value}})} style={styles.input} data-testid="contact-location-tr" />
            </div>
            <div style={styles.formGroup}>
              <label>Konum (EN)</label>
              <input type="text" value={contact.location.en} onChange={(e) => setContact({...contact, location: {...contact.location, en: e.target.value}})} style={styles.input} data-testid="contact-location-en" />
            </div>
            <button onClick={saveContact} style={styles.saveButton} data-testid="contact-save">
              <Save size={18} style={{ marginRight: '8px' }} />
              Kaydet
            </button>
          </div>
        )}

        {activeTab === 'messages' && (
          <div data-testid="messages-panel">
            <h2 style={styles.contentTitle}>Gelen Mesajlar</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>İsim</th>
                  <th style={styles.th}>E-posta</th>
                  <th style={styles.th}>Konu</th>
                  <th style={styles.th}>Mesaj</th>
                  <th style={styles.th}>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, index) => (
                  <tr key={msg.id}>
                    <td style={styles.td} data-testid={`message-name-${index}`}>{msg.name}</td>
                    <td style={styles.td} data-testid={`message-email-${index}`}>{msg.email}</td>
                    <td style={styles.td} data-testid={`message-subject-${index}`}>{msg.subject}</td>
                    <td style={styles.td} data-testid={`message-content-${index}`}>{msg.message}</td>
                    <td style={styles.td}>{new Date(msg.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Similar sections for skills, portfolio, experience, certificates, testimonials - simplified for brevity */}
        {activeTab === 'skills' && (
          <div data-testid="skills-panel">
            <div style={styles.headerRow}>
              <h2 style={styles.contentTitle}>Yetenekler</h2>
              <button onClick={() => setEditItem({ category: { tr: '', en: '' }, name: '', percentage: 0, order: skills.length + 1 })} style={styles.addButton} data-testid="skills-add">
                <Plus size={18} style={{ marginRight: '8px' }} />
                Yeni Ekle
              </button>
            </div>
            {editItem && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <h3>Yetenek Düzenle</h3>
                  <div style={styles.formGroup}>
                    <label>Kategori (TR)</label>
                    <input type="text" value={editItem.category.tr} onChange={(e) => setEditItem({...editItem, category: {...editItem.category, tr: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Kategori (EN)</label>
                    <input type="text" value={editItem.category.en} onChange={(e) => setEditItem({...editItem, category: {...editItem.category, en: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>İsim</label>
                    <input type="text" value={editItem.name} onChange={(e) => setEditItem({...editItem, name: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Yüzde</label>
                    <input type="number" value={editItem.percentage} onChange={(e) => setEditItem({...editItem, percentage: parseInt(e.target.value)})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Sıra</label>
                    <input type="number" value={editItem.order} onChange={(e) => setEditItem({...editItem, order: parseInt(e.target.value)})} style={styles.input} />
                  </div>
                  <div style={styles.modalButtons}>
                    <button onClick={() => saveSkill(editItem)} style={styles.saveButton}>Kaydet</button>
                    <button onClick={() => setEditItem(null)} style={styles.cancelButton}>İptal</button>
                  </div>
                </div>
              </div>
            )}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Kategori (TR)</th>
                  <th style={styles.th}>İsim</th>
                  <th style={styles.th}>Yüzde</th>
                  <th style={styles.th}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill, index) => (
                  <tr key={skill.id}>
                    <td style={styles.td}>{skill.category.tr}</td>
                    <td style={styles.td}>{skill.name}</td>
                    <td style={styles.td}>{skill.percentage}%</td>
                    <td style={styles.td}>
                      <button onClick={() => setEditItem(skill)} style={styles.editButton}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteSkill(skill.id)} style={styles.deleteButton}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div data-testid="portfolio-panel">
            <div style={styles.headerRow}>
              <h2 style={styles.contentTitle}>Portfolyo</h2>
              <button onClick={() => setEditItem({ title: { tr: '', en: '' }, description: { tr: '', en: '' }, image: '', category: '', year: '', tags: [], order: portfolio.length + 1 })} style={styles.addButton} data-testid="portfolio-add">
                <Plus size={18} style={{ marginRight: '8px' }} />
                Yeni Ekle
              </button>
            </div>
            {editItem && activeTab === 'portfolio' && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <h3>Portfolyo Düzenle</h3>
                  <div style={styles.formGroup}>
                    <label>Başlık (TR)</label>
                    <input type="text" value={editItem.title.tr} onChange={(e) => setEditItem({...editItem, title: {...editItem.title, tr: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Başlık (EN)</label>
                    <input type="text" value={editItem.title.en} onChange={(e) => setEditItem({...editItem, title: {...editItem.title, en: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Açıklama (TR)</label>
                    <textarea value={editItem.description.tr} onChange={(e) => setEditItem({...editItem, description: {...editItem.description, tr: e.target.value}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Açıklama (EN)</label>
                    <textarea value={editItem.description.en} onChange={(e) => setEditItem({...editItem, description: {...editItem.description, en: e.target.value}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Resim URL</label>
                    <input type="text" value={editItem.image} onChange={(e) => setEditItem({...editItem, image: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Kategori</label>
                    <input type="text" value={editItem.category} onChange={(e) => setEditItem({...editItem, category: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Yıl</label>
                    <input type="text" value={editItem.year} onChange={(e) => setEditItem({...editItem, year: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Etiketler (virgülle ayırın)</label>
                    <input type="text" value={Array.isArray(editItem.tags) ? editItem.tags.join(', ') : ''} onChange={(e) => setEditItem({...editItem, tags: e.target.value.split(',').map(t => t.trim())})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Sıra</label>
                    <input type="number" value={editItem.order} onChange={(e) => setEditItem({...editItem, order: parseInt(e.target.value)})} style={styles.input} />
                  </div>
                  <div style={styles.modalButtons}>
                    <button onClick={() => savePortfolio(editItem)} style={styles.saveButton}>Kaydet</button>
                    <button onClick={() => setEditItem(null)} style={styles.cancelButton}>İptal</button>
                  </div>
                </div>
              </div>
            )}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Başlık (TR)</th>
                  <th style={styles.th}>Kategori</th>
                  <th style={styles.th}>Yıl</th>
                  <th style={styles.th}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item, index) => (
                  <tr key={item.id}>
                    <td style={styles.td}>{item.title.tr}</td>
                    <td style={styles.td}>{item.category}</td>
                    <td style={styles.td}>{item.year}</td>
                    <td style={styles.td}>
                      <button onClick={() => setEditItem(item)} style={styles.editButton}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deletePortfolio(item.id)} style={styles.deleteButton}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'experience' && (
          <div data-testid="experience-panel">
            <div style={styles.headerRow}>
              <h2 style={styles.contentTitle}>Deneyim & Eğitim</h2>
              <button onClick={() => setEditItem({ position: { tr: '', en: '' }, company: '', period: { tr: '', en: '' }, location: { tr: '', en: '' }, description: { tr: '', en: '' }, achievements: { tr: [], en: [] }, order: experience.length + 1, type: 'work' })} style={styles.addButton} data-testid="experience-add">
                <Plus size={18} style={{ marginRight: '8px' }} />
                Yeni Ekle
              </button>
            </div>
            {editItem && activeTab === 'experience' && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <h3>Deneyim/Eğitim Düzenle</h3>
                  <div style={styles.formGroup}>
                    <label>Tip</label>
                    <select value={editItem.type} onChange={(e) => setEditItem({...editItem, type: e.target.value})} style={styles.input}>
                      <option value="work">İş Deneyimi</option>
                      <option value="education">Eğitim</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label>Pozisyon/Bölüm (TR)</label>
                    <input type="text" value={editItem.position.tr} onChange={(e) => setEditItem({...editItem, position: {...editItem.position, tr: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Pozisyon/Bölüm (EN)</label>
                    <input type="text" value={editItem.position.en} onChange={(e) => setEditItem({...editItem, position: {...editItem.position, en: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Şirket/Kurum</label>
                    <input type="text" value={editItem.company} onChange={(e) => setEditItem({...editItem, company: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Dönem (TR)</label>
                    <input type="text" value={editItem.period.tr} onChange={(e) => setEditItem({...editItem, period: {...editItem.period, tr: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Dönem (EN)</label>
                    <input type="text" value={editItem.period.en} onChange={(e) => setEditItem({...editItem, period: {...editItem.period, en: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Konum (TR)</label>
                    <input type="text" value={editItem.location.tr} onChange={(e) => setEditItem({...editItem, location: {...editItem.location, tr: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Konum (EN)</label>
                    <input type="text" value={editItem.location.en} onChange={(e) => setEditItem({...editItem, location: {...editItem.location, en: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Açıklama (TR)</label>
                    <textarea value={editItem.description.tr} onChange={(e) => setEditItem({...editItem, description: {...editItem.description, tr: e.target.value}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Açıklama (EN)</label>
                    <textarea value={editItem.description.en} onChange={(e) => setEditItem({...editItem, description: {...editItem.description, en: e.target.value}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Başarılar (TR) - Her satıra bir başarı</label>
                    <textarea value={Array.isArray(editItem.achievements.tr) ? editItem.achievements.tr.join('\n') : ''} onChange={(e) => setEditItem({...editItem, achievements: {...editItem.achievements, tr: e.target.value.split('\n')}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Başarılar (EN) - Her satıra bir başarı</label>
                    <textarea value={Array.isArray(editItem.achievements.en) ? editItem.achievements.en.join('\n') : ''} onChange={(e) => setEditItem({...editItem, achievements: {...editItem.achievements, en: e.target.value.split('\n')}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Sıra</label>
                    <input type="number" value={editItem.order} onChange={(e) => setEditItem({...editItem, order: parseInt(e.target.value)})} style={styles.input} />
                  </div>
                  <div style={styles.modalButtons}>
                    <button onClick={() => saveExperience(editItem)} style={styles.saveButton}>Kaydet</button>
                    <button onClick={() => setEditItem(null)} style={styles.cancelButton}>İptal</button>
                  </div>
                </div>
              </div>
            )}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Tip</th>
                  <th style={styles.th}>Pozisyon (TR)</th>
                  <th style={styles.th}>Şirket/Kurum</th>
                  <th style={styles.th}>Dönem (TR)</th>
                  <th style={styles.th}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {experience.map((exp, index) => (
                  <tr key={exp.id}>
                    <td style={styles.td}>{exp.type === 'work' ? 'İş' : 'Eğitim'}</td>
                    <td style={styles.td}>{exp.position.tr}</td>
                    <td style={styles.td}>{exp.company}</td>
                    <td style={styles.td}>{exp.period.tr}</td>
                    <td style={styles.td}>
                      <button onClick={() => setEditItem(exp)} style={styles.editButton}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteExperience(exp.id)} style={styles.deleteButton}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div data-testid="certificates-panel">
            <div style={styles.headerRow}>
              <h2 style={styles.contentTitle}>Sertifikalar</h2>
              <button onClick={() => setEditItem({ title: { tr: '', en: '' }, issuer: '', date: '', order: certificates.length + 1 })} style={styles.addButton} data-testid="certificates-add">
                <Plus size={18} style={{ marginRight: '8px' }} />
                Yeni Ekle
              </button>
            </div>
            {editItem && activeTab === 'certificates' && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <h3>Sertifika Düzenle</h3>
                  <div style={styles.formGroup}>
                    <label>Başlık (TR)</label>
                    <input type="text" value={editItem.title.tr} onChange={(e) => setEditItem({...editItem, title: {...editItem.title, tr: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Başlık (EN)</label>
                    <input type="text" value={editItem.title.en} onChange={(e) => setEditItem({...editItem, title: {...editItem.title, en: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Veren Kurum</label>
                    <input type="text" value={editItem.issuer} onChange={(e) => setEditItem({...editItem, issuer: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Tarih</label>
                    <input type="text" value={editItem.date} onChange={(e) => setEditItem({...editItem, date: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Sıra</label>
                    <input type="number" value={editItem.order} onChange={(e) => setEditItem({...editItem, order: parseInt(e.target.value)})} style={styles.input} />
                  </div>
                  <div style={styles.modalButtons}>
                    <button onClick={() => saveCertificate(editItem)} style={styles.saveButton}>Kaydet</button>
                    <button onClick={() => setEditItem(null)} style={styles.cancelButton}>İptal</button>
                  </div>
                </div>
              </div>
            )}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Başlık (TR)</th>
                  <th style={styles.th}>Veren Kurum</th>
                  <th style={styles.th}>Tarih</th>
                  <th style={styles.th}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert, index) => (
                  <tr key={cert.id}>
                    <td style={styles.td}>{cert.title.tr}</td>
                    <td style={styles.td}>{cert.issuer}</td>
                    <td style={styles.td}>{cert.date}</td>
                    <td style={styles.td}>
                      <button onClick={() => setEditItem(cert)} style={styles.editButton}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteCertificate(cert.id)} style={styles.deleteButton}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div data-testid="testimonials-panel">
            <div style={styles.headerRow}>
              <h2 style={styles.contentTitle}>Müşteri Yorumları</h2>
              <button onClick={() => setEditItem({ name: '', role: { tr: '', en: '' }, content: { tr: '', en: '' }, image: '', order: testimonials.length + 1 })} style={styles.addButton} data-testid="testimonials-add">
                <Plus size={18} style={{ marginRight: '8px' }} />
                Yeni Ekle
              </button>
            </div>
            {editItem && activeTab === 'testimonials' && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <h3>Yorum Düzenle</h3>
                  <div style={styles.formGroup}>
                    <label>İsim</label>
                    <input type="text" value={editItem.name} onChange={(e) => setEditItem({...editItem, name: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Rol/Unvan (TR)</label>
                    <input type="text" value={editItem.role.tr} onChange={(e) => setEditItem({...editItem, role: {...editItem.role, tr: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Rol/Unvan (EN)</label>
                    <input type="text" value={editItem.role.en} onChange={(e) => setEditItem({...editItem, role: {...editItem.role, en: e.target.value}})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Yorum (TR)</label>
                    <textarea value={editItem.content.tr} onChange={(e) => setEditItem({...editItem, content: {...editItem.content, tr: e.target.value}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Yorum (EN)</label>
                    <textarea value={editItem.content.en} onChange={(e) => setEditItem({...editItem, content: {...editItem.content, en: e.target.value}})} style={{...styles.input, minHeight: '80px'}} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Resim URL</label>
                    <input type="text" value={editItem.image} onChange={(e) => setEditItem({...editItem, image: e.target.value})} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Sıra</label>
                    <input type="number" value={editItem.order} onChange={(e) => setEditItem({...editItem, order: parseInt(e.target.value)})} style={styles.input} />
                  </div>
                  <div style={styles.modalButtons}>
                    <button onClick={() => saveTestimonial(editItem)} style={styles.saveButton}>Kaydet</button>
                    <button onClick={() => setEditItem(null)} style={styles.cancelButton}>İptal</button>
                  </div>
                </div>
              </div>
            )}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>İsim</th>
                  <th style={styles.th}>Rol (TR)</th>
                  <th style={styles.th}>Yorum (TR)</th>
                  <th style={styles.th}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((test, index) => (
                  <tr key={test.id}>
                    <td style={styles.td}>{test.name}</td>
                    <td style={styles.td}>{test.role.tr}</td>
                    <td style={styles.td}>{test.content.tr.substring(0, 50)}...</td>
                    <td style={styles.td}>
                      <button onClick={() => setEditItem(test)} style={styles.editButton}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => deleteTestimonial(test.id)} style={styles.deleteButton}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  loginBox: {
    background: 'white',
    padding: '50px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    minWidth: '400px',
  },
  loginTitle: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '250px',
    background: '#1a1a1a',
    color: 'white',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sidebarTitle: {
    marginBottom: '30px',
    fontSize: '1.5rem',
  },
  tab: {
    background: 'transparent',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background 0.3s',
    fontSize: '1rem',
  },
  tabActive: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  logoutButton: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  content: {
    flex: 1,
    padding: '40px',
    background: '#f5f5f5',
    overflowY: 'auto',
  },
  contentTitle: {
    marginBottom: '30px',
    fontSize: '2rem',
  },
  formGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    marginTop: '5px',
  },
  saveButton: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  addButton: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  table: {
    width: '100%',
    background: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    background: '#f8f9fa',
    fontWeight: '600',
  },
  td: {
    padding: '15px',
    borderTop: '1px solid #e0e0e0',
  },
  editButton: {
    background: '#ffc107',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  modalButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
  },
  cancelButton: {
    background: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  loginButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
};

export default AdminPanel;
