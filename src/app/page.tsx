import { getUpcomingRandomEvents } from "@/api/apiCalls";
import LandingPage from "@/components/landingPage/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Local Music Finder",
  description:
    "Find live music events in North Jersey. Easily post your live music events to reach many people.",
};

export const revalidate = 0;

export default async function Page() {
  try {
    const events = await getUpcomingRandomEvents();
    return <LandingPage upcomingEvents={events} />;
  } catch {
    return <LandingPage upcomingEvents={[]} />;
  }
}
