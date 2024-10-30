import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
    width: '100%',
    height: '100%', // Adjusted to fill the parent div
};

const center = {
    lat: 40.73061, // Default center (New York City)
    lng: -73.935242,
};

const Location = () => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBlCGeLW6taJeXCUqpkfM97m-FXVXCpgf4', // Replace with your API key
    });

    const [locations, setLocations] = useState([]);
    const [dealerId, setDealerId] = useState(''); // Example field for dealer ID
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status

    const onMapClick = useCallback((event) => {
        const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setLocations((prevLocations) => [...prevLocations, newLocation]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting state to true
        try {
            const response = await axios.post('/api/v1/dealers/set-locations', {
                dealerId,
                locations: locations.map((location) => ({
                    type: 'Point',
                    coordinates: [location.lng, location.lat],
                })),
            });
            alert('Locations updated successfully');
            // Optionally reset the form and locations after submission
            setDealerId('');
            setLocations([]);
        } catch (error) {
            console.error('Error updating locations:', error);
            alert('Failed to update locations. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <h2>Set Your Operational Locations</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Dealer ID:
                    <input
                        type="text"
                        value={dealerId}
                        onChange={(e) => setDealerId(e.target.value)}
                        required
                    />
                </label>
                <div style={{ marginTop: '10px', marginBottom: '10px', height: '400px' }}>
                    <div className="relative w-full h-64 overflow-hidden">
                        <div className="absolute inset-0">
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                zoom={10}
                                center={center}
                                onClick={onMapClick}
                            >
                                {locations.map((location, index) => (
                                    <Marker
                                        key={index}
                                        position={{ lat: location.lat, lng: location.lng }}
                                    />
                                ))}
                            </GoogleMap>
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Locations'}
                </button>
            </form>
            {locations.length > 0 && (
                <div>
                    <h3>Locations to be saved:</h3>
                    <ul>
                        {locations.map((location, index) => (
                            <li key={index}>
                                Latitude: {location.lat}, Longitude: {location.lng}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Location;
