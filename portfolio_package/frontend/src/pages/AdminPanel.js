import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Trash2, Plus, Edit, LogOut } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [about, setAbout] = useState({ content_tr: '', content_en: '', image_url: '' });
  const [contact, setContact] = useState({ email: '', phone: '', location: '' });
  const [socialLinks, setSocialLinks] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title_tr: '', title_en: '', description_tr: '', description_en: '',
    category_tr: '', category_en: '', year: '', tags: '', image_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, aboutRes, contactRes, linksRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/projects`),
        axios.get(`${BACKEND_URL}/api/admin/about`),
        axios.get(`${BACKEND_URL}/api/admin/contact`),
        axios.get(`${BACKEND_URL}/api/admin/social-links`)
      ]);
      setProjects(projectsRes.data);
      setAbout(aboutRes.data);
      setContact(contactRes.data);
      setSocialLinks(linksRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleCreateProject = async () => {
    try {
      const projectData = {
        ...newProject,
        tags: newProject.tags.split(',').map(t => t.trim())
      };
      await axios.post(`${BACKEND_URL}/api/admin/projects`, projectData);
      toast({ title: 'Proje eklendi!' });
      setNewProject({ title_tr: '', title_en: '', description_tr: '', description_en: '',
        category_tr: '', category_en: '', year: '', tags: '', image_url: '' });
      fetchData();
    } catch (error) {
      toast({ title: 'Hata!', description: 'Proje eklenemedi', variant: 'destructive' });
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/projects/${id}`);
      toast({ title: 'Proje silindi!' });
      fetchData();
    } catch (error) {
      toast({ title: 'Hata!', description: 'Proje silinemedi', variant: 'destructive' });
    }
  };

  const handleUpdateAbout = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/admin/about`, about);
      toast({ title: 'Hakkımda güncellendi!' });
    } catch (error) {
      toast({ title: 'Hata!', description: 'Güncelleme başarısız', variant: 'destructive' });
    }
  };

  const handleUpdateContact = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/admin/contact`, contact);
      toast({ title: 'İletişim bilgileri güncellendi!' });
    } catch (error) {
      toast({ title: 'Hata!', description: 'Güncelleme başarısız', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Paneli</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projeler</TabsTrigger>
            <TabsTrigger value="about">Hakkımda</TabsTrigger>
            <TabsTrigger value="contact">İletişim</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Yeni Proje Ekle</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Başlık (TR)" value={newProject.title_tr}
                  onChange={(e) => setNewProject({ ...newProject, title_tr: e.target.value })} />
                <Input placeholder="Başlık (EN)" value={newProject.title_en}
                  onChange={(e) => setNewProject({ ...newProject, title_en: e.target.value })} />
                <Textarea placeholder="Açıklama (TR)" value={newProject.description_tr}
                  onChange={(e) => setNewProject({ ...newProject, description_tr: e.target.value })} />
                <Textarea placeholder="Açıklama (EN)" value={newProject.description_en}
                  onChange={(e) => setNewProject({ ...newProject, description_en: e.target.value })} />
                <Input placeholder="Kategori (TR)" value={newProject.category_tr}
                  onChange={(e) => setNewProject({ ...newProject, category_tr: e.target.value })} />
                <Input placeholder="Kategori (EN)" value={newProject.category_en}
                  onChange={(e) => setNewProject({ ...newProject, category_en: e.target.value })} />
                <Input placeholder="Yıl" value={newProject.year}
                  onChange={(e) => setNewProject({ ...newProject, year: e.target.value })} />
                <Input placeholder="Etiketler (virgülle ayırın)" value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} />
                <Input placeholder="Görsel URL" value={newProject.image_url} className="md:col-span-2"
                  onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })} />
              </div>
              <Button onClick={handleCreateProject} className="mt-4">
                <Plus className="w-4 h-4 mr-2" /> Proje Ekle
              </Button>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="p-4">
                  <img src={project.image_url} alt={project.title_tr} className="w-full h-40 object-cover rounded mb-3" />
                  <h3 className="font-bold text-lg mb-2">{project.title_tr}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description_tr}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Hakkımda Bilgilerini Güncelle</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">İçerik (Türkçe)</label>
                  <Textarea rows={6} value={about.content_tr || ''}
                    onChange={(e) => setAbout({ ...about, content_tr: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">İçerik (İngilizce)</label>
                  <Textarea rows={6} value={about.content_en || ''}
                    onChange={(e) => setAbout({ ...about, content_en: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Görsel URL</label>
                  <Input value={about.image_url || ''}
                    onChange={(e) => setAbout({ ...about, image_url: e.target.value })} />
                </div>
                <Button onClick={handleUpdateAbout}>Güncelle</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">İletişim Bilgilerini Güncelle</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <Input type="email" value={contact.email || ''}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input value={contact.phone || ''}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Konum</label>
                  <Input value={contact.location || ''}
                    onChange={(e) => setContact({ ...contact, location: e.target.value })} />
                </div>
                <Button onClick={handleUpdateContact}>Güncelle</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;