"use client";

import { FilterRefsType, SectionType } from "@/hooks/useFilterRefs";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

interface DisplayMissingFieldProps {
  icon: ReactElement;
  header: string;
  body: string;
  handleFilterClick: () => void;
  editButtonText: string;
  editButtonIcon: ReactElement;
  filterSectionToOpen: SectionType | null;
  filterRefsHook: FilterRefsType;
}

export default function DisplayMissingField({
  icon,
  header,
  body,
  handleFilterClick,
  editButtonText,
  editButtonIcon,
  filterSectionToOpen,
  filterRefsHook,
}: DisplayMissingFieldProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <Stack
        direction={"column"}
        spacing={3}
        display={"flex"}
        alignItems={"center"}
      >
        <Paper
          elevation={5}
          sx={{
            backgroundColor: "#fef2f2",
            borderRadius: "25px",
            paddingX: "50px",
            paddingY: "25px",
          }}
        >
          <Stack
            direction={"column"}
            spacing={1}
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Avatar sx={{ backgroundColor: "#fee2e2", width: 60, height: 60 }}>
              {icon}
            </Avatar>
            <Typography fontWeight={"bold"} color="#991b1b" variant="h6">
              {header}
            </Typography>
            <Typography fontWeight={"medium"} color="#b91c1c" variant="body1">
              {body}
            </Typography>
          </Stack>
        </Paper>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (filterSectionToOpen) {
              filterRefsHook.handleChipFilterClick(filterSectionToOpen);
            }
            handleFilterClick();
          }}
          sx={{ width: "200px" }}
        >
          <Stack direction={"row"} spacing={1}>
            {editButtonIcon}
            <Typography>{editButtonText}</Typography>
          </Stack>
        </Button>
      </Stack>
    </Box>
  );
}
