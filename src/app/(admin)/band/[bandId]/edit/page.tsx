import EditBandOrVenueHeaderInfo from "@/components/venueBandPages/EditBandOrVenueHeaderInfo";
import { loadBandInfo } from "@/lib/load-band-info";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    bandId: string;
  };
}

export default async function Page({ params: { bandId } }: PageProps) {
  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie) {
    return <Box>There was an error.</Box>;
  }

  const bandInfo = await loadBandInfo(bandId);

  return (
    <EditBandOrVenueHeaderInfo
      editType="Band"
      facebookLink={bandInfo.facebook_url || ""}
      instagramLink={bandInfo.instagram_url || ""}
      websiteLink={bandInfo.website_url || ""}
      name={bandInfo.name}
      id={bandInfo.id}
      adminKey={adminKeyCookie.value}
    />
  );
}
