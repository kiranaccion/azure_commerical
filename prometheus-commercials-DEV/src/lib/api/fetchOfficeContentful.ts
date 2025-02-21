import { EntryCollection } from 'contentful';
import client from '../contentful';
import { RegHomePage } from '@/types/contentful';

export type OfficeProps = {
  contentfulSpaceId: string;
};

// Type the function to return a Promise with the entry collection
export const fetchOfficePage = async (contentfulSpaceId: string): Promise<EntryCollection<RegHomePage>> => {
  try {
    const entries = await client.getEntries<RegHomePage>({
      content_type: contentfulSpaceId,
    });
    return entries;
  } catch (error) {
    console.error('Error fetching commercialHomePage:', error);
    throw new Error('Failed to fetch commercialHomePage');
  }
};
