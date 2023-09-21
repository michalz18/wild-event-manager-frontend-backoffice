import React, { useState, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { getMap, saveMap } from "../../services/MapService";
import Map from './map/Map'
import LocationsEditList from "./locations/LocationsEditList";
import { useUser } from "../../services/useUser";
import CircularProgress from '@mui/material/CircularProgress';

export const MapConfig = () => {
    const [mapLocations, setMapLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useUser();

    useEffect(() => {
        fetchData();
    }, []);

    const update = () => {
        setIsLoading(true)
        fetchData();
    };

    const fetchData = async () => {
        try {
            const map = await getMap(token);
            setMapLocations(map);
        } catch (error) {
            console.error("Error fetching map", error);
        }
        setIsLoading(false);
    };

    return (
        <Box sx={{ mt: '240px', ml: '0px' }}>
            <Box>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box>
                                <LocationsEditList mapLocations={mapLocations} setLocations={() => update()}></LocationsEditList>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ width: '390px', height: '844px', marginTop: '0px' }}>
                                <Map mapLocations={mapLocations}></Map>
                            </Box>

                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    )
}