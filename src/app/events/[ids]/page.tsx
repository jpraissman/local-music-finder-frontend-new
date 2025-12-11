import { getEventsByIds } from "@/api/apiCalls";
import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import { Metadata } from "next";

interface PageProps {
  params: {
    ids: string;
  };
}

export function generateMetadata(): Metadata {
  return {
    title: "Live Music Events - The Local Music Finder",
  };
}

export const revalidate = 0;

export default async function Page({ params: { ids } }: PageProps) {
  try {
    const idsToSend = ids
      .split("%3A%3A")
      .join(",")
      .replaceAll("%3A", "")
      .replaceAll("For", "");
    const events = await getEventsByIds(idsToSend);
    return (
      <NewEventSearchPage
        initialLocation={"BLANK"}
        initialEvents={events}
        initialLocationDisplay={"Id Page"}
      />
    );
  } catch {
    return <NewEventSearchPage initialLocation={"BLANK"} />;
  }
}
