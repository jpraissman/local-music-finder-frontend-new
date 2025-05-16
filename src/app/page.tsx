import LandingPage from "@/components/landingPage/LandingPage";
import axios from "axios";
import { Metadata } from "next";

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

  return <LandingPage upcomingEvents={response.data.events} />;
}
