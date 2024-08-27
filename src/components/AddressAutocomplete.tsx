"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import PlaceType from "@/types/PlaceType";
import { FormControl, FormHelperText } from "@mui/material";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface CustomInputProps {
  id: string;
  label: string;
  address: PlaceType | null;
  error: boolean;
  onAddressChange: (address: PlaceType | null) => void;
}

const AddressAutocomplete: React.FC<CustomInputProps> = ({
  id,
  label,
  address,
  error,
  onAddressChange,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        400
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(address ? [address] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (address) {
          newOptions = [address];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [address, inputValue, fetch]);

  return (
    <FormControl fullWidth error={error}>
      <Autocomplete
        id={id}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={address}
        noOptionsText="Start typing location ..."
        onChange={(_event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          let newValueFinal: PlaceType | null = newValue;
          if (newValue !== null && newValue.description.includes("&")) {
            newValueFinal = {
              description: newValue.description.replaceAll("&", ""),
              structured_formatting: newValue.structured_formatting,
            };
          }
          onAddressChange(newValueFinal);
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} fullWidth />
        )}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [
              match.offset,
              match.offset + match.length,
            ])
          );

          /* @ts-ignore*/
          const { key, ...restProps } = props;

          return (
            <li key={key} {...restProps}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      {error && <FormHelperText>This field is required.</FormHelperText>}
    </FormControl>
  );
};

export default AddressAutocomplete;
