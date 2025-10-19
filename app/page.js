'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Menu, X, ChevronRight, Award, Briefcase, GraduationCap } from 'lucide-react'

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Tümü')
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [aboutInfo, setAboutInfo] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes, experienceRes, testimonialsRes, aboutRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experience'),
        fetch('/api/testimonials'),
        fetch('/api/about')
      ])
      
      const projectsData = await projectsRes.json()
      const skillsData = await skillsRes.json()
      const experienceData = await experienceRes.json()
      const testimonialsData = await testimonialsRes.json()
      const aboutData = await aboutRes.json()
      
      setProjects(projectsData)
      setSkills(skillsData)
      setExperience(experienceData)
      setTestimonials(testimonialsData)
      setAboutInfo(aboutData[0])
      setLoading(false)
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        alert('Mesajınız başarıyla gönderildi!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch (error) {
      alert('Mesaj gönderilirken hata oluştu')
    }
  }

  const filteredProjects = activeFilter === 'Tümü' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  const categories = ['Tümü', ...new Set(projects.map(p => p.category))]

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-2xl">Yükleniyor...</div></div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Ediz Gündoğdu</h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <a href="#home" className="hover:text-primary transition">Ana Sayfa</a>
              <a href="#about" className="hover:text-primary transition">Hakkımda</a>
              <a href="#skills" className="hover:text-primary transition">Yetenekler</a>
              <a href="#portfolio" className="hover:text-primary transition">Portfolyo</a>
              <a href="#experience" className="hover:text-primary transition">Deneyim</a>
              <a href="#contact" className="hover:text-primary transition">İletişim</a>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-4">
              <a href="#home" onClick={() => setMenuOpen(false)}>Ana Sayfa</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>Hakkımda</a>
              <a href="#skills" onClick={() => setMenuOpen(false)}>Yetenekler</a>
              <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolyo</a>
              <a href="#experience" onClick={() => setMenuOpen(false)}>Deneyim</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>İletişim</a>
              <a href="/admin" className="text-primary">Admin Panel</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                Ediz Gündoğdu
              </h2>
              <p className="text-2xl text-muted-foreground mb-6">
                Makine Mühendisi & Endüstriyel Tasarımcı
              </p>
              <h3 className="text-xl font-semibold mb-4">Mühendislikte Yenilikçi Çözümler</h3>
              <p className="text-lg mb-8">
                Üretim süreçlerini modernleştiren, teknolojiyle insan faktörünü uyumlu hale getiren ve sürdürülebilir mühendislik çözümleri geliştiriyorum.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <a href="#portfolio">Portfolyomu İncele</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#contact">İletişime Geç</a>
                </Button>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1581092335331-5e00ac65e934" alt="Engineering" className="rounded-lg shadow-2xl" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-muted-foreground">Tamamlanan Proje</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary">45+</p>
                <p className="text-muted-foreground">Mutlu Müşteri</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary">3.5+</p>
                <p className="text-muted-foreground">Yıllık Deneyim</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary">5.0</p>
                <p className="text-muted-foreground">Müşteri Memnuniyeti</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Hakkımda</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Geniş deneyime sahip profesyonel makine mühendisi</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={aboutInfo?.image || 'https://images.unsplash.com/photo-1581092333203-42374bcf7d89'} alt="Ediz Gündoğdu" className="rounded-lg shadow-lg" />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-3xl font-bold text-primary">3.5+</p>
                    <p className="text-sm text-muted-foreground">Yıl Deneyim</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-3xl font-bold text-primary">50+</p>
                    <p className="text-sm text-muted-foreground">Proje</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Biyografi</h3>
              <p className="text-muted-foreground mb-6">
                {aboutInfo?.bio}
              </p>
              
              <h4 className="text-xl font-semibold mb-3">Vizyon</h4>
              <p className="text-muted-foreground mb-6">
                {aboutInfo?.vision}
              </p>
              
              <h4 className="text-xl font-semibold mb-3">Uzmanlık Alanları</h4>
              <ul className="space-y-2">
                {aboutInfo?.expertise?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Yetenekler</h2>
          
          <Tabs defaultValue="CAD/CAM Yazılımları" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {[...new Set(skills.map(s => s.category))].map(cat => (
                <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
              ))}
            </TabsList>
            
            {[...new Set(skills.map(s => s.category))].map(cat => (
              <TabsContent key={cat} value={cat}>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.filter(s => s.category === cat).map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <Progress value={skill.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Portfolyo</h2>
          <p className="text-center text-muted-foreground mb-12">Gerçekleştirdiğim çeşitli endüstriyel ve ürün tasarım projeleri</p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeFilter === cat ? 'default' : 'outline'}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition">
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge>{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Deneyim & Eğitim</h2>
          <p className="text-center text-muted-foreground mb-12">Profesyonel kariyer yolculuğum ve eğitim geçmişim</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="text-primary" />
                İş Deneyimi
              </h3>
              <div className="space-y-6">
                {experience.filter(e => e.type === 'work').map(exp => (
                  <Card key={exp.id}>
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                      <p className="font-semibold text-primary mb-2">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exp.startDate} - {exp.endDate}</p>
                      <p className="text-sm text-muted-foreground mb-4">{exp.location}</p>
                      <p className="mb-4">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.highlights?.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="text-primary mt-0.5 flex-shrink-0" size={16} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="text-primary" />
                Eğitim
              </h3>
              <div className="space-y-6">
                {experience.filter(e => e.type === 'education').map(exp => (
                  <Card key={exp.id}>
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                      <p className="font-semibold text-primary mb-2">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exp.startDate} - {exp.endDate}</p>
                      <p className="text-sm text-muted-foreground mb-4">{exp.location}</p>
                      <p className="mb-4">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.highlights?.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="text-primary mt-0.5 flex-shrink-0" size={16} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Müşteri Görüşleri</h2>
          <p className="text-center text-muted-foreground mb-12">Çalıştığım müşterilerin deneyimleri ve görüşleri</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">İletişime Geçin</h2>
          <p className="text-center text-muted-foreground mb-12">Projeleriniz hakkında konuşmak veya işbirliği yapmak için benimle iletişime geçin</p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Mail className="text-primary" />
                      <div>
                        <h4 className="font-semibold">E-posta</h4>
                        <a href="mailto:edizgndd@hotmail.com" className="text-muted-foreground hover:text-primary">edizgndd@hotmail.com</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Phone className="text-primary" />
                      <div>
                        <h4 className="font-semibold">Telefon</h4>
                        <a href="tel:+905363912806" className="text-muted-foreground hover:text-primary">+90 536 391 28 06</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-primary" />
                      <div>
                        <h4 className="font-semibold">Konum</h4>
                        <p className="text-muted-foreground">Bursa, Türkiye</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <img src="https://images.unsplash.com/photo-1600869009498-8d429f88d4f5" alt="Engineering" className="rounded-lg mt-6" />
            </div>
            
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Mesaj Gönder</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Adınız</label>
                  <Input 
                    placeholder="Adınız ve soyadınız"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">E-posta</label>
                  <Input 
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Konu</label>
                  <Input 
                    placeholder="Mesaj konusu"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Mesajınız</label>
                  <Textarea 
                    placeholder="Mesajınızı buraya yazın..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Mesaj Gönder
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Ediz Gündoğdu. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  )
}
