"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EventFormFields,
  eventFormSchema,
} from "@/types/schemas/eventFormSchema";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import EventForm from "./EventForm";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const postEvent = async (data: EventFormFields) => {
  const formattedData = {
    ...data,
    eventDate: data.eventDate.format("YYYY-MM-DD"),
    eventStartTime: data.eventStartTime.format("HH:mm"),
    eventEndTime: data.eventEndTime ? data.eventEndTime.format("HH:mm") : null,
  };
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`,
    formattedData
  );
  return response.data;
};

export default function CreateEventForm() {
  const { register, handleSubmit, control, formState, setValue, watch } =
    useForm<EventFormFields>({
      resolver: zodResolver(eventFormSchema),
      defaultValues: {
        genres: [],
        coverCharge: "",
        eventEndTime: null,
        tributeBandName: "",
        phone: "",
      },
    });

  const router = useRouter();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: postEvent,
    onSuccess: (data) => {
      router.push(`/post/success/${data.event.event_id}`);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        sx={{ width: "100%" }}
        alignItems={"center"}
      >
        <Typography
          sx={{
            fontSize: { xs: "28px", sm: "32px" },
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Create An Event
        </Typography>
        <EventForm
          creatingEvent={true}
          register={register}
          control={control}
          formState={formState}
          setValue={setValue}
          watch={watch}
        />
        {!isPending && (
          <Stack direction={"column"} spacing={2}>
            <Button type="submit" variant="contained" size="large">
              Post Event
            </Button>
            {isError && (
              <Typography color="red">
                There was an error posting the event. Please try again.
              </Typography>
            )}
          </Stack>
        )}
        {isPending && <CircularProgress />}
      </Stack>
    </Box>
  );
}
