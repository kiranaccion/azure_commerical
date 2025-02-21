import { MarkerClustererOptions } from '@googlemaps/markerclustererplus';

export const styles = {
  legacy: [
    // Styles for landscape
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ededed' }, { lightness: '2' }],
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry.fill',
      stylers: [{ visibility: 'on' }, { color: '#cddfc2' }, { lightness: '20' }, { saturation: '4' }, { gamma: '1.00' }],
    },
    {
      featureType: 'landscape.natural',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }, { color: 'red' }],
    },

    // Styles for Points of Interest (POI)
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [{ visibility: 'on' }, { color: '#c0e8da' }],
    },
    ...['attraction', 'business', 'government', 'medical', 'place_of_worship', 'school', 'sports_complex', 'park'].map(
      (poiType) => ({
        featureType: `poi.${poiType}`,
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      })
    ),
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ visibility: 'off' }, { saturation: '60' }, { color: 'red' }, { lightness: '4' }],
    },

    // Styles for Roads
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ lightness: 100 }, { visibility: 'simplified' }],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#afb3bb' }, { visibility: 'on' }],
    },
    ...['highway', 'arterial', 'local'].map((roadType) => ({
      featureType: `road.${roadType}`,
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }],
    })),

    // Styles for Transit Lines
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }, { lightness: 700 }],
    },

    // Styles for Water
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ saturation: '7' }, { color: '#b7ddec' }, { lightness: '12' }],
    },
  ],
};

export const clusterOptions: MarkerClustererOptions = {
  averageCenter: true,
  clusterClass: 'map-pin-cluster',
  enableRetinaIcons: true,
  ignoreHidden: true,
  maxZoom: 14,
  minimumClusterSize: 2,
  styles: [
    {
      url: '/googleMapsClusterer.svg',
      height: 71,
      width: 72,
      anchorIcon: [0, 0],
      anchorText: [22, 0],
      fontWeight: '700',
      textSize: 22,
      textColor: 'white',
    },
  ],
};
