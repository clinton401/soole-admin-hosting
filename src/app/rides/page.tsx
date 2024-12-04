"use client"
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

// Set your Mapbox access token
mapboxgl.accessToken = "your-mapbox-access-token";

interface Ride {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function RideTracker() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [rides, setRides] = useState<Ride[]>([
    { id: "1", name: "Ride 1", latitude: 40.7128, longitude: -74.006 },
    { id: "2", name: "Ride 2", latitude: 34.0522, longitude: -118.2437 },
  ]);

  useEffect(() => {
    // Initialize Mapbox map
    const mapInstance = new mapboxgl.Map({
      container: "ride-tracker-map", // ID of the container
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283], // Default center (USA)
      zoom: 3,
    });

    setMap(mapInstance);

    // Cleanup map on unmount
    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (map) {
      // Add markers for each ride
      rides.forEach((ride) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([ride.longitude, ride.latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(`<h4>${ride.name}</h4>`)
          ) // Add popup
          .addTo(map);

        // Optionally, clean up markers when rides change
        return () => marker.remove();
      });
    }
  }, [map, rides]);

  // Simulate ride location updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRides((prevRides) =>
        prevRides.map((ride) => ({
          ...ride,
          latitude: ride.latitude + Math.random() * 0.01 - 0.005,
          longitude: ride.longitude + Math.random() * 0.01 - 0.005,
        }))
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="ride-tracker">
      <h2 className="ride-tracker-title">Real-Time Ride Tracker</h2>
      <div id="ride-tracker-map"></div>
    </div>
  );
}
