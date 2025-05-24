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

interface NewSearchBarProps {
  venues: { name: string; town: string; id: string }[];
  bands: { name: string; genres: string[]; id: string }[];
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
      )
  );

  const filteredTowns = towns.filter((town) =>
    town.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasResults =
    filteredVenues.length > 0 ||
    filteredBands.length > 0 ||
    filteredTowns.length > 0;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search venues, bands, or towns..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
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
                  {filteredVenues.slice(0, 4).map((venue, index) => (
                    <Link
                      href={`/venue/${venue.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      key={index}
                    >
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "grey.50",
                          },
                          borderBottom: index < 3 ? "1px solid" : "none",
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
                  {filteredBands.slice(0, 4).map((band, index) => (
                    <Link
                      href={`/band/${band.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      key={index}
                    >
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "grey.50",
                          },
                          borderBottom: index < 3 ? "1px solid" : "none",
                          borderColor: "divider",
                        }}
                      >
                        <ListItemText
                          primary={band.name}
                          secondary={band.genres.join(" • ")}
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>

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
                  {filteredTowns.slice(0, 4).map((town, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "grey.50",
                        },
                        borderBottom: index < 3 ? "1px solid" : "none",
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
