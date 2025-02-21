'use client';

import { useEffect, useState } from 'react';
import SearchResults from './';
import Loading from '@/app/search/loading';
import { useSearchParams } from 'next/navigation';
import { getSearchResults } from '@/app/search/helper';

/* eslint-disable react-hooks/exhaustive-deps */
export default function SearchResultsWrapper() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isBoundsLoading, setIsBoundsLoading] = useState(false);
  const [searchData, setSearchData] = useState<any>([]);
  const [searchMapCenter, setSearchMapCenter] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState<number | null | undefined>();
  const [defaultReg, setDefaultRegion] = useState<boolean>(false);
  const term = searchParams.get('term') as string;
  const boundCoordinates = searchParams.get('boundCoordinates') as string;

  useEffect(() => {
    const fetchData = async () => {
      const search: Record<string, string> = {};

      if (searchParams.has('term')) {
        search['term'] = term;
      }
      if (searchParams.has('boundCoordinates')) {
        search['boundCoordinates'] = boundCoordinates;
      }

      // Return early if the search object is empty
      if (Object.keys(search).length === 0) return;
      setIsBoundsLoading(search.hasOwnProperty('boundCoordinates'));

      try {
        setIsLoading(search.hasOwnProperty('term'));
        const { searchData, mapCenter, zoom, defaultRegion } = await getSearchResults(search);
        setSearchData(searchData);
        setDefaultRegion(defaultRegion);
        setSearchMapCenter(mapCenter);
        setZoomLevel(zoom);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Reset loading states after the API call
        setIsLoading(false);
        setIsBoundsLoading(false);
      }
    };

    fetchData();
  }, [term, boundCoordinates]);

  return (
    <div className="search-results-wrapper">
      {isLoading ? (
        <Loading />
      ) : (
        <SearchResults
          pins={searchData}
          mapCenter={searchMapCenter}
          loading={isBoundsLoading}
          zoom={zoomLevel}
          defaultRegion={defaultReg}
        />
      )}
    </div>
  );
}
