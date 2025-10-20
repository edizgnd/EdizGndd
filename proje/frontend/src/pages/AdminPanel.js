import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Trash2, Plus, LogOut, AlertCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState({ content_tr: '', content_en: '', image_url: '' });
  const [contact, setContact] = useState({ email: '', phone: '', location: '' });
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState({
    title_tr: '', title_en: '', description_tr: '', description_en: '',
    category_tr: '', category_en: '', year: '', tags: '', image_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    console.log('📡 Fetching admin data from:', BACKEND_URL);
    
    try {
      const [projectsRes, aboutRes, contactRes, linksRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/projects`),
        axios.get(`${BACKEND_URL}/api/admin/about`),
        axios.get(`${BACKEND_URL}/api/admin/contact`),
        axios.get(`${BACKEND_URL}/api/admin/social-links`)
      ]);
      
      console.log('✅ Data fetched successfully');
      console.log('Projects:', projectsRes.data);
      console.log('About:', aboutRes.data);
      console.log('Contact:', contactRes.data);
      console.log('Social Links:', linksRes.data);
      
      setProjects(projectsRes.data || []);
      setAbout(aboutRes.data || { content_tr: '', content_en: '', image_url: '' });
      setContact(contactRes.data || { email: '', phone: '', location: '' });
      setSocialLinks(linksRes.data || []);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      console.error('Error details:', error.response?.data);
      
      const errorMsg = error.response?.data?.detail || error.message || 'Veri yüklenirken hata oluştu';
      setError(errorMsg);
      
      toast({ 
        title: 'Hata!', 
        description: errorMsg, 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleCreateProject = async () => {
    if (!newProject.title_tr || !newProject.title_en) {
      toast({ 
        title: 'Uyarı', 
        description: 'Lütfen en az başlık alanlarını doldurun', 
        variant: 'destructive' 
      });
      return;
    }

    try {
      const projectData = {
        ...newProject,
        tags: newProject.tags ? newProject.tags.split(',').map(t => t.trim()) : []
      };
      
      console.log('📝 Creating project:', projectData);
      
      const response = await axios.post(`${BACKEND_URL}/api/admin/projects`, projectData);
      
      console.log('✅ Project created:', response.data);
      
      toast({ title: 'Başarılı!', description: 'Proje başarıyla eklendi' });
      setNewProject({ 
        title_tr: '', title_en: '', description_tr: '', description_en: '',
        category_tr: '', category_en: '', year: '', tags: '', image_url: '' 
      });
      fetchData();
    } catch (error) {
      console.error('❌ Error creating project:', error);
      const errorMsg = error.response?.data?.detail || 'Proje eklenemedi';
      toast({ title: 'Hata!', description: errorMsg, variant: 'destructive' });
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;
    
    try {
      console.log('🗑️ Deleting project:', id);
      await axios.delete(`${BACKEND_URL}/api/admin/projects/${id}`);
      console.log('✅ Project deleted');
      toast({ title: 'Başarılı!', description: 'Proje silindi' });
      fetchData();
    } catch (error) {
      console.error('❌ Error deleting project:', error);
      const errorMsg = error.response?.data?.detail || 'Proje silinemedi';
      toast({ title: 'Hata!', description: errorMsg, variant: 'destructive' });
    }
  };

  const handleUpdateAbout = async () => {
    try {
      console.log('📝 Updating about:', about);
      await axios.put(`${BACKEND_URL}/api/admin/about`, about);
      console.log('✅ About updated');
      toast({ title: 'Başarılı!', description: 'Hakkımda güncellendi' });
    } catch (error) {
      console.error('❌ Error updating about:', error);
      const errorMsg = error.response?.data?.detail || 'Güncelleme başarısız';
      toast({ title: 'Hata!', description: errorMsg, variant: 'destructive' });
    }
  };

  const handleUpdateContact = async () => {
    try {
      console.log('📝 Updating contact:', contact);
      await axios.put(`${BACKEND_URL}/api/admin/contact`, contact);
      console.log('✅ Contact updated');
      toast({ title: 'Başarılı!', description: 'İletişim bilgileri güncellendi' });
    } catch (error) {
      console.error('❌ Error updating contact:', error);
      const errorMsg = error.response?.data?.detail || 'Güncelleme başarısız';
      toast({ title: 'Hata!', description: errorMsg, variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Paneli</h1>
            <p className="text-sm text-gray-500 mt-1">Backend: {BACKEND_URL}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" data-testid="logout-button">
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>

        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Bağlantı Hatası</h3>
                <p className="text-sm text-red-700">{error}</p>
                <Button 
                  onClick={fetchData} 
                  size="sm" 
                  className="mt-2"
                  variant="outline"
                >
                  Tekrar Dene
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projeler ({projects.length})</TabsTrigger>
            <TabsTrigger value="about">Hakkımda</TabsTrigger>
            <TabsTrigger value="contact">İletişim</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Yeni Proje Ekle</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Başlık (TR) *" 
                  value={newProject.title_tr}
                  onChange={(e) => setNewProject({ ...newProject, title_tr: e.target.value })} 
                  data-testid="project-title-tr-input"
                />
                <Input 
                  placeholder="Başlık (EN) *" 
                  value={newProject.title_en}
                  onChange={(e) => setNewProject({ ...newProject, title_en: e.target.value })} 
                  data-testid="project-title-en-input"
                />
                <Textarea 
                  placeholder="Açıklama (TR)" 
                  value={newProject.description_tr}
                  onChange={(e) => setNewProject({ ...newProject, description_tr: e.target.value })} 
                />
                <Textarea 
                  placeholder="Açıklama (EN)" 
                  value={newProject.description_en}
                  onChange={(e) => setNewProject({ ...newProject, description_en: e.target.value })} 
                />
                <Input 
                  placeholder="Kategori (TR)" 
                  value={newProject.category_tr}
                  onChange={(e) => setNewProject({ ...newProject, category_tr: e.target.value })} 
                />
                <Input 
                  placeholder="Kategori (EN)" 
                  value={newProject.category_en}
                  onChange={(e) => setNewProject({ ...newProject, category_en: e.target.value })} 
                />
                <Input 
                  placeholder="Yıl" 
                  value={newProject.year}
                  onChange={(e) => setNewProject({ ...newProject, year: e.target.value })} 
                />
                <Input 
                  placeholder="Etiketler (virgülle ayırın)" 
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} 
                />
                <Input 
                  placeholder="Görsel URL" 
                  value={newProject.image_url} 
                  className="md:col-span-2"
                  onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })} 
                />
              </div>
              <Button 
                onClick={handleCreateProject} 
                className="mt-4"
                data-testid="create-project-button"
              >
                <Plus className="w-4 h-4 mr-2" /> Proje Ekle
              </Button>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="p-4" data-testid={`project-card-${project.id}`}>
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.title_tr} 
                      className="w-full h-40 object-cover rounded mb-3" 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <h3 className="font-bold text-lg mb-2">{project.title_tr}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description_tr}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDeleteProject(project.id)}
                      data-testid={`delete-project-${project.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {projects.length === 0 && (
              <Card className="p-8 text-center text-gray-500">
                <p>Henüz proje eklenmemiş. Yukarıdan yeni proje ekleyebilirsiniz.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Hakkımda Bilgilerini Güncelle</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">İçerik (Türkçe)</label>
                  <Textarea 
                    rows={6} 
                    value={about.content_tr || ''}
                    onChange={(e) => setAbout({ ...about, content_tr: e.target.value })} 
                    data-testid="about-content-tr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">İçerik (İngilizce)</label>
                  <Textarea 
                    rows={6} 
                    value={about.content_en || ''}
                    onChange={(e) => setAbout({ ...about, content_en: e.target.value })} 
                    data-testid="about-content-en"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Görsel URL</label>
                  <Input 
                    value={about.image_url || ''}
                    onChange={(e) => setAbout({ ...about, image_url: e.target.value })} 
                  />
                </div>
                <Button 
                  onClick={handleUpdateAbout}
                  data-testid="update-about-button"
                >
                  Güncelle
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">İletişim Bilgilerini Güncelle</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <Input 
                    type="email" 
                    value={contact.email || ''}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })} 
                    data-testid="contact-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input 
                    value={contact.phone || ''}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })} 
                    data-testid="contact-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Konum</label>
                  <Input 
                    value={contact.location || ''}
                    onChange={(e) => setContact({ ...contact, location: e.target.value })} 
                    data-testid="contact-location"
                  />
                </div>
                <Button 
                  onClick={handleUpdateContact}
                  data-testid="update-contact-button"
                >
                  Güncelle
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
