// import MergeBandsOrVenues from "@/components/admin/MergeBandsOrVenues";
// import { Box } from "@mui/material";
// import { cookies } from "next/headers";

import { Box } from "@mui/material";

// export default async function Page() {
//   const cookieStore = await cookies();
//   const adminKeyCookie = cookieStore.get("adminKey");

//   if (!adminKeyCookie) {
//     return <Box>There was an error.</Box>;
//   }

//   // const bands: { name: string; id: number }[] = await getBandsForSearchBar();

//   return (
//     <MergeBandsOrVenues
//       data={bands}
//       mergeType="Band"
//       adminKey={adminKeyCookie.value}
//     />
//   );
// }

export default function Page() {
  return (
    <Box paddingTop={30} textAlign={"center"}>
      Page coming soon.
    </Box>
  );
}
