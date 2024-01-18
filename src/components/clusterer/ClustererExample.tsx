import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef } from "react";
import trees from "../../data/trees";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

type TreeType = {
  key: string;
  name: string;
  lat: number;
  lng: number;
};

export const  ClustererExample = () => {
  const [data, setData] = useState<TreeType[]>(trees);

  const handleAdd = (e: any) => {
    const coordinates = e.detail.latLng;
    const { lat, lng } = coordinates;
    const name = String(Math.random())

    setData([
      ...data,
      {
        name: name,
        lat: lat,
        lng: lng,
        key: JSON.stringify({ name, lat, lng }),
      },
    ]);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={API_KEY}>
        <Map
          center={{ lat: 43.64, lng: -79.41 }}
          zoom={10}
          mapId={MAP_ID}
          onClick={handleAdd}
        >
          <Markers points={data} />
        </Map>
      </APIProvider>
    </div>
  );
}

type Point = google.maps.LatLngLiteral & { key: string };
type Props = { points: Point[] };

const Markers = ({ points }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

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

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <span style={{ fontSize: "2rem" }}>🌳</span>
        </AdvancedMarker>
      ))}
    </>
  );
};
