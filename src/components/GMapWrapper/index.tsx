'use client';

import './styles.scss';
import { useEffect, useState, useMemo } from 'react';
import { APIProvider, ControlPosition, Map } from '@vis.gl/react-google-maps';
import { ClusteredPinMarkers } from './ClusteredPinMarkers';
import OfficeCarousal from '../OfficeCarousal';
import { styles } from './utils';
import { GMAP_SETTINGS, regionNotFoundMsg } from '@/constants';
import { PropertyPin } from '@/types';
import MapCheckboxes from '../MapCheckboxes';
import AdvancedMarkers from '../AdvancedMarkers';
import { HandsIcon } from '../SVGs';
import { usePathname } from 'next/navigation';

interface GMapWrapperProps {
  pins: PropertyPin[];
  apiKey: string;
  mapCenterCoordinates: { lon: number; lat: number };
  mapZoom: number;
  clusteringEnabled?: boolean;
  starredPin?: string;
}

export default function GMapWrapper({
  pins,
  apiKey,
  mapCenterCoordinates,
  mapZoom,
  clusteringEnabled = false,
  starredPin,
}: GMapWrapperProps) {
  const pathname = usePathname();
  const [viewportPins, setViewportPins] = useState<PropertyPin[]>([]);
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    apartments: false,
    retail: pathname.startsWith('/retail'),
    office: pathname.startsWith('/office'),
  });

  const toggleCheckbox = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPins = useMemo(() => {
    const noCheckboxSelected = Object.values(checkedItems).every((isChecked) => !isChecked);
    if (noCheckboxSelected) return [];

    const fPins = pins.filter((pin) => {
      return checkedItems[pin.commercialType.toLowerCase()];
    });
    setViewportPins(fPins);
    return fPins;
  }, [pins, checkedItems]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="google-map-container" id="Maps">
        <APIProvider apiKey={apiKey} libraries={['geometry']}>
          <Map
            defaultCenter={{ lat: mapCenterCoordinates.lat, lng: mapCenterCoordinates.lon }}
            defaultZoom={mapZoom}
            {...GMAP_SETTINGS}
            gestureHandling="cooperative"
            streetViewControl={false}
            mapTypeControl={false}
            scaleControl
            zoomControl={!isMobile}
            fullscreenControl={false}
            onClick={() => setSelectedPin(null)}
            onZoomChanged={() => setSelectedPin(null)}
            clickableIcons={false}
            zoomControlOptions={{ position: ControlPosition.LEFT_BOTTOM }}
            styles={styles['legacy']}
          >
            <div className="map-control map-checkboxes-control">
              <MapCheckboxes
                checkedItems={checkedItems}
                toggleCheckbox={toggleCheckbox}
                disabledCheckbox={pathname.startsWith('/office') ? 'office' : pathname.startsWith('/retail') ? 'retail' : null}
              />
            </div>
            <AdvancedMarkers
              pins={filteredPins}
              selectedPin={selectedPin}
              setSelectedPin={setSelectedPin}
              handleViewPortZoom={setViewportPins}
              hoveredProperty={hoveredProperty}
              setHoveredProperty={setHoveredProperty}
              shareCoordinates={false}
              starredPin={starredPin}
              clusteringEnabled={clusteringEnabled}
            />
          </Map>
        </APIProvider>
      </div>
      {viewportPins.length > 0 ? (
        <OfficeCarousal
          carousalData={viewportPins.sort((a, b) => a.rank - b.rank)}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          hoveredProperty={hoveredProperty}
          setHoveredProperty={setHoveredProperty}
        />
      ) : (
        <div className="no-properties">
          <HandsIcon />
          <p className="message">{regionNotFoundMsg}</p>
        </div>
      )}
    </>
  );
}
