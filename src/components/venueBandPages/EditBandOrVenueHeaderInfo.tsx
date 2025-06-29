"use client";

import {
  EditVenueOrBandFields,
  editVenueOrBandSchema,
} from "@/types/schemas/editVenurOrBandSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface EditBandOrVenueHeaderInfoProps {
  editType: "Band" | "Venue";
  name: string;
  id: number;
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
  adminKey: string;
}

export default function EditBandOrVenueHeaderInfo({
  editType,
  name,
  id,
  facebookLink,
  instagramLink,
  websiteLink,
  adminKey,
}: EditBandOrVenueHeaderInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditVenueOrBandFields>({
    defaultValues: {
      facebook_url: facebookLink,
      instagram_url: instagramLink,
      website_url: websiteLink,
    },
    resolver: zodResolver(editVenueOrBandSchema),
  });

  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (data: EditVenueOrBandFields) => {
      if (editType === "Band") {
        return axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/band/${id}/edit?admin_key=${adminKey}`,
          data
        );
      } else {
        return axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/venue/${id}/edit?admin_key=${adminKey}`,
          data
        );
      }
    },
    onSuccess: () => {
      if (editType === "Band") {
        router.push(`/band/${id}`);
      } else {
        router.push(`/venue/${id}`);
      }
    },
    onError: () => {
      alert("There was an error making the update.");
    },
  });
  const onSubmit = (data: EditVenueOrBandFields) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={"column"}
          spacing={4}
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "50px",
            width: "90vw",
            maxWidth: "1000px",
          }}
        >
          <Typography variant="h3">{`Edit ${editType}`}</Typography>
          <Typography variant="h5">{`${editType}: ${name}`}</Typography>
          <TextField
            {...register("facebook_url")}
            fullWidth
            label="Facebook URL"
            error={errors.facebook_url !== undefined}
            helperText={
              errors.facebook_url ? "Please enter a valid facebook url" : ""
            }
          />
          <TextField
            {...register("instagram_url")}
            fullWidth
            label="Instagram URL"
            error={errors.instagram_url !== undefined}
            helperText={
              errors.instagram_url ? "Please enter a valid instagram url" : ""
            }
          />
          <TextField
            {...register("website_url")}
            fullWidth
            label="Website URL"
            error={errors.website_url !== undefined}
            helperText={
              errors.website_url ? "Please enter a valid website url" : ""
            }
          />
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
