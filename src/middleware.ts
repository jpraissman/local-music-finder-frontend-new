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

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};