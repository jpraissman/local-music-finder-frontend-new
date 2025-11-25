// import MergeBandsOrVenues from "@/components/admin/MergeBandsOrVenues";
// import { Box } from "@mui/material";
// import { cookies } from "next/headers";

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
