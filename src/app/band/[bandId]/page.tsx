import { getBandById } from "@/api/apiCalls";
import BandPage from "@/components/venueBandPages/BandPage";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const adminKey = cookieStore.get("adminKey")?.value;

  const navValue = parseInt(searchParams.p || "0", 10);

  const bandData = await getBandById(bandId);

  return (
    <BandPage
      bandId={bandId}
      initialBandData={bandData}
      initialNavValue={navValue}
      userIsAdmin={adminKey === process.env.ADMIN_KEY}
    />
  );
}
