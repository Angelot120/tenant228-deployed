import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "./MapComponent.css";

export default function ShowMap({ mapLat, mapLong }) {
  const position = [mapLat, mapLong];

  if (!mapLat && !mapLong) {
    return <div>Chargement de la carte...</div>;
  }

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <Marker position={position}>
          <Popup>
            Latitude : {mapLat} <br /> Longitude : {mapLong}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
