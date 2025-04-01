import EventSearchScreen from "@/components/EventSearchScreen";
import PageVisitTracker from "@/components/PageVisitTracker";
import { blankStructuredFormatting } from "@/types/constants";
import Event from "@/types/Event";
import { Metadata } from "next";

interface PageProps {
  params: {
    countyNames: string;
  };
}

export function generateMetadata({
  params: { countyNames },
}: PageProps): Metadata {
  return {
    title: `Live Music Events In ${countyNames
      .replaceAll("%20", " ")
      .split("%3A%3A")
      .join(", ")} - The Local Music Finder`,
  };
}

export const revalidate = 0;

export default async function Page({ params: { countyNames } }: PageProps) {
  let events: Event[] = [];
  try {
    const countyNamesSplit = countyNames.split("%3A%3A");
    countyNamesSplit.forEach(async (county) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/events/county/${county}`
      );
      if (response.ok) {
        const eventsRaw = await response.json();
        events.push(eventsRaw.events);
      }
    });
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
          bandTypes: ["All Types"],
        }}
        eventsInit={events}
        noFilters={false}
        landingPage={true}
        searchLocation={countyNames
          .replaceAll("%20", " ")
          .split("%3A%3A")
          .join(", ")}
        searchDateRange="in the next month"
      />
    </>
  );
}
