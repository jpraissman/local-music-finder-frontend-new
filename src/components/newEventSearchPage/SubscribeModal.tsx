import {
  Close,
  Email,
  Group,
  LocationOn,
  MusicNote,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface SubscribeModalProps {
  displayModal: boolean;
  closeModal: () => void;
  location: string;
  maxDistance: string;
  genres: string[];
  bandTypes: string[];
  openFilters: () => void;
}

export default function SubscribeModal({
  displayModal,
  closeModal,
  location,
  maxDistance,
  genres,
  bandTypes,
  openFilters,
}: SubscribeModalProps) {
  return (
    <Dialog
      open={displayModal}
      onClose={closeModal}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MusicNote
              color="primary"
              sx={{ fontSize: { xs: "28px", sm: "34px" } }}
            />
            <Typography
              sx={{ fontSize: { xs: "20px", sm: "26px" } }}
              component="span"
              fontWeight="bold"
            >
              Get Weekly Event Updates
            </Typography>
          </Box>
          <IconButton onClick={closeModal} size="small">
            <Close sx={{ color: "red" }} />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Stay updated with the latest events in your area. We'll send you
          recommendations every Wedsenday night based on your preferences.
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "whitesmoke",
            p: 3,
            borderRadius: 2,
            mb: 3,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={openFilters}
        >
          <Typography
            variant="overline"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              letterSpacing: 1,
            }}
          >
            Your Preferences
          </Typography>

          {/* Location and Distance */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              mb: 2,
              gap: 1,
            }}
          >
            <LocationOn
              sx={{
                color: "text.secondary",
                mr: 2,
                fontSize: { xs: "20px", md: "28px" },
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight="medium">
                Location
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" fontWeight="medium">
                Distance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${maxDistance} miles`}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Genres */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <MusicNote
                sx={{
                  color: "text.secondary",
                  mr: 1,
                  fontSize: { xs: "20px", md: "28px" },
                }}
              />
              <Typography variant="body2" fontWeight="medium">
                Genres
              </Typography>
            </Box>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  color="secondary"
                  variant="filled"
                  sx={{ fontSize: "0.75rem" }}
                />
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Band Types */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Group
                sx={{
                  color: "text.secondary",
                  mr: 1,
                  fontSize: { xs: "20px", md: "28px" },
                }}
              />
              <Typography variant="body2" fontWeight="medium">
                Band Types
              </Typography>
            </Box>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {bandTypes.map((bandType) => (
                <Chip
                  key={bandType}
                  label={bandType}
                  size="small"
                  variant="filled"
                  color="secondary"
                  sx={{ fontSize: "0.75rem" }}
                />
              ))}
            </Stack>
          </Box>
        </Paper>

        {/* Email Form */}
        <Box
          component="form"
          onSubmit={() => {
            console.log("Submitted");
          }}
        >
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            // value={email}
            // onChange={handleEmailChange}
            // error={!!emailError}
            // helperText={emailError}
            required
            InputProps={{
              startAdornment: (
                <Email sx={{ color: "text.secondary", mr: 1, ml: 1 }} />
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", textAlign: "center" }}
          >
            We'll send you weekly updates about events matching your
            preferences. You can unsubscribe at any time.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={closeModal}
          variant="outlined"
          sx={{ flex: 1, textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("Submitted");
          }}
          variant="contained"
          // disabled={!email || !!emailError}
          sx={{ flex: 1, textTransform: "none" }}
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
