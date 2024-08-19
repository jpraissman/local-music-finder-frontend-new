import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import WebsiteFooter from "../components/WebsiteFooter";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Local Music Finder",
  description: "Find live music near you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box sx={{ minHeight: "100vh" }}>
          <NavBar />
          <div>{children}</div>
        </Box>
        <Box sx={{ paddingTop: "100px" }}>
          <WebsiteFooter />
        </Box>
      </body>
    </html>
  );
}
