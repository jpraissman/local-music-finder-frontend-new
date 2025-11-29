import { getVenueById } from "@/api/apiCalls";
import VenuePage from "@/components/venueBandPages/VenuePage";

interface PageProps {
  params: {
    venueId: number;
  };
}

export default async function Page({ params: { venueId } }: PageProps) {
  const venueData = await getVenueById(venueId);

  return <VenuePage venueId={venueId} initialVenueData={venueData} />;
}
