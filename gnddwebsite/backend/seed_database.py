"import asyncio
from database import *
from models import *

async def seed_database():
    print(\"Starting database seeding...\")
    
    # Clear existing data
    await personal_info_collection.delete_many({})
    await about_collection.delete_many({})
    await services_collection.delete_many({})
    await skills_collection.delete_many({})
    await projects_collection.delete_many({})
    await experience_collection.delete_many({})
    await education_collection.delete_many({})
    await certifications_collection.delete_many({})
    await testimonials_collection.delete_many({})
    
    # Personal Info
    personal_info = {
        \"id\": \"1\",
        \"name\": \"Ediz Gündoğdu\",
        \"title\": \"Makine Mühendisi & Endüstriyel Tasarımcı\",
        \"tagline\": \"Mühendislikte Yenilikçi Çözümler\",
        \"description\": \"Üretim süreçlerini modernleştiren, teknolojiyle insan faktörünü uyumlu hale getiren ve sürdürülebilir mühendislik çözümleri geliştiriyorum.\",
        \"email\": \"edizgndd@hotmail.com\",
        \"phone\": \"+90 536 391 28 06\",
        \"location\": \"Bursa, Türkiye\",
        \"image\": \"https://images.unsplash.com/photo-1581092333203-42374bcf7d89\",
        \"heroImage\": \"https://images.unsplash.com/photo-1606337321936-02d1b1a4d5ef\",
        \"cadcrowdRank\": \"Top 536 / 110,417\",
        \"rating\": \"5.0★\"
    }
    await personal_info_collection.insert_one(personal_info)
    
    # About
    about = {
        \"id\": \"1\",
        \"biography\": \"Bursa doğumlu bir makine mühendisiyim. Balıkesir Üniversitesi Makine Mühendisliği bölümünden mezun olduktan sonra kariyerime endüstriyel tasarım, üretim ve proje yönetimi alanlarında başladım.

Proje mühendisi ve proje yöneticisi olarak görev yaptığım dönemde, üretim hattı verimliliğini artıran sistemler geliştirdim, otomasyon çözümleri tasarladım ve üretim maliyetlerini düşüren optimizasyon süreçlerine öncülük ettim.

Uzmanlık alanlarım arasında 3D CAD modelleme, CNC işleme tasarımları, SolidWorks ve Fusion 360 gibi yazılımlarda teknik modelleme, FEM/FEA analizleri ve üretime uygun fonksiyonel tasarım süreçleri yer alıyor.

Bugün, bağımsız olarak çalıştığım danışmanlık yapısında firmalara proje optimizasyonu, ürün geliştirme ve sistem verimliliği konularında destek veriyorum. Amacım, mühendisliğin temel değerlerini koruyarak, her müşteriye özgü, üretilebilir, yenilikçi ve estetik çözümler sunmak.\",
        \"vision\": \"Mühendislik vizyonum; üretim süreçlerini modernleştirmek, teknolojiyle insan faktörünü uyumlu hale getirmek ve sürdürülebilir çözümler üretmektir.\",
        \"expertise\": [
            \"Proje mühendisliği, üretim yönetimi ve sistem entegrasyonu\",
            \"3D CAD/CAM/FEM/FEA analizleri ve prototip üretimi\",
            \"Tekstil, otomotiv ve özel makine sistemlerinde uygulama deneyimi\",
            \"Teknik danışmanlık ve mühendislik çözümleri geliştirme\"
        ],
        \"yearsExperience\": \"3.5+\",
        \"projectsCount\": \"50+\"
    }
    await about_collection.insert_one(about)
    
    # Services
    services = [
        {\"id\": \"1\", \"title\": \"Özel Makine Tasarımı\", \"description\": \"Müşteri ihtiyaçlarına özel, üretilebilir ve verimli makine sistemleri geliştirme\"},
        {\"id\": \"2\", \"title\": \"Konveyör Sistemleri\", \"description\": \"Zincir tahrikli, helezon ve troleyli konveyör sistemleri tasarımı ve uygulaması\"},
        {\"id\": \"3\", \"title\": \"Otomasyon Çözümleri\", \"description\": \"Üretim süreçlerini otomatikleştiren akıllı sistem tasarımları\"},
        {\"id\": \"4\", \"title\": \"3D Modelleme & Analiz\", \"description\": \"Detaylı 3D CAD modelleme, FEA/FEM analizleri ve teknik çizimler\"},
        {\"id\": \"5\", \"title\": \"Üretim Optimizasyonu\", \"description\": \"Mevcut üretim hatlarının verimlilik ve maliyet optimizasyonu\"},
        {\"id\": \"6\", \"title\": \"Ürün Geliştirme\", \"description\": \"Konseptten üretime, endüstriyel ürün tasarımı ve geliştirme danışmanlığı\"}
    ]
    await services_collection.insert_many(services)
    
    # Skills
    skills = [
        {
            \"id\": \"1\",
            \"category\": \"CAD/CAM Yazılımları\",
            \"items\": [
                {\"name\": \"SolidWorks\", \"level\": 95},
                {\"name\": \"AutoCAD\", \"level\": 90},
                {\"name\": \"Fusion 360\", \"level\": 85},
                {\"name\": \"Inventor\", \"level\": 80},
                {\"name\": \"CATIA\", \"level\": 75}
            ]
        },
        {
            \"id\": \"2\",
            \"category\": \"Analiz & Simülasyon\",
            \"items\": [
                {\"name\": \"FEM/FEA Analizleri\", \"level\": 85},
                {\"name\": \"ANSYS\", \"level\": 80},
                {\"name\": \"CFD Analizleri\", \"level\": 75}
            ]
        },
        {
            \"id\": \"3\",
            \"category\": \"Üretim & Tasarım\",
            \"items\": [
                {\"name\": \"CNC İşleme Tasarımları\", \"level\": 90},
                {\"name\": \"Sac Metal Tasarımı\", \"level\": 88},
                {\"name\": \"Enjeksiyon Kalıp Tasarımı\", \"level\": 82},
                {\"name\": \"Prototip Geliştirme\", \"level\": 90}
            ]
        },
        {
            \"id\": \"4\",
            \"category\": \"Proje Yönetimi\",
            \"items\": [
                {\"name\": \"Proje Planlama\", \"level\": 92},
                {\"name\": \"Ekip Yönetimi\", \"level\": 88},
                {\"name\": \"Maliyet Optimizasyonu\", \"level\": 85}
            ]
        }
    ]
    await skills_collection.insert_many(skills)
    
    # Projects
    projects = [
        {\"id\": \"1\", \"title\": \"Zincir Tahrikli Lineer Hareket Sistemi\", \"category\": \"Konveyör Sistemleri\", \"year\": \"2024\", \"description\": \"Endüstriyel üretim hatları için yüksek hassasiyetli zincir tahrikli lineer hareket sistemi.\", \"tags\": [\"CAD Tasarım\", \"Üretim\", \"Otomasyon\"], \"image\": \"https://images.unsplash.com/photo-1651615832931-1f0540d43ef0\"},
        {\"id\": \"2\", \"title\": \"Dikey Helezon Konveyör Sistemi\", \"category\": \"Konveyör Sistemleri\", \"year\": \"2024\", \"description\": \"Dikey malzeme taşıma için optimize edilmiş helezon konveyör mekanizması.\", \"tags\": [\"Mekanik Tasarım\", \"FEA Analiz\"], \"image\": \"https://images.pexels.com/photos/5532664/pexels-photo-5532664.jpeg\"},
        {\"id\": \"3\", \"title\": \"Ultra Hafif Metal Valiz Tekerleği\", \"category\": \"Ürün Tasarımı\", \"year\": \"2024\", \"description\": \"Dayanıklı ve hafif metal valiz tekerleği tasarımı.\", \"tags\": [\"Ürün Tasarımı\", \"3D Modelleme\"], \"image\": \"https://images.unsplash.com/photo-1567093322102-6bdd32fba67d\"},
        {\"id\": \"4\", \"title\": \"Otomatik Tartım Konveyör Sistemleri\", \"category\": \"Otomasyon\", \"year\": \"2023\", \"description\": \"Üretim hattı entegre otomatik tartım ve paketleme konveyör sistemi.\", \"tags\": [\"Otomasyon\", \"Sistem Entegrasyonu\"], \"image\": \"https://images.unsplash.com/photo-1647427060118-4911c9821b82\"},
        {\"id\": \"5\", \"title\": \"Katodik Kaplama Besleme Hatları\", \"category\": \"Endüstriyel Sistemler\", \"year\": \"2023\", \"description\": \"Otomotiv sektörü için katodik kaplama üretim hattı tasarımı.\", \"tags\": [\"Otomotiv\", \"Üretim Hattı\"], \"image\": \"https://images.unsplash.com/photo-1496247749665-49cf5b1022e9\"},
        {\"id\": \"6\", \"title\": \"Troleyli Konveyör Ünitesi\", \"category\": \"Konveyör Sistemleri\", \"year\": \"2023\", \"description\": \"Tekstil ve boya endüstrisi için troleyli konveyör taşıma sistemi.\", \"tags\": [\"Tekstil\", \"Konveyör\"], \"image\": \"https://images.pexels.com/photos/5532668/pexels-photo-5532668.jpeg\"},
        {\"id\": \"7\", \"title\": \"Asansör Mekanizmaları\", \"category\": \"Mekanik Sistemler\", \"year\": \"2023\", \"description\": \"Endüstriyel asansör ve yükleme mekanizmaları tasarımı.\", \"tags\": [\"Mekanik\", \"Güvenlik\"], \"image\": \"https://images.unsplash.com/photo-1455165814004-1126a7199f9b\"},
        {\"id\": \"8\", \"title\": \"Endüstriyel Makine Parçaları\", \"category\": \"Üretim\", \"year\": \"2023\", \"description\": \"Çeşitli endüstriyel uygulamalar için özel makine parçası tasarımları.\", \"tags\": [\"CNC\", \"Üretim\"], \"image\": \"https://images.pexels.com/photos/34353354/pexels-photo-34353354.jpeg\"}
    ]
    await projects_collection.insert_many(projects)
    
    # Experience
    experience = [
        {
            \"id\": \"1\",
            \"title\": \"Kurucu & Baş Tasarım Mühendisi\",
            \"company\": \"G.N.D.D. MECHANIC\",
            \"period\": \"Ağustos 2025 - Devam Ediyor\",
            \"location\": \"Bursa, Türkiye\",
            \"description\": \"Uluslararası müşterilere CAD modelleme, teknik çizim ve üretim odaklı mühendislik çözümleri sunuyorum. Marka kimliği, alan adı edinimi ve ticari marka tescili üzerinde aktif olarak çalışıyorum.\",
            \"highlights\": [
                \"Küresel mühendislik markası oluşturma\",
                \"Teknik uzmanlık ve iki dilli iletişim\",
                \"Müşteri odaklı proje yönetimi\"
            ]
        },
        {
            \"id\": \"2\",
            \"title\": \"Proje Yöneticisi\",
            \"company\": \"DM Dinamik Mühendislik\",
            \"period\": \"Haziran 2023 - Ağustos 2025\",
            \"location\": \"Bursa, Türkiye\",
            \"description\": \"İmalat proje yöneticisi olarak üretilebilir çizimler, müşteriye özel makine tasarımları ve üretim süreçlerinin yönetimi üzerinde çalıştım.\",
            \"highlights\": [
                \"Üretim hattı verimliliğini %30 artırdım\",
                \"10+ özel makine projesi tamamladım\",
                \"Müşteri memnuniyeti %95 üzerinde\"
            ]
        }
    ]
    await experience_collection.insert_many(experience)
    
    # Education
    education = [
        {
            \"id\": \"1\",
            \"degree\": \"Makine Mühendisliği - Lisans\",
            \"school\": \"Balıkesir Üniversitesi\",
            \"period\": \"2019 - 2023\",
            \"location\": \"Balıkesir, Türkiye\",
            \"description\": \"Makine mühendisliği eğitimi aldım. Teorik bilginin yanı sıra üretim süreçleri, tasarım mantığı ve endüstriyel sistemlerin optimizasyonu üzerine odaklandım.\",
            \"achievements\": [
                \"Onur öğrencisi\",
                \"Çeşitli mühendislik projeleri\",
                \"AutoCAD ve SolidWorks sertifikaları\"
            ]
        }
    ]
    await education_collection.insert_many(education)
    
    # Certifications
    certifications = [
        {\"id\": \"1\", \"name\": \"Inventor Certified User\", \"issuer\": \"Autodesk\", \"date\": \"Ocak 2023\"},
        {\"id\": \"2\", \"name\": \"FEA Analysis\", \"issuer\": \"ANSYS\", \"date\": \"Ocak 2021\"},
        {\"id\": \"3\", \"name\": \"AutoCAD Certified\", \"issuer\": \"Autodesk\", \"date\": \"Ocak 2019\"},
        {\"id\": \"4\", \"name\": \"Problem Solving and Critical Thinking\", \"issuer\": \"Udemy\", \"date\": \"Mayıs 2024\"}
    ]
    await certifications_collection.insert_many(certifications)
    
    # Testimonials
    testimonials = [
        {
            \"id\": \"1\",
            \"name\": \"Saklı Grup\",
            \"role\": \"Proje Ortağı\",
            \"content\": \"Proje boyunca çok eğlendik ve birlikte bilgi edindik. Ediz'in teknik bilgisi ve profesyonelliği olağanüstü.\",
            \"image\": \"https://cdn.cadcrowd.com/avatars/58/33/205833.1756285451.png\",
            \"rating\": 5
        },
        {
            \"id\": \"2\",
            \"name\": \"Katıana Xınc\",
            \"role\": \"Müşteri\",
            \"content\": \"Ediz ile çalışmak çok kolaydı. İhtiyacımız olanı hızlıca anladı ve tasarımı kısa sürede teslim etti. Dosyalar üretime hazırdı, ekstra bir zorluk yoktu. Teknik detaylar konusunda çok bilgili.\",
            \"image\": \"https://cdn.cadcrowd.com/avatars/57/48/205748.1756227780.png\",
            \"rating\": 5
        },
        {
            \"id\": \"3\",
            \"name\": \"Mehmet Yılmaz\",
            \"role\": \"Üretim Müdürü - Tekstil Sektörü\",
            \"content\": \"Konveyör sistemimiz için tasarladığı çözüm, üretim hattımızın verimliliğini büyük ölçüde artırdı. Hem tasarım hem de uygulama aşamasında mükemmel bir iş çıkardı.\",
            \"image\": None,
            \"rating\": 5
        }
    ]
    await testimonials_collection.insert_many(testimonials)
    
    print(\"✓ Database seeding completed successfully!\")
    await close_db_connection()

if __name__ == \"__main__\":
    asyncio.run(seed_database())
"