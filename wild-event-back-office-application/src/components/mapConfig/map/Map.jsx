import React, { useEffect, useState, useRef } from "react";
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import { saveMap } from "../../../services/MapService";
import { Button } from "@mui/material";
import Marker from "./Marker"
import './Map.css'
import MapDialog from "../dialog/MapDialog";
import { useUser } from "../../../services/useUser";

const Map = ({mapLocations}) => {
  const { token } = useUser();
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
      center: [mapData.coordinate.longitude, mapData.coordinate.latitude],
      zoom: mapData.zoom,
      bearing: mapData.bearing
    }, []);
    mapData.locations.forEach((location, index) => {
      const ref = React.createRef();
      ref.current = document.createElement('div');
      createRoot(ref.current).render(<Marker feature={location} index={index + 1}/>);
      new mapboxgl.Marker(ref.current)
        .setLngLat([location.coordinateDTO.longitude, location.coordinateDTO.latitude])
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
                handleConfirm={() => saveMap(token, mapSave)}
          />
         </div>
  ;
};

export default Map;

