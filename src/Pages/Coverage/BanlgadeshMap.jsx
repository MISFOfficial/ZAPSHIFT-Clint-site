import React, { useState, useEffect } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to control map view on match
const MapFocus = ({ district }) => {
    const map = useMap();

    useEffect(() => {
        if (district) {
            map.flyTo([district.latitude, district.longitude], 12, {
                duration: 1.5,
            });
        }
    }, [district, map]);

    return null;
};

const BangladeshMap = ({ data }) => {
    const [searchText, setSearchText] = useState('');
    const [matchedDistrict, setMatchedDistrict] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault()
        const match = data.find((d) =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );
        setMatchedDistrict(match || null);
    };

    return (
        <div className="h-[60vh] w-full">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-md mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search district..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type='submit'
                    // onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            <MapContainer
                center={[23.685, 90.3563]}
                zoom={8}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                {/* Cleaner base map (Carto light) */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="" // removes text attribution
                />

                {/* Optional map focus/zoom animation */}
                {matchedDistrict && <MapFocus district={matchedDistrict} />}

                {(matchedDistrict ? [matchedDistrict] : data).map(
                    (district, index) => (
                        <Marker
                            key={index}
                            position={[district.latitude, district.longitude]}
                        >
                            <Popup autoPan={true}>
                                <strong>{district.district}</strong>
                                <br />
                                <span>Coverage Areas:</span>
                                <ul className="list-disc ml-4 text-sm">
                                    {district.covered_area.map((area, i) => (
                                        <li key={i}>{area}</li>
                                    ))}
                                </ul>
                            </Popup>
                        </Marker>
                    )
                )}
            </MapContainer>
        </div>
    );
};

export default BangladeshMap;
