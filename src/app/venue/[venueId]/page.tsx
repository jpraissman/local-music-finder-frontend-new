import { getVenueById } from "@/api/apiCalls";
import VenuePage from "@/components/venueBandPages/VenuePage";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    venueId: number;
  };
}

export default async function Page({ params: { venueId } }: PageProps) {
  const cookieStore = await cookies();
  const adminKey = cookieStore.get("adminKey")?.value || "Undefined";

  const venueData = await getVenueById(venueId);

  return (
    <VenuePage
      venueId={venueId}
      initialVenueData={venueData}
      userIsAdmin={adminKey === process.env.ADMIN_KEY}
    />
  );
}
