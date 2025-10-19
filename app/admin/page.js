'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash2, Edit, Plus, Home } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AdminPanel() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [messages, setMessages] = useState([])
  const [aboutInfo, setAboutInfo] = useState(null)
  
  const [editingProject, setEditingProject] = useState(null)
  const [editingSkill, setEditingSkill] = useState(null)
  const [editingExperience, setEditingExperience] = useState(null)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    const [projectsRes, skillsRes, experienceRes, testimonialsRes, messagesRes, aboutRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/skills'),
      fetch('/api/experience'),
      fetch('/api/testimonials'),
      fetch('/api/contact'),
      fetch('/api/about')
    ])
    
    setProjects(await projectsRes.json())
    setSkills(await skillsRes.json())
    setExperience(await experienceRes.json())
    setTestimonials(await testimonialsRes.json())
    setMessages(await messagesRes.json())
    const aboutData = await aboutRes.json()
    setAboutInfo(aboutData[0])
  }

  // Project Functions
  const handleSaveProject = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const projectData = {
      id: editingProject?.id || `project_${Date.now()}`,
      title: formData.get('title'),
      category: formData.get('category'),
      year: formData.get('year'),
      description: formData.get('description'),
      image: formData.get('image'),
      tags: formData.get('tags').split(',').map(t => t.trim())
    }

    const method = editingProject ? 'PUT' : 'POST'
    const response = await fetch('/api/projects', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })

    if (response.ok) {
      fetchAllData()
      setDialogOpen(false)
      setEditingProject(null)
    }
  }

  const handleDeleteProject = async (id) => {
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      fetchAllData()
    }
  }

  // Skill Functions
  const handleSaveSkill = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const skillData = {
      id: editingSkill?.id || `skill_${Date.now()}`,
      name: formData.get('name'),
      category: formData.get('category'),
      percentage: parseInt(formData.get('percentage'))
    }

    const method = editingSkill ? 'PUT' : 'POST'
    await fetch('/api/skills', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skillData)
    })

    fetchAllData()
    setDialogOpen(false)
    setEditingSkill(null)
  }

  const handleDeleteSkill = async (id) => {
    if (confirm('Bu yeteneği silmek istediğinize emin misiniz?')) {
      await fetch('/api/skills', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      fetchAllData()
    }
  }

  // Experience Functions
  const handleSaveExperience = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const expData = {
      id: editingExperience?.id || `exp_${Date.now()}`,
      type: formData.get('type'),
      title: formData.get('title'),
      company: formData.get('company'),
      location: formData.get('location'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      description: formData.get('description'),
      highlights: formData.get('highlights').split(',').map(h => h.trim())
    }

    const method = editingExperience ? 'PUT' : 'POST'
    await fetch('/api/experience', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expData)
    })

    fetchAllData()
    setDialogOpen(false)
    setEditingExperience(null)
  }

  const handleDeleteExperience = async (id) => {
    if (confirm('Bu deneyimi silmek istediğinize emin misiniz?')) {
      await fetch('/api/experience', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      fetchAllData()
    }
  }

  // Testimonial Functions
  const handleSaveTestimonial = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const testimonialData = {
      id: editingTestimonial?.id || `testimonial_${Date.now()}`,
      name: formData.get('name'),
      role: formData.get('role'),
      comment: formData.get('comment'),
      avatar: formData.get('avatar')
    }

    const method = editingTestimonial ? 'PUT' : 'POST'
    await fetch('/api/testimonials', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonialData)
    })

    fetchAllData()
    setDialogOpen(false)
    setEditingTestimonial(null)
  }

  const handleDeleteTestimonial = async (id) => {
    if (confirm('Bu referansı silmek istediğinize emin misiniz?')) {
      await fetch('/api/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      fetchAllData()
    }
  }

  const handleDeleteMessage = async (id) => {
    if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
      await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      fetchAllData()
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <Button asChild variant="outline">
            <a href="/">
              <Home className="mr-2" />
              Ana Sayfaya Dön
            </a>
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects">Projeler</TabsTrigger>
            <TabsTrigger value="skills">Yetenekler</TabsTrigger>
            <TabsTrigger value="experience">Deneyim</TabsTrigger>
            <TabsTrigger value="testimonials">Referanslar</TabsTrigger>
            <TabsTrigger value="messages">Mesajlar</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Projeler</CardTitle>
                  <Dialog open={dialogOpen && editingProject !== undefined} onOpenChange={(open) => {
                    setDialogOpen(open)
                    if (!open) setEditingProject(null)
                  }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingProject({}); setDialogOpen(true) }}>
                        <Plus className="mr-2" /> Yeni Proje
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingProject?.id ? 'Proje Düzenle' : 'Yeni Proje'}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveProject} className="space-y-4">
                        <div>
                          <Label>Başlık</Label>
                          <Input name="title" defaultValue={editingProject?.title} required />
                        </div>
                        <div>
                          <Label>Kategori</Label>
                          <Input name="category" defaultValue={editingProject?.category} required />
                        </div>
                        <div>
                          <Label>Yıl</Label>
                          <Input name="year" defaultValue={editingProject?.year} required />
                        </div>
                        <div>
                          <Label>Açıklama</Label>
                          <Textarea name="description" defaultValue={editingProject?.description} required />
                        </div>
                        <div>
                          <Label>Görsel URL</Label>
                          <Input name="image" defaultValue={editingProject?.image} required />
                        </div>
                        <div>
                          <Label>Etiketler (virgülle ayırın)</Label>
                          <Input name="tags" defaultValue={editingProject?.tags?.join(', ')} required />
                        </div>
                        <Button type="submit">Kaydet</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Başlık</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Yıl</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map(project => (
                      <TableRow key={project.id}>
                        <TableCell>{project.title}</TableCell>
                        <TableCell><Badge>{project.category}</Badge></TableCell>
                        <TableCell>{project.year}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => { setEditingProject(project); setDialogOpen(true) }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Yetenekler</CardTitle>
                  <Dialog open={dialogOpen && editingSkill !== undefined} onOpenChange={(open) => {
                    setDialogOpen(open)
                    if (!open) setEditingSkill(null)
                  }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingSkill({}); setDialogOpen(true) }}>
                        <Plus className="mr-2" /> Yeni Yetenek
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingSkill?.id ? 'Yetenek Düzenle' : 'Yeni Yetenek'}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveSkill} className="space-y-4">
                        <div>
                          <Label>İsim</Label>
                          <Input name="name" defaultValue={editingSkill?.name} required />
                        </div>
                        <div>
                          <Label>Kategori</Label>
                          <Input name="category" defaultValue={editingSkill?.category} required />
                        </div>
                        <div>
                          <Label>Yüzde (%)</Label>
                          <Input name="percentage" type="number" min="0" max="100" defaultValue={editingSkill?.percentage} required />
                        </div>
                        <Button type="submit">Kaydet</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İsim</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Yüzde</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skills.map(skill => (
                      <TableRow key={skill.id}>
                        <TableCell>{skill.name}</TableCell>
                        <TableCell>{skill.category}</TableCell>
                        <TableCell>{skill.percentage}%</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => { setEditingSkill(skill); setDialogOpen(true) }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteSkill(skill.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Deneyim & Eğitim</CardTitle>
                  <Dialog open={dialogOpen && editingExperience !== undefined} onOpenChange={(open) => {
                    setDialogOpen(open)
                    if (!open) setEditingExperience(null)
                  }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingExperience({}); setDialogOpen(true) }}>
                        <Plus className="mr-2" /> Yeni Deneyim
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingExperience?.id ? 'Deneyim Düzenle' : 'Yeni Deneyim'}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveExperience} className="space-y-4">
                        <div>
                          <Label>Tip</Label>
                          <select name="type" defaultValue={editingExperience?.type} className="w-full border rounded p-2" required>
                            <option value="work">İş Deneyimi</option>
                            <option value="education">Eğitim</option>
                          </select>
                        </div>
                        <div>
                          <Label>Başlık</Label>
                          <Input name="title" defaultValue={editingExperience?.title} required />
                        </div>
                        <div>
                          <Label>Şirket/Okul</Label>
                          <Input name="company" defaultValue={editingExperience?.company} required />
                        </div>
                        <div>
                          <Label>Konum</Label>
                          <Input name="location" defaultValue={editingExperience?.location} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Başlangıç</Label>
                            <Input name="startDate" defaultValue={editingExperience?.startDate} required />
                          </div>
                          <div>
                            <Label>Bitiş</Label>
                            <Input name="endDate" defaultValue={editingExperience?.endDate} required />
                          </div>
                        </div>
                        <div>
                          <Label>Açıklama</Label>
                          <Textarea name="description" defaultValue={editingExperience?.description} required />
                        </div>
                        <div>
                          <Label>Öne Çıkanlar (virgülle ayırın)</Label>
                          <Textarea name="highlights" defaultValue={editingExperience?.highlights?.join(', ')} required />
                        </div>
                        <Button type="submit">Kaydet</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tip</TableHead>
                      <TableHead>Başlık</TableHead>
                      <TableHead>Şirket/Okul</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experience.map(exp => (
                      <TableRow key={exp.id}>
                        <TableCell><Badge>{exp.type === 'work' ? 'İş' : 'Eğitim'}</Badge></TableCell>
                        <TableCell>{exp.title}</TableCell>
                        <TableCell>{exp.company}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => { setEditingExperience(exp); setDialogOpen(true) }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteExperience(exp.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Referanslar</CardTitle>
                  <Dialog open={dialogOpen && editingTestimonial !== undefined} onOpenChange={(open) => {
                    setDialogOpen(open)
                    if (!open) setEditingTestimonial(null)
                  }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { setEditingTestimonial({}); setDialogOpen(true) }}>
                        <Plus className="mr-2" /> Yeni Referans
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingTestimonial?.id ? 'Referans Düzenle' : 'Yeni Referans'}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveTestimonial} className="space-y-4">
                        <div>
                          <Label>İsim</Label>
                          <Input name="name" defaultValue={editingTestimonial?.name} required />
                        </div>
                        <div>
                          <Label>Rol</Label>
                          <Input name="role" defaultValue={editingTestimonial?.role} required />
                        </div>
                        <div>
                          <Label>Yorum</Label>
                          <Textarea name="comment" defaultValue={editingTestimonial?.comment} required />
                        </div>
                        <div>
                          <Label>Avatar URL</Label>
                          <Input name="avatar" defaultValue={editingTestimonial?.avatar} required />
                        </div>
                        <Button type="submit">Kaydet</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İsim</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Yorum</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials.map(testimonial => (
                      <TableRow key={testimonial.id}>
                        <TableCell>{testimonial.name}</TableCell>
                        <TableCell>{testimonial.role}</TableCell>
                        <TableCell className="max-w-xs truncate">{testimonial.comment}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => { setEditingTestimonial(testimonial); setDialogOpen(true) }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>İletişim Mesajları</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İsim</TableHead>
                      <TableHead>E-posta</TableHead>
                      <TableHead>Konu</TableHead>
                      <TableHead>Mesaj</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map(message => (
                      <TableRow key={message.id}>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                        <TableCell>{new Date(message.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteMessage(message.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
