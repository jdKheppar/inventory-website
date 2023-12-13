import { NextResponse } from 'next/server'

// Import NextAuth utility functions
import { getSession } from 'next-auth/react';

export async function middleware(request: any) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === '/auth/signin' ||
    path === '/auth/signup' ||
    path === '/auth/verifyemail' ||
    path === '/auth/forgetpassword' ||
    path === '/auth/resetpassword';

  const session = await getSession({ req: request });

  if (isPublicPath && session) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
}

// Define your path configurations

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