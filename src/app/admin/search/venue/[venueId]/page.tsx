import { getVenueById } from "@/api/apiCalls";
import AdminEditVenue from "@/components/admin/search/AdminEditVenue";
import { Box } from "@mui/material";

interface PageProps {
  params: {
    venueId: number;
  };
}

export default async function Page({ params: { venueId } }: PageProps) {
  try {
    const venue = await getVenueById(venueId);

    return <AdminEditVenue venue={venue.venueInfo} />;
  } catch {
    return (
      <Box sx={{ paddingTop: "100px" }}>
        Something went wrong. Most likely the band could not be found.
      </Box>
    );
  }
}
