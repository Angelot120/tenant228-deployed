import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import { toast } from "react-toastify";

function MapComponent({ location, onClick }) {
  const [position, setPosition] = useState(location || null);

  const MapEvents = () => {
    useMapEvents({
      click: (event) => {
        setPosition(event.latlng);
        if (onClick) {
          onClick(event.latlng);
        }
      },
    });
    return null;
  };

  useEffect(() => {
    setPosition(location);
  }, [location]);

  return (
    <div className="map-container">
      {/* <h1>Sélectionnez votre lieu</h1> */}
      <MapContainer
        center={[6.1379, 1.2127]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {position && (
          <Marker position={position}>
            <Popup>
              Latitude : {position.lat} <br /> Longitude : {position.lng}
            </Popup>
          </Marker>
        )}
        <MapEvents />
      </MapContainer>
      {/* <button
        className="btn-primary"
        onClick={() => {
          if (position) {
            toast.success(
              `Latitude : ${position.lat}\nLongitude : ${position.lng}`
            );
          } else {
            toast.error("Veuillez choisir un emplacement sur la carte.");
          }
        }}
      >
        Choisir cet emplacement
      </button> */}
    </div>
  );
}

export default MapComponent;
