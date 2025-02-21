import { useCallback } from 'react';
import type { Marker } from '@googlemaps/markerclusterer';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { OfficeProperty } from '../../utils/types';

export type PinMarkerProps = {
  tree: OfficeProperty;
  onClick: (tree: OfficeProperty) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

export const PinMarker = (props: PinMarkerProps) => {
  const { tree, onClick, setMarkerRef } = props;

  const handleClick = useCallback(() => onClick(tree), [onClick, tree]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) => setMarkerRef(marker, tree.site_id.toString()),
    [setMarkerRef, tree.site_id]
  );

  return (
    <AdvancedMarker position={tree.position} ref={ref} onClick={handleClick}>
      <span className="marker-clustering-tree">
        <img src="/marker.png" />
      </span>
    </AdvancedMarker>
  );
};
