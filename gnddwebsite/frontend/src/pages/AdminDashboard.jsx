import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  FolderOpen, 
  Award, 
  Briefcase, 
  User, 
  MessageSquare,
  LogOut,
  Edit,
  Trash2,
  Plus,
  X,
  Check
} from 'lucide-react';
import { adminService, publicService } from '../services/api';
import { toast } from '../hooks/use-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    loadData();
  }, [activeTab, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'messages') {
        const res = await adminService.getMessages();
        setMessages(res.data);
      } else if (activeTab === 'projects') {
        const res = await publicService.getProjects();
        setProjects(res.data);
      } else if (activeTab === 'services') {
        const res = await publicService.getServices();
        setServices(res.data);
      } else if (activeTab === 'experience') {
        const res = await publicService.getExperience();
        setExperience(res.data);
      } else if (activeTab === 'education') {
        const res = await publicService.getEducation();
        setEducation(res.data);
      } else if (activeTab === 'certifications') {
        const res = await publicService.getCertifications();
        setCertifications(res.data);
      } else if (activeTab === 'skills') {
        const res = await publicService.getSkills();
        setSkills(res.data);
      } else if (activeTab === 'testimonials') {
        const res = await publicService.getTestimonials();
        setTestimonials(res.data);
      }
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Veriler yüklenirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      try {
        await adminService.deleteMessage(id);
        toast({ title: "Başarılı!", description: "Mesaj silindi." });
        loadData();
      } catch (error) {
        toast({ title: "Hata!", description: "Mesaj silinemedi.", variant: "destructive" });
      }
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      try {
        await adminService.deleteProject(id);
        toast({ title: "Başarılı!", description: "Proje silindi." });
        loadData();
      } catch (error) {
        toast({ title: "Hata!", description: "Proje silinemedi.", variant: "destructive" });
      }
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      try {
        await adminService.deleteService(id);
        toast({ title: "Başarılı!", description: "Hizmet silindi." });
        loadData();
      } catch (error) {
        toast({ title: "Hata!", description: "Hizmet silinemedi.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 space-y-2">
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'messages' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Mail size={20} />
                <span>Mesajlar</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'projects' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FolderOpen size={20} />
                <span>Projeler</span>
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'services' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Briefcase size={20} />
                <span>Hizmetler</span>
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'experience' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Briefcase size={20} />
                <span>Deneyim</span>
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'education' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Award size={20} />
                <span>Eğitim</span>
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'certifications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Award size={20} />
                <span>Sertifikalar</span>
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'skills' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Award size={20} />
                <span>Yetenekler</span>
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'testimonials' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <MessageSquare size={20} />
                <span>Yorumlar</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Yükleniyor...</p>
                </div>
              ) : (
                <>
                  {activeTab === 'messages' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">İletişim Mesajları</h2>
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div key={msg.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg">{msg.name}</h3>
                                <p className="text-sm text-gray-600">{msg.email}</p>
                              </div>
                              <div className="flex space-x-2">
                                {msg.replied && (
                                  <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full flex items-center space-x-1">
                                    <Check size={14} />
                                    <span>Cevaplanmış</span>
                                  </span>
                                )}
                                <button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-gray-800 mb-2">Konu: {msg.subject}</p>
                            <p className="text-gray-700">{msg.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(msg.created_at).toLocaleString('tr-TR')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'projects' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Projeler</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project) => (
                          <div key={project.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{project.category}</p>
                              <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'services' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Hizmetler</h2>
                      </div>
                      <div className="space-y-4">
                        {services.map((service) => (
                          <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                                <p className="text-gray-700">{service.description}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'experience' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Deneyim</h2>
                      <div className="space-y-4">
                        {experience.map((exp) => (
                          <div key={exp.id} className="border rounded-lg p-4">
                            <h3 className="font-bold text-lg">{exp.title}</h3>
                            <p className="text-blue-600 font-medium">{exp.company}</p>
                            <p className="text-sm text-gray-600">{exp.period} - {exp.location}</p>
                            <p className="text-gray-700 mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'education' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Eğitim</h2>
                      <div className="space-y-4">
                        {education.map((edu) => (
                          <div key={edu.id} className="border rounded-lg p-4">
                            <h3 className="font-bold text-lg">{edu.degree}</h3>
                            <p className="text-green-600 font-medium">{edu.school}</p>
                            <p className="text-sm text-gray-600">{edu.period} - {edu.location}</p>
                            <p className="text-gray-700 mt-2">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'certifications' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Sertifikalar</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certifications.map((cert) => (
                          <div key={cert.id} className="border rounded-lg p-4">
                            <h3 className="font-bold">{cert.name}</h3>
                            <p className="text-sm text-purple-600">{cert.issuer}</p>
                            <p className="text-xs text-gray-500">{cert.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Yetenekler</h2>
                      <div className="space-y-6">
                        {skills.map((skill) => (
                          <div key={skill.id} className="border rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-4">{skill.category}</h3>
                            <div className="space-y-3">
                              {skill.items.map((item, idx) => (
                                <div key={idx}>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-sm text-blue-600">{item.level}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${item.level}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'testimonials' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Müşteri Yorumları</h2>
                      <div className="space-y-4">
                        {testimonials.map((testimonial) => (
                          <div key={testimonial.id} className="border rounded-lg p-4">
                            <div className="flex items-start space-x-4">
                              {testimonial.image && (
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h3 className="font-bold">{testimonial.name}</h3>
                                <p className="text-sm text-blue-600">{testimonial.role}</p>
                                <p className="text-gray-700 mt-2">{testimonial.content}</p>
                                <div className="flex mt-2">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400">★</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;