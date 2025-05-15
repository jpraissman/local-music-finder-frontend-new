import { IconButton, Stack } from "@mui/material";
import { NewEventCardProps } from "./NewEventCard";
import { Facebook, Instagram, Language } from "@mui/icons-material";

function toAbsoluteUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export default function SocialMediaIcons({ event }: NewEventCardProps) {
  return (
    <Stack direction="row">
      {event.facebook_handle !== "" && (
        <IconButton
          href={toAbsoluteUrl(event.facebook_handle)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          sx={{ color: "#4267B2" }}
        >
          <Facebook />
        </IconButton>
      )}
      {event.instagram_handle !== "" && (
        <IconButton
          href={toAbsoluteUrl(event.instagram_handle)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          sx={{ color: "#C13584" }}
        >
          <Instagram />
        </IconButton>
      )}
      {event.website !== "" && (
        <IconButton
          href={toAbsoluteUrl(event.website)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
          sx={{ color: "black" }}
        >
          <Language />
        </IconButton>
      )}
    </Stack>
  );
}
