import BandPage from "@/components/venueBandPages/BandPage";
import {
  loadBandEvents,
  loadBandInfo,
  loadBandVideos,
} from "@/lib/load-band-info";
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
  searchParams: { p?: string };
}

export default async function Page({
  params: { bandId },
  searchParams,
}: PageProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const adminKey = cookieStore.get("adminKey")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  const navValue = parseInt(searchParams.p ?? "0", 10);

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
    queryClient.prefetchQuery({
      queryKey: ["bandVideos", bandId],
      queryFn: () => loadBandVideos(bandId),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BandPage
        bandId={bandId}
        userAgent={userAgent}
        userId={userId}
        initialNavValue={navValue}
        userIsAdmin={adminKey === process.env.ADMIN_KEY}
      />
    </HydrationBoundary>
  );
}
