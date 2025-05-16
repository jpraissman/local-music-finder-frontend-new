import AddVideo from "@/components/postVideo/AddVideo";
import axios from "axios";

export const revalidate = 60;

export default async function Page() {
  const bands = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bands`
  );

  return <AddVideo bands={bands.data} />;
}
