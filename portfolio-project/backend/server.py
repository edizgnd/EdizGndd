from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import bcrypt
import jwt
from fastapi.responses import FileResponse
import zipfile
import io
from fastapi.responses import StreamingResponse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Secret
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str

class AdminLogin(BaseModel):
    username: str
    password: str

class HeroContent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: dict  # {"tr": "...", "en": "..."}
    title: dict
    description: dict
    image: str

class Stat(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    value: str
    label: dict
    order: int

class About(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    image: str
    experience: str
    projects: str
    bio: dict
    vision: dict
    expertise: dict  # list of expertise areas

class Skill(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: dict
    name: str
    percentage: int
    order: int

class Portfolio(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: dict
    description: dict
    image: str
    category: str
    year: str
    tags: List[str]
    order: int

class Experience(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    position: dict
    company: str
    period: dict
    location: dict
    description: dict
    achievements: dict  # list
    order: int
    type: str  # "work" or "education"

class Certificate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: dict
    issuer: str
    date: str
    order: int

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: dict
    content: dict
    image: str
    order: int

class ContactInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    phone: str
    location: dict

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Auth functions
def verify_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.replace('Bearer ', '')
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

# Admin routes
@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    admin = await db.admins.find_one({"username": credentials.username}, {"_id": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not bcrypt.checkpw(credentials.password.encode(), admin['password_hash'].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode({"username": credentials.username}, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"token": token, "username": credentials.username}

# Hero routes
@api_router.get("/hero")
async def get_hero():
    hero = await db.hero.find_one({}, {"_id": 0})
    return hero

@api_router.post("/hero", dependencies=[Depends(verify_token)])
async def update_hero(hero: HeroContent):
    await db.hero.delete_many({})
    await db.hero.insert_one(hero.model_dump())
    return {"message": "Hero updated"}

# Stats routes
@api_router.get("/stats")
async def get_stats():
    stats = await db.stats.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return stats

@api_router.post("/stats", dependencies=[Depends(verify_token)])
async def create_stat(stat: Stat):
    await db.stats.insert_one(stat.model_dump())
    return {"message": "Stat created"}

@api_router.put("/stats/{stat_id}", dependencies=[Depends(verify_token)])
async def update_stat(stat_id: str, stat: Stat):
    await db.stats.update_one({"id": stat_id}, {"$set": stat.model_dump()})
    return {"message": "Stat updated"}

@api_router.delete("/stats/{stat_id}", dependencies=[Depends(verify_token)])
async def delete_stat(stat_id: str):
    await db.stats.delete_one({"id": stat_id})
    return {"message": "Stat deleted"}

# About routes
@api_router.get("/about")
async def get_about():
    about = await db.about.find_one({}, {"_id": 0})
    return about

@api_router.post("/about", dependencies=[Depends(verify_token)])
async def update_about(about: About):
    await db.about.delete_many({})
    await db.about.insert_one(about.model_dump())
    return {"message": "About updated"}

# Skills routes
@api_router.get("/skills")
async def get_skills():
    skills = await db.skills.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return skills

@api_router.post("/skills", dependencies=[Depends(verify_token)])
async def create_skill(skill: Skill):
    await db.skills.insert_one(skill.model_dump())
    return {"message": "Skill created"}

@api_router.put("/skills/{skill_id}", dependencies=[Depends(verify_token)])
async def update_skill(skill_id: str, skill: Skill):
    await db.skills.update_one({"id": skill_id}, {"$set": skill.model_dump()})
    return {"message": "Skill updated"}

@api_router.delete("/skills/{skill_id}", dependencies=[Depends(verify_token)])
async def delete_skill(skill_id: str):
    await db.skills.delete_one({"id": skill_id})
    return {"message": "Skill deleted"}

# Portfolio routes
@api_router.get("/portfolio")
async def get_portfolio():
    portfolio = await db.portfolio.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return portfolio

@api_router.post("/portfolio", dependencies=[Depends(verify_token)])
async def create_portfolio(item: Portfolio):
    await db.portfolio.insert_one(item.model_dump())
    return {"message": "Portfolio item created"}

@api_router.put("/portfolio/{item_id}", dependencies=[Depends(verify_token)])
async def update_portfolio(item_id: str, item: Portfolio):
    await db.portfolio.update_one({"id": item_id}, {"$set": item.model_dump()})
    return {"message": "Portfolio item updated"}

@api_router.delete("/portfolio/{item_id}", dependencies=[Depends(verify_token)])
async def delete_portfolio(item_id: str):
    await db.portfolio.delete_one({"id": item_id})
    return {"message": "Portfolio item deleted"}

# Experience routes
@api_router.get("/experience")
async def get_experience():
    experience = await db.experience.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return experience

@api_router.post("/experience", dependencies=[Depends(verify_token)])
async def create_experience(exp: Experience):
    await db.experience.insert_one(exp.model_dump())
    return {"message": "Experience created"}

@api_router.put("/experience/{exp_id}", dependencies=[Depends(verify_token)])
async def update_experience(exp_id: str, exp: Experience):
    await db.experience.update_one({"id": exp_id}, {"$set": exp.model_dump()})
    return {"message": "Experience updated"}

@api_router.delete("/experience/{exp_id}", dependencies=[Depends(verify_token)])
async def delete_experience(exp_id: str):
    await db.experience.delete_one({"id": exp_id})
    return {"message": "Experience deleted"}

# Certificate routes
@api_router.get("/certificates")
async def get_certificates():
    certificates = await db.certificates.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return certificates

@api_router.post("/certificates", dependencies=[Depends(verify_token)])
async def create_certificate(cert: Certificate):
    await db.certificates.insert_one(cert.model_dump())
    return {"message": "Certificate created"}

@api_router.put("/certificates/{cert_id}", dependencies=[Depends(verify_token)])
async def update_certificate(cert_id: str, cert: Certificate):
    await db.certificates.update_one({"id": cert_id}, {"$set": cert.model_dump()})
    return {"message": "Certificate updated"}

@api_router.delete("/certificates/{cert_id}", dependencies=[Depends(verify_token)])
async def delete_certificate(cert_id: str):
    await db.certificates.delete_one({"id": cert_id})
    return {"message": "Certificate deleted"}

# Testimonial routes
@api_router.get("/testimonials")
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return testimonials

@api_router.post("/testimonials", dependencies=[Depends(verify_token)])
async def create_testimonial(test: Testimonial):
    await db.testimonials.insert_one(test.model_dump())
    return {"message": "Testimonial created"}

@api_router.put("/testimonials/{test_id}", dependencies=[Depends(verify_token)])
async def update_testimonial(test_id: str, test: Testimonial):
    await db.testimonials.update_one({"id": test_id}, {"$set": test.model_dump()})
    return {"message": "Testimonial updated"}

@api_router.delete("/testimonials/{test_id}", dependencies=[Depends(verify_token)])
async def delete_testimonial(test_id: str):
    await db.testimonials.delete_one({"id": test_id})
    return {"message": "Testimonial deleted"}

# Contact routes
@api_router.get("/contact")
async def get_contact_info():
    contact = await db.contact.find_one({}, {"_id": 0})
    return contact

@api_router.post("/contact", dependencies=[Depends(verify_token)])
async def update_contact(contact: ContactInfo):
    await db.contact.delete_many({})
    await db.contact.insert_one(contact.model_dump())
    return {"message": "Contact info updated"}

@api_router.post("/contact/message")
async def submit_contact_message(message: ContactMessage):
    await db.messages.insert_one(message.model_dump())
    return {"message": "Message sent successfully"}

@api_router.get("/contact/messages", dependencies=[Depends(verify_token)])
async def get_messages():
    messages = await db.messages.find({}, {"_id": 0}).to_list(1000)
    return messages

# Download route
@api_router.get("/download")
async def download_project():
    import shutil
    import tempfile
    
    temp_dir = tempfile.mkdtemp()
    zip_path = f"{temp_dir}/portfolio-project.zip"
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Add backend files
        for root, dirs, files in os.walk('/app/backend'):
            for file in files:
                if not file.endswith('.pyc') and '__pycache__' not in root:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, '/app')
                    zipf.write(file_path, arcname)
        
        # Add frontend files
        for root, dirs, files in os.walk('/app/frontend'):
            # Skip node_modules and build
            if 'node_modules' in root or 'build' in root:
                continue
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, '/app')
                zipf.write(file_path, arcname)
    
    def iterfile():
        with open(zip_path, 'rb') as f:
            yield from f
        os.remove(zip_path)
        shutil.rmtree(temp_dir)
    
    return StreamingResponse(iterfile(), media_type='application/zip', headers={
        'Content-Disposition': 'attachment; filename=portfolio-project.zip'
    })

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()