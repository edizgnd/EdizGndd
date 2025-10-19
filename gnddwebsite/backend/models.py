from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Contact Message Models
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    replied: bool = False
    reply_message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Admin Auth Models
class AdminLogin(BaseModel):
    username: str
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Personal Info Model
class PersonalInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    description: str
    email: str
    phone: str
    location: str
    image: str
    heroImage: str
    cadcrowdRank: str
    rating: str

# About Model
class About(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    biography: str
    vision: str
    expertise: List[str]
    yearsExperience: str
    projectsCount: str

# Service Model
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str

# Skill Item Model
class SkillItem(BaseModel):
    name: str
    level: int

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    items: List[SkillItem]

# Project Model
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    year: str
    description: str
    tags: List[str]
    image: str

# Experience Model
class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    period: str
    location: str
    description: str
    highlights: List[str]

# Education Model
class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    school: str
    period: str
    location: str
    description: str
    achievements: List[str]

# Certification Model
class Certification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    issuer: str
    date: str

# Testimonial Model
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    content: str
    image: Optional[str] = None
    rating: int