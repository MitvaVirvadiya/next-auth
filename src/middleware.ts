import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPathPublic = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get('token')?.value || '';

    if(isPathPublic && token){
        return NextResponse.redirect(new URL('/', request.url))
    } 

    if(!isPathPublic && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
export const config = {
  matcher: [
    '/',
    '/signup',
    '/login',
    '/verifyemail',
    '/profile',
  ],
}