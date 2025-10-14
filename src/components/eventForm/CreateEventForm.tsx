"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import EventForm from "./EventForm";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  UpsertEventRequestDTOSchema,
  UpsertEventRequestDTOInput,
} from "@/dto/event/UpsertEventRequest.dto";
import { createEvent } from "@/api/apiCalls";
import { isAxiosError } from "axios";

export default function CreateEventForm() {
  const formMethods = useForm<UpsertEventRequestDTOInput>({
    resolver: zodResolver(UpsertEventRequestDTOSchema),
    defaultValues: {
      genres: [],
    },
  });

  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      router.push(`/post/success/${data.eventCode}`);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formMethods.handleSubmit((data) => mutate(data))}
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
        <FormProvider {...formMethods}>
          <EventForm creatingEvent={true} />
        </FormProvider>
        {!isPending && (
          <Stack direction={"column"} spacing={2}>
            <Button type="submit" variant="contained" size="large">
              Post Event
            </Button>
            {isError && (
              <Typography color="red">
                {isAxiosError(error) &&
                error?.response?.data?.code === "ADDRESS_ERROR"
                  ? "There was an error with the given address. Please check that the given address is correct."
                  : "There was an error posting the event. Our team has been made aware of the issue and we are looking into it."}
              </Typography>
            )}
          </Stack>
        )}
        {isPending && <CircularProgress />}
      </Stack>
    </Box>
  );
}
