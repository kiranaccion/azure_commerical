import client from '../contentful';

export type OfficeProps = {
  contentType: string;
};

// Type the function to return a Promise with the entry collection
export const fetchContentfulData = async (contentfulParams: any): Promise<any> => {
  try {
    const entries = await client.getEntries<any>(contentfulParams);

    return entries;
  } catch (error) {
    console.error('Error fetching data from contentful:', error);
    console.log('Contentful Params:', contentfulParams);
    throw new Error('Failed to fetch Contentful data');
  }
};
