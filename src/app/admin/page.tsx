import AdminDashboard from "@/components/admin/AdminDashboard";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

export default async function Page() {
  const adminKey = process.env.ADMIN_KEY;

  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie || adminKeyCookie.value !== adminKey) {
    return (
      <Box
        sx={{
          paddingTop: "200px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        This is restricted to admins.
      </Box>
    );
  }

  return <AdminDashboard adminKey={adminKeyCookie.value} />;
}
