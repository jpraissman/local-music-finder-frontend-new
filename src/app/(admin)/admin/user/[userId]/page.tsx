import AdminUserPage from "@/components/admin/AdminUserPage";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { userId: string } }) {
  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie) {
    return <Box>There was an error.</Box>;
  }

  return (
    <AdminUserPage adminKey={adminKeyCookie.value} userId={params.userId} />
  );
}
