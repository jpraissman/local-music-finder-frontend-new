import CreateEventForm from "@/components/eventForm/CreateEventForm";
import { loadBands } from "@/lib/load-bands";
import { loadVenues } from "@/lib/load-venues";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Post An Event - The Local Music Finder",
  description:
    "Post your live music event to have it easily reach many live music fans in North Jersey. Posting live music events is super simple with The Local Music Finder.",
};

export default async function Page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["venues"], queryFn: loadVenues }),
    queryClient.prefetchQuery({ queryKey: ["bands"], queryFn: loadBands }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CreateEventForm />
    </HydrationBoundary>
  );
}
