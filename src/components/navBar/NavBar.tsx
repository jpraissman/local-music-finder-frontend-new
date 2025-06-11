"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Image from "next/image";
import Link from "next/link";
import { Stack } from "@mui/material";
import HamburgerIcon from "@mui/icons-material/Menu";
import { Add, Create, Search } from "@mui/icons-material";
import NewSearchBar from "./NewSearchBar";

const towns = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Austin",
  "Nashville",
  "Seattle",
  "Boston",
];

interface NavBarProps {
  venues: { name: string; town: string; id: string }[];
  bands: { name: string; genres: string[]; id: string }[];
}

export default function NavBar({ venues, bands }: NavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Stack direction="column" spacing={2}>
        <Link href="/find" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem onClick={handleMobileMenuClose}>
            <Stack direction="row" spacing={1.5}>
              <Search />
              <p>Find Events</p>
            </Stack>
          </MenuItem>
        </Link>
        <Link href="/post" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem onClick={handleMobileMenuClose}>
            <Stack direction="row" spacing={1.5}>
              <Add />
              <p>Post An Event</p>
            </Stack>
          </MenuItem>
        </Link>
        <Link href="/edit" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem onClick={handleMobileMenuClose}>
            <Stack direction="row" spacing={1.5}>
              <Create />
              <p>Edit Your Event</p>
            </Stack>
          </MenuItem>
        </Link>
      </Stack>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ py: 1 }}>
        <Toolbar>
          <Box sx={{ pr: 1 }}>
            <Link href="/">
              <Image
                src="/logo2.png"
                alt="The Local Music Finder logo"
                width={65}
                height={65}
              />
            </Link>
          </Box>
          <Box sx={{ pr: 4, display: { xs: "none", lg: "flex" } }}>
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h5"
                sx={{
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "#dfdfdf",
                  },
                }}
              >
                The Local Music Finder
              </Typography>
            </Link>
          </Box>
          <NewSearchBar venues={venues} bands={bands} towns={towns} />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
              paddingRight: { xs: "", xl: "50px" },
            }}
          >
            <Stack direction="row" spacing={5}>
              <Link
                href="/find"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#dfdfdf",
                    },
                  }}
                >
                  Find Events
                </Typography>
              </Link>
              <Link
                href="/post"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#dfdfdf",
                    },
                  }}
                >
                  Post An Event
                </Typography>
              </Link>
              <Link
                href="/edit"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#dfdfdf",
                    },
                  }}
                >
                  Edit Your Event
                </Typography>
              </Link>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <HamburgerIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
