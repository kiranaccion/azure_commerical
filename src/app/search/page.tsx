import SearchResultsWrapper from '@/components/SearchResults/SearchResultsWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | Prometheus',
};

export default async function SearchPage() {
  return (
    <main>
      <SearchResultsWrapper />
    </main>
  );
}
