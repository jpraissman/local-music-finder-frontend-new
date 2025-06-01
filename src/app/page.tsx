import LandingPage from "@/components/landingPage/LandingPage";
import axios from "axios";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: "The Local Music Finder",
  description:
    "Find live music events in North Jersey. Easily post your live music events to reach many people.",
};

export const revalidate = 60;

export default async function Page() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/upcoming`
  );

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  return (
    <LandingPage
      upcomingEvents={response.data.events}
      userId={userId}
      userAgent={userAgent}
    />
  );
}
