import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public APIs
export const contactService = {
  send: (data) => api.post('/contact', data),
};

export const publicService = {
  getPersonalInfo: () => api.get('/personal-info'),
  getAbout: () => api.get('/about'),
  getServices: () => api.get('/services'),
  getSkills: () => api.get('/skills'),
  getProjects: () => api.get('/projects'),
  getExperience: () => api.get('/experience'),
  getEducation: () => api.get('/education'),
  getCertifications: () => api.get('/certifications'),
  getTestimonials: () => api.get('/testimonials'),
};

// Admin APIs
export const adminService = {
  login: (credentials) => api.post('/admin/login', credentials),
  
  // Contact Messages
  getMessages: () => api.get('/admin/contact-messages'),
  replyMessage: (id, reply) => api.put(`/admin/contact-messages/${id}`, null, { params: { reply } }),
  deleteMessage: (id) => api.delete(`/admin/contact-messages/${id}`),
  
  // Content Management
  updatePersonalInfo: (data) => api.put('/admin/personal-info', data),
  updateAbout: (data) => api.put('/admin/about', data),
  
  // Services
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  
  // Projects
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
  
  // Experience
  createExperience: (data) => api.post('/admin/experience', data),
  updateExperience: (id, data) => api.put(`/admin/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/admin/experience/${id}`),
  
  // Education
  createEducation: (data) => api.post('/admin/education', data),
  updateEducation: (id, data) => api.put(`/admin/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/admin/education/${id}`),
  
  // Certifications
  createCertification: (data) => api.post('/admin/certifications', data),
  updateCertification: (id, data) => api.put(`/admin/certifications/${id}`, data),
  deleteCertification: (id) => api.delete(`/admin/certifications/${id}`),
  
  // Skills
  createSkill: (data) => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),
  
  // Testimonials
  createTestimonial: (data) => api.post('/admin/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
};