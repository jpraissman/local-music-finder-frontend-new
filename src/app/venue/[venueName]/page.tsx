import VenuePage from "@/components/venuePage/VenuePage";
import Event from "@/types/Event";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";

interface PageProps {
  params: {
    venueName: string;
  };
}

export async function loadVenueEvents(venueName: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/venue/${venueName}/events`
  );
  const data: Event[] = await res.data.events;

  return data;
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
