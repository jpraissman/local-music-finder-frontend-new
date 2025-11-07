"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import EventForm from "./EventForm";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Clear, Delete, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  UpsertEventRequestDTOInput,
  UpsertEventRequestDTOSchema,
} from "@/dto/event/UpsertEventRequest.dto";
import { deleteEvent, editEvent, getEventByEventCode } from "@/api/apiCalls";
import { HttpStatusCode, isAxiosError } from "axios";

interface EditEventFormProps {
  eventCode: string;
}

export default function EditEventForm({ eventCode }: EditEventFormProps) {
  const { data: initialEventInfo } = useSuspenseQuery({
    queryKey: ["getEvent", eventCode],
    queryFn: () => getEventByEventCode(eventCode),
    retry: (failureCount, error: any) => {
      return (
        error?.response?.status === HttpStatusCode.InternalServerError &&
        failureCount < 2
      );
    },
  });

  const formMethods = useForm<UpsertEventRequestDTOInput>({
    resolver: zodResolver(UpsertEventRequestDTOSchema),
    defaultValues: initialEventInfo,
  });

  const router = useRouter();
  const {
    mutate: editEventMutation,
    isPending: editEventPending,
    isError: isEditEventError,
    error: editEventError,
  } = useMutation({
    mutationFn: ({
      eventCode,
      data,
    }: {
      eventCode: string;
      data: UpsertEventRequestDTOInput;
    }) => editEvent(eventCode, data),
    onSuccess: () => {
      router.push(`/edit/updated`);
    },
  });
  const {
    mutate: deleteEventMutation,
    isPending: deleteEventPending,
    isError: deleteEventError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      router.push("/edit/deleted");
    },
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <Box
        component="form"
        onSubmit={formMethods.handleSubmit((data) => {
          editEventMutation({ eventCode, data });
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
            Edit Your Event
          </Typography>
          <FormProvider {...formMethods}>
            <EventForm creatingEvent={false} />
          </FormProvider>
          {!editEventPending && !deleteEventPending && (
            <Stack direction={"column"} spacing={2}>
              <Stack direction="row" spacing={4}>
                <Button
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                  variant="outlined"
                  startIcon={<Delete />}
                  size="large"
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<Save />}
                  size="large"
                >
                  Update
                </Button>
              </Stack>
              {(isEditEventError || deleteEventError) && (
                <Typography color="red">
                  {isAxiosError(editEventError) &&
                  editEventError?.response?.data?.code === "ADDRESS_ERROR"
                    ? "There was an error with the given address. Please check that the given address is correct."
                    : "There was an error posting the event. Our team has been made aware of the issue and we are looking into it."}
                </Typography>
              )}
            </Stack>
          )}
          {(editEventPending || deleteEventPending) && <CircularProgress />}
        </Stack>
      </Box>
      <Modal
        open={confirmDelete}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: {
              xs: "90vw",
              sm: "60vw",
              md: "50vw",
              lg: "40vw",
              xl: "30vw",
            },
            maxHeight: "95vh",
            boxShadow: 24,
            overflow: "auto",
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <IconButton onClick={() => setConfirmDelete(false)}>
              <Clear color="error" sx={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
          <Box sx={{ p: 4 }}>
            <Stack
              direction="column"
              spacing={5}
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "20px" }}>
                Are you sure you want to delete this event?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  endIcon={<Delete />}
                  onClick={() => {
                    setConfirmDelete(false);
                    deleteEventMutation(eventCode);
                  }}
                >
                  Delete Forever
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={() => {
                    setConfirmDelete(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
