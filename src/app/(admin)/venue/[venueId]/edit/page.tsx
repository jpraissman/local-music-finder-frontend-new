import EditBandOrVenueHeaderInfo from "@/components/venueBandPages/EditBandOrVenueHeaderInfo";
import { loadVenueInfo } from "@/lib/load-venue-info";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    venueId: string;
  };
}

export default async function Page({ params: { venueId } }: PageProps) {
  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie) {
    return <Box>There was an error.</Box>;
  }

  const venueInfo = await loadVenueInfo(venueId);

  return (
    <EditBandOrVenueHeaderInfo
      editType="Venue"
      facebookLink={venueInfo.facebook_link || ""}
      instagramLink={venueInfo.instagram_link || ""}
      websiteLink={venueInfo.website || ""}
      name={venueInfo.name}
      id={venueInfo.id}
      adminKey={adminKeyCookie.value}
    />
  );
}
