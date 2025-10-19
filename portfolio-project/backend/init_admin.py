import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def init_admin():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Create admin user
    username = "edizgndd"
    password = "280620Gndd."
    password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    
    await db.admins.delete_many({})
    await db.admins.insert_one({
        "id": "admin-1",
        "username": username,
        "password_hash": password_hash
    })
    
    print(f"Admin user created: {username}")
    
    # Initialize hero
    await db.hero.delete_many({})
    await db.hero.insert_one({
        "id": "hero-1",
        "name": {
            "tr": "Ediz Gündoğdu",
            "en": "Ediz Gündoğdu"
        },
        "title": {
            "tr": "Makine Mühendisi & Endüstriyel Tasarımcı",
            "en": "Mechanical Engineer & Industrial Designer"
        },
        "description": {
            "tr": "Üretim süreçlerini modernleştiren, teknolojiyle insan faktörünü uyumlu hale getiren ve sürdürülebilir mühendislik çözümleri geliştiriyorum.",
            "en": "I develop sustainable engineering solutions that modernize production processes and harmonize technology with human factors."
        },
        "image": "https://images.unsplash.com/photo-1581092333203-42374bcf7d89"
    })
    
    # Initialize stats
    await db.stats.delete_many({})
    stats = [
        {"id": "stat-1", "value": "50+", "label": {"tr": "Tamamlanan Proje", "en": "Completed Projects"}, "order": 1},
        {"id": "stat-2", "value": "45+", "label": {"tr": "Mutlu Müşteri", "en": "Happy Clients"}, "order": 2},
        {"id": "stat-3", "value": "3.5+", "label": {"tr": "Yıllık Deneyim", "en": "Years Experience"}, "order": 3},
        {"id": "stat-4", "value": "5.0", "label": {"tr": "Müşteri Memnuniyeti", "en": "Client Satisfaction"}, "order": 4}
    ]
    await db.stats.insert_many(stats)
    
    # Initialize about
    await db.about.delete_many({})
    await db.about.insert_one({
        "id": "about-1",
        "image": "https://images.unsplash.com/photo-1581092333203-42374bcf7d89",
        "experience": "3.5+",
        "projects": "50+",
        "bio": {
            "tr": "Bursa doğumlu bir makine mühendisiyim. Balıkesir Üniversitesi Makine Mühendisliği bölümünden mezun olduktan sonra kariyerime endüstriyel tasarım, üretim ve proje yönetimi alanlarında başladım.",
            "en": "I am a mechanical engineer from Bursa. After graduating from Balıkesir University Mechanical Engineering department, I started my career in industrial design, production and project management."
        },
        "vision": {
            "tr": "Mühendislik vizyonum; üretim süreçlerini modernleştirmek, teknolojiyle insan faktörünü uyumlu hale getirmek ve sürdürülebilir çözümler üretmektir.",
            "en": "My engineering vision is to modernize production processes, harmonize technology with human factors, and produce sustainable solutions."
        },
        "expertise": {
            "tr": ["Proje mühendisliği, üretim yönetimi ve sistem entegrasyonu", "3D CAD/CAM/FEM/FEA analizleri ve prototip üretimi", "Tekstil, otomotiv ve özel makine sistemlerinde uygulama deneyimi", "Teknik danışmanlık ve mühendislik çözümleri geliştirme"],
            "en": ["Project engineering, production management and system integration", "3D CAD/CAM/FEM/FEA analysis and prototype production", "Application experience in textile, automotive and special machine systems", "Technical consulting and engineering solutions development"]
        }
    })
    
    # Initialize contact info
    await db.contact.delete_many({})
    await db.contact.insert_one({
        "id": "contact-1",
        "email": "edizgndd@hotmail.com",
        "phone": "+90 536 391 28 06",
        "location": {
            "tr": "Bursa, Türkiye",
            "en": "Bursa, Turkey"
        }
    })
    
    print("Database initialized with sample data")
    client.close()

if __name__ == "__main__":
    asyncio.run(init_admin())
