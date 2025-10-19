import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Missing Supabase env variables for server-side writes')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export async function POST(req) {
  try {
    // Optional: small admin token check
    const adminToken = req.headers.get('x-admin-token')
    if (process.env.ADMIN_API_TOKEN && adminToken !== process.env.ADMIN_API_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    // Basic validation
    if (!body || !body.id || !body.title) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
