import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import WebsiteFooter from "../components/WebsiteFooter";
import { Box } from "@mui/material";
import Script from "next/script";

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-20R9LPJNBJ"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-20R9LPJNBJ');`}
        </Script>
      </head>
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
