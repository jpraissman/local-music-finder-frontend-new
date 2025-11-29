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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  UpsertEventRequestDTOSchema,
  UpsertEventRequestDTOInput,
} from "@/dto/event/UpsertEventRequest.dto";
import { createEvent, getLocationById } from "@/api/apiCalls";
import { isAxiosError } from "axios";
import { useState } from "react";
import BaseModal from "../base/BaseModal";

export default function CreateEventForm() {
  const [showConfirmAddressModal, setShowConfirmAddressModal] = useState(false);

  const formMethods = useForm<UpsertEventRequestDTOInput>({
    resolver: zodResolver(UpsertEventRequestDTOSchema),
    defaultValues: {
      genres: [],
    },
  });

  const router = useRouter();
  const {
    mutate,
    isPending: isCreateEventPending,
    isError: isCreateEventError,
    error: createEventError,
  } = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      router.push(`/post/success/${data.eventCode}`);
    },
  });

  const locationId = formMethods.watch("location.locationId");

  const {
    data: locationInfo,
    isLoading: islocationInfoLoading,
    isError: islocationInfoError,
    error: locationInfoError,
  } = useQuery({
    queryKey: ["getLocationById", locationId],
    queryFn: () => getLocationById(locationId),
    enabled: !!locationId,
  });

  const confirmAddress = formMethods.handleSubmit(() => {
    if (!islocationInfoLoading && !islocationInfoError && locationInfo) {
      formMethods.setValue("location.address", locationInfo.address);
      formMethods.setValue("location.locationId", locationInfo.locationId);
      setShowConfirmAddressModal(true);
    }
  });

  return (
    <Box
      component="form"
      onSubmit={confirmAddress}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <BaseModal
        open={showConfirmAddressModal}
        onClose={() => setShowConfirmAddressModal(false)}
      >
        <Typography sx={{ fontSize: "20px" }}>
          {`Confirm this address is correct for ${formMethods.watch(
            "venueName"
          )}`}
        </Typography>
        <Typography sx={{ fontSize: "20px" }} fontWeight={"bold"}>
          {formMethods.watch("location.address")}
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
            onClick={() => {
              setShowConfirmAddressModal(false);
            }}
          >
            Edit Address
          </Button>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={formMethods.handleSubmit((data) => {
              setShowConfirmAddressModal(false);
              mutate(data);
            })}
          >
            Post Event
          </Button>
        </Box>
      </BaseModal>
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
        {!isCreateEventPending && !islocationInfoLoading && (
          <Stack direction={"column"} spacing={2}>
            <Button type="submit" variant="contained" size="large">
              Post Event
            </Button>
            {isCreateEventError && (
              <Typography color="red">
                {isAxiosError(createEventError) &&
                createEventError?.response?.data?.code === "ADDRESS_ERROR"
                  ? "There was an error with the given address. Please check that the given address is correct."
                  : "There was an error posting the event. Our team has been made aware of the issue and we are looking into it."}
              </Typography>
            )}
            {islocationInfoError && (
              <Typography color="red">
                {isAxiosError(locationInfoError) &&
                locationInfoError?.response?.data?.code === "ADDRESS_ERROR"
                  ? "There was an error with the given address. Please check that the given address is correct."
                  : "There is an error on our end. Our team has been made aware of the issue and we are looking into it."}
              </Typography>
            )}
          </Stack>
        )}
        {(isCreateEventPending || islocationInfoLoading) && (
          <CircularProgress />
        )}
      </Stack>
    </Box>
  );
}
