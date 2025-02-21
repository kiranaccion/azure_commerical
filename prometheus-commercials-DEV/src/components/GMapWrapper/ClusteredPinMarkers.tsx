import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MarkerClusterer, type Marker } from "@googlemaps/markerclusterer";
import OfficeSpaceCard from "./InfoWindowPopup";
import { OfficeProperty } from "../../utils/types";

export type ClusteredPinMarkersProps = {
  pins: OfficeProperty[];
  selectedPin: number | null;
  setSelectedPin: (key: number | null) => void;
  setHoveredProperty?: (key: number | null) => void;
  hoveredProperty?: number | null;
  handleViewPortZoom: (data: OfficeProperty[]) => void;
};

const normalIconUrl = "/googleMapsClusterer.svg";
const hoverIconUrl = "/googleMapsClustererOnHover.svg";

export const ClusteredPinMarkers = ({
  pins,
  selectedPin,
  setSelectedPin,
  handleViewPortZoom,
  hoveredProperty,
}: ClusteredPinMarkersProps) => {
  const map = useMap();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [visiblePins, setVisiblePins] = useState<OfficeProperty[]>([]);

  const updateVisiblePins = useCallback(() => {
    if (map) {
      const bounds = map.getBounds();
      if (bounds) {
        const visible = pins.filter((pin) => {
          const position = new google.maps.LatLng(
            pin.position.lat,
            pin.position.lng
          );
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
      const boundsListener = map.addListener(
        "bounds_changed",
        updateVisiblePins
      );
      return () => google.maps.event.removeListener(boundsListener);
    }
  }, [map, updateVisiblePins]);

  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({
      map,
      renderer: {
        render: (cluster) => {
          const labelText = String(cluster.markers?.length);
          let iconUrl = normalIconUrl;

          if (selectedPin !== null || hoveredProperty !== null) {
            const isSelectedMarkerInCluster = cluster.markers?.some(
              (marker) => {
                // @ts-ignore
                const markerId = marker.get("_id");
                // Check if the marker matches the selected or hovered property
                return markerId === selectedPin || markerId === hoveredProperty;
              }
            );

            if (isSelectedMarkerInCluster) {
              iconUrl = hoverIconUrl;
            }
          }

          const marker = new google.maps.Marker({
            position: cluster.position,
            label: {
              text: labelText,
              color: "white",
              fontSize: "15px",
            },
            icon: iconUrl,
            zIndex:
              google.maps.Marker.MAX_ZINDEX + (cluster.markers?.length ?? 1),
          });

          google.maps.event.addListener(marker, "mouseover", () => {
            // Check again if the cluster contains the selected or hovered marker
            const isSelectedMarkerInCluster = cluster.markers?.some((m) => {
              // @ts-ignore
              const markerId = m.get("_id");
              return markerId === selectedPin || markerId === hoveredProperty;
            });
            if (isSelectedMarkerInCluster) {
              marker.setIcon(hoverIconUrl);
            }
          });

          google.maps.event.addListener(marker, "mouseout", () => {
            // Check again if the cluster contains the selected or hovered marker
            const isSelectedMarkerInCluster = cluster.markers?.some((m) => {
              // @ts-ignore
              const markerId = m.get("_id");
              return markerId === selectedPin || markerId === hoveredProperty;
            });
            if (!isSelectedMarkerInCluster) {
              marker.setIcon(normalIconUrl);
            }
          });

          return marker;
        },
      },
    });
  }, [map, selectedPin, hoveredProperty]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();

    const newMarkers = visiblePins.map((pin) => {
      let marker;
      marker = new google.maps.Marker({
        map: map,
        position: pin.position,
        icon: "/googleMapsMarker.svg",
      });

      if (hoveredProperty === pin.site_id) {
        marker.setIcon("/googleMapsMarkerOnHover.svg");
      }
      marker.set("_id", pin.site_id);
      marker.addListener("mouseover", () =>
        marker.setIcon("/googleMapsMarkerOnHover.svg")
      );
      marker.addListener("mouseout", () =>
        marker.setIcon("/googleMapsMarker.svg")
      );
      google.maps.event.addListener(marker, "click", () => {
        setSelectedPin(pin.site_id);
      });

      return marker;
    });

    clusterer.addMarkers(newMarkers);
    setMarkers(newMarkers);
  }, [clusterer, visiblePins, map, setSelectedPin, hoveredProperty]);

  useEffect(() => {
    if (map) {
      const listener = map.addListener("click", () => {
        setSelectedPin(null);
      });
      return () => google.maps.event.removeListener(listener);
    }
  }, [map, setSelectedPin]);

  return (
    <>
      {selectedPin && (
        <InfoWindow
          anchor={
            markers.find((marker) => {
              //@ts-ignore
              return marker.get("_id") === selectedPin;
            }) || undefined
          }
          headerDisabled
          minWidth={305}
        >
          <OfficeSpaceCard />
        </InfoWindow>
      )}
    </>
  );
};
