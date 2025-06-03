import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  if (!req.cookies.has('userId')) {
    response.cookies.set('userId', generateRandomId(), {
      maxAge: 60 * 60 * 24 * 365 * 10,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
  }

  if (!req.cookies.has('referer')) {
    const referer = req.headers.get('referer');
    response.cookies.set('referer', referer || "NULL", {
      maxAge: 60 * 60 * 24 * 365 * 10,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
  }

  return response;
}

function generateRandomId(length: number = 25): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  
  return result;
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};