'use client';
import { AdvancedMarker, APIProvider, ControlPosition, Map, Marker } from '@vis.gl/react-google-maps';
import { OfficeProperty } from '../../utils/types';
import { styles } from '../GMapWrapper/utils';

interface GMapDetailWrapperProps {
  pins: OfficeProperty[];
  apiKey: string;
  defaultPin: OfficeProperty;
}

export default function GMapDetailWrapper({ pins, defaultPin, apiKey }: GMapDetailWrapperProps) {
  return (
    <div className="google-map-container" id="Maps">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{
            lat: defaultPin.position.lat,
            lng: defaultPin.position.lng,
          }}
          defaultZoom={12}
          disableDefaultUI={true}
          gestureHandling={'none'}
          styles={styles['legacy']}
        >
          {pins.map((pin) => {
            const icon = defaultPin.site_id === pin.site_id ? '/markerHover.png' : '/marker.png';
            return <Marker position={pin.position} icon={icon} />;
          })}
        </Map>
      </APIProvider>
    </div>
  );
}
