import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const referrer = req.headers.get("referer");

  if (referrer) {
    console.log("REFERRER:", referrer);
  }

  return NextResponse.next();
}
