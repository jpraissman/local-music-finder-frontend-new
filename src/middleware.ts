import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Get the fromCookie (and set it if it doesn't exist)
  let fromCookieValue = getExistingFromCookie(req);
  if (fromCookieValue === undefined || fromCookieValue == "Unknown") {
    fromCookieValue = getFromCookieInURL(req);
    response.cookies.set('from', fromCookieValue, { path: '/' });
  }

  let userIdCookieValue = undefined;
  let userIdCookie = req.cookies.get('user');
  if (userIdCookie === undefined) {
    userIdCookieValue = generateRandomId();
    response.cookies.set('user', userIdCookieValue, { path: '/', maxAge: 10 * 365 * 24 * 60 * 60 });
  }
  else {
    userIdCookieValue = userIdCookie.value;
  }

  const visitBody = {
    path: req.nextUrl.pathname,
    from_where: fromCookieValue,
    user_id: userIdCookieValue,
  }
  fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/visit', {
    method: 'POST',
    body: JSON.stringify(visitBody),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    // Log error, but don't block the middleware
    console.error('Error making API call:', error);
  });

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

function getExistingFromCookie(req: NextRequest): string | undefined {
  const fromCookie = req.cookies.get('from');
  if (fromCookie === undefined) {
    return undefined;
  }

  return fromCookie.value;
}

function getFromCookieInURL(req: NextRequest): string {
  // Return "Unknown" if there is no from param in the URL 
  if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.search.length < 1) {
    return "Unknown";
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

  if (fromCookieValue === null) {
    return "Unknown";
  }

  return fromCookieValue;
}

// Apply middleware to all routes
export const config = {
  matcher: [
    '/',
    '/find/:path*',
    '/post',
    '/edit',
    '/faqs',
    '/about-us',
    '/privacy-policy',
    '/terms'
  ],
};