import { useEffect, useMemo, useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  MarkerF /* DirectionsRenderer */,
} from "@react-google-maps/api";
import "./Map.css";
import markerLogo from "./assets/markerLogo.png";

import {
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
  MapProperties,
} from "../../Types/Types";

const Map = ({
  coordinates,
  setCoordinates,
  handleDbClick,
  center = false,
  mode = "view",
  name,
}: MapProperties) => {
  const mapRef = useRef<GoogleMap>();

  // Las coordenadas puestas por defecto son las de lo considerado como epicentro de Europa
  const centerCords = useMemo<LatLngLiteral>(
    () => (center && coordinates ? coordinates : { lat: 54.526, lng: 15.2551 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      disabledDefaultUI: true,
      disableDoubleClickZoom: true,
      clickableIcons: false,
      fullscreenControl: false,
      rotateControl: false,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const handleLocation = (e: MapMouseEvent) => {
    const position = e.latLng?.toJSON();
    if (mode === "form") {
      setCoordinates &&
        setCoordinates(
          position.lat === coordinates?.lat && position.lng === coordinates?.lng
            ? null
            : position,
          name
        );
    }
  };

  return (
    <>
      <GoogleMap
        center={centerCords}
        mapContainerClassName="mapContainer"
        onLoad={onLoad}
        options={options}
        zoom={5}
        onClick={handleLocation}
      >
        <>
          {coordinates && (
            <MarkerF
              label=""
              position={coordinates}
              onClick={handleLocation}
              icon={markerLogo}
            />
          )}
        </>
      </GoogleMap>
    </>
  );
};

export default Map;
