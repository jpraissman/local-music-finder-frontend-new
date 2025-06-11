import {
  DateCalendar,
  DateCalendarProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ClientDateCalendar(props: DateCalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={props.slots}
        slotProps={props.slotProps}
        onChange={props.onChange}
        value={props.value}
      />
    </LocalizationProvider>
  );
}
