import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

function Services() {
  const [userLocation, setUserLocation] = useState(null);
  const [services, setServices] = useState([]);
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
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://borrow-backend.onrender.com/api/services');
                setServices(response.data);
      } catch (err) {
        console.error('שגיאה בטעינת השירותים:', err);
      }
    };
    fetchServices();
  }, []);

  const center = userLocation || { lat: 32.0853, lng: 34.7818 };

  return (
    <div className="services">
      <h2>שירותים על המפה</h2>
      {loading && <p>טוען מיקום...</p>}
      {userLocation && (
        <p>מיקום נוכחי: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
      )}

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
          {userLocation && (
            <Marker
              position={userLocation}
              label="אתה כאן"
              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
            />
          )}
          {services.map((service) => (
            <Marker
              key={service._id}
              position={{ lat: service.lat, lng: service.lng }}
              label={service.title}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Services;