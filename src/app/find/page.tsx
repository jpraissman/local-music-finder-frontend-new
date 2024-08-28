import EventSearchScreen from "@/components/EventSearchScreen";
import { blankFilters } from "@/types/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Live Music Events Near You",
  description:
    "Search for live music events near you using our super simple search page. We have live music events all over North Jersey for you to enjoy!",
};

export default function Page() {
  return (
    <EventSearchScreen
      filters={blankFilters}
      eventsInit={[]}
      noFilters={true}
    />
  );
}
