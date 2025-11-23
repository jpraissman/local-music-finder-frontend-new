"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Paper, { PaperProps } from "@mui/material/Paper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash.throttle";
import { InputAdornment } from "@mui/material";
import { LocationDTO } from "@/dto/location/Location.dto";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

interface StructuredFormatting {
  main_text: string;
  secondary_text?: string;
  main_text_matched_substrings: MainTextMatchedSubstrings[];
}

interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
}

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function loadScript(src: string, position: HTMLElement) {
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.src = src;
  position.appendChild(script);
  return script;
}

function CustomPaper(props: PaperProps) {
  const theme = useTheme();

  return (
    <Paper {...props}>
      {props.children}
      {/* Legal requirment https://developers.google.com/maps/documentation/javascript/policies#logo */}
      <Box
        sx={(staticTheme) => ({
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          pt: "1px",
          ...staticTheme.applyStyles("dark", {
            opacity: 0.8,
          }),
        })}
      >
        <img
          src={
            theme.palette.mode === "dark"
              ? "https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-non-white3_hdpi.png"
              : "https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png"
          }
          alt=""
          width="120"
          height="14"
        />
      </Box>
    </Paper>
  );
}

const fetch = throttle(
  async (
    request: { input: string; sessionToken: any },
    callback: (results?: readonly PlaceType[]) => void
  ) => {
    try {
      const { suggestions } = await (
        window as any
      ).google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        request
      );

      callback(
        suggestions.map((suggestion: any) => {
          const place = suggestion.placePrediction;
          // Map to the old AutocompleteService.getPlacePredictions format
          // https://developers.google.com/maps/documentation/javascript/places-migration-autocomplete
          return {
            description: place.text.text,
            structured_formatting: {
              main_text: place.mainText.text,
              main_text_matched_substrings: place.mainText.matches.map(
                (match: any) => ({
                  offset: match.startOffset,
                  length: match.endOffset - match.startOffset,
                })
              ),
              secondary_text: place.secondaryText?.text,
            },
            place_id: place.placeId,
          };
        })
      );
    } catch (err: any) {
      throw err;
    }
  },
  400
);

const emptyOptions = [] as any;
let sessionToken: any;

interface NewAddressAutocompleteProps {
  id: string;
  label: string;
  error: boolean;
  value: LocationDTO | null;
  setValue: (newValue: LocationDTO | null) => void;
  landingPage: boolean;
  disabled?: boolean;
  helperText?: string;
}

export default function NewAddressAutocomplete({
  id,
  label,
  error,
  value,
  setValue,
  landingPage,
  disabled = false,
  helperText,
}: NewAddressAutocompleteProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] =
    React.useState<readonly PlaceType[]>(emptyOptions);
  const callbackId = React.useId().replace(/:/g, "");
  const [loaded, setLoaded] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector("#google-maps")) {
        const GOOGLE_NAMESPACE = "_google_callback";
        const globalContext =
          // @ts-ignore
          window[GOOGLE_NAMESPACE] || (window[GOOGLE_NAMESPACE] = {});
        globalContext[callbackId] = () => {
          setLoaded(true);
        };

        const script = loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=${GOOGLE_NAMESPACE}.${callbackId}`,
          document.querySelector("head")!
        );
        script.id = "google-maps";
      } else if ((window as any).google && !loaded) {
        setLoaded(true);
      }
    }
  }, []);

  useEnhancedEffect(() => {
    if (!loaded) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(emptyOptions);
      return undefined;
    }

    // Allow to resolve the out of order request resolution.
    let active = true;

    if (!sessionToken) {
      sessionToken = new (
        window as any
      ).google.maps.places.AutocompleteSessionToken();
    }

    fetch(
      { input: inputValue, sessionToken },
      (results?: readonly PlaceType[]) => {
        if (!active) {
          return;
        }

        const newOptions = results ? results : [];
        setOptions(newOptions);
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, loaded]);

  return (
    <Autocomplete
      freeSolo
      disabled={disabled}
      fullWidth
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      slots={{
        paper: CustomPaper,
      }}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value?.address}
      onChange={(_, newValue) => {
        if (typeof newValue !== "string") {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(
            newValue
              ? { locationId: newValue.place_id, address: newValue.description }
              : null
          );
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          disabled={disabled}
          label={landingPage ? undefined : label}
          placeholder={landingPage ? label : undefined}
          fullWidth
          error={error}
          helperText={helperText}
          slotProps={{
            inputLabel: { shrink: value !== null || isFocused },
            input: {
              ...params.InputProps,
              startAdornment: landingPage ? (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ) : undefined,
            },
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          sx={{
            backgroundColor: "white",
            "& .MuiInputBase-input::placeholder": {
              color: error ? "red" : "gray",
              opacity: error ? 1 : 0.42,
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches =
          option.structured_formatting.main_text_matched_substrings;

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      fontWeight: part.highlight
                        ? "fontWeightBold"
                        : "fontWeightRegular",
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
                {option.structured_formatting.secondary_text ? (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {option.structured_formatting.secondary_text}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
