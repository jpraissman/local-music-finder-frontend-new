import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  
  // Return if there is no search params in the url
  if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.search.length < 1) {
    return NextResponse.next();
  }

  // Get the "from" search param
  let fromCookieValue = null;
  const fullSearchLine = req.nextUrl.search.substring(1);
  const searchLineSplit = fullSearchLine.split("&");
  for (const searchParam of searchLineSplit) {
    const searchParamSplit = searchParam.split("=");
    if (searchParamSplit[0] === "from") {
      fromCookieValue = searchParamSplit[1];
    }
  }

  // Set a cookie based on the query parameter
  const response = NextResponse.next();
  if (fromCookieValue !== null) {
    response.cookies.set('from', fromCookieValue, { path: '/', maxAge: 60 * 60 * 24 });
  }

  // Generate random id for the user if they don't have one already
  if (req.cookies.get('user') === undefined) {
    response.cookies.set('user', generateRandomId(), { path: '/', maxAge: 10 * 365 * 24 * 60 * 60 });
  }

  return response;
}

function generateRandomId(length: number = 10): string {
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