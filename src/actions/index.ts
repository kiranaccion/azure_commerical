'use server';

import { getSearchResults } from '@/app/search/helper';

export async function getServerSearchResults(searchParams: { [key: string]: string }) {
  return await getSearchResults(searchParams);
}
