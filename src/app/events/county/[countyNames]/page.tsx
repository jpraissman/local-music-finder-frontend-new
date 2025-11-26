import { getEventsByCountiesAndNext30Days } from "@/api/apiCalls";
import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
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
  try {
    const countyNamesToSend = countyNames.split("%3A%3A").join(",");
    const countyNamesDisplay = countyNames
      .replaceAll("%20", " ")
      .split("%3A%3A")
      .join(", ");
    const { events } = await getEventsByCountiesAndNext30Days(
      countyNamesToSend
    );
    return (
      <NewEventSearchPage
        initialLocation={"BLANK"}
        initialDateRange="NEXT_30_DAYS"
        initialEvents={events}
        initialLocationDisplay={countyNamesDisplay}
      />
    );
  } catch {
    return <NewEventSearchPage initialLocation={"BLANK"} />;
  }
}
