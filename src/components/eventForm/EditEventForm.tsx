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
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import EventForm from "./EventForm";
import axios from "axios";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getEventById } from "@/lib/get-event-by-id";
import { blankStructuredFormatting } from "@/types/constants";
import dayjs from "dayjs";
import { Clear, Delete, Save } from "@mui/icons-material";
import { useState } from "react";

const editEvent = async ({
  data,
  eventId,
}: {
  data: EventFormFields;
  eventId: string;
}) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${eventId}`,
    data
  );
  return response.data;
};

const deleteEvent = async (eventId: string) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${eventId}`
  );
  return response.data;
};

interface EditEventFormProps {
  eventId: string;
}

export default function EditEventForm({ eventId }: EditEventFormProps) {
  const { data: eventInfo } = useSuspenseQuery({
    queryKey: ["event-by-id"],
    queryFn: () => getEventById(eventId),
  });

  const { register, handleSubmit, control, formState, setValue, watch } =
    useForm<EventFormFields>({
      resolver: zodResolver(eventFormSchema),
      defaultValues: {
        venueName: eventInfo.venue_name,
        bandName: eventInfo.band_name,
        bandType: eventInfo.band_type,
        tributeBandName: eventInfo.tribute_band_name,
        genres: eventInfo.genres,
        venueAddress: {
          description: eventInfo.address,
          structured_formatting: blankStructuredFormatting,
          place_id: eventInfo.place_id,
        },
        eventDate: dayjs(eventInfo.date_string),
        eventStartTime: dayjs(
          "1900-01-01 " + eventInfo.start_time_formatted,
          "YYYY-MM-DD h:mm A"
        ),
        eventEndTime:
          eventInfo.end_time === null
            ? null
            : dayjs("1900-01-01 " + eventInfo.end_time, "YYYY-MM-DD h:mm A"),
        email: eventInfo.email_address,
        phone: eventInfo.phone_number,
        hasCoverCharge: eventInfo.cover_charge === 0 ? "No" : "Yes",
        coverCharge: eventInfo.cover_charge.toString(),
        facebookHandle: eventInfo.facebook_handle,
        instagramHandle: eventInfo.instagram_handle,
        website: eventInfo.website,
        bandOrVenue: eventInfo.band_or_venue,
        otherInfo: eventInfo.other_info,
        agreeToTerms: true,
      },
    });

  const router = useRouter();
  const {
    mutate: editEventMutation,
    isPending: editEventPending,
    isError: editEventError,
  } = useMutation({
    mutationFn: editEvent,
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
        onSubmit={handleSubmit((data) => {
          console.log(data);
          editEventMutation({ data, eventId });
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
          <EventForm
            creatingEvent={false}
            register={register}
            control={control}
            formState={formState}
            setValue={setValue}
            watch={watch}
          />
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
              {(editEventError || deleteEventError) && (
                <Typography color="red">
                  There was an error. Please try again.
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
                    deleteEventMutation(eventId);
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
