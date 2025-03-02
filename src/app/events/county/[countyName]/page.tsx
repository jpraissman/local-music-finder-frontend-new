import EventSearchScreen from "@/components/EventSearchScreen";
import PageVisitTracker from "@/components/PageVisitTracker";
import { blankStructuredFormatting } from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";

interface PageProps {
  params: {
    countyName: string;
  };
}

export function generateMetadata({
  params: { countyName },
}: PageProps): Metadata {
  return {
    title: `Live Music Events In ${countyName} - The Local Music Finder`,
  };
}

export const revalidate = 0;

export default async function Page({ params: { countyName } }: PageProps) {
  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + `/events/county/${countyName}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  return (
    <>
      <PageVisitTracker page="Events County Page" />
      <EventSearchScreen
        filters={{
          dateRange: "Next 30 Days",
          address: {
            description: "",
            structured_formatting: blankStructuredFormatting,
          },
          maxDistance: "",
          genres: ["All Genres"],
          bandTypes: ["All Genres"],
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={true}
        searchLocation={countyName.replace("%20", " ")}
        searchDateRange="in the next month"
      />
    </>
  );
}
