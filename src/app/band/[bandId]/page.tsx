import BandPage from "@/components/bandPage/BandPage";
import { loadBandEvents } from "@/lib/load-band-events";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PageProps {
  params: {
    bandId: string;
  };
}

export default async function Page({ params: { bandId } }: PageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [bandId + "band"],
    queryFn: () => loadBandEvents(bandId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BandPage bandId={bandId} />
    </HydrationBoundary>
  );
}
