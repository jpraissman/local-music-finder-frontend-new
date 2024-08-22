import Event from "@/types/Event"
import Filters from "@/types/Filters"

export const GENRES = [
  "Alternative", "Blues", "Classic Rock", "Country", "Dance", "DJ", "EDM", "Folk", 
  "Hip Hop", "Jazz", "Karaoke", "Latin", "Metal", "Pop", "R'n'B Soul", "Reggae", "Rock", "World Music"
]

export const BAND_TYPES =[
  "Cover Band", "Tribute Band",
  "Originals Only", "Originals and Covers", "Other"
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

export const TOWNS: { [key: string]: string[] } = {
  "Paterson-NJ": ["Paterson, NJ, USA", "Paterson, NJ"],
  "Clifton-NJ": ["Clifton, NJ, USA", "Clifton, NJ"],
  "Wayne-NJ": ["Wayne, NJ, USA", "Wayne, NJ"],
  "Passaic-NJ": ["Passaic, NJ, USA", "Passaic, NJ"],
  "WestMilford-NJ": ["West Milford, NJ, USA", "West Milford, NJ"],
  "Vernon-NJ": ["Vernon, NJ, USA", "Vernon, NJ"],
  "Hopatcong-NJ": ["Hopatcong, NJ, USA", "Hopatcong, NJ"],
  "Sparta-NJ": ["Sparta, NJ, USA", "Sparta, NJ"],
  "Frankford-NJ": ["Frankford, NJ, USA", "Frankford, NJ"],
  "Byram-NJ": ["Byram, NJ, USA", "Byram, NJ"],
  "Hackensack-NJ": ["Hackensack, NJ, USA", "Hackensack, NJ"],
  "Teaneck-NJ": ["Teaneck, NJ, USA", "Teaneck, NJ"],
  "FortLee-NJ": ["Fort Lee, NJ, USA", "Fort Lee, NJ"],
  "FairLawn-NJ": ["Fair Lawn, NJ, USA", "Fair Lawn, NJ"],
  "Paramus-NJ": ["Paramus, NJ, USA", "Paramus, NJ"],
  "Parsippany-NJ": ["Parsippany, NJ, USA", "Parsippany, NJ"],
  "MountOlive-NJ": ["Mount Olive, NJ, USA", "Mount Olive, NJ"],
  "Morris-NJ": ["Morris, NJ, USA", "Morris, NJ"],
  "Denville-NJ": ["Denville, NJ, USA", "Denville, NJ"],
  "Randolph-NJ": ["Randolph, NJ, USA", "Randolph, NJ"],
};