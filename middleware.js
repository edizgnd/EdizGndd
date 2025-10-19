// middleware.js
// Basit Basic Auth middleware for /admin
// Add ADMIN_USER and ADMIN_PASS environment variables in your deployment (Vercel)
// Example: ADMIN_USER=edizgndd ADMIN_PASS=280620Gndd

import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Only protect admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Optional: skip protection in development (uncomment if you want)
  // if (process.env.NODE_ENV === 'development') return NextResponse.next()

  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"'
      }
    })
  }

  const base64 = authHeader.split(' ')[1]
  let decoded = ''
  try {
    // Try atob (Edge runtime). If not available, fallback to Buffer.
    if (typeof atob === 'function') {
      decoded = atob(base64)
    } else if (typeof Buffer !== 'undefined') {
      decoded = Buffer.from(base64, 'base64').toString('utf-8')
    } else if (globalThis?.atob) {
      decoded = globalThis.atob(base64)
    } else {
      // Last resort using TextDecoder (rare)
      decoded = new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)))
    }
  } catch (e) {
    console.error('Failed to decode auth header', e)
    return new NextResponse('Invalid auth', { status: 400 })
  }

  const [user, pass] = decoded.split(':')

  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    return NextResponse.next()
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Area"'
    }
  })
}

export const config = {
  matcher: ['/admin/:path*', '/admin']
}
