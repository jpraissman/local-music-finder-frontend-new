import { getBandById } from "@/api/apiCalls";
import AdminEditBand from "@/components/admin/search/AdminEditBand";
import { Box } from "@mui/material";

interface PageProps {
  params: {
    bandId: number;
  };
}

export default async function Page({ params: { bandId } }: PageProps) {
  try {
    const band = await getBandById(bandId);

    return <AdminEditBand band={band.bandInfo} />;
  } catch {
    return (
      <Box sx={{ paddingTop: "100px" }}>
        Something went wrong. Most likely the band could not be found.
      </Box>
    );
  }
}
