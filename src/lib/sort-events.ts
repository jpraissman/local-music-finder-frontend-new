import { EventDTO } from "@/dto/event/Event.dto";
import dayjs from "dayjs";

export const sortEventsByDate = (events: EventDTO[]) =>
  events.sort((a, b) => {
    const dateA = dayjs(`${a.eventDate} ${a.startTime}`);
    const dateB = dayjs(`${b.eventDate} ${b.startTime}`);
    return dateA.isAfter(dateB) ? 1 : -1;
  });
