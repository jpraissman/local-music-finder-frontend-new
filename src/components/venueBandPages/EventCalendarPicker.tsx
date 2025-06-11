import Event from "@/types/Event";
import { Box, Skeleton } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";

const ClientDateCalendar = dynamic(
  () => import("../inputs/ClientDateCalendar"),
  {
    ssr: false,
    loading: () => <Skeleton height={350} width={350} />,
  }
);

function Day(props: PickersDayProps & { highlightedDays?: string[] }) {
  const { highlightedDays = [], day, ...other } = props;

  const isSelected = highlightedDays.indexOf(day.format("YYYY-MM-DD")) >= 0;

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        backgroundColor: isSelected ? "secondary.main" : undefined,
        "&:hover": {
          backgroundColor: isSelected ? "#cf8861" : undefined,
        },
      }}
    />
  );
}

interface EventCalendarPickerProps {
  allEvents: Event[];
  handleDateChange: (newDate: string | undefined) => void;
}

export default function EventCalendarPicker({
  allEvents,
  handleDateChange,
}: EventCalendarPickerProps) {
  const [highlightedDays, _] = useState(
    allEvents.map((event) => event.date_string)
  );

  return (
    <Box
      sx={{
        backgroundColor: "rgba(244, 241, 241, 0.98)",
        borderRadius: "25px",
      }}
    >
      <ClientDateCalendar
        slots={{ day: Day }}
        slotProps={{ day: { highlightedDays } as any }}
        onChange={(newDate) => {
          handleDateChange(newDate?.format("YYYY-MM-DD"));
        }}
        value={null}
      />
    </Box>
  );
}
