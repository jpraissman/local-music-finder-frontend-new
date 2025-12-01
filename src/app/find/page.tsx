import NewEventSearchPage from "@/components/newEventSearchPage/NewEventSearchPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Live Music Events Near You",
  description:
    "Search for live music events near you using our super simple search page. We have live music events all over North Jersey for you to enjoy!",
};

export default async function Page() {
  return <NewEventSearchPage />;
}
