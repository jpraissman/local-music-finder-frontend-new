"use client";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Clear, Menu } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const handleMenuClick = () => {
    setOpenMenu(true);
  };

  return (
    <>
      <Box
        sx={{
          height: "120px",
          backgroundColor: "#1c3787",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "80%", md: "20%" },
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Link href="/find">
            <Image
              src="/logo2.png"
              width={100}
              height={100}
              alt="The Local Music Finder Logo"
            ></Image>
          </Link>
        </Box>
        <Box
          sx={{
            width: "70%",
            flexDirection: "row",
            justifyContent: "flex-end",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Stack direction="row" spacing={7}>
            <Link href="/find">
              <Typography
                sx={{
                  color: "whitesmoke",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Find Events
              </Typography>
            </Link>
            <Link href="/post">
              <Typography
                sx={{
                  color: "whitesmoke",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Post An Event
              </Typography>
            </Link>
            <Link href="/edit">
              <Typography
                sx={{
                  color: "whitesmoke",
                  textDecoration: "underline",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Edit Your Event
              </Typography>
            </Link>
          </Stack>
        </Box>
        <Box
          sx={{
            width: { xs: "20%", md: "10%" },
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleMenuClick}>
            <Menu sx={{ color: "white", fontSize: "30px" }} />
          </IconButton>
          <Drawer
            open={openMenu}
            onClose={() => {
              setOpenMenu(false);
            }}
            anchor="right"
          >
            <Stack
              direction="column"
              spacing={2.5}
              sx={{ p: 3, textAlign: "center" }}
            >
              <Typography
                fontWeight={"bold"}
                sx={{
                  paddingBottom: "10px",
                  fontSize: { xs: "16px", md: "20px" },
                }}
              >
                Where would you like to go?
              </Typography>
              <Link href="/find">
                <Button
                  variant="contained"
                  sx={{ width: "275px", fontWeight: "bold" }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Find Events
                </Button>
              </Link>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenMenu(false);
                  setOpenSignUp(true);
                }}
                sx={{ width: "275px", fontWeight: "bold" }}
              >
                Sign up for weekly event notifications
              </Button>
              <Link href="/post">
                <Button
                  variant="contained"
                  sx={{ width: "275px", fontWeight: "bold" }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Post An Event
                </Button>
              </Link>
              <Link href="/edit">
                <Button
                  variant="contained"
                  sx={{ width: "275px", fontWeight: "bold" }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Edit Your Event
                </Button>
              </Link>
              <Link href="/faqs">
                <Button
                  variant="contained"
                  sx={{ width: "275px", fontWeight: "bold" }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  FAQs
                </Button>
              </Link>
              <Link href="/about-us">
                <Button
                  variant="contained"
                  sx={{ width: "275px", fontWeight: "bold" }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  About Us
                </Button>
              </Link>
              <Link href="/privacy-policy">
                <Button
                  variant="contained"
                  sx={{ width: "275px", fontWeight: "bold" }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/terms">
                <Button
                  variant="contained"
                  sx={{ width: "275px", fontWeight: "bold" }}
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                >
                  Terms and Conditions
                </Button>
              </Link>
            </Stack>
          </Drawer>
        </Box>
      </Box>
      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
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
            <IconButton onClick={() => setOpenSignUp(false)}>
              <Clear color="error" sx={{ fontSize: "30px" }} />
            </IconButton>
          </Box>
          <Box sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}>
            <RegistrationForm />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
