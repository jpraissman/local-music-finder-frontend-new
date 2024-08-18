import EventSearchScreen from "@/components/EventSearchScreen";
import { blankFilters } from "@/types/constants";

export const metadata = {
  title: "Find Live Music Events Near You",
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
