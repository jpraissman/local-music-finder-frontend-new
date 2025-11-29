"use client";

import { HttpStatusCode } from "axios";
import EventIdInput from "../eventForm/EventIdInput";

interface GetEventByEventCodeErrorBoundaryProps {
  error: any;
}

export default function GetEventByEventCodeErrorBoundary({
  error,
}: GetEventByEventCodeErrorBoundaryProps) {
  if (error?.response?.status === HttpStatusCode.NotFound)
    return (
      <EventIdInput
        errorMessage="An event could not be found with the given Event ID. Please make
            sure you entered the correct ID. The ID is case sensitive."
      />
    );

  return (
    <EventIdInput
      errorMessage="An unexpected error occurred. Please try again. Our team has been 
          made aware of the issue and is looking into it."
    />
  );
}
