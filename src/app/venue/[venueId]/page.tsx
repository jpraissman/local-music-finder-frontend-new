import VenuePage from "@/components/venuePage/VenuePage";
import { loadVenueEvents, loadVenueInfo } from "@/lib/load-venue-info";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies, headers } from "next/headers";

interface PageProps {
  params: {
    venueId: string;
  };
}

export default async function Page({ params: { venueId } }: PageProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["venueEvents", venueId],
      queryFn: () => loadVenueEvents(venueId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["venueInfo", venueId],
      queryFn: () => loadVenueInfo(venueId),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <VenuePage venueId={venueId} userAgent={userAgent} userId={userId} />
    </HydrationBoundary>
  );
}
