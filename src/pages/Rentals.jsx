import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

function Rentals() {
  const [userLocation, setUserLocation] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        (error) => {
          console.error('שגיאה בקבלת מיקום:', error);
          setLoading(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rentals');
        setRentals(response.data);
      } catch (err) {
        console.error('שגיאה בטעינת השכרות:', err);
      }
    };
    fetchRentals();
  }, []);

  const center = userLocation || { lat: 32.0853, lng: 34.7818 };

  return (
    <div className="rentals">
      <h2>השכרות על המפה</h2>
      {loading && <p>טוען מיקום...</p>}
      {userLocation && (
        <p>מיקום נוכחי: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
      )}

      <LoadScript googleMapsApiKey="AIzaSyAJFC3lneX3m6lWIhsGanx1SCSTbOi4luA">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
          {userLocation && (
            <Marker
              position={userLocation}
              label="אתה כאן"
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
            />
          )}
          {rentals.map((rental) => (
            <Marker
              key={rental._id}
              position={{ lat: rental.lat, lng: rental.lng }}
              label={rental.title}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Rentals;