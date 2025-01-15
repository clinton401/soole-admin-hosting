"use client";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

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
    { id: "1", name: "Ride 1", latitude: 9.0820, longitude: 8.6753 }, // Abuja, Nigeria
    { id: "2", name: "Ride 2", latitude: 6.5244, longitude: 3.3792 }, // Lagos, Nigeria
  ]);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: "ride-tracker-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [8.6753, 9.0820],
      zoom: 2,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (map) {
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
    <div className="container">

    <div className="ride-tracker">
      <div className="graph-header d-flex mb-2">
        <h2 className="ride-tracker-title ff-Mabry-Pro-bold">Real-Time Ride Tracker</h2>
        <select name="year" id="year" className="list-of-years">
          <option value="Year">This week</option>
          <option value="2022">Monday</option>
          <option value="2021">Tuesday</option>
          <option value="2020">Wednesday</option>
          <option value="2019">Thursday</option>
          <option value="2018">Friday</option>
        </select>
      </div>
      <div id="ride-tracker-map" className="map-content"></div>
    </div>
    </div>
  );
}
