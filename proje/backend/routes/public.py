from fastapi import APIRouter, HTTPException
from supabase_client import get_supabase_client
import logging

router = APIRouter(prefix="/api/public", tags=["public"])
logger = logging.getLogger(__name__)

@router.get("/projects")
async def get_projects():
    try:
        supabase = get_supabase_client()
        response = supabase.table('projects').select('*').execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        return []

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
        return {}

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
        return {}

@router.get("/social-links")
async def get_social_links():
    try:
        supabase = get_supabase_client()
        response = supabase.table('social_links').select('*').execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching social links: {str(e)}")
        return []