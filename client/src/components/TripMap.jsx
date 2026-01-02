import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet marker icon not showing
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Fallback coordinates for common destinations
const CITY_COORDINATES = {
    'Kyoto': [35.0116, 135.7681],
    'Tokyo': [35.6762, 139.6503],
    'Paris': [48.8566, 2.3522],
    'London': [51.5074, -0.1278],
    'New York': [40.7128, -74.0060],
    'Dubai': [25.2048, 55.2708],
    'Singapore': [1.3521, 103.8198],
    'Rome': [41.9028, 12.4964],
    'Barcelona': [41.3851, 2.1734],
    'Sydney': [-33.8688, 151.2093]
};

// Component to re-center map when coordinates change
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
};

const TripMap = ({ destination, activities }) => {
    // Default coordinates (0,0) will be replaced
    const [position, setPosition] = useState([51.505, -0.09]);
    const [hasLocation, setHasLocation] = useState(false);

    useEffect(() => {
        // Simple string matching for demo purpose
        // In a real app, use a geocoding API
        const dest = Object.keys(CITY_COORDINATES).find(city =>
            destination.toLowerCase().includes(city.toLowerCase())
        );

        if (dest) {
            setPosition(CITY_COORDINATES[dest]);
            setHasLocation(true);
        } else {
            // If not found in static list, try a naive fetch (or just hide map)
            // For now, let's default to a "Map not available" state if not in list
            // to avoid showing the ocean.
            // Actually, let's try to geocode client-side with OpenStreetMap naming (Nominatim)
            // WE MUST BE CAREFUL with rate limits. 
            // Better strategy: Only search if not in static list.

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                        setHasLocation(true);
                    }
                })
                .catch(err => console.warn("Geocoding failed:", err));
        }
    }, [destination]);

    if (!hasLocation) return null;

    return (
        <div style={{
            height: '350px',
            width: '100%',
            marginBottom: '2rem',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            position: 'relative',
            zIndex: 1
        }}>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {destination}
                    </Popup>
                </Marker>
                <MapUpdater center={position} />
            </MapContainer>
        </div>
    );
};

export default TripMap;
