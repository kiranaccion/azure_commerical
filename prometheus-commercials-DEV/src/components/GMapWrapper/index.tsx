'use client';

import './styles.scss';
import { useCallback, useEffect, useState } from 'react';
import { APIProvider, ControlPosition, Map } from '@vis.gl/react-google-maps';
import { ClusteredPinMarkers } from './ClusteredPinMarkers';
import OfficeCarousal from '../OfficeCarousal';
import { OfficeProperty } from '../../utils/types';
import { styles } from './utils';
interface GMapWrapperProps {
  pins: OfficeProperty[];
  apiKey: string;
}

export default function GMapWrapper({ pins, apiKey }: GMapWrapperProps) {
  const [viewMapProperties, setViewMapProperties] = useState<OfficeProperty[]>([]);
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  useEffect(() => {
    setViewMapProperties([...pins]);
  }, [pins]);

  const handleViewPortZoom = useCallback((data: OfficeProperty[]) => {
    setViewMapProperties([...data]);
  }, []);

  return (
    <>
      <div className="google-map-container" id="#Maps">
        <APIProvider apiKey={apiKey}>
          <Map
            // mapId={"bf51a910020fa25a"}
            defaultCenter={{ lat: 37.54, lng: -121.98 }}
            defaultZoom={10}
            minZoom={8}
            maxZoom={18}
            gestureHandling={'cooperative'}
            streetViewControl={false}
            mapTypeControl={false}
            scaleControl={true}
            zoomControl={true}
            fullscreenControl={false}
            clickableIcons={true}
            zoomControlOptions={{
              position: ControlPosition.LEFT_BOTTOM,
            }}
            styles={styles['legacy']}
          >
            {pins && (
              <ClusteredPinMarkers
                pins={pins}
                selectedPin={selectedPin}
                setSelectedPin={setSelectedPin}
                handleViewPortZoom={handleViewPortZoom}
                hoveredProperty={hoveredProperty}
              />
            )}
          </Map>
        </APIProvider>
      </div>
      {viewMapProperties && viewMapProperties.length > 0 && (
        <OfficeCarousal
          carousalData={viewMapProperties}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          hoveredProperty={hoveredProperty}
          setHoveredProperty={setHoveredProperty}
        />
      )}
    </>
  );
}
