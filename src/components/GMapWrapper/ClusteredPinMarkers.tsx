import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';
import InfoWindowPopup from './InfoWindowPopup';
import { PropertyPin } from '@/types';
import { clusterOptions } from './utils';
import MarkerClusterer from '@googlemaps/markerclustererplus';
/* eslint-disable react-hooks/exhaustive-deps */

interface ClusteredPinMarkersProps {
  pins: PropertyPin[];
  selectedPin: string | null;
  setSelectedPin: (key: string | null) => void;
  setHoveredProperty: (key: string | null) => void;
  hoveredProperty: string | null;
  handleViewPortZoom: (data: PropertyPin[]) => void;
  clusteringEnabled: boolean;
}

const clusterNormalIcon = '/googleMapsClusterer.svg';
const clusterHoverIcon = '/googleMapsClustererOnHover.svg';
const officeIcons = { normal: '/pins/officeNormalIcon.svg', hover: '/pins/officeHoverIcon.svg' };
const retailIcons = { normal: '/pins/retailNormalIcon.svg', hover: '/pins/retailHoverIcon.svg' };
const apartmentsIcons = { normal: '/pins/apartmentsNormalIcon.svg', hover: '/pins/apartmentsHoverIcon.svg' };

export const ClusteredPinMarkers = ({
  pins,
  selectedPin,
  setSelectedPin,
  handleViewPortZoom,
  hoveredProperty,
  setHoveredProperty,
  clusteringEnabled,
}: ClusteredPinMarkersProps) => {
  const map = useMap();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [visiblePins, setVisiblePins] = useState<PropertyPin[]>(pins);
  const [clusterer, setClusterer] = useState<MarkerClusterer | null>(null);

  const getIcons = (type: string) => {
    if (type === 'office') return officeIcons;
    if (type === 'retail') return retailIcons;
    if (type === 'apartments') return apartmentsIcons;
    return apartmentsIcons;
  };

  const updateVisiblePins = useCallback(() => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        const visible = pins.filter((pin) => {
          const position = new google.maps.LatLng(pin.position.lat, pin.position.lng);
          return bounds.contains(position);
        });
        setVisiblePins(visible);
        handleViewPortZoom(visible);
      }
    }
  }, [map, pins, handleViewPortZoom]);

  useEffect(() => {
    if (map) {
      updateVisiblePins();
      const boundsListener = map.addListener('bounds_changed', updateVisiblePins);
      return () => google.maps.event.removeListener(boundsListener);
    }
  }, [map, updateVisiblePins]);

  const updateClusterIcons = useCallback(() => {
    if (clusterer) {
      clusterer.getClusters().forEach((cluster) => {
        const markersInCluster = cluster.getMarkers();
        const clusterIcon = cluster['clusterIcon_'];
        if (clusterIcon?.style?.url) {
          const isHovered = markersInCluster.some((marker) => marker.get('_id') === hoveredProperty);
          clusterIcon.style.url = isHovered ? clusterHoverIcon : clusterNormalIcon;
          cluster.updateIcon();
        }
      });
    }
  }, [clusterer, hoveredProperty]);

  const tempSelectMarker = (mapMarkers: google.maps.Marker[], selectedCard: string | null | undefined) => {
    if (mapMarkers) {
      mapMarkers.forEach((marker) => {
        const pinType = visiblePins.find((pin) => pin.slug === marker.get('_id'))?.commercialType?.toLowerCase();
        const { normal: markerNormalIcon, hover: markerHoverIcon } = getIcons(pinType || '');

        // Reset all markers to the normal icon
        marker.setIcon(markerNormalIcon);

        // Highlight the selected marker
        if (selectedCard && marker.get('_id') === selectedCard) {
          marker.setIcon(markerHoverIcon);
        }
      });
    }
  };

  useEffect(() => {
    updateClusterIcons();
    tempSelectMarker(markers, hoveredProperty as string | null);
  }, [hoveredProperty, markers, updateClusterIcons]);

  useEffect(() => {
    const addMarkers = (): google.maps.Marker[] => {
      const newMarkers = visiblePins.map((pin) => {
        const { normal: markerNormalIcon, hover: markerHoverIcon } = getIcons(pin.commercialType?.toLowerCase() || '');
        const marker = new google.maps.Marker({
          position: pin.position,
          icon: markerNormalIcon,
          map: map,
        });
        marker.set('_id', pin.slug);
        marker.addListener('mouseover', () => {
          marker.setIcon(markerHoverIcon);
          setHoveredProperty(pin.slug);
        });

        marker.addListener('mouseout', () => {
          marker.setIcon(markerNormalIcon);
          setHoveredProperty(null);
        });
        marker.addListener('click', () => {
          setSelectedPin(pin.slug);
        });

        return marker;
      });

      return newMarkers;
    };

    const generateCluster = (markerers: google.maps.Marker[]) => {
      if (map) {
        const markerCluster = new MarkerClusterer(map, markerers, {
          ...clusterOptions,
          minimumClusterSize: clusteringEnabled ? clusterOptions.minimumClusterSize : 1000,
        });
        markerCluster.set('metaMarkers', markerers);

        return markerCluster;
      }
    };

    const initMap = () => {
      if (map) {
        const initMarkers: google.maps.Marker[] = addMarkers();
        setMarkers(initMarkers);
        const markerCluster = generateCluster(initMarkers);
        setClusterer(markerCluster as MarkerClusterer);
      }
    };
    initMap();
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (map) {
      const listener = map.addListener('click', () => {
        setSelectedPin(null);
      });
      return () => google.maps.event.removeListener(listener);
    }
  }, [map, setSelectedPin]);

  const propertyPin = pins.find((pin) => pin.slug === selectedPin);

  return (
    <>
      {selectedPin && (
        <InfoWindow anchor={markers.find((marker) => marker.get('_id') === selectedPin)} headerDisabled minWidth={305}>
          {propertyPin && <InfoWindowPopup pin={propertyPin} />}
        </InfoWindow>
      )}
    </>
  );
};
