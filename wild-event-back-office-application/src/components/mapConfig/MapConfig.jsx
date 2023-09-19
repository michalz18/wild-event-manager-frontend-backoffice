import React, { useState, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { getMap, saveMap } from "../../services/MapService";
import Map from './map/Map'
import LocationsEditList from "./locations/LocationsEditList";

export const MapConfig = () => {
    const [mapLocations, setMapLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const update = () => {
        fetchData();
    };

    const fetchData = async () => {
        try {
            const map = await getMap();
            setMapLocations(map);
        } catch (error) {
            console.error("Error fetching map", error);
        }
        setIsLoading(false);
    };

    return (
        <Box sx={{ mt: '200px', ml: '0px' }}>
            <Box>
                {isLoading ? (
                    <Box>Loading...</Box>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box>
                                <LocationsEditList mapLocations={mapLocations} setLocations={() => update()}></LocationsEditList>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ width: '390px', height: '844px', marginTop: '30px' }}>
                                <Map mapLocations={mapLocations}></Map>
                            </Box>
                           
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    )
}