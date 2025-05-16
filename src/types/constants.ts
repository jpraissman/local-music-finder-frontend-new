import Event from "@/types/Event"
import Filters from "@/types/Filters"
import { PlaceType } from "./PlaceType"

export const GENRES = [
  "Alternative", "Blues", "Classic Rock", "Country", "Dance", "DJ", "EDM", "Folk", 
  "Hip Hop", "Indie", "Jazz", "Karaoke", "Latin", "Metal", "Pop", "R'n'B Soul", "Reggae", "Rock", "World Music"
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
  main_text_matched_substrings: [],
}

export const blankPlaceType: PlaceType = {
  description: "",
  structured_formatting: blankStructuredFormatting,
  place_id: "",
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
  event_datetime: "",
  town: "",
  youtube_id: "",
  ranking_position: -1,
}

export const blankFilters: Filters = {
  dateRange: undefined,
  address: undefined,
  maxDistance: "",
  genres: [],
  bandTypes: [],
}

export const TOWNS: { [key: string]: string[] } = {
  "Paterson-NJ": ["Paterson, NJ, USA", "Paterson, NJ"],
  "Clifton-NJ": ["Clifton, NJ, USA", "Clifton, NJ"],
  "Wayne-NJ": ["Wayne, NJ, USA", "Wayne, NJ"],
  "Hawthorne-NJ": ["Hawthorne, NJ, USA", "Hawthorne, NJ"],
  "LittleFalls-NJ": ["Little Falls, NJ, USA", "Little Falls, NJ"],
  "Montclair-NJ": ["Montclair, NJ, USA", "Montclair, NJ"],
  "Totowa-NJ": ["Totowa, NJ, USA", "Totowa, NJ"],
  "NorthHaledon-NJ": ["North Haledon, NJ, USA", "North Haledon, NJ"],
  "Wanaque-NJ": ["Wanaque, NJ, USA", "Wanaque, NJ"],
  "Passaic-NJ": ["Passaic, NJ, USA", "Passaic, NJ"],
  "Hackensack-NJ": ["Hackensack, NJ, USA", "Hackensack, NJ"],
  "Paramus-NJ": ["Paramus, NJ, USA", "Paramus, NJ"],
  "Englewood-NJ": ["Englewood, NJ, USA", "Englewood, NJ"],
  "Teaneck-NJ": ["Teaneck, NJ, USA", "Teaneck, NJ"],
  "FortLee-NJ": ["Fort Lee, NJ, USA", "Fort Lee, NJ"],
  "Ridgewood-NJ": ["Ridgewood, NJ, USA", "Ridgewood, NJ"],
  "Bergenfield-NJ": ["Bergenfield, NJ, USA", "Bergenfield, NJ"],
  "FairLawn-NJ": ["Fair Lawn, NJ, USA", "Fair Lawn, NJ"],
  "LittleFerry-NJ": ["Little Ferry, NJ, USA", "Little Ferry, NJ"],
  "Newton-NJ": ["Newton, NJ, USA", "Newton, NJ"],
  "Vernon-NJ": ["Vernon, NJ, USA", "Vernon, NJ"],
  "Hopatcong-NJ": ["Hopatcong, NJ, USA", "Hopatcong, NJ"],
  "Sparta-NJ": ["Sparta, NJ, USA", "Sparta, NJ"],
  "Wantage-NJ": ["Wantage, NJ, USA", "Wantage, NJ"],
  "Stillwater-NJ": ["Stillwater, NJ, USA", "Stillwater, NJ"],
  "Hamburg-NJ": ["Hamburg, NJ, USA", "Hamburg, NJ"],
  "Stanhope-NJ": ["Stanhope, NJ, USA", "Stanhope, NJ"],
  "Franklin-NJ": ["Franklin, NJ, USA", "Franklin, NJ"],
  "Andover-NJ": ["Andover, NJ, USA", "Andover, NJ"],
  "Newark-NJ": ["Newark, NJ, USA", "Newark, NJ"],
  "EastOrange-NJ": ["East Orange, NJ, USA", "East Orange, NJ"],
  "Irvington-NJ": ["Irvington, NJ, USA", "Irvington, NJ"],
  "Bloomfield-NJ": ["Bloomfield, NJ, USA", "Bloomfield, NJ"],
  "Belleville-NJ": ["Belleville, NJ, USA", "Belleville, NJ"],
  "WestOrange-NJ": ["West Orange, NJ, USA", "West Orange, NJ"],
  "SouthOrange-NJ": ["South Orange, NJ, USA", "South Orange, NJ"],
  "Nutley-NJ": ["Nutley, NJ, USA", "Nutley, NJ"],
  "Maplewood-NJ": ["Maplewood, NJ, USA", "Maplewood, NJ"],
  "Parsippany-TroyHills-NJ": ["Parsippany-Troy Hills, NJ, USA", "Parsippany-Troy Hills, NJ"],
  "Morristown-NJ": ["Morristown, NJ, USA", "Morristown, NJ"],
  "MountOlive-NJ": ["Mount Olive, NJ, USA", "Mount Olive, NJ"],
  "Roxbury-NJ": ["Roxbury, NJ, USA", "Roxbury, NJ"],
  "Randolph-NJ": ["Randolph, NJ, USA", "Randolph, NJ"],
  "Denville-NJ": ["Denville, NJ, USA", "Denville, NJ"],
  "Boonton-NJ": ["Boonton, NJ, USA", "Boonton, NJ"],
  "Jefferson-NJ": ["Jefferson, NJ, USA", "Jefferson, NJ"],
  "Parsippany-NJ": ["Parsippany, NJ, USA", "Parsippany, NJ"],
  "MountainLakes-NJ": ["Mountain Lakes, NJ, USA", "Mountain Lakes, NJ"],
  "Washington-NJ": ["Washington, NJ, USA", "Washington, NJ"],
  "Hackettstown-NJ": ["Hackettstown, NJ, USA", "Hackettstown, NJ"],
  "Phillipsburg-NJ": ["Phillipsburg, NJ, USA", "Phillipsburg, NJ"],
  "Belvidere-NJ": ["Belvidere, NJ, USA", "Belvidere, NJ"],
  "Oxford-NJ": ["Oxford, NJ, USA", "Oxford, NJ"],
  "Lopatcong-NJ": ["Lopatcong, NJ, USA", "Lopatcong, NJ"],
  "White-NJ": ["White, NJ, USA", "White, NJ"],
  "Warren-NJ": ["Warren, NJ, USA", "Warren, NJ"],
  "Allamuchy-NJ": ["Allamuchy, NJ, USA", "Allamuchy, NJ"]
};