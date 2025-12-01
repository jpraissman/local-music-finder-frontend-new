export enum EventCreatorType {
  BAND = "BAND",
  VENUE = "VENUE",
}

export const EventCreatorTypeLabels: Record<EventCreatorType, string> = {
  [EventCreatorType.BAND]: "Band/Performer",
  [EventCreatorType.VENUE]: "Venue",
};
