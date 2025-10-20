from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from supabase_client import get_supabase_client
import logging
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/admin", tags=["admin"])
logger = logging.getLogger(__name__)

# Simple admin auth (for MVP)
class AdminLogin(BaseModel):
    username: str
    password: str

class AdminAuth(BaseModel):
    token: str

# Get credentials from environment variables
ADMIN_CREDENTIALS = {
    "username": os.getenv("ADMIN_USERNAME", "admin"),
    "password": os.getenv("ADMIN_PASSWORD", "admin123")
}

@router.post("/login")
async def admin_login(credentials: AdminLogin):
    logger.info(f"Login attempt for username: {credentials.username}")
    
    if (credentials.username == ADMIN_CREDENTIALS["username"] and 
        credentials.password == ADMIN_CREDENTIALS["password"]):
        logger.info("Login successful")
        # Return simple token (in production, use JWT)
        return {"success": True, "token": "admin_authenticated"}
    
    logger.warning(f"Login failed for username: {credentials.username}")
    raise HTTPException(
        status_code=401, 
        detail="Kullanıcı adı veya şifre yanlış"
    )

# Projects CRUD
class ProjectCreate(BaseModel):
    title_tr: str
    title_en: str
    description_tr: str
    description_en: str
    category_tr: str
    category_en: str
    year: str
    tags: List[str]
    image_url: str

class ProjectUpdate(BaseModel):
    title_tr: Optional[str] = None
    title_en: Optional[str] = None
    description_tr: Optional[str] = None
    description_en: Optional[str] = None
    category_tr: Optional[str] = None
    category_en: Optional[str] = None
    year: Optional[str] = None
    tags: Optional[List[str]] = None
    image_url: Optional[str] = None

@router.get("/projects")
async def get_all_projects():
    try:
        supabase = get_supabase_client()
        response = supabase.table('projects').select('*').execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/projects")
async def create_project(project: ProjectCreate):
    try:
        supabase = get_supabase_client()
        response = supabase.table('projects').insert(project.dict()).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/projects/{project_id}")
async def update_project(project_id: int, project: ProjectUpdate):
    try:
        supabase = get_supabase_client()
        update_data = {k: v for k, v in project.dict().items() if v is not None}
        response = supabase.table('projects').update(update_data).eq('id', project_id).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Error updating project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/projects/{project_id}")
async def delete_project(project_id: int):
    try:
        supabase = get_supabase_client()
        supabase.table('projects').delete().eq('id', project_id).execute()
        return {"success": True, "message": "Project deleted"}
    except Exception as e:
        logger.error(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# About CRUD
class AboutUpdate(BaseModel):
    content_tr: Optional[str] = None
    content_en: Optional[str] = None
    image_url: Optional[str] = None

@router.get("/about")
async def get_about():
    try:
        supabase = get_supabase_client()
        response = supabase.table('about').select('*').limit(1).execute()
        if response.data:
            return response.data[0]
        return {}
    except Exception as e:
        logger.error(f"Error fetching about: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/about")
async def update_about(about: AboutUpdate):
    try:
        supabase = get_supabase_client()
        update_data = {k: v for k, v in about.dict().items() if v is not None}
        # Check if about exists
        check = supabase.table('about').select('id').limit(1).execute()
        if check.data:
            response = supabase.table('about').update(update_data).eq('id', check.data[0]['id']).execute()
        else:
            response = supabase.table('about').insert(update_data).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Error updating about: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Contact CRUD
class ContactUpdate(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

@router.get("/contact")
async def get_contact():
    try:
        supabase = get_supabase_client()
        response = supabase.table('contact').select('*').limit(1).execute()
        if response.data:
            return response.data[0]
        return {}
    except Exception as e:
        logger.error(f"Error fetching contact: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/contact")
async def update_contact(contact: ContactUpdate):
    try:
        supabase = get_supabase_client()
        update_data = {k: v for k, v in contact.dict().items() if v is not None}
        check = supabase.table('contact').select('id').limit(1).execute()
        if check.data:
            response = supabase.table('contact').update(update_data).eq('id', check.data[0]['id']).execute()
        else:
            response = supabase.table('contact').insert(update_data).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Error updating contact: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Social Links
class SocialLinkCreate(BaseModel):
    platform: str
    url: str
    icon: str

@router.get("/social-links")
async def get_social_links():
    try:
        supabase = get_supabase_client()
        response = supabase.table('social_links').select('*').execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching social links: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/social-links")
async def create_social_link(link: SocialLinkCreate):
    try:
        supabase = get_supabase_client()
        response = supabase.table('social_links').insert(link.dict()).execute()
        return response.data[0]
    except Exception as e:
        logger.error(f"Error creating social link: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/social-links/{link_id}")
async def delete_social_link(link_id: int):
    try:
        supabase = get_supabase_client()
        supabase.table('social_links').delete().eq('id', link_id).execute()
        return {"success": True, "message": "Social link deleted"}
    except Exception as e:
        logger.error(f"Error deleting social link: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
