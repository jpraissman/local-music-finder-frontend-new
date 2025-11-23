import { Clear } from "@mui/icons-material";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import { ReactNode } from "react";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BaseModal({ open, onClose, children }: BaseModalProps) {
  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={onClose}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: {
            xs: "90vw",
            sm: "70vw",
            md: "60vw",
            lg: "50vw",
            xl: "40vw",
          },
          maxHeight: "95vh",
          boxShadow: 24,
          overflow: "auto",
        }}
      >
        <Box sx={{ textAlign: "right" }}>
          <IconButton onClick={onClose}>
            <Clear color="error" sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
        <Box sx={{ p: 4 }}>
          <Stack
            direction="column"
            spacing={5}
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {children}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
