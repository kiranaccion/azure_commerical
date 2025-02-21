'use client';
import { defaultCenter, defaultZoom, GMAP_SETTINGS, locations, regionNotFoundMsg } from '@/constants';
import './styles.scss';
import { APIProvider, ControlPosition, Map } from '@vis.gl/react-google-maps';
import MapCheckboxes from '../MapCheckboxes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { styles } from '../GMapWrapper/utils';
import Image from 'next/image';
import { scrollToElement } from '@/utils';
import AdvancedMarkers from '../AdvancedMarkers';
import loader_logo from '/public/loader_logo.gif';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MuiAutocomplete from '../AutoComplete/Autocomplete';
import { useMediaQuery } from 'react-responsive';
import { Sheet, type SheetRef } from 'react-modal-sheet';
import PropertyCard from './PropertyCard';
import Footer from '../Footer';

interface SearchResultsProps {
  pins: [] | null;
  mapCenter: { lat: number; lng: number };
  loading: boolean;
  zoom?: number | null;
  defaultRegion?: boolean;
}

/* eslint-disable react-hooks/exhaustive-deps */
export default function SearchResults({ pins, mapCenter, loading, zoom, defaultRegion }: SearchResultsProps) {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [isCheckBoxUpdated, setIsCheckBoxUpdated] = useState(false);
  const ref = useRef<SheetRef>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const term = searchParams.get('term');

  const pathName = usePathname();

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    apartments: searchParams.get('apartments') === 'true' || false,
    retail: searchParams.get('retail') === 'true' || false,
    office: searchParams.get('office') === 'true' || false,
  });

  useEffect(() => {
    if (loading) {
      const resultsContainer = document.getElementById('results-container');
      if (resultsContainer) {
        resultsContainer.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [loading]);

  useEffect(() => {
    if (selectedPin !== null) {
      const selectedElement = document.getElementById(selectedPin);
      if (selectedElement) {
        scrollToElement(selectedElement);
      }
    }
  }, [selectedPin]);

  const toggleCheckbox = (id: string) => {
    setCheckedItems((prev) => {
      const currentState = { ...prev };
      const totalChecked = Object.values(currentState).filter(Boolean).length;

      // Prevent unchecking if it's the last checked item
      if (totalChecked === 1 && currentState[id]) {
        return prev; // Return the previous state without changes
      }

      return { ...prev, [id]: !prev[id] };
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(checkedItems).forEach(([key, value]) => {
      value ? params.set(key, 'true') : params.delete(key);
    });

    setIsCheckBoxUpdated(true);
    // Update the URL with the new parameters without causing a page refresh
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [checkedItems]);

  const isMobile = useMediaQuery({ query: '(max-width: 1279px)' });
  const close = () => setOpen(false);
  const snapTo = (i: number) => ref.current?.snapTo(i);

  useEffect(() => {
    if (isMobile) {
      setOpen(true);
    }

    if (isMobile && !isOpen) {
      setOpen(true);
      snapTo(100);
    }
  }, [isMobile, isOpen]);

  const themeColor = (propertyType: string) => {
    if (propertyType === 'office') return '#00A8BF';
    if (propertyType === 'retail') return '#1C3C34';
    if (propertyType === 'apartments') return '#fc4d0f';
  };

  const handleMouseOverOnCard = (i: any) => {
    if (selectedPin && selectedPin !== i.slug) {
      setSelectedPin(null);
    }
    setHoveredProperty(i.slug);
  };

  const handleMouseLeaveOnCard = () => {
    setHoveredProperty(null);
  };

  const filteredPins = useMemo(() => {
    const noCheckboxSelected = Object.values(checkedItems).every((isChecked) => !isChecked);
    if (noCheckboxSelected) return [];

    return (
      pins?.filter((pin: any) => {
        return checkedItems[pin.commercialType.toLowerCase()];
      }) ?? []
    );
  }, [pins, checkedItems]);

  const searchPageFooter = () => {
    return pathName === '/search' && <Footer />;
  };

  return (
    <div className="search-results-container">
      <div className="search-bar-container">
        <div className="search-bar-location">
          <div className="headerSearchContainer">
            <MuiAutocomplete />
          </div>
          <div className="dropdown-links">
            {locations.map((location) => (
              <Link
                key={location}
                href={`/search?term=${encodeURIComponent(location)}&office=true&retail=true`}
                className={location === term ? 'active' : ''}
                aria-label={location}
              >
                {location}
              </Link>
            ))}
          </div>
        </div>
        <div className="no-of-properties">Showing {filteredPins?.length} Properties</div>
      </div>

      <div className="map-and-results-container">
        <div className="map-container">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
            <Map
              defaultCenter={mapCenter || { lat: defaultCenter.lat, lng: defaultCenter.lon }}
              defaultZoom={zoom ?? defaultZoom}
              {...GMAP_SETTINGS}
              gestureHandling="cooperative"
              streetViewControl={false}
              mapTypeControl={false}
              scaleControl
              zoomControl={!isMobile}
              fullscreenControl={false}
              onClick={() => setSelectedPin(null)}
              clickableIcons={false}
              zoomControlOptions={{ position: ControlPosition.LEFT_BOTTOM }}
              styles={styles['legacy']}
            >
              <div className="map-control map-checkboxes-control map-control-center">
                <MapCheckboxes checkedItems={checkedItems} toggleCheckbox={toggleCheckbox} />
              </div>
              <AdvancedMarkers
                pins={filteredPins}
                selectedPin={selectedPin}
                setSelectedPin={setSelectedPin}
                hoveredProperty={hoveredProperty}
                setHoveredProperty={setHoveredProperty}
                mapCenter={mapCenter}
                isCheckBoxUpdated={isCheckBoxUpdated}
                setIsCheckBoxUpdated={setIsCheckBoxUpdated}
              />
            </Map>
          </APIProvider>
        </div>

        {!isMobile && (
          <>
            <div id="results-container" className={`results-container`}>
              {loading ? (
                <div className="loading-container">
                  <Image className="loading-image" src={loader_logo} alt="Loading" priority />
                </div>
              ) : (
                <>
                  {(defaultRegion || pins?.length === 0) && (
                    <div className="regon-not-found-container">
                      <p className="regon-not-found">{regionNotFoundMsg}</p>
                    </div>
                  )}
                  {filteredPins
                    ?.sort((a: any, b: any) => a.rank - b.rank)
                    .map((i: any) => (
                      <PropertyCard
                        isSelectedPin={selectedPin === i.slug}
                        key={i.slug}
                        property={i}
                        hoveredProperty={hoveredProperty}
                        onMouseEnter={handleMouseOverOnCard}
                        onMouseLeave={handleMouseLeaveOnCard}
                        themeColor={themeColor}
                      />
                    ))}
                </>
              )}
              <div>{searchPageFooter()}</div>
            </div>
          </>
        )}
      </div>

      <Sheet ref={ref} isOpen={isOpen} onClose={close} initialSnap={1} snapPoints={[400, 200, 100, -50]} detent="content-height">
        <Sheet.Container layout>
          <Sheet.Header />
          <Sheet.Content layout="position">
            <Sheet.Scroller>
              <div className="mobile-view">
                <div className="no-of-properties">Showing {filteredPins?.length} Properties</div>
                <div className="box-list">
                  <>
                    {defaultRegion && (
                      <div className="regon-not-found-container">
                        <p className="regon-not-found">{regionNotFoundMsg}</p>
                      </div>
                    )}
                    {filteredPins?.map((i: any) => (
                      <PropertyCard
                        key={i.slug}
                        isSelectedPin={selectedPin === i.slug}
                        property={i}
                        hoveredProperty={hoveredProperty}
                        onMouseEnter={handleMouseOverOnCard}
                        onMouseLeave={handleMouseLeaveOnCard}
                        themeColor={themeColor}
                      />
                    ))}
                  </>
                </div>

                {searchPageFooter()}
              </div>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}
