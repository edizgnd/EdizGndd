import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Projects API
async function handleProjects(request) {
  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('createdAt', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data || []))
  }
  
  if (request.method === 'POST') {
    const body = await request.json()
    const { data, error } = await supabase
      .from('projects')
      .insert([body])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating project:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'PUT') {
    const body = await request.json()
    const { id, ...updateData } = body
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating project:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'DELETE') {
    const body = await request.json()
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', body.id)
    
    if (error) {
      console.error('Error deleting project:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json({ success: true }))
  }
}

// Skills API
async function handleSkills(request) {
  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
    
    if (error) {
      console.error('Error fetching skills:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data || []))
  }
  
  if (request.method === 'POST') {
    const body = await request.json()
    const { data, error } = await supabase
      .from('skills')
      .insert([body])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating skill:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'PUT') {
    const body = await request.json()
    const { id, ...updateData } = body
    const { data, error } = await supabase
      .from('skills')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating skill:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'DELETE') {
    const body = await request.json()
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', body.id)
    
    if (error) {
      console.error('Error deleting skill:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json({ success: true }))
  }
}

// Experience API
async function handleExperience(request) {
  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('createdAt', { ascending: false })
    
    if (error) {
      console.error('Error fetching experience:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data || []))
  }
  
  if (request.method === 'POST') {
    const body = await request.json()
    const { data, error } = await supabase
      .from('experience')
      .insert([body])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating experience:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'PUT') {
    const body = await request.json()
    const { id, ...updateData } = body
    const { data, error } = await supabase
      .from('experience')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating experience:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'DELETE') {
    const body = await request.json()
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', body.id)
    
    if (error) {
      console.error('Error deleting experience:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json({ success: true }))
  }
}

// Testimonials API
async function handleTestimonials(request) {
  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('createdAt', { ascending: false })
    
    if (error) {
      console.error('Error fetching testimonials:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data || []))
  }
  
  if (request.method === 'POST') {
    const body = await request.json()
    const { data, error } = await supabase
      .from('testimonials')
      .insert([body])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating testimonial:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'PUT') {
    const body = await request.json()
    const { id, ...updateData } = body
    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating testimonial:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'DELETE') {
    const body = await request.json()
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', body.id)
    
    if (error) {
      console.error('Error deleting testimonial:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json({ success: true }))
  }
}

// Contact Messages API
async function handleContact(request) {
  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('createdAt', { ascending: false })
    
    if (error) {
      console.error('Error fetching messages:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data || []))
  }
  
  if (request.method === 'POST') {
    const body = await request.json()
    const messageData = {
      id: `msg_${Date.now()}`,
      ...body
    }
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating message:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
  
  if (request.method === 'DELETE') {
    const body = await request.json()
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', body.id)
    
    if (error) {
      console.error('Error deleting message:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json({ success: true }))
  }
}

// About API
async function handleAbout(request) {
  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('about_info')
      .select('*')
    
    if (error) {
      console.error('Error fetching about:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data || []))
  }
  
  if (request.method === 'PUT') {
    const body = await request.json()
    const { id, ...updateData } = body
    const { data, error } = await supabase
      .from('about_info')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating about:', error)
      return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
    }
    return handleCORS(NextResponse.json(data))
  }
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`

  try {
    // API Routes
    if (route === '/projects') return handleProjects(request)
    if (route === '/skills') return handleSkills(request)
    if (route === '/experience') return handleExperience(request)
    if (route === '/testimonials') return handleTestimonials(request)
    if (route === '/contact') return handleContact(request)
    if (route === '/about') return handleAbout(request)
    
    // Root endpoint
    if (route === '/root' || route === '/') {
      return handleCORS(NextResponse.json({ message: "Portfolio API" }))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` }, 
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
