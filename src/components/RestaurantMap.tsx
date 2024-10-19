import { useEffect, useRef } from 'react';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  lat: number;
  lng: number;
}

interface RestaurantMapProps {
  restaurants: Restaurant[];
  apiKey: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function RestaurantMap({ restaurants, apiKey }: RestaurantMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initMap;
    };

    const initMap = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.0060 }, // Default to New York City
          zoom: 12,
        });
      }

      // Add markers for each restaurant
      restaurants.forEach((restaurant) => {
        new window.google.maps.Marker({
          position: { lat: restaurant.lat, lng: restaurant.lng },
          map: mapInstanceRef.current,
          title: restaurant.name,
        });
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
  }, [apiKey, restaurants]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}