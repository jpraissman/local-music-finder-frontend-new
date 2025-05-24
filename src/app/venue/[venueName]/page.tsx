import VenuePage from "@/components/venuePage/VenuePage";
import { loadVenueEvents } from "@/lib/load-venue-events";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PageProps {
  params: {
    venueName: string;
  };
}

export default async function Page({ params: { venueName } }: PageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [venueName],
    queryFn: () => loadVenueEvents(venueName),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <VenuePage venueName={venueName} />
    </HydrationBoundary>
  );
}
