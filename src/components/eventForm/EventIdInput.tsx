"use client";

import {
  EventIdInputFields,
  eventIdInputSchema,
} from "@/types/schemas/eventIdInputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface EventIdInputProps {
  errorMessage?: string;
  initialEventId?: string;
}

export default function EventIdInput({
  errorMessage = "",
  initialEventId = "",
}: EventIdInputProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EventIdInputFields>({
    resolver: zodResolver(eventIdInputSchema),
    defaultValues: {
      eventId: initialEventId,
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit((data) => {
        window.location.href = `/edit/${data.eventId}`;
      })}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          paddingTop: "50px",
          textAlign: "center",
        }}
        direction="column"
        spacing={1}
        alignItems="center"
      >
        {errorMessage && (
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              paddingBottom: "30px",
              fontWeight: "bold",
              color: "red",
            }}
          >
            {errorMessage}
          </Typography>
        )}
        <Typography
          sx={{
            fontSize: { xs: "28px", sm: "32px" },
            paddingBottom: "30px",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Edit/Delete Your Event
        </Typography>
        <TextField
          id="event-id-input"
          label="What is the Event ID? *"
          fullWidth
          error={!!errors.eventId}
          variant="outlined"
          helperText={
            errors.eventId ? "Please enter a valid Event Id." : undefined
          }
          {...register("eventId")}
        />
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "18px" },
            paddingBottom: "30px",
          }}
        >
          Your Event ID can be found in the email you received when you created
          the event.
        </Typography>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Stack>
    </Box>
  );
}
