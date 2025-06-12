import AdminSessionPage from "@/components/admin/AdminSessionPage";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: { sessionId: string };
}) {
  const cookieStore = await cookies();
  const adminKeyCookie = cookieStore.get("adminKey");

  if (!adminKeyCookie) {
    return <Box>There was an error.</Box>;
  }

  return (
    <AdminSessionPage
      sessionId={params.sessionId}
      adminKey={adminKeyCookie.value}
    />
  );
}
