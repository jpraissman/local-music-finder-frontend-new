import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import getDateByRange from "@/lib/get-date-by-range";
import Event from "@/types/Event";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

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
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  let events: Event[] = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        `/events/county/${countyNames}?user_agent=${userAgent}&user_id=${userId}`
    );
    if (response.ok) {
      const eventsRaw = await response.json();
      events = eventsRaw.events;
    }
  } catch (error) {}

  const dates = getDateByRange("next-30-days");
  const [fromYear, fromMonth, fromDay] = dates[0].split("-").map(Number);
  const [toYear, toMonth, toDay] = dates[1].split("-").map(Number);

  return (
    <NewEventSearchPage
      initialLocation={null}
      initialDateRange={{
        from: new Date(fromYear, fromMonth - 1, fromDay, 0, 0, 0),
        to: new Date(toYear, toMonth - 1, toDay, 0, 0, 0),
      }}
      initialMaxDistance={20}
      initialGenres={[]}
      initialBandTypes={[]}
      initialSort="Date"
      initialEvents={events}
      initialLocationDisplay={countyNames
        .replaceAll("%20", " ")
        .split("%3A%3A")
        .join(", ")}
      userAgent={userAgent}
      userId={userId}
    />
  );
}
