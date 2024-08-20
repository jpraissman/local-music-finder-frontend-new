import Event from "@/types/Event"
import Filters from "@/types/Filters"

export const GENRES = [
  "Alternative", "Blues", "Classic Rock", "Country", "Dance", "Folk", 
  "Hip Hop", "EDM", "Jazz", "Latin", "Metal", "Pop", "R'n'B/Soul", "Reggae", "Rock", "World Music"
]

export const BAND_TYPES =[
  "Cover Band", "Tribute Band",
  "Originals Only", "Originals and Covers",
]

export const blankEventDetails = {
    venueName: "",
    bandName: "",
    bandType: "",
    tributeBandName: "",
    genres: [],
    date: null,
    startTime: null,
    endTime: null,
    address: null,
    hasCoverCharge: "",
    coverCharge: "",
    otherInfo: "",
    facebookHandle: "",
    instagramHandle: "",
    venuePhoneNumber: "",
    website: "",
    bandOrVenue: "",
    emailAddress: "",
}

export const blankStructuredFormatting = {
  main_text: "",
  secondary_text: "",
  main_text_matched_substrings: undefined,
}

export const blankEvent: Event = {
  id: -1,
  venue_name: "",
  band_name: "",
  band_type: "",
  start_time_formatted: "",
  end_time: null,
  cover_charge: -1,
  date_formatted: "",
  distance_formatted: "",
  address: "",
  genres: [],
  tribute_band_name: "",
  other_info: "",
  distance_value: -1,
  date_string: "",
  start_time_value: -1,
  facebook_handle: "",
  instagram_handle: "",
  website: "",
  phone_number: "",
  band_or_venue: "",
  address_id: "",
  event_id: "",
  email_address: "",
}

export const blankFilters: Filters = {
  dateRange: "",
  address: null,
  maxDistance: "",
  genres: [],
  bandTypes: [],
}