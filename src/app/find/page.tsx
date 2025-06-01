import EventSearchScreen from "@/components/EventSearchScreen";
import { blankFilters } from "@/types/constants";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";

export const metadata: Metadata = {
  title: "Find Live Music Events Near You",
  description:
    "Search for live music events near you using our super simple search page. We have live music events all over North Jersey for you to enjoy!",
};

export default async function Page() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || "Undefined";
  const requestHeaders = headers();
  const userAgent = requestHeaders.get("user-agent") || "Undefined";

  return (
    <>
      <EventSearchScreen
        filters={blankFilters}
        eventsInit={[]}
        noFilters={true}
        landingPage={false}
        userId={userId}
        userAgent={userAgent}
      />
    </>
  );
}
