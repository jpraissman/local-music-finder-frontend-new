import { TOWNS } from "@/types/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const townEntries: MetadataRoute.Sitemap = Object.keys(TOWNS).map(key => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/find/${key}`
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/find`
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post`
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/edit`
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/faqs`
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us`
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/terms`
    },
    ...townEntries,
  ];
}