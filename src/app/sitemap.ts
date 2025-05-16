import getDate from "@/lib/get-date";
import { TOWNS } from "@/types/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const townEntriesToday: MetadataRoute.Sitemap = Object.keys(TOWNS).map(key => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/1/${key}/today`,
    lastModified: getDate("today")
  }));
  const townEntriesTomorrow: MetadataRoute.Sitemap = Object.keys(TOWNS).map(key => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/1/${key}/tomorrow`,
    lastModified: getDate("today")
  }));
  const townEntriesThisWeekend: MetadataRoute.Sitemap = Object.keys(TOWNS).map(key => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/1/${key}/this-weekend`,
    lastModified: getDate("week")
  }));
  const townEntriesThisWeek: MetadataRoute.Sitemap = Object.keys(TOWNS).map(key => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/1/${key}/this-week`,
    lastModified: getDate("week")
  }));
  const townEntriesNextWeekend: MetadataRoute.Sitemap = Object.keys(TOWNS).map(key => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/1/${key}/next-weekend`,
    lastModified: getDate("week")
  }));
  const townEntriesNextWeek: MetadataRoute.Sitemap = Object.keys(TOWNS).map(key => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/1/${key}/next-week`,
    lastModified: getDate("week")
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
    ...townEntriesToday,
    ...townEntriesTomorrow,
    ...townEntriesThisWeek,
    ...townEntriesThisWeekend,
    ...townEntriesNextWeek,
    ...townEntriesNextWeekend,
  ];
}