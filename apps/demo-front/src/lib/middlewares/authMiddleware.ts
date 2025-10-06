import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PAYLOAD_ADMIN_FOLDER_NAME = 'admin'
export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('payload-token')?.value
  const { pathname } = req.nextUrl

  const notProtectedRoutes = ['/login', '/register', '/forgot-password', '/ssg','/isr', '/',  ]

  if (
    pathname.startsWith('/' + PAYLOAD_ADMIN_FOLDER_NAME) ||
    pathname.startsWith('/_next') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js)$/) ||
    notProtectedRoutes.some(route => pathname.startsWith(route))
  ) {
    // console.log(`[Middleware - AUTH] : [${new Date().toISOString()}] Unprotected route accessed: ${pathname}`)
    return
  }

  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
}
