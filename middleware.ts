import { withAuth } from "next-auth/middleware"

export default withAuth(
    async function middleware(request) { },
    {
        pages: {
            //signIn: '/',
            error: '/auth/error', // Error code passed in query string as ?error=

            newUser: '/dashboard' // New users will be directed here on first sign in (leave the property out if not of interest)
        },
        callbacks: {
            authorized: ({ req, token }) => {

                if (
                    // req.nextUrl.pathname.startsWith('/protected') &&
                    token === null
                ) {
                    return false
                }
                return true
            }
        }
    }
)

export const config = {
    matcher: [

        '/profile',
        '/upload',
        '/settings',
        '/dashboard',
        '/products/:path*',
        '/suppliers/:path*',
        '/employees/:path*'
    ]
}