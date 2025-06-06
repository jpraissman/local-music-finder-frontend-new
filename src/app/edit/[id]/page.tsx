import EditEventForm from "@/components/eventForm/EditEventForm";
import { getEventById } from "@/lib/get-event-by-id";
import { loadBands } from "@/lib/load-bands";
import { loadVenues } from "@/lib/load-venues";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Edit Your Event - The Local Music Finder",
};

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["venues"], queryFn: loadVenues }),
    queryClient.prefetchQuery({ queryKey: ["bands"], queryFn: loadBands }),
    queryClient.prefetchQuery({
      queryKey: ["event-by-id"],
      queryFn: () => getEventById(params.id),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <EditEventForm eventId={params.id} />
    </HydrationBoundary>
  );
}
