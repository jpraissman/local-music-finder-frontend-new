"use client";

import { ArrowBack } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

interface MergeBandsOrVenuesProps {
  data: { name: string; id: number }[];
  mergeType: "Band" | "Venue";
  adminKey: string;
}

export default function MergeBandsOrVenues({
  data,
  mergeType,
  adminKey,
}: MergeBandsOrVenuesProps) {
  const [itemOne, setItemOne] = useState<string | null>(null);
  const [itemTwo, setItemTwo] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  const { mutate } = useMutation({
    mutationFn: () => {
      if (mergeType === "Band") {
        return axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/bands/merge?admin_key=${adminKey}`,
          {
            band_id_one: itemOne?.split(" ::: ")[1],
            band_id_two: itemTwo?.split(" ::: ")[1],
            band_name: name,
          }
        );
      } else {
        return axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/venues/merge?admin_key=${adminKey}`,
          {
            venue_id_one: itemOne?.split(" ::: ")[1],
            venue_id_two: itemTwo?.split(" ::: ")[1],
            venue_name: name,
          }
        );
      }
    },
    onSuccess: () => {
      alert(`${mergeType}s merged successfully!`);
      setItemOne(null);
      setItemTwo(null);
      setName("");
    },
    onError: (error) => {
      alert(`There was an error merging the ${mergeType}s.`);
    },
  });

  return (
    <Box sx={{ padding: "50px" }}>
      <Stack direction={"column"} spacing={4}>
        <Link href={"/merge"}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ maxWidth: "100px" }}
          >
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ArrowBack sx={{ fontSize: "18px" }} />
              <Typography>Back</Typography>
            </Stack>
          </Button>
        </Link>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <Typography variant="h3">{`Merge ${mergeType}s`}</Typography>
        </Box>
        <Stack direction={"row"} spacing={10}>
          <Autocomplete
            fullWidth
            options={data.map((item) => item.name + " ::: " + item.id)}
            value={itemOne}
            onChange={(_, newValue) => {
              setItemOne(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label={`${mergeType} One`} />
            )}
          />
          <Autocomplete
            fullWidth
            options={data.map((item) => item.name + " ::: " + item.id)}
            value={itemTwo}
            onChange={(_, newValue) => {
              setItemTwo(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label={`${mergeType} Two`} />
            )}
          />
        </Stack>
        <TextField
          label={`${mergeType} Name To Use`}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            console.log(event.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{ maxWidth: "200px" }}
          onClick={() => {
            if (!itemOne || !itemTwo || !name) {
              alert("Please fill in all fields.");
              return;
            }
            mutate();
          }}
        >
          Merge
        </Button>
        {mergeType === "Band" && (
          <Typography variant="body2">
            {
              "NOTE: Be careful when merging bands. The band that currently has more events will keep its videos. The other band's videos will be deleted and have to be added back."
            }
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
