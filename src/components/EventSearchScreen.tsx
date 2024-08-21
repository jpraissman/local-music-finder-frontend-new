"use client";

import {
  Modal,
  Button,
  Box,
  Stack,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GetFiltersForm from "@/components/GetFiltersForm";
import Filters from "@/types/Filters";
import Event from "@/types/Event";
import EventCard from "@/components/EventCard";
import {
  CalendarMonth,
  Clear,
  Edit,
  Group,
  House,
  MusicNote,
  Place,
} from "@mui/icons-material";
import dayjs from "dayjs";
import RegistrationForm from "./RegistrationForm";

interface CustomInputProps {
  filters: Filters;
  eventsInit: Event[];
  noFilters: boolean;
}

const EventSearchScreen: React.FC<CustomInputProps> = ({
  filters,
  eventsInit,
  noFilters,
}) => {
  const [displayFiltersForm, setDisplayFiltersForm] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>(eventsInit);
  const [sort, setSort] = useState<string>("date");
  const [displayRegistration, setDisplayRegistration] =
    useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const showFilters = () => setDisplayFiltersForm(true);

  const showRegistration = () => setDisplayRegistration(true);

  useEffect(() => {
    if (noFilters) {
      setDisplayFiltersForm(true);
    }
  }, []);

  return (
    <Grid container spacing={5} sx={{ paddingTop: "20px" }}>
      <Grid
        item
        xs={3}
        sx={{
          display: { xs: "none", lg: "block" },
        }}
      >
        <Stack direction="column" spacing={4} sx={{ paddingLeft: 1 }}>
          <Stack spacing={2} direction="column">
            <Typography
              variant="h5"
              sx={{
                paddingLeft: "30px",
                paddingBottom: 2,
                fontWeight: "bold",
              }}
            >
              Event Filters
            </Typography>
            <TextField
              id="date-filter-value"
              label="Date"
              variant="outlined"
              value={filters.dateRange}
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonth color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showFilters}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="address-filter-value"
              label="Address, Town, or City"
              variant="outlined"
              value={filters.address?.description}
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <House color="secondary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showFilters}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="max-distance-filter-value"
              label="Distance"
              variant="outlined"
              value={filters.maxDistance}
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Place color="secondary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showFilters}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="genre-filter-value"
              label="Genre(s)"
              variant="outlined"
              value={filters.genres.join(", ")}
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MusicNote color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showFilters}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="band-type-filter-value"
              label="Band Type(s)"
              variant="outlined"
              value={filters.bandTypes.join(", ")}
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Group color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showFilters}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={showFilters}
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Edit Filters
              </Button>
            </Box>
          </Stack>
          <Stack direction="column" spacing={0.5}>
            <Typography
              variant="h5"
              sx={{ paddingLeft: "30px", fontWeight: "bold" }}
            >
              Sort By
            </Typography>
            <RadioGroup
              name="sort-by-value"
              value={sort}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const newSort = (event.target as HTMLInputElement).value;
                setSort(newSort);

                if (newSort === "distance") {
                  setEvents(
                    events.sort((a, b) => a.distance_value - b.distance_value)
                  );
                } else if (newSort === "date") {
                  setEvents(
                    events.sort((a, b) => {
                      const dateA = dayjs(a.date_string);
                      const dateB = dayjs(b.date_string);
                      return dateA.isAfter(dateB) ? 1 : -1;
                    })
                  );
                } else if (newSort === "cover charge") {
                  setEvents(
                    events.sort((a, b) => a.cover_charge - b.cover_charge)
                  );
                }

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <FormControlLabel
                value="distance"
                label="Distance"
                control={<Radio />}
              />
              <FormControlLabel value="date" label="Date" control={<Radio />} />
              <FormControlLabel
                value="cover charge"
                label="Cover Charge"
                control={<Radio />}
              />
            </RadioGroup>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} lg={9}>
        <>
          {!fetching && (
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                sx={{
                  display: { xs: "flex", lg: "none" },
                  paddingLeft: "20px",
                }}
              >
                <Stack
                  direction="column"
                  spacing={0.5}
                  sx={{
                    display: "flex",
                    width: { xs: "50%", sm: "70%" },
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Sort By
                  </Typography>
                  <RadioGroup
                    row
                    name="sort-by-value"
                    value={sort}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const newSort = (event.target as HTMLInputElement).value;
                      setSort(newSort);

                      if (newSort === "distance") {
                        setEvents(
                          events.sort(
                            (a, b) => a.distance_value - b.distance_value
                          )
                        );
                      } else if (newSort === "date") {
                        setEvents(
                          events.sort((a, b) => {
                            const dateA = dayjs(a.date_string);
                            const dateB = dayjs(b.date_string);
                            return dateA.isAfter(dateB) ? 1 : -1;
                          })
                        );
                      } else if (newSort === "cover charge") {
                        setEvents(
                          events.sort((a, b) => a.cover_charge - b.cover_charge)
                        );
                      }
                    }}
                  >
                    <FormControlLabel
                      value="distance"
                      label="Distance"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value="date"
                      label="Date"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value="cover charge"
                      label="Cover Charge"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </Stack>
                <Box
                  sx={{
                    width: { xs: "50%", sm: "30%" },
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingRight: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={showFilters}
                    sx={{ fontWeight: "bold" }}
                    color="primary"
                  >
                    Edit Search
                  </Button>
                </Box>
              </Stack>
              {!fetching && (
                <Stack
                  direction="column"
                  spacing={1}
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  {!noFilters && (
                    <Typography
                      fontWeight={"bold"}
                      sx={{ fontSize: { xs: "20px", lg: "25px" } }}
                    >
                      {"Live Music near " + filters.address?.description}
                    </Typography>
                  )}
                  <Typography sx={{ fontSize: { xs: "20px", lg: "24px" } }}>
                    {events.length === 1
                      ? events.length + " event found"
                      : events.length + " events found "}
                  </Typography>
                </Stack>
              )}
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {!fetching && (
                <Box
                  sx={{
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: { xs: "0px", sm: "25px" },
                      paddingTop: { xs: "15px", sm: "0px" },
                      width: "275px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={showFilters}
                      sx={{ fontSize: "16px", fontWeight: "bold" }}
                      color="primary"
                    >
                      Look for something else
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      paddingLeft: { xs: "0px", sm: "25px" },
                      paddingTop: { xs: "20px", sm: "0px" },
                      width: "275px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={showRegistration}
                      sx={{ fontSize: "16px", fontWeight: "bold" }}
                      color="warning"
                    >
                      Sign up for weekly event notifications
                    </Button>
                  </Box>
                </Box>
              )}
            </Stack>
          )}
          {fetching && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </>
        <Modal
          open={displayFiltersForm}
          onClose={() => setDisplayFiltersForm(false)}
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
              <IconButton onClick={() => setDisplayFiltersForm(false)}>
                <Clear color="error" sx={{ fontSize: "30px" }} />
              </IconButton>
            </Box>
            <Box sx={{ p: 4 }}>
              <GetFiltersForm initialFilters={filters} />
            </Box>
          </Box>
        </Modal>
        <Modal
          open={displayRegistration}
          onClose={() => setDisplayRegistration(false)}
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
              <IconButton onClick={() => setDisplayRegistration(false)}>
                <Clear color="error" sx={{ fontSize: "30px" }} />
              </IconButton>
            </Box>
            <Box sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}>
              <RegistrationForm />
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default EventSearchScreen;
