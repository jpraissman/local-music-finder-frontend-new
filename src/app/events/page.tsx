import { getEventsNextSevenDays } from "@/api/apiCalls";
import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Live Music Events - The Local Music Finder",
  };
}

export const revalidate = 0;

export default async function Page() {
  try {
    const { events } = await getEventsNextSevenDays();
    return (
      <NewEventSearchPage
        initialLocation={"BLANK"}
        initialEvents={events}
        initialLocationDisplay={"New Jersey"}
        initialDateRange="NEXT_7_DAYS"
      />
    );
  } catch {
    return <NewEventSearchPage initialLocation={"BLANK"} />;
  }
}
