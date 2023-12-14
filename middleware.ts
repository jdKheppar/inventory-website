import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/auth/signin' || path === '/auth/signup' || path === 'auth/verifyemail' || path === 'auth/forgetpassword' || path === 'auth/resetpassword'

  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl))
  }

}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/upload',
    '/auth/signin',
    '/auth/signup',
    '/auth/verifyemail',
    '/auth/forgetpassword',
    '/auth/resetpassword',
    '/settings',
    '/products/:path*',
    '/suppliers/:path*',
    '/employees/:path*'
  ]
}