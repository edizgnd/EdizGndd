import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client that uses the SERVICE ROLE key.
 * This file MUST only be imported from server code (API routes).
 * Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel (or your hosting).
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('Missing SUPABASE env vars for server client (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  // server-only client options
  auth: { persistSession: false }
})
