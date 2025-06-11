import MergeVenues from "@/components/admin/MergeVenues";
import { getVenuesForSearchBar } from "@/lib/search-bar-data";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie) {
    return <Box>There was an error.</Box>;
  }

  const venues: { name: string; id: number }[] = await getVenuesForSearchBar();

  return <MergeVenues venues={venues} adminKey={adminKeyCookie.value} />;
}
