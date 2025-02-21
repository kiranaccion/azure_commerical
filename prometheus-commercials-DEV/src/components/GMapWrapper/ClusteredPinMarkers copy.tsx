import { InfoWindow, useMap, Marker as MarkerElement } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import InfoWindowPopup from './InfoWindowPopup';
import { OfficeProperty } from '../../utils/types';

export type ClusteredPinMarkersProps = {
  pins: OfficeProperty[];
  selectedPin: number | null;
  setSelectedPin: (key: number | null) => void;
};

const normalIconUrl = '/googleMapsClusterer.svg';
const hoverIconUrl = '/googleMapsClustererOnHover.svg';

export const ClusteredPinMarkers = ({ pins, selectedPin, setSelectedPin }: ClusteredPinMarkersProps) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({
      map,
      renderer: {
        render: (cluster) => {
          const labelText = String(cluster.markers?.length);
          let iconUrl = normalIconUrl; // Default icon

          // Check if any marker in the cluster is the selected marker
          let isSelectedMarkerInCluster: boolean;
          if (selectedPin !== null) {
            isSelectedMarkerInCluster =
              cluster.markers?.some((marker) => {
                return marker === markers[selectedPin];
              }) ?? false;

            if (isSelectedMarkerInCluster) {
              iconUrl = hoverIconUrl; // Change icon if the selected marker is in this cluster
            }
          }

          const marker = new google.maps.Marker({
            position: cluster.position,
            label: {
              text: labelText,
              color: 'white',
              fontSize: '15px',
            },
            icon: iconUrl,
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + (cluster.markers?.length ?? 1),
          });

          // Add listeners to dynamically change the icon on hover
          google.maps.event.addListener(marker, 'mouseover', () => {
            marker.setIcon(hoverIconUrl);
          });
          google.maps.event.addListener(marker, 'mouseout', () => {
            marker.setIcon(normalIconUrl);
          });

          return marker;
        },
      },
    });
  }, [map, selectedPin]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleClick = useCallback((ev: google.maps.MapMouseEvent, key: number) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log('marker clicked:', ev.latLng.toString());
    map.panTo(ev.latLng);
    setSelectedPin(key);
  }, []);

  const handleMapClick = useCallback(() => {
    setSelectedPin(null);
  }, [setSelectedPin]);

  useEffect(() => {
    if (map) {
      const listener = map.addListener('click', handleMapClick);
      return () => google.maps.event.removeListener(listener);
    }
  }, [map, handleMapClick]);

  return (
    <>
      {pins.map((pin) => (
        <MarkerElement
          key={pin.site_id}
          position={pin.position}
          ref={(marker) => setMarkerRef(marker, pin.site_id.toString())}
          clickable={true}
          onClick={(e) => handleClick(e, pin.site_id)}
          icon={{
            url: hoveredKey === pin.site_id ? '/googleMapsMarkerOnHover.svg' : '/googleMapsMarker.svg',
          }}
          onMouseOver={() => setHoveredKey(pin.site_id)}
          onMouseOut={() => setHoveredKey(null)}
        />
      ))}

      {selectedPin && (
        <InfoWindow anchor={markers[selectedPin]} headerDisabled minWidth={305}>
          <InfoWindowPopup />
        </InfoWindow>
      )}
    </>
  );
};
