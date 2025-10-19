import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_data():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Seed Skills
    await db.skills.delete_many({})
    skills = [
        {"id": "skill-1", "category": {"tr": "CAD/CAM Yazılımları", "en": "CAD/CAM Software"}, "name": "SolidWorks", "percentage": 95, "order": 1},
        {"id": "skill-2", "category": {"tr": "CAD/CAM Yazılımları", "en": "CAD/CAM Software"}, "name": "AutoCAD", "percentage": 90, "order": 2},
        {"id": "skill-3", "category": {"tr": "CAD/CAM Yazılımları", "en": "CAD/CAM Software"}, "name": "Fusion 360", "percentage": 85, "order": 3},
        {"id": "skill-4", "category": {"tr": "CAD/CAM Yazılımları", "en": "CAD/CAM Software"}, "name": "Inventor", "percentage": 80, "order": 4},
        {"id": "skill-5", "category": {"tr": "CAD/CAM Yazılımları", "en": "CAD/CAM Software"}, "name": "CATIA", "percentage": 75, "order": 5},
        {"id": "skill-6", "category": {"tr": "Analiz & Simülasyon", "en": "Analysis & Simulation"}, "name": "FEM/FEA Analizleri", "percentage": 85, "order": 6},
        {"id": "skill-7", "category": {"tr": "Analiz & Simülasyon", "en": "Analysis & Simulation"}, "name": "ANSYS", "percentage": 80, "order": 7},
        {"id": "skill-8", "category": {"tr": "Analiz & Simülasyon", "en": "Analysis & Simulation"}, "name": "CFD Analizleri", "percentage": 75, "order": 8},
        {"id": "skill-9", "category": {"tr": "Üretim & Tasarım", "en": "Production & Design"}, "name": "CNC İşleme Tasarımları", "percentage": 90, "order": 9},
        {"id": "skill-10", "category": {"tr": "Üretim & Tasarım", "en": "Production & Design"}, "name": "Sac Metal Tasarımı", "percentage": 88, "order": 10},
        {"id": "skill-11", "category": {"tr": "Üretim & Tasarım", "en": "Production & Design"}, "name": "Enjeksiyon Kalıp Tasarımı", "percentage": 82, "order": 11},
        {"id": "skill-12", "category": {"tr": "Üretim & Tasarım", "en": "Production & Design"}, "name": "Prototip Geliştirme", "percentage": 90, "order": 12},
        {"id": "skill-13", "category": {"tr": "Proje Yönetimi", "en": "Project Management"}, "name": "Proje Planlama", "percentage": 92, "order": 13},
        {"id": "skill-14", "category": {"tr": "Proje Yönetimi", "en": "Project Management"}, "name": "Ekip Yönetimi", "percentage": 88, "order": 14},
        {"id": "skill-15", "category": {"tr": "Proje Yönetimi", "en": "Project Management"}, "name": "Maliyet Optimizasyonu", "percentage": 85, "order": 15},
    ]
    await db.skills.insert_many(skills)
    
    # Seed Portfolio
    await db.portfolio.delete_many({})
    portfolio = [
        {
            "id": "port-1",
            "title": {"tr": "Zincir Tahrikli Lineer Hareket Sistemi", "en": "Chain Driven Linear Motion System"},
            "description": {"tr": "Endüstriyel üretim hatları için yüksek hassasiyetli zincir tahrikli lineer hareket sistemi.", "en": "High precision chain driven linear motion system for industrial production lines."},
            "image": "https://images.unsplash.com/photo-1651615832931-1f0540d43ef0",
            "category": "Konveyör Sistemleri",
            "year": "2024",
            "tags": ["CAD Tasarım", "Üretim", "Otomasyon"],
            "order": 1
        },
        {
            "id": "port-2",
            "title": {"tr": "Dikey Helezon Konveyör Sistemi", "en": "Vertical Screw Conveyor System"},
            "description": {"tr": "Dikey malzeme taşıma için optimize edilmiş helezon konveyör mekanizması.", "en": "Optimized screw conveyor mechanism for vertical material handling."},
            "image": "https://images.pexels.com/photos/5532664/pexels-photo-5532664.jpeg",
            "category": "Konveyör Sistemleri",
            "year": "2024",
            "tags": ["Mekanik Tasarım", "FEA Analiz"],
            "order": 2
        },
        {
            "id": "port-3",
            "title": {"tr": "Ultra Hafif Metal Valiz Tekerleği", "en": "Ultra Light Metal Suitcase Wheel"},
            "description": {"tr": "Dayanıklı ve hafif metal valiz tekerleği tasarımı.", "en": "Durable and lightweight metal suitcase wheel design."},
            "image": "https://images.unsplash.com/photo-1567093322102-6bdd32fba67d",
            "category": "Ürün Tasarımı",
            "year": "2024",
            "tags": ["Ürün Tasarımı", "3D Modelleme"],
            "order": 3
        },
        {
            "id": "port-4",
            "title": {"tr": "Otomatik Tartım Konveyör Sistemleri", "en": "Automatic Weighing Conveyor Systems"},
            "description": {"tr": "Üretim hattı entegre otomatik tartım ve paketleme konveyör sistemi.", "en": "Production line integrated automatic weighing and packaging conveyor system."},
            "image": "https://images.unsplash.com/photo-1647427060118-4911c9821b82",
            "category": "Otomasyon",
            "year": "2023",
            "tags": ["Otomasyon", "Sistem Entegrasyonu"],
            "order": 4
        },
    ]
    await db.portfolio.insert_many(portfolio)
    
    # Seed Experience
    await db.experience.delete_many({})
    experience = [
        {
            "id": "exp-1",
            "position": {"tr": "Kurucu & Baş Tasarım Mühendisi", "en": "Founder & Lead Design Engineer"},
            "company": "G.N.D.D. MECHANIC",
            "period": {"tr": "Ağustos 2025 - Devam Ediyor", "en": "August 2025 - Present"},
            "location": {"tr": "Bursa, Türkiye", "en": "Bursa, Turkey"},
            "description": {"tr": "Uluslararası müşterilere CAD modelleme, teknik çizim ve üretim odaklı mühendislik çözümleri sunuyorum.", "en": "Providing CAD modeling, technical drawing and production-oriented engineering solutions to international clients."},
            "achievements": {
                "tr": ["Küresel mühendislik markası oluşturma", "Teknik uzmanlık ve iki dilli iletişim", "Müşteri odaklı proje yönetimi"],
                "en": ["Building global engineering brand", "Technical expertise and bilingual communication", "Customer-focused project management"]
            },
            "order": 1,
            "type": "work"
        },
        {
            "id": "exp-2",
            "position": {"tr": "Proje Yöneticisi", "en": "Project Manager"},
            "company": "DM Dinamik Mühendislik",
            "period": {"tr": "Haziran 2023 - Ağustos 2025", "en": "June 2023 - August 2025"},
            "location": {"tr": "Bursa, Türkiye", "en": "Bursa, Turkey"},
            "description": {"tr": "İmalat proje yöneticisi olarak üretilebilir çizimler, müşteriye özel makine tasarımları ve üretim süreçlerinin yönetimi üzerinde çalıştım.", "en": "Worked as manufacturing project manager on producible drawings, custom machine designs and production process management."},
            "achievements": {
                "tr": ["Üretim hattı verimliliğini %30 artırdım", "10+ özel makine projesi tamamladım", "Müşteri memnuniyeti %95 üzerinde"],
                "en": ["Increased production line efficiency by 30%", "Completed 10+ custom machine projects", "Customer satisfaction over 95%"]
            },
            "order": 2,
            "type": "work"
        },
        {
            "id": "exp-3",
            "position": {"tr": "Makine Mühendisliği - Lisans", "en": "Mechanical Engineering - Bachelor"},
            "company": "Balıkesir Üniversitesi",
            "period": {"tr": "2019 - 2023", "en": "2019 - 2023"},
            "location": {"tr": "Balıkesir, Türkiye", "en": "Balıkesir, Turkey"},
            "description": {"tr": "Makine mühendisliği eğitimi aldım. Teorik bilginin yanı sıra üretim süreçleri, tasarım mantığı ve endüstriyel sistemlerin optimizasyonu üzerine odaklandım.", "en": "Studied mechanical engineering. Focused on production processes, design logic and optimization of industrial systems in addition to theoretical knowledge."},
            "achievements": {
                "tr": ["Onur öğrencisi", "Çeşitli mühendislik projeleri", "AutoCAD ve SolidWorks sertifikaları"],
                "en": ["Honor student", "Various engineering projects", "AutoCAD and SolidWorks certificates"]
            },
            "order": 3,
            "type": "education"
        }
    ]
    await db.experience.insert_many(experience)
    
    # Seed Certificates
    await db.certificates.delete_many({})
    certificates = [
        {"id": "cert-1", "title": {"tr": "Inventor Sertifikalı Kullanıcı", "en": "Inventor Certified User"}, "issuer": "Autodesk", "date": "Ocak 2023", "order": 1},
        {"id": "cert-2", "title": {"tr": "FEA Analiz", "en": "FEA Analysis"}, "issuer": "ANSYS", "date": "Ocak 2021", "order": 2},
        {"id": "cert-3", "title": {"tr": "AutoCAD Sertifikalı", "en": "AutoCAD Certified"}, "issuer": "Autodesk", "date": "Ocak 2019", "order": 3},
        {"id": "cert-4", "title": {"tr": "Problem Çözme ve Eleştirel Düşünme", "en": "Problem Solving and Critical Thinking"}, "issuer": "Udemy", "date": "Mayıs 2024", "order": 4},
    ]
    await db.certificates.insert_many(certificates)
    
    # Seed Testimonials
    await db.testimonials.delete_many({})
    testimonials = [
        {
            "id": "test-1",
            "name": "Saklı Grup",
            "role": {"tr": "Proje Ortağı", "en": "Project Partner"},
            "content": {"tr": "Proje boyunca çok eğlendik ve birlikte bilgi edindik. Ediz'in teknik bilgisi ve profesyonelliği olağanüstü.", "en": "We had a lot of fun throughout the project and learned together. Ediz's technical knowledge and professionalism are outstanding."},
            "image": "https://cdn.cadcrowd.com/avatars/58/33/205833.1756285451.png",
            "order": 1
        }
    ]
    await db.testimonials.insert_many(testimonials)
    
    print("Complete data seeded successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_data())
