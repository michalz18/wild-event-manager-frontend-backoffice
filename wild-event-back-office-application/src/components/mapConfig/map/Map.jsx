import React, { useEffect, useState, useRef } from "react";
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import { saveMap } from "../../../services/MapService";
import { Button } from "@mui/material";
import Marker from "./Marker"
import './Map.css'
import MapDialog from "../dialog/MapDialog";

const Map = ({mapLocations}) => {
  const [mapData, setMap] = useState(mapLocations);
  const [mapSave, setMapSave] = useState(mapData);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const mapContainerRef = useRef(null);
   mapboxgl.accessToken = `${process.env.REACT_APP_API_KEY}`;
  
  useEffect(() => {
    if (mapData) {
      const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [mapData.coordinate.latitude, mapData.coordinate.longitude],
      zoom: mapData.zoom,
      bearing: mapData.bearing
    }, []);
    mapData.locations.forEach((feature) => {
      const ref = React.createRef();
      ref.current = document.createElement('div');
      createRoot(ref.current).render(<Marker feature={feature} />);
      new mapboxgl.Marker(ref.current)
        .setLngLat([feature.coordinateDTO.latitude, feature.coordinateDTO.longitude])
        .addTo(map);
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.on('move', () => {
      setMapSave({
          latitude: map.getCenter().lat,
          longitude: map.getCenter().lng,
          zoom: map.getZoom(),
          bearing: map.getBearing()
      })
    });
    return () => map.remove();
}}, [mapData]);

  return <div>
          <Button variant="contained" onClick={() => setConfirmDialogOpen(true)}>Save current map setting</Button>
          <div className="map-container" ref={mapContainerRef} />
          <MapDialog
                open={confirmDialogOpen}
                handleClose={() => setConfirmDialogOpen(false)}
                handleConfirm={() => saveMap(mapSave)}
          />
         </div>
  ;
};

export default Map;

