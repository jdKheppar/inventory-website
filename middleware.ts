import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/' || path === '/auth/signup' || path === 'auth/verifyemail' || path === 'auth/forgetpassword' || path === 'auth/resetpassword'

    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/dashboard',
        '/auth/signup',
        '/settings',
        '/products/:path*',
        '/suppliers/:path*',
        '/employees/:path*'
    ]
}