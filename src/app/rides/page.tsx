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
    // { id: "2", name: "Ride 2", latitude: 34.0522, longitude: -118.2437 },
  ]);

  useEffect(() => {
    // Initialize Mapbox map
    const mapInstance = new mapboxgl.Map({
      container: "ride-tracker-map", // ID of the container
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283], // Default center (USA)
      zoom: 7,
    });

    setMap(mapInstance);

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
          ) 
          .addTo(map);

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

    return () => clearInterval(interval);
  }, []);

  return (
 <div className="ride-tracker">
     {/* <div className="ride-tracker"> */}
      <div className="graph-header d-flex mb-2">

      <h2 className="ride-tracker-title">Real-Time Ride Tracker</h2>

<select name="year" id="year" className="list-of-years" >
  <option value="Year">This week</option>
  <option value="2022">Monday</option>
  <option value="2021">Tuesday</option>
  <option value="2020">Wednesday</option>
  <option value="2019">Thursday</option>
  <option value="2018">Friday</option>
</select>
</div>
    {/* </div> */}
      <div id="ride-tracker-map" className="map-content"></div>
      </div>
  );
}
