// Mock data for portfolio site - Ediz Gündoğdu

export const siteContent = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımda',
      skills: 'Yetenekler',
      portfolio: 'Portfolyo',
      experience: 'Deneyim',
      contact: 'İletişim'
    },
    hero: {
      name: 'Ediz Gündoğdu',
      title: 'Makine Mühendisi & Endüstriyel Tasarımcı',
      subtitle: 'Mühendislikte Yenilikçi Çözümler',
      description: 'Üretim süreçlerini modernleştiren, teknolojiyle insan faktörünü uyumlu hale getiren ve sürdürülebilir mühendislik çözümleri geliştiriyorum.',
      cta1: 'Portfolyomu İncele',
      cta2: 'İletişime Geç'
    },
    stats: [
      { value: '50+', label: 'Tamamlanan Proje' },
      { value: '45+', label: 'Mutlu Müşteri' },
      { value: '3.5+', label: 'Yıllık Deneyim' },
      { value: '5.0', label: 'Müşteri Memnuniyeti' }
    ],
    about: {
      title: 'Hakkımda',
      subtitle: 'Geniş deneyime sahip profesyonel makine mühendisi',
      bio: 'Bursa doğumlu bir makine mühendisiyim. Balıkesir Üniversitesi Makine Mühendisliği bölümünden mezun olduktan sonra kariyerime endüstriyel tasarım, üretim ve proje yönetimi alanlarında başladım.\n\nProje mühendisi ve proje yöneticisi olarak görev yaptığım dönemde, üretim hattı verimliliğini artıran sistemler geliştirdim, otomasyon çözümleri tasarladım ve üretim maliyetlerini düşüren optimizasyon süreçlerine öncülük ettim.\n\nUzmanlık alanlarım arasında 3D CAD modelleme, CNC işleme tasarımları, SolidWorks ve Fusion 360 gibi yazılımlarda teknik modelleme, FEM/FEA analizleri ve üretime uygun fonksiyonel tasarım süreçleri yer alıyor.',
      vision: 'Mühendislik vizyonum; üretim süreçlerini modernleştirmek, teknolojiyle insan faktörünü uyumlu hale getirmek ve sürdürülebilir çözümler üretmektir.',
      expertise: [
        'Proje mühendisliği, üretim yönetimi ve sistem entegrasyonu',
        '3D CAD/CAM/FEM/FEA analizleri ve prototip üretimi',
        'Tekstil, otomotiv ve özel makine sistemlerinde uygulama deneyimi',
        'Teknik danışmanlık ve mühendislik çözümleri geliştirme'
      ]
    },
    skills: {
      title: 'Yetenekler',
      categories: [
        {
          name: 'CAD/CAM Yazılımları',
          items: [
            { name: 'SolidWorks', level: 95 },
            { name: 'AutoCAD', level: 90 },
            { name: 'Fusion 360', level: 85 },
            { name: 'Inventor', level: 80 },
            { name: 'CATIA', level: 75 }
          ]
        },
        {
          name: 'Analiz & Simülasyon',
          items: [
            { name: 'FEM/FEA Analizleri', level: 85 },
            { name: 'ANSYS', level: 80 },
            { name: 'CFD Analizleri', level: 75 }
          ]
        },
        {
          name: 'Üretim & Tasarım',
          items: [
            { name: 'CNC İşleme Tasarımları', level: 90 },
            { name: 'Sac Metal Tasarımı', level: 88 },
            { name: 'Enjeksiyon Kalıp Tasarımı', level: 82 },
            { name: 'Prototip Geliştirme', level: 90 }
          ]
        },
        {
          name: 'Proje Yönetimi',
          items: [
            { name: 'Proje Planlama', level: 92 },
            { name: 'Ekip Yönetimi', level: 88 },
            { name: 'Maliyet Optimizasyonu', level: 85 }
          ]
        }
      ]
    },
    portfolio: {
      title: 'Portfolyo',
      subtitle: 'Gerçekleştirdiğim çeşitli endüstriyel ve ürün tasarım projeleri',
      filters: ['Tümü', 'Konveyör Sistemleri', 'Ürün Tasarımı', 'Otomasyon', 'Endüstriyel Sistemler', 'Mekanik Sistemler', 'Üretim'],
      projects: [
        {
          id: 1,
          title: 'Zincir Tahrikli Lineer Hareket Sistemi',
          category: 'Konveyör Sistemleri',
          year: '2024',
          description: 'Endüstriyel üretim hatları için yüksek hassasiyetli zincir tahrikli lineer hareket sistemi.',
          tags: ['CAD Tasarım', 'Üretim', 'Otomasyon'],
          image: 'https://images.unsplash.com/photo-1651615832931-1f0540d43ef0?w=800'
        },
        {
          id: 2,
          title: 'Dikey Helezon Konveyör Sistemi',
          category: 'Konveyör Sistemleri',
          year: '2024',
          description: 'Dikey malzeme taşıma için optimize edilmiş helezon konveyör mekanizması.',
          tags: ['Mekanik Tasarım', 'FEA Analiz'],
          image: 'https://images.pexels.com/photos/5532664/pexels-photo-5532664.jpeg?w=800'
        },
        {
          id: 3,
          title: 'Ultra Hafif Metal Valiz Tekerleği',
          category: 'Ürün Tasarımı',
          year: '2024',
          description: 'Dayanıklı ve hafif metal valiz tekerleği tasarımı.',
          tags: ['Ürün Tasarımı', '3D Modelleme'],
          image: 'https://images.unsplash.com/photo-1567093322102-6bdd32fba67d?w=800'
        },
        {
          id: 4,
          title: 'Otomatik Tartım Konveyör Sistemleri',
          category: 'Otomasyon',
          year: '2023',
          description: 'Üretim hattı entegre otomatik tartım ve paketleme konveyör sistemi.',
          tags: ['Otomasyon', 'Sistem Entegrasyonu'],
          image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800'
        },
        {
          id: 5,
          title: 'Katodik Kaplama Besleme Hatları',
          category: 'Endüstriyel Sistemler',
          year: '2023',
          description: 'Otomotiv sektörü için katodik kaplama üretim hattı tasarımı.',
          tags: ['Otomotiv', 'Üretim Hattı'],
          image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800'
        },
        {
          id: 6,
          title: 'Troleyli Konveyör Ünitesi',
          category: 'Konveyör Sistemleri',
          year: '2023',
          description: 'Tekstil ve boya endüstrisi için troleyli konveyör taşıma sistemi.',
          tags: ['Tekstil', 'Konveyör'],
          image: 'https://images.pexels.com/photos/5532668/pexels-photo-5532668.jpeg?w=800'
        },
        {
          id: 7,
          title: 'Asansör Mekanizmaları',
          category: 'Mekanik Sistemler',
          year: '2023',
          description: 'Endüstriyel asansör ve yükleme mekanizmaları tasarımı.',
          tags: ['Mekanik', 'Güvenlik'],
          image: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=800'
        },
        {
          id: 8,
          title: 'Endüstriyel Makine Parçaları',
          category: 'Üretim',
          year: '2023',
          description: 'Çeşitli endüstriyel uygulamalar için özel makine parçası tasarımları.',
          tags: ['CNC', 'Üretim'],
          image: 'https://images.pexels.com/photos/34353354/pexels-photo-34353354.jpeg?w=800'
        }
      ]
    },
    experience: {
      title: 'Deneyim & Eğitim',
      subtitle: 'Profesyonel kariyer yolculuğum ve eğitim geçmişim',
      work: [
        {
          title: 'Kurucu & Baş Tasarım Mühendisi',
          company: 'G.N.D.D. MECHANIC',
          period: 'Ağustos 2025 - Devam Ediyor',
          location: 'Bursa, Türkiye',
          description: 'Uluslararası müşterilere CAD modelleme, teknik çizim ve üretim odaklı mühendislik çözümleri sunuyorum.',
          achievements: [
            'Küresel mühendislik markası oluşturma',
            'Teknik uzmanlık ve iki dilli iletişim',
            'Müşteri odaklı proje yönetimi'
          ]
        },
        {
          title: 'Proje Yöneticisi',
          company: 'DM Dinamik Mühendislik',
          period: 'Haziran 2023 - Ağustos 2025',
          location: 'Bursa, Türkiye',
          description: 'İmalat proje yöneticisi olarak üretilebilir çizimler, müşteriye özel makine tasarımları ve üretim süreçlerinin yönetimi üzerinde çalıştım.',
          achievements: [
            'Üretim hattı verimliliğini %30 artırdım',
            '10+ özel makine projesi tamamladım',
            'Müşteri memnuniyeti %95 üzerinde'
          ]
        }
      ],
      education: [
        {
          degree: 'Makine Mühendisliği - Lisans',
          school: 'Balıkesir Üniversitesi',
          period: '2019 - 2023',
          location: 'Balıkesir, Türkiye',
          description: 'Makine mühendisliği eğitimi aldım. Teorik bilginin yanı sıra üretim süreçleri, tasarım mantığı ve endüstriyel sistemlerin optimizasyonu üzerine odaklandım.',
          highlights: [
            'Onur öğrencisi',
            'Çeşitli mühendislik projeleri',
            'AutoCAD ve SolidWorks sertifikaları'
          ]
        }
      ],
      certificates: [
        { name: 'Inventor Certified User', issuer: 'Autodesk', date: 'Ocak 2023' },
        { name: 'FEA Analysis', issuer: 'ANSYS', date: 'Ocak 2021' },
        { name: 'AutoCAD Certified', issuer: 'Autodesk', date: 'Ocak 2019' },
        { name: 'Problem Solving and Critical Thinking', issuer: 'Udemy', date: 'Mayıs 2024' }
      ]
    },
    testimonials: {
      title: 'Müşteri Görüşleri',
      subtitle: 'Çalıştığım müşterilerin deneyimleri ve görüşleri',
      items: [
        {
          name: 'Saklı Grup',
          role: 'Proje Ortağı',
          comment: 'Proje boyunca çok eğlendik ve birlikte bilgi edindik. Ediz\'in teknik bilgisi ve profesyonelliği olağanüstü.',
          avatar: 'https://cdn.cadcrowd.com/avatars/58/33/205833.1756285451.png'
        }
      ]
    },
    contact: {
      title: 'İletişime Geçin',
      subtitle: 'Projeleriniz hakkında konuşmak veya işbirliği yapmak için benimle iletişime geçin',
      info: {
        email: 'edizgndd@hotmail.com',
        phone: '+90 536 391 28 06',
        location: 'Bursa, Türkiye'
      },
      form: {
        name: 'Adınız',
        email: 'E-posta',
        subject: 'Konu',
        message: 'Mesajınız',
        submit: 'Mesaj Gönder'
      }
    },
    footer: {
      copyright: '© 2025 Ediz Gündoğdu. Tüm hakları saklıdır.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      portfolio: 'Portfolio',
      experience: 'Experience',
      contact: 'Contact'
    },
    hero: {
      name: 'Ediz Gündoğdu',
      title: 'Mechanical Engineer & Industrial Designer',
      subtitle: 'Innovative Solutions in Engineering',
      description: 'I modernize production processes, harmonize technology with the human factor, and develop sustainable engineering solutions.',
      cta1: 'View Portfolio',
      cta2: 'Get in Touch'
    },
    stats: [
      { value: '50+', label: 'Completed Projects' },
      { value: '45+', label: 'Happy Clients' },
      { value: '3.5+', label: 'Years Experience' },
      { value: '5.0', label: 'Client Satisfaction' }
    ],
    about: {
      title: 'About Me',
      subtitle: 'Professional mechanical engineer with extensive experience',
      bio: 'I am a mechanical engineer born in Bursa. After graduating from Balıkesir University Department of Mechanical Engineering, I started my career in industrial design, production and project management.\n\nAs a project engineer and project manager, I developed systems that increased production line efficiency, designed automation solutions and led optimization processes that reduced production costs.\n\nMy areas of expertise include 3D CAD modeling, CNC machining designs, technical modeling in software such as SolidWorks and Fusion 360, FEM/FEA analysis and production-ready functional design processes.',
      vision: 'My engineering vision is to modernize production processes, harmonize technology with the human factor and produce sustainable solutions.',
      expertise: [
        'Project engineering, production management and system integration',
        '3D CAD/CAM/FEM/FEA analysis and prototype production',
        'Application experience in textile, automotive and special machine systems',
        'Technical consulting and developing engineering solutions'
      ]
    },
    skills: {
      title: 'Skills',
      categories: [
        {
          name: 'CAD/CAM Software',
          items: [
            { name: 'SolidWorks', level: 95 },
            { name: 'AutoCAD', level: 90 },
            { name: 'Fusion 360', level: 85 },
            { name: 'Inventor', level: 80 },
            { name: 'CATIA', level: 75 }
          ]
        },
        {
          name: 'Analysis & Simulation',
          items: [
            { name: 'FEM/FEA Analysis', level: 85 },
            { name: 'ANSYS', level: 80 },
            { name: 'CFD Analysis', level: 75 }
          ]
        },
        {
          name: 'Production & Design',
          items: [
            { name: 'CNC Machining Design', level: 90 },
            { name: 'Sheet Metal Design', level: 88 },
            { name: 'Injection Mold Design', level: 82 },
            { name: 'Prototype Development', level: 90 }
          ]
        },
        {
          name: 'Project Management',
          items: [
            { name: 'Project Planning', level: 92 },
            { name: 'Team Management', level: 88 },
            { name: 'Cost Optimization', level: 85 }
          ]
        }
      ]
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Various industrial and product design projects I have completed',
      filters: ['All', 'Conveyor Systems', 'Product Design', 'Automation', 'Industrial Systems', 'Mechanical Systems', 'Manufacturing'],
      projects: [
        {
          id: 1,
          title: 'Chain Driven Linear Motion System',
          category: 'Conveyor Systems',
          year: '2024',
          description: 'High precision chain driven linear motion system for industrial production lines.',
          tags: ['CAD Design', 'Manufacturing', 'Automation'],
          image: 'https://images.unsplash.com/photo-1651615832931-1f0540d43ef0?w=800'
        },
        {
          id: 2,
          title: 'Vertical Screw Conveyor System',
          category: 'Conveyor Systems',
          year: '2024',
          description: 'Optimized screw conveyor mechanism for vertical material handling.',
          tags: ['Mechanical Design', 'FEA Analysis'],
          image: 'https://images.pexels.com/photos/5532664/pexels-photo-5532664.jpeg?w=800'
        },
        {
          id: 3,
          title: 'Ultra Light Metal Suitcase Wheel',
          category: 'Product Design',
          year: '2024',
          description: 'Durable and lightweight metal suitcase wheel design.',
          tags: ['Product Design', '3D Modeling'],
          image: 'https://images.unsplash.com/photo-1567093322102-6bdd32fba67d?w=800'
        },
        {
          id: 4,
          title: 'Automatic Weighing Conveyor Systems',
          category: 'Automation',
          year: '2023',
          description: 'Production line integrated automatic weighing and packaging conveyor system.',
          tags: ['Automation', 'System Integration'],
          image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800'
        },
        {
          id: 5,
          title: 'Cathodic Coating Feed Lines',
          category: 'Industrial Systems',
          year: '2023',
          description: 'Cathodic coating production line design for automotive sector.',
          tags: ['Automotive', 'Production Line'],
          image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800'
        },
        {
          id: 6,
          title: 'Trolley Conveyor Unit',
          category: 'Conveyor Systems',
          year: '2023',
          description: 'Trolley conveyor transport system for textile and dyeing industry.',
          tags: ['Textile', 'Conveyor'],
          image: 'https://images.pexels.com/photos/5532668/pexels-photo-5532668.jpeg?w=800'
        },
        {
          id: 7,
          title: 'Elevator Mechanisms',
          category: 'Mechanical Systems',
          year: '2023',
          description: 'Industrial elevator and loading mechanisms design.',
          tags: ['Mechanical', 'Safety'],
          image: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=800'
        },
        {
          id: 8,
          title: 'Industrial Machine Parts',
          category: 'Manufacturing',
          year: '2023',
          description: 'Custom machine part designs for various industrial applications.',
          tags: ['CNC', 'Manufacturing'],
          image: 'https://images.pexels.com/photos/34353354/pexels-photo-34353354.jpeg?w=800'
        }
      ]
    },
    experience: {
      title: 'Experience & Education',
      subtitle: 'My professional career journey and educational background',
      work: [
        {
          title: 'Founder & Chief Design Engineer',
          company: 'G.N.D.D. MECHANIC',
          period: 'August 2025 - Present',
          location: 'Bursa, Turkey',
          description: 'I provide CAD modeling, technical drawing and production-oriented engineering solutions to international clients.',
          achievements: [
            'Building a global engineering brand',
            'Technical expertise and bilingual communication',
            'Customer-focused project management'
          ]
        },
        {
          title: 'Project Manager',
          company: 'DM Dinamik Mühendislik',
          period: 'June 2023 - August 2025',
          location: 'Bursa, Turkey',
          description: 'As a manufacturing project manager, I worked on producible drawings, custom machine designs and management of production processes.',
          achievements: [
            'Increased production line efficiency by 30%',
            'Completed 10+ custom machine projects',
            'Customer satisfaction above 95%'
          ]
        }
      ],
      education: [
        {
          degree: 'Mechanical Engineering - Bachelor',
          school: 'Balıkesir University',
          period: '2019 - 2023',
          location: 'Balıkesir, Turkey',
          description: 'I received mechanical engineering education. In addition to theoretical knowledge, I focused on production processes, design logic and optimization of industrial systems.',
          highlights: [
            'Honor student',
            'Various engineering projects',
            'AutoCAD and SolidWorks certificates'
          ]
        }
      ],
      certificates: [
        { name: 'Inventor Certified User', issuer: 'Autodesk', date: 'January 2023' },
        { name: 'FEA Analysis', issuer: 'ANSYS', date: 'January 2021' },
        { name: 'AutoCAD Certified', issuer: 'Autodesk', date: 'January 2019' },
        { name: 'Problem Solving and Critical Thinking', issuer: 'Udemy', date: 'May 2024' }
      ]
    },
    testimonials: {
      title: 'Client Testimonials',
      subtitle: 'Experiences and opinions of clients I have worked with',
      items: [
        {
          name: 'Saklı Grup',
          role: 'Project Partner',
          comment: 'We had a lot of fun throughout the project and gained knowledge together. Ediz\'s technical knowledge and professionalism is outstanding.',
          avatar: 'https://cdn.cadcrowd.com/avatars/58/33/205833.1756285451.png'
        }
      ]
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Contact me to talk about your projects or collaborate',
      info: {
        email: 'edizgndd@hotmail.com',
        phone: '+90 536 391 28 06',
        location: 'Bursa, Turkey'
      },
      form: {
        name: 'Your Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message'
      }
    },
    footer: {
      copyright: '© 2025 Ediz Gündoğdu. All rights reserved.'
    }
  }
};

export const socialLinks = [
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { platform: 'GitHub', url: 'https://github.com', icon: 'Github' },
  { platform: 'Email', url: 'mailto:edizgndd@hotmail.com', icon: 'Mail' }
];