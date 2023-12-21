import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/auth/signin' || path === '/auth/signup' || path === '/auth/verifyemail' || path === '/auth/forgetpassword' || path === '/auth/resetpassword' || path === '/'
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
    else if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
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
        '/dashboard',
        '/products/:path*',
        '/suppliers/:path*',
        '/employees/:path*'
    ]
}


//import { withAuth } from "next-auth/middleware"

// // middleware is applied to all routes, use conditionals to select

// export default withAuth(
//     async function middleware(request: NextRequest) {
//         const path = request.nextUrl.pathname
//         const isPublicPath = path === '/auth/signin' || path === '/auth/signup' || path === '/auth/verifyemail' || path === '/auth/forgetpassword' || path === '/auth/resetpassword' || path === '/'
//         const token = request.cookies.get('token')?.value || '';

//         if (isPublicPath && token) {
//             return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
//         }
//         else if (!isPublicPath && !token) {
//             return NextResponse.redirect(new URL('/', request.nextUrl))
//         }

//     },
//     {
//         pages: {
//             signIn: '/',
//             signOut: '/auth/signout',
//             error: '/auth/error', // Error code passed in query string as ?error=
//             verifyRequest: '/auth/verify-request', // (used for check email message)
//             newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//         },
//         callbacks: {
//             authorized: ({ req, token }) => {

//                 if (
//                     // req.nextUrl.pathname.startsWith('/protected') &&
//                     token === null
//                 ) {
//                     return false
//                 }
//                 return true
//             }
//         }
//     }
// )