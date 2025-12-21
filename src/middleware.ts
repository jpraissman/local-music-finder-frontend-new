import { NextRequest, NextResponse } from "next/server";

const ONE_YEAR = 60 * 60 * 24 * 365;
const TEN_MINUTES = 60 * 10;

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const userIdCookie = req.cookies.get("userId_v2");
  if (!userIdCookie) {
    // if no userIdCookie, set one
    response.cookies.set("userId_v2", crypto.randomUUID(), {
      maxAge: ONE_YEAR,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  } else if (Math.random() < 0.05) {
    // otherwsie update every 20 requests to keep alive
    response.cookies.set("userId_v2", userIdCookie.value, {
      maxAge: ONE_YEAR,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  const referrer = req.headers.get("referer");
  if (referrer && !referrer.includes("thelocalmusicfinder")) {
    response.cookies.set("referrer_v2", referrer, {
      maxAge: TEN_MINUTES,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    response.cookies.set("urlEntry_v2", req.nextUrl.pathname, {
      maxAge: TEN_MINUTES,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  return response;
}
