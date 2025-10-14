import GetEventByEventCodeErrorBoundary from "@/components/errorBoundaries/GetEventByEventCodeErrorBoundary";
import EditEventForm from "@/components/eventForm/EditEventForm";
import { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";

export const metadata: Metadata = {
  title: "Edit Your Event - The Local Music Finder",
};

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <ErrorBoundary FallbackComponent={GetEventByEventCodeErrorBoundary}>
      <EditEventForm eventCode={params.id} />
    </ErrorBoundary>
  );
}
