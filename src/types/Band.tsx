interface Band {
  id: number;
  name: string;
  genres: string[];
  band_type: string;
  tribute_band_name: string;
  facebook_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
}
export default Band;
