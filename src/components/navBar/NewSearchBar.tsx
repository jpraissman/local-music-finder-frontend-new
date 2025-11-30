"use client";

import { useState } from "react";
import {
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  alpha,
  useTheme,
} from "@mui/material";
import { Search, LocationOn, MusicNote, Business } from "@mui/icons-material";
import Link from "next/link";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { BandDTO } from "@/dto/band/Band.dto";
import { VenueDTO } from "@/dto/venue/Venue.dto";

interface NewSearchBarProps {
  venues: VenueDTO[];
  bands: BandDTO[];
}

export default function NewSearchBar({ venues, bands }: NewSearchBarProps) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const filteredVenues = venues.filter(
    (venue) =>
      venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.town?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBands = bands.filter(
    (band) =>
      band.bandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      band.genres.some((genre) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      band.tributeBandName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      band.bandType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasResults = filteredVenues.length > 0 || filteredBands.length > 0;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        position: "relative",
        zIndex: 1,
        paddingLeft: { xs: "0px", sm: "10px" },
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search venues, bands, tributes, etc."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (e.target.value.length > 0) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
        onFocus={() => {
          if (searchTerm.length > 0) {
            setIsOpen(true);
          }
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "white" }} />
              </InputAdornment>
            ),
            sx: {
              fontSize: "1.125rem",
              py: 1,
            },
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

      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            zIndex: 1300,
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          {!hasResults ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">No results found</Typography>
            </Box>
          ) : (
            <Box>
              {/* Venues Section */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    bgcolor: "rgba(244, 241, 241, 0.98)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Business sx={{ fontSize: 25, color: "text.secondary" }} />
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.secondary"
                  >
                    Venues
                  </Typography>
                </Box>
                <List disablePadding>
                  {filteredVenues.slice(0, 9).map((venue, index) => (
                    <Link
                      href={`/venue/${venue.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      key={index}
                      onClick={() => setSearchTerm("")}
                      prefetch={false}
                    >
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "grey.50",
                          },
                          borderBottom: index < 9 ? "1px solid" : "none",
                          borderColor: "divider",
                        }}
                      >
                        <ListItemText
                          primary={venue.venueName}
                          secondary={venue.town}
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>

              {/* Bands Section */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    bgcolor: "rgba(244, 241, 241, 0.98)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <MusicNote sx={{ fontSize: 25, color: "text.secondary" }} />
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.secondary"
                  >
                    Bands/Performers
                  </Typography>
                </Box>
                <List disablePadding>
                  {filteredBands.slice(0, 9).map((band, index) => (
                    <Link
                      href={`/band/${band.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      key={index}
                      onClick={() => setSearchTerm("")}
                      prefetch={false}
                    >
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "grey.50",
                          },
                          borderBottom: index < 9 ? "1px solid" : "none",
                          borderColor: "divider",
                        }}
                      >
                        <ListItemText
                          primary={band.bandName}
                          secondary={
                            band.bandType === "TRIBUTE_BAND"
                              ? `${band.bandType} - ${band.tributeBandName}`
                              : band.genres.join(" • ")
                          }
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
}
