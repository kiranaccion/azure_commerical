import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useState, useEffect, useRef, useCallback } from 'react';
import { PropertyPin } from '@/types';
import InfoWindowPopup from '../GMapWrapper/InfoWindowPopup';
import { getBoundCoordinates } from '@/utils';
import { debounce } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { clusterOptions } from '../GMapWrapper/utils';
import CustomMarkerClusterer from './CustomMarkerClusterer';
import { CustomSuperClusterAlgorithm } from './CustomSuperClusterAlgorithm';

/* eslint-disable react-hooks/exhaustive-deps */
interface AdvancedMarkersProps {
  pins: PropertyPin[];
  selectedPin: string | null;
  setSelectedPin: (key: string | null) => void;
  setHoveredProperty: (key: string | null) => void;
  hoveredProperty: string | null;
  handleViewPortZoom?: (data: PropertyPin[]) => void;
  shareCoordinates?: boolean;
  starredPin?: string;
  mapCenter?: any;
  isCheckBoxUpdated?: boolean;
  setIsCheckBoxUpdated?: (value: boolean) => void;
  clusteringEnabled?: boolean;
}

const clusterNormalIcon = '/googleMapsClusterer.svg';
const clusterHoverIcon = '/googleMapsClustererOnHover.svg';
const officeIcons = { normal: '/pins/officeNormalIcon.svg', hover: '/pins/officeHoverIcon.svg' };
const retailIcons = { normal: '/pins/retailNormalIcon.svg', hover: '/pins/retailHoverIcon.svg' };
const apartmentsIcons = { normal: '/pins/apartmentsNormalIcon.svg', hover: '/pins/apartmentsHoverIcon.svg' };

