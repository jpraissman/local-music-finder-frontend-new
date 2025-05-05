import EventIdInput from "@/components/eventForm/EventIdInput";
import PageVisitTracker from "@/components/PageVisitTracker";

export const metadata = {
  title: "Edit Your Live Music Event",
};

export default function Page() {
  return (
    <>
      <PageVisitTracker page="Edit" />
      <EventIdInput />
    </>
  );
}
