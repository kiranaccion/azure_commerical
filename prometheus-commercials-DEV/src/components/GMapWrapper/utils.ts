export const styles = {
  legacy: [
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
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [{ visibility: 'on' }, { color: '#c0e8da' }],
    },
    {
      featureType: 'poi.attraction',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.attraction',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.government',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.medical',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ visibility: 'off' }, { saturation: '60' }, { color: 'red' }, { lightness: '4' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }, { color: '#6f3131' }],
    },
    {
      featureType: 'poi.place_of_worship',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.school',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
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
    {
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }, { lightness: 700 }],
    },
    // { featureType: 'water', elementType: 'all', stylers: [{ color: '#b7ddec' }] },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ saturation: '7' }, { color: '#b7ddec' }, { lightness: '12' }],
    },
  ],
};
