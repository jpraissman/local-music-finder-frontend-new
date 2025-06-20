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
import { useRouter } from "next/navigation";

interface NewSearchBarProps {
  venues: {
    name: string;
    town: string;
    id: string;
  }[];
  bands: {
    name: string;
    genres: string[];
    id: string;
    band_type: string;
    tribute_band_name: string;
  }[];
  towns: string[];
}

export default function NewSearchBar({
  venues,
  bands,
  towns,
}: NewSearchBarProps) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.town.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBands = bands.filter(
    (band) =>
      band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      band.genres.some((genre) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      band.tribute_band_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      band.band_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTowns = towns.filter((town) =>
    town.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasResults =
    filteredVenues.length > 0 ||
    filteredBands.length > 0 ||
    filteredTowns.length > 0;

  const getTownUrl = (location: string) => {
    const params = new URLSearchParams();
    params.set("loc", location);
    params.set("from", dayjs().format("YYYY-MM-DD"));
    params.set("to", dayjs().add(14, "day").format("YYYY-MM-DD"));
    params.set("dis", "20");
    params.set("genres", "");
    params.set("types", "");
    params.set("sort", "Date");
    return `/find?${params.toString()}`;
  };

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
        placeholder="Search venues, bands, tributes, towns, etc."
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
              {/* Towns Section */}
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
                  <LocationOn sx={{ fontSize: 25, color: "text.secondary" }} />
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.secondary"
                  >
                    Towns
                  </Typography>
                </Box>
                <List disablePadding>
                  {filteredTowns.slice(0, 9).map((town, index) => (
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      key={index}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchTerm("");
                        window.location.href = getTownUrl(town);
                      }}
                    >
                      <ListItem
                        key={index}
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
                          primary={
                            <Typography variant="body1" fontWeight="500">
                              {town}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>

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
                          primary={venue.name}
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
                          primary={band.name}
                          secondary={
                            band.band_type === "Tribute Band"
                              ? `${band.band_type} - ${band.tribute_band_name}`
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
