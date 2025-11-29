import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import Script from "next/script";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import "react-day-picker/style.css";
import ThemeWrapper from "@/components/ThemeWrapper";
import WebsiteFooter from "@/components/WebsiteFooter";
import NavBar from "@/components/navBar/NavBar";
import { cookies, headers } from "next/headers";
import { BandProvider } from "@/context/BandContext";
import { VenueProvider } from "@/context/VenueContext";
import { FiltersProvider } from "@/context/FiltersContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thelocalmusicfinder.com/"),
  title: "The Local Music Finder",
  description: "Find live music near you!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent");
  const referer = requestHeaders.get("referer");
  const ip = requestHeaders.get("x-forwarded-for");

  return (
    <ReactQueryClientProvider>
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
        <body className={inter.className} style={{ margin: 0 }}>
          <ThemeWrapper>
            <BandProvider>
              <VenueProvider>
                <FiltersProvider>
                  <Box sx={{ minHeight: "100vh" }}>
                    <NavBar />
                    <Box sx={{ paddingTop: "75px" }}>
                      <div>{children}</div>
                    </Box>
                  </Box>
                  <Box sx={{ paddingTop: "100px" }}>
                    <WebsiteFooter />
                  </Box>
                </FiltersProvider>
              </VenueProvider>
            </BandProvider>
          </ThemeWrapper>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
