import axios from 'axios';

export async function loadBands() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bands`)
  const data: {
    [key: string]: {
      band_type: string;
      genres: string[];
      tribute_band_name: string;
    };
  } = res.data
  
  return data;
}