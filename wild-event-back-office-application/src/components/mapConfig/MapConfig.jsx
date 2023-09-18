import React, { useState, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { getMap, saveMap } from "../../services/MapService";
import Map from './map/Map'
import LocationsEditList from "./locations/LocationsEditList";

export const MapConfig = () => {
    const [mapLocations, setMapLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const map = await getMap();
            setMapLocations(map);
            setIsLoading(false); // Set isLoading to false once data is fetched
        } catch (error) {
            console.error("Error fetching map", error);
            setIsLoading(false); // Set isLoading to false in case of an error
        }
    };

    return (
        <Box sx={{ mt: '64px', ml: '340px' }}>
            <Box>
                {isLoading ? (
                    <Box>Loading...</Box>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box>
                                <LocationsEditList mapLocations={mapLocations}></LocationsEditList>
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