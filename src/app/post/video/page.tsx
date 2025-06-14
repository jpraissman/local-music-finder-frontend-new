import AddVideo from "@/components/postVideo/AddVideo";
import axios from "axios";

export const revalidate = 60;

interface PageProps {
  searchParams: { b?: string; id?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const bands = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bands`
  );

  const band = searchParams.b || null;
  const bandId = searchParams.id || null;

  return (
    <AddVideo
      bands={bands.data}
      bandToPostFor={band}
      bandIdToPostFor={bandId}
    />
  );
}
