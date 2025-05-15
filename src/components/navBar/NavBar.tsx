import NavBarContent from "./NavBarContent";
import { loadBands } from "@/lib/load-bands";
import { loadVenues } from "@/lib/load-venues";

export const revalidate = 60;

export default async function NavBar() {
  // const bands = await loadBands();
  // const venues = await loadVenues();

  const bands = { "The Beatles": "123", "The Who": "1209" };
  const venues = { "Great Notch Inn": "123123", Maggies: "12312312312" };

  return <NavBarContent bands={bands} venues={venues} />;
}
