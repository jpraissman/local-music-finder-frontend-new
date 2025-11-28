import { validateAdminKey } from "@/api/apiCalls";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";
import { Box } from "@mui/material";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const adminKey = cookieStore.get("adminKey")?.value;

  try {
    await validateAdminKey(adminKey);
    return <AdminPageWrapper>{children}</AdminPageWrapper>;
  } catch {
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
}
