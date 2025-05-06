"use client";

import Filters from "@/types/Filters";
import EventSearchScreen from "./EventSearchScreen";
import Event from "@/types/Event";
import dayjs from "dayjs";

interface EventSearchScreenWrapperProps {
  filters: Filters;
  eventsInit: Event[];
  noFilters: boolean;
  landingPage: boolean;
  searchLocation?: string;
  searchDateRange?: string;
  fromDate: string;
  toDate: string;
}

export default function EventSearchScreenWrapper(
  props: EventSearchScreenWrapperProps
) {
  return (
    <EventSearchScreen
      filters={{
        ...props.filters,
        dateRange: {
          from: dayjs(props.fromDate).toDate(),
          to: dayjs(props.toDate).toDate(),
        },
      }}
      eventsInit={props.eventsInit}
      noFilters={props.noFilters}
      landingPage={props.landingPage}
      searchLocation={props.searchLocation}
      searchDateRange={props.searchDateRange}
    />
  );
}