export default function AdvancedMarkers({
  pins,
  selectedPin,
  setSelectedPin,
  handleViewPortZoom,
  hoveredProperty,
  setHoveredProperty,
  shareCoordinates = true,
  starredPin,
  mapCenter,
  isCheckBoxUpdated,
  setIsCheckBoxUpdated,
  clusteringEnabled = false,
}: AdvancedMarkersProps) {
  const map = useMap();
  const router = useRouter();
  const pathname = usePathname();

  const [visiblePins, setVisiblePins] = useState<PropertyPin[]>(pins);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<google.maps.Marker | null>(null);
  const [clusterer, setClusterer] = useState<CustomMarkerClusterer | null>(null);
  const initialRender = useRef(true);
  const programmaticPan = useRef(false);

  // Helper function to filter visible pins based on current bounds
  const getVisiblePins = (bounds: google.maps.LatLngBounds | null) => {
    if (!bounds) return [];
    return pins.filter((pin) => {
      const position = new google.maps.LatLng(pin.position.lat, pin.position.lng);
      return bounds.contains(position);
    });
  };

  // Updates bounds and handles visible pins + viewport logic
  const updateBoundsWithMetaSearch = () => {
    if (!map || !mapCenter?.lat || !mapCenter?.lng || pins.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    // Extend bounds with pin locations
    pins.forEach((pin) => bounds.extend(new google.maps.LatLng(pin.position.lat, pin.position.lng)));

    // Extend bounds with metaSearch center
    bounds.extend(new google.maps.LatLng(mapCenter.lat, mapCenter.lng));

    // Adjust map bounds with padding
    programmaticPan.current = true;
    map.fitBounds(bounds, 100);

    const visible = getVisiblePins(bounds);
    setVisiblePins(visible);
    handleViewPortZoom?.(visible);

    // Reset programmatic pan flag after delay
    setTimeout(() => {
      programmaticPan.current = false;
    }, 650);
  };

  // Updates visible pins when bounds change
  const updateVisiblePins = debounce(() => {
    if (!map) return;
    if (programmaticPan.current) {
      programmaticPan.current = false; // Skip programmatic pans
      return;
    }

    const bounds = map?.getBounds();
    if (bounds) {
      const visible = getVisiblePins(bounds);
      setVisiblePins(visible);
      handleViewPortZoom?.(visible);

      // Update URL with map bounds if sharing coordinates is enabled
      if (shareCoordinates && !initialRender.current) {
        const mapDetails = getBoundCoordinates(map);
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.delete('term');
        currentParams.set('boundCoordinates', mapDetails.boundCoordinatesQuery);

        const updatedUrl = `${pathname}?${currentParams.toString()}`;
        router.push(updatedUrl, { scroll: false });
      }
    }
  }, 500);

  useEffect(() => {
    if (!map) return;

    // Handle initial bounds update or checkbox change
    if (initialRender.current || isCheckBoxUpdated) {
      updateBoundsWithMetaSearch();
      initialRender.current = false;
      setIsCheckBoxUpdated?.(false);
    }

    // Add bounds_changed listener
    const boundsListener = map.addListener('bounds_changed', updateVisiblePins);

    // Cleanup on unmount
    return () => {
      google.maps.event.removeListener(boundsListener);
      updateVisiblePins.cancel();
    };
  }, [map, pins, isCheckBoxUpdated, shareCoordinates, mapCenter]);

  useEffect(() => {
    if (!map) return;

    const bounds = map.getBounds();
    if (bounds) {
      const visible = getVisiblePins(bounds);
      setVisiblePins(visible);
      handleViewPortZoom?.(visible);
    }
  }, [pins]);

  const getIcons = (type: string) => {
    if (type === 'office') return officeIcons;
    if (type === 'retail') return retailIcons;
    if (type === 'apartments') return apartmentsIcons;
    return apartmentsIcons;
  };

  const propertyPin = pins.find((pin) => pin.slug === selectedPin);

  useEffect(() => {
    if (!markers || markers.length === 0 || !visiblePins) return;

    const pinMap = createPinMap(visiblePins);

    markers.forEach((marker) => {
      updateMarkerIcon(marker, pinMap);
    });
  }, [markers, visiblePins, starredPin, hoveredProperty]);

  // Helper function to create a map of pin icons
  const createPinMap = (pins: PropertyPin[]) => {
    return new Map(
      pins.map((pin) => {
        const pinType = pin.commercialType?.toLowerCase() || '';
        let priorityLevel = 0;

        if (pathname.startsWith('/office')) {
          if (pinType === 'office') priorityLevel = 3;
          else if (pinType === 'retail') priorityLevel = 2;
          else priorityLevel = 1;
        } else if (pathname.startsWith('/retail')) {
          if (pinType === 'retail') priorityLevel = 3;
          else if (pinType === 'office') priorityLevel = 2;
          else priorityLevel = 1;
        } else if (pathname.startsWith('/search')) {
          priorityLevel = pinType === 'office' || pinType === 'retail' ? 3 : 1;
        }

        return [
          pin.slug,
          {
            icons: getIcons(pinType),
            priorityLevel,
            rank: pin.rank || 0,
          },
        ];
      })
    );
  };

  // Helper function to update the marker's icon
  const updateMarkerIcon = (
    marker: google.maps.Marker,
    pinMap: Map<string, { icons: { normal: string; hover: string }; priorityLevel: number; rank: number }>
  ) => {
    const markerId = marker.get('_id');
    const pinInfo = pinMap.get(markerId);
    if (!pinInfo) return;

    const { normal: markerNormalIcon, hover: markerHoverIcon } = pinInfo.icons;
    const priorityLevel = pinInfo.priorityLevel;
    const rank = pinInfo.rank;

    let zIndex = 1; // Default zIndex

    if (starredPin && markerId === starredPin) {
      zIndex = 1000; // Highest priority for starred pins
    } else if (hoveredProperty && markerId === hoveredProperty) {
      zIndex = 750; // Higher priority for hovered pins
    } else {
      // Prioritize based on `priorityLevel`
      zIndex = priorityLevel * 100 + (100 - rank);
    }

    marker.setIcon(markerNormalIcon);
    marker.setZIndex(zIndex);

    // Highlight starred or hovered marker
    if (starredPin && markerId === starredPin) {
      highlightMarker(marker, markerHoverIcon, 1000);
    } else if (hoveredProperty && markerId === hoveredProperty) {
      highlightMarker(marker, markerHoverIcon, 750);
    }
  };

  // Helper function to highlight a marker
  const highlightMarker = (marker: google.maps.Marker, hoverIcon: string | undefined, zIndex = 1) => {
    marker.setIcon(hoverIcon);
    marker.setZIndex(zIndex);
  };

  const handlePinClick = (marker: google.maps.Marker, pin: PropertyPin) => {
    programmaticPan.current = true;

    map?.panTo(pin.position);
    setSelectedPin(pin.slug);
    setSelectedMarker(marker);
  };

  const updateClusterIcons = useCallback(() => {
    if (clusterer && clusteringEnabled) {
      const clusters = clusterer.getClusters();
      clusters
        .filter((i) => i.markers && i.markers.length >= 2)
        .forEach((cluster) => {
          const marker = cluster.marker as google.maps.Marker;
          const markers = cluster.markers as google.maps.Marker[];
          const clusterHoveredMarker = markers.find((marker) => marker.get('_id') === hoveredProperty);
          if (clusterHoveredMarker) {
            marker.setIcon(clusterHoverIcon);
          } else {
            marker.setIcon(clusterNormalIcon);
          }
        });
    }
  }, [clusterer, hoveredProperty, clusteringEnabled]);

  useEffect(() => {
    updateClusterIcons();
  }, [hoveredProperty, updateClusterIcons]);

  useEffect(() => {
    if (!map) return;

    // Cleanup old markers
    clusterer?.clearMarkers();
    markers.forEach((marker) => marker.setMap(null));
    const maxRank = Math.max(...visiblePins.map((p) => p.rank ?? 0));

    // Create new markers
    const newMarkers = visiblePins.map((pin) => {
      const { normal: markerNormalIcon, hover: markerHoverIcon } = getIcons(pin.commercialType?.toLowerCase() || '');
      const isStarred = starredPin === pin.slug;

      const zIndex = isStarred ? 1000 : pin.rank !== undefined ? maxRank - pin.rank + 2 : 1;

      const marker = new google.maps.Marker({
        position: pin.position,
        map,
        zIndex,
        icon: isStarred ? markerHoverIcon : markerNormalIcon,
        label: isStarred ? { text: pin.title, className: 'highlighted-property-label' } : undefined,
      });

      marker.set('_id', pin.slug);

      marker.addListener('mouseover', () => {
        if (!isStarred) marker.setIcon(markerHoverIcon);
        setHoveredProperty(pin.slug);
      });

      marker.addListener('mouseout', () => {
        if (!isStarred) marker.setIcon(markerNormalIcon);
        setHoveredProperty(null);
      });

      marker.addListener('click', () => handlePinClick(marker, pin));

      return marker;
    });

    setMarkers(newMarkers);

    if (clusteringEnabled) {
      const clusterer = new CustomMarkerClusterer({
        markers: newMarkers,
        map,
        algorithm: new CustomSuperClusterAlgorithm({
          maxZoom: 14,
          minPoints: 2,
        }),
        algorithmOptions: clusterOptions,
        renderer: {
          render: ({ count, position }) => {
            const marker = new google.maps.Marker({
              position,
              zIndex: 1500,
              icon: {
                url: clusterOptions.styles?.[0]?.url || '',
                scaledSize: clusterOptions.styles
                  ? new google.maps.Size(clusterOptions.styles[0].width, clusterOptions.styles[0].height)
                  : undefined,
              },
              label: {
                text: count.toString(),
                color: clusterOptions.styles?.[0]?.textColor || '',
                fontSize: clusterOptions.styles ? `${clusterOptions.styles[0].textSize}px` : '12px',
                fontWeight: clusterOptions.styles?.[0]?.fontWeight ?? 'normal',
              },
            });
            marker.addListener('mouseover', () => marker.setIcon(clusterHoverIcon));
            marker.addListener('mouseout', () => marker.setIcon(clusterNormalIcon));
            return marker;
          },
        },
      });
      setClusterer(clusterer);
    }

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
      clusterer?.clearMarkers();
    };
  }, [map, visiblePins, starredPin, isCheckBoxUpdated, clusteringEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {selectedPin && (
        <InfoWindow anchor={selectedMarker} headerDisabled minWidth={305}>
          {propertyPin && <InfoWindowPopup pin={propertyPin} />}
        </InfoWindow>
      )}
    </>
  );
}
