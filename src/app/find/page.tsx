import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import { getEventsByLoc } from "@/lib/get-events-by-loc";
import { blankStructuredFormatting } from "@/types/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: "Find Live Music Events Near You",
  description:
    "Search for live music events near you using our super simple search page. We have live music events all over North Jersey for you to enjoy!",
};

interface PageProps {
  searchParams: {
    loc?: string;
    to?: string;
    from?: string;
    dis?: string;
    genres?: string;
    types?: string;
    sort?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  const [toYear, toMonth, toDay] = searchParams.to?.split("-").map(Number) || [
    0, 0, 0,
  ];
  const [fromYear, fromMonth, fromDay] = searchParams.from
    ?.split("-")
    .map(Number) || [0, 0, 0];

  const queryClient = new QueryClient();
  if (searchParams.loc) {
    await queryClient.prefetchQuery({
      queryKey: ["events", searchParams.loc],
      queryFn: () => {
        return getEventsByLoc(searchParams.loc);
      },
    });
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewEventSearchPage
        initialLocation={
          searchParams.loc
            ? {
                description: searchParams.loc,
                place_id: "",
                structured_formatting: blankStructuredFormatting,
              }
            : null
        }
        initialDateRange={
          searchParams.to && searchParams.from
            ? {
                to: new Date(toYear, toMonth - 1, toDay, 12, 0, 0),
                from: new Date(fromYear, fromMonth - 1, fromDay, 12, 0, 0),
              }
            : undefined
        }
        initialMaxDistance={searchParams.dis ? Number(searchParams.dis) : 20}
        initialGenres={
          searchParams.genres
            ? searchParams.genres
                .replaceAll("+", " ")
                .replaceAll("%27", "-")
                .split("-")
            : []
        }
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
        userAgent={userAgent}
        userId={userId}
        initialEvents={null}
        initialLocationDisplay={null}
      />
    </HydrationBoundary>
  );
}
