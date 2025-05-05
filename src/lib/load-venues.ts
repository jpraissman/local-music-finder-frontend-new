import axios from "axios";

export async function loadVenues() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/venues`)
  const data: { [key: string]: { address: string; place_id: string } } = await res.data
  
  return data;
}