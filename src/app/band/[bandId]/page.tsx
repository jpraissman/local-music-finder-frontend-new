import { getBandById } from "@/api/apiCalls";
import BandPage from "@/components/venueBandPages/BandPage";

interface PageProps {
  params: {
    bandId: number;
  };
  searchParams: { p?: string };
}

export default async function Page({
  params: { bandId },
  searchParams,
}: PageProps) {
  const navValue = parseInt(searchParams.p || "0", 10);
  const bandData = await getBandById(bandId);

  return (
    <BandPage
      bandId={bandId}
      initialBandData={bandData}
      initialNavValue={navValue}
    />
  );
}
