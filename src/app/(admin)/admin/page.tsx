import AdminDashboard from "@/components/admin/AdminDashboard";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie) {
    return <Box>There was an error.</Box>;
  }

  return <AdminDashboard adminKey={adminKeyCookie.value} />;
}
