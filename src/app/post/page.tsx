import CreateEventForm from "@/components/eventForm/CreateEventForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post An Event - The Local Music Finder",
  description:
    "Post your live music event to have it easily reach many live music fans in North Jersey. Posting live music events is super simple with The Local Music Finder.",
};

export default async function Page() {
  return <CreateEventForm />;
}
