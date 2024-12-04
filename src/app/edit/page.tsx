import EditEvent from "@/components/EditEvent";
import PageVisitTracker from "@/components/PageVisitTracker";

export const metadata = {
  title: "Edit Your Live Music Event",
};

export default function Page() {
  return (
    <>
      <PageVisitTracker page="Edit" />
      <EditEvent />
    </>
  );
}
