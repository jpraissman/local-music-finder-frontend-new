import CreateEventForm from "@/components/CreateEventForm";
import { blankEventDetails } from "@/types/constants";

export const metadata = {
  title: "Post An Event",
};

export default function Page() {
  return (
    <CreateEventForm
      event={blankEventDetails}
      createOrEdit="Create"
      eventId=""
    />
  );
}
