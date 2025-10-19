from fastapi import FastAPI, APIRouter, Depends, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List
from models import *
from auth import verify_password, create_access_token, verify_token, ADMIN_USERNAME, ADMIN_PASSWORD_HASH
from database import *

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix=\"/api\")

# ============= PUBLIC ROUTES =============

@api_router.get(\"/\")
async def root():
    return {\"message\": \"Ediz Gündoğdu Portfolio API\"}

# Contact Messages - Create (Public)
@api_router.post(\"/contact\", response_model=ContactMessage)
async def create_contact_message(message: ContactMessageCreate):
    contact_msg = ContactMessage(**message.dict())
    await contact_messages_collection.insert_one(contact_msg.dict())
    return contact_msg

# Get Personal Info
@api_router.get(\"/personal-info\")
async def get_personal_info():
    info = await personal_info_collection.find_one()
    if not info:
        return None
    info.pop('_id', None)
    return info

# Get About
@api_router.get(\"/about\")
async def get_about():
    about = await about_collection.find_one()
    if not about:
        return None
    about.pop('_id', None)
    return about

# Get Services
@api_router.get(\"/services\", response_model=List[Service])
async def get_services():
    services = await services_collection.find().to_list(1000)
    for service in services:
        service.pop('_id', None)
    return services

# Get Skills
@api_router.get(\"/skills\", response_model=List[Skill])
async def get_skills():
    skills = await skills_collection.find().to_list(1000)
    for skill in skills:
        skill.pop('_id', None)
    return skills

# Get Projects
@api_router.get(\"/projects\", response_model=List[Project])
async def get_projects():
    projects = await projects_collection.find().to_list(1000)
    for project in projects:
        project.pop('_id', None)
    return projects

# Get Experience
@api_router.get(\"/experience\", response_model=List[Experience])
async def get_experience():
    experience = await experience_collection.find().to_list(1000)
    for exp in experience:
        exp.pop('_id', None)
    return experience

# Get Education
@api_router.get(\"/education\", response_model=List[Education])
async def get_education():
    education = await education_collection.find().to_list(1000)
    for edu in education:
        edu.pop('_id', None)
    return education

# Get Certifications
@api_router.get(\"/certifications\", response_model=List[Certification])
async def get_certifications():
    certifications = await certifications_collection.find().to_list(1000)
    for cert in certifications:
        cert.pop('_id', None)
    return certifications

# Get Testimonials
@api_router.get(\"/testimonials\", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await testimonials_collection.find().to_list(1000)
    for testimonial in testimonials:
        testimonial.pop('_id', None)
    return testimonials

# ============= ADMIN ROUTES =============

# Admin Login
@api_router.post(\"/admin/login\", response_model=AdminToken)
async def admin_login(credentials: AdminLogin):
    if credentials.username != ADMIN_USERNAME or not verify_password(credentials.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail=\"Invalid credentials\")
    
    access_token = create_access_token(data={\"sub\": credentials.username})
    return {\"access_token\": access_token, \"token_type\": \"bearer\"}

# Contact Messages - Admin
@api_router.get(\"/admin/contact-messages\", response_model=List[ContactMessage])
async def get_all_contact_messages(username: str = Depends(verify_token)):
    messages = await contact_messages_collection.find().sort(\"created_at\", -1).to_list(1000)
    for msg in messages:
        msg.pop('_id', None)
    return messages

@api_router.put(\"/admin/contact-messages/{message_id}\")
async def reply_to_message(message_id: str, reply: str, username: str = Depends(verify_token)):
    result = await contact_messages_collection.update_one(
        {\"id\": message_id},
        {\"$set\": {\"replied\": True, \"reply_message\": reply}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Message not found\")
    return {\"message\": \"Reply sent successfully\"}

@api_router.delete(\"/admin/contact-messages/{message_id}\")
async def delete_message(message_id: str, username: str = Depends(verify_token)):
    result = await contact_messages_collection.delete_one({\"id\": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Message not found\")
    return {\"message\": \"Message deleted\"}

# Personal Info - Admin
@api_router.put(\"/admin/personal-info\")
async def update_personal_info(info: PersonalInfo, username: str = Depends(verify_token)):
    await personal_info_collection.delete_many({})
    await personal_info_collection.insert_one(info.dict())
    return {\"message\": \"Personal info updated\"}

# About - Admin
@api_router.put(\"/admin/about\")
async def update_about(about: About, username: str = Depends(verify_token)):
    await about_collection.delete_many({})
    await about_collection.insert_one(about.dict())
    return {\"message\": \"About updated\"}

# Services - Admin
@api_router.post(\"/admin/services\", response_model=Service)
async def create_service(service: Service, username: str = Depends(verify_token)):
    await services_collection.insert_one(service.dict())
    return service

@api_router.put(\"/admin/services/{service_id}\")
async def update_service(service_id: str, service: Service, username: str = Depends(verify_token)):
    result = await services_collection.update_one({\"id\": service_id}, {\"$set\": service.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Service not found\")
    return service

@api_router.delete(\"/admin/services/{service_id}\")
async def delete_service(service_id: str, username: str = Depends(verify_token)):
    result = await services_collection.delete_one({\"id\": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Service not found\")
    return {\"message\": \"Service deleted\"}

# Projects - Admin
@api_router.post(\"/admin/projects\", response_model=Project)
async def create_project(project: Project, username: str = Depends(verify_token)):
    await projects_collection.insert_one(project.dict())
    return project

@api_router.put(\"/admin/projects/{project_id}\")
async def update_project(project_id: str, project: Project, username: str = Depends(verify_token)):
    result = await projects_collection.update_one({\"id\": project_id}, {\"$set\": project.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Project not found\")
    return project

@api_router.delete(\"/admin/projects/{project_id}\")
async def delete_project(project_id: str, username: str = Depends(verify_token)):
    result = await projects_collection.delete_one({\"id\": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Project not found\")
    return {\"message\": \"Project deleted\"}

# Experience - Admin
@api_router.post(\"/admin/experience\", response_model=Experience)
async def create_experience(exp: Experience, username: str = Depends(verify_token)):
    await experience_collection.insert_one(exp.dict())
    return exp

@api_router.put(\"/admin/experience/{exp_id}\")
async def update_experience(exp_id: str, exp: Experience, username: str = Depends(verify_token)):
    result = await experience_collection.update_one({\"id\": exp_id}, {\"$set\": exp.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Experience not found\")
    return exp

@api_router.delete(\"/admin/experience/{exp_id}\")
async def delete_experience(exp_id: str, username: str = Depends(verify_token)):
    result = await experience_collection.delete_one({\"id\": exp_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Experience not found\")
    return {\"message\": \"Experience deleted\"}

# Education - Admin
@api_router.post(\"/admin/education\", response_model=Education)
async def create_education(edu: Education, username: str = Depends(verify_token)):
    await education_collection.insert_one(edu.dict())
    return edu

@api_router.put(\"/admin/education/{edu_id}\")
async def update_education(edu_id: str, edu: Education, username: str = Depends(verify_token)):
    result = await education_collection.update_one({\"id\": edu_id}, {\"$set\": edu.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Education not found\")
    return edu

@api_router.delete(\"/admin/education/{edu_id}\")
async def delete_education(edu_id: str, username: str = Depends(verify_token)):
    result = await education_collection.delete_one({\"id\": edu_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Education not found\")
    return {\"message\": \"Education deleted\"}

# Certifications - Admin
@api_router.post(\"/admin/certifications\", response_model=Certification)
async def create_certification(cert: Certification, username: str = Depends(verify_token)):
    await certifications_collection.insert_one(cert.dict())
    return cert

@api_router.put(\"/admin/certifications/{cert_id}\")
async def update_certification(cert_id: str, cert: Certification, username: str = Depends(verify_token)):
    result = await certifications_collection.update_one({\"id\": cert_id}, {\"$set\": cert.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Certification not found\")
    return cert

@api_router.delete(\"/admin/certifications/{cert_id}\")
async def delete_certification(cert_id: str, username: str = Depends(verify_token)):
    result = await certifications_collection.delete_one({\"id\": cert_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Certification not found\")
    return {\"message\": \"Certification deleted\"}

# Skills - Admin
@api_router.post(\"/admin/skills\", response_model=Skill)
async def create_skill(skill: Skill, username: str = Depends(verify_token)):
    await skills_collection.insert_one(skill.dict())
    return skill

@api_router.put(\"/admin/skills/{skill_id}\")
async def update_skill(skill_id: str, skill: Skill, username: str = Depends(verify_token)):
    result = await skills_collection.update_one({\"id\": skill_id}, {\"$set\": skill.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Skill not found\")
    return skill

@api_router.delete(\"/admin/skills/{skill_id}\")
async def delete_skill(skill_id: str, username: str = Depends(verify_token)):
    result = await skills_collection.delete_one({\"id\": skill_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Skill not found\")
    return {\"message\": \"Skill deleted\"}

# Testimonials - Admin
@api_router.post(\"/admin/testimonials\", response_model=Testimonial)
async def create_testimonial(testimonial: Testimonial, username: str = Depends(verify_token)):
    await testimonials_collection.insert_one(testimonial.dict())
    return testimonial

@api_router.put(\"/admin/testimonials/{testimonial_id}\")
async def update_testimonial(testimonial_id: str, testimonial: Testimonial, username: str = Depends(verify_token)):
    result = await testimonials_collection.update_one({\"id\": testimonial_id}, {\"$set\": testimonial.dict()})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail=\"Testimonial not found\")
    return testimonial

@api_router.delete(\"/admin/testimonials/{testimonial_id}\")
async def delete_testimonial(testimonial_id: str, username: str = Depends(verify_token)):
    result = await testimonials_collection.delete_one({\"id\": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=\"Testimonial not found\")
    return {\"message\": \"Testimonial deleted\"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[\"*\"],
    allow_methods=[\"*\"],
    allow_headers=[\"*\"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event(\"shutdown\")
async def shutdown_db_client():
    await close_db_connection()