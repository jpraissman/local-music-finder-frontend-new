import BandPage from "@/components/venueBandPages/BandPage";
import { loadBandEvents, loadBandInfo } from "@/lib/load-band-info";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies, headers } from "next/headers";

interface PageProps {
  params: {
    bandId: string;
  };
}

export default async function Page({ params: { bandId } }: PageProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["bandEvents", bandId],
      queryFn: () => loadBandEvents(bandId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["bandInfo", bandId],
      queryFn: () => loadBandInfo(bandId),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BandPage bandId={bandId} userAgent={userAgent} userId={userId} />
    </HydrationBoundary>
  );
}
