/**
 * MIDDLEWARE
 * 
 * Protects dashboard routes - redirects to login if not authenticated
 */

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/login',
    },
  }
)

// Protect these routes
export const config = {
  matcher: [
    '/dashboard/:path*', // All dashboard routes
  ]
}