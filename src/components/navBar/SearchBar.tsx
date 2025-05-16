"use client";

import { useState } from "react";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  Box,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  venues: { [key: string]: string };
  bands: { [key: string]: string };
}

export default function SearchBar({ venues, bands }: SearchBarProps) {
  const [value, setValue] = useState<string | null>(null);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
      }}
    >
      <Autocomplete
        freeSolo
        options={[...Object.keys(venues), ...Object.keys(bands)]}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for band/venue..."
            variant="outlined"
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "5px",
                height: "40px",
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.common.white, 0.25),
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
        )}
      />
    </Box>
  );
}
