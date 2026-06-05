import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: shadowIcon,
});

// Custom Modern Marker Icon
const createCustomIcon = (color, name) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="pulse-animation" style="background: ${color}33"></div>
        <div class="marker-pin" style="background: ${color}"></div>
        <div class="marker-label">${name}</div>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

// Component to handle map centering when user joins or clicks on user list
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13, {
        animate: true,
        duration: 1
      });
    }
  }, [center, map]);
  return null;
};

const Map = ({ users, targetCenter }) => {
  const defaultCenter = [0, 0];

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={defaultCenter} 
        zoom={3} 
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {targetCenter && <ChangeView center={targetCenter} />}

        {users.map((user) => (
          user.coords && (
            <Marker 
              key={user.id} 
              position={[user.coords.lat, user.coords.lng]}
              icon={createCustomIcon(user.color, user.name)}
            >
              <Popup className="custom-popup">
                <div className="p-2">
                  <p className="font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">Activo ahora</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
