import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

const ROLE_DASHBOARD = {
  admin: '/dashboard/admin',
  librarian: '/dashboard/librarian',
  user: '/dashboard/user',
}

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const { pathname } = request.nextUrl

  if ((pathname === '/login' || pathname === '/signup') && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    const expectedRoot = ROLE_DASHBOARD[session.user?.role || 'user']
    if (expectedRoot && !pathname.startsWith(expectedRoot)) {
      return NextResponse.redirect(new URL('/forbidden', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/signup', '/dashboard/:path*'],
}
