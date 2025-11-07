import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Live Music Events Near You",
  description:
    "Search for live music events near you using our super simple search page. We have live music events all over North Jersey for you to enjoy!",
};

export default async function Page() {
  return (
    <NewEventSearchPage
      initialLocation={locDecoded ?? null}
      initialDateRange={
        searchParams.to && searchParams.from
          ? {
              to: new Date(toYear, toMonth - 1, toDay, 12, 0, 0),
              from: new Date(fromYear, fromMonth - 1, fromDay, 12, 0, 0),
            }
          : undefined
      }
      initialMaxDistance={disDecoded ? Number(disDecoded) : 20}
      initialGenres={genresDecoded ? genresDecoded.split("-") : []}
      initialBandTypes={
        searchParams.types
          ? searchParams.types.replaceAll("+", " ").split("-")
          : []
      }
      initialSort={
        searchParams.sort === "Date" || searchParams.sort === "Distance"
          ? searchParams.sort
          : "Date"
      }
      initialEvents={null}
      initialLocationDisplay={null}
    />
  );
}
