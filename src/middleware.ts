import { NextRequest, NextResponse } from "next/server";

const ONE_YEAR = 60 * 60 * 24 * 365;
const TEN_MINUTES = 60 * 10;

export const USER_ID_COOKIE_NAME = "userId_v3";
export const REFERER_COOKIE_NAME = "referer_v3";
export const URL_ENTRY_COOKIE_NAME = "urlEntry_v3";

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const userIdCookie = req.cookies.get(USER_ID_COOKIE_NAME);
  if (!userIdCookie) {
    // if no userIdCookie, set one
    response.cookies.set(USER_ID_COOKIE_NAME, crypto.randomUUID(), {
      maxAge: ONE_YEAR,
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    });
  } else if (Math.random() < 0.05) {
    // otherwsie update every 20 requests to keep alive
    response.cookies.set(USER_ID_COOKIE_NAME, userIdCookie.value, {
      maxAge: ONE_YEAR,
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    });
  }

  const referrer = req.headers.get("referer");
  if (
    referrer &&
    !referrer.includes("thelocalmusicfinder") &&
    !referrer.includes("localhost")
  ) {
    response.cookies.set(REFERER_COOKIE_NAME, referrer, {
      maxAge: TEN_MINUTES,
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    });
    response.cookies.set(URL_ENTRY_COOKIE_NAME, req.nextUrl.pathname, {
      maxAge: TEN_MINUTES,
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    });
  }

  return response;
}
