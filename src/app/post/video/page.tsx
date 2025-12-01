import AddVideo from "@/components/postVideo/AddVideo";

interface PageProps {
  searchParams: { b?: string; id?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const band = searchParams.b || null;
  const bandId = searchParams.id || null;

  return <AddVideo bandToPostFor={band} bandIdToPostFor={bandId} />;
}
