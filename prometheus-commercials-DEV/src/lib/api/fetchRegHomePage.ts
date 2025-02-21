// lib/fetchRegHomePage.ts
import { RegHomePage } from "@/types/contentful";
import client from "../contentful";
import { EntryCollection } from "contentful";

// Type the function to return a Promise with the entry collection
export const fetchRegHomePage = async (): Promise<
  EntryCollection<RegHomePage>
> => {
  try {
    const entries = await client.getEntries<RegHomePage>({
      content_type: "regHomePage",
    });
    return entries;
  } catch (error) {
    console.error("Error fetching regHomePage:", error);
    throw new Error("Failed to fetch regHomePage");
  }
};
