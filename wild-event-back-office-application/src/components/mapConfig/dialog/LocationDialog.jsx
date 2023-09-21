import React, { useState, useEffect } from 'react';
import {FormGroup, FormControl, Button, TextField, Grid, Box, DialogContent} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { submitLocation } from '../../../services/LocationService';
import MapForm from '../map/MapForm';
import { useUser } from "../../../services/useUser";

const LocationDialog = ({mapLocations, open, location, handleClose }) => {
    const { token } = useUser();
    const [locationData, setLocationData] = useState({})
    const [coordinate, setCoordinate] = useState({
        latitude: mapLocations.coordinate.latitude,
        longitude: mapLocations.coordinate.longitude
      });


    useEffect(() => {
        setLocationData({
                  ...locationData,
                  longitude: coordinate.longitude,
                  latitude: coordinate.latitude,
                });
        
    }, [coordinate])

    useEffect(() => {
        if (location) {
            setLocationData({
                id: location.id,
                title: location.title,
                description: location.description,
                longitude: location.coordinateDTO.longitude,
                latitude: location.coordinateDTO.latitude
            })
        } else {
            setLocationData({
                id:null,
                title:"",
                description: "",
                longitude: mapLocations.coordinate.longitude,
                latitude: mapLocations.coordinate.latitude
            })
        }
    }, [open]);

    const handleInputChange = (event) => {
        console.log(locationData)
        const { name, value } = event.target;
        setLocationData({
            ...locationData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        await submitLocation(token, locationData);
        await handleClose();
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose} style={{}}>
            <DialogTitle>{location ? "Location details" : "Add new location"}</DialogTitle>
            <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                    <FormGroup >
                    <FormControl margin="normal">
                        <TextField autoFocus
                            label="Title"
                            variant="outlined"
                            name="title"
                            value={locationData.title}
                            onChange={handleInputChange} />
                    </FormControl>
                    <FormControl margin="normal">
                        <TextField autoFocus
                            label="Description"
                            variant="outlined"
                            multiline 
                            rows={4}
                            name="description"
                            value={locationData.description}
                            onChange={handleInputChange} />
                    </FormControl>
                    <FormControl margin="normal">
                        <TextField autoFocus
                            label="Latitude"
                            variant="outlined"
                            type="number"
                            name="latitude"
                            value={locationData.latitude}
                            InputProps={{ readOnly: true }}/>
                    </FormControl>
                    <FormControl margin="normal">
                        <TextField autoFocus
                            label="Longitude"
                            variant="outlined"
                            type="number"
                            name="longitude"
                            value={locationData.longitude}
                            InputProps={{ readOnly: true }} />
                    </FormControl>
                </FormGroup>
            </Grid>
            <Grid item xs={6}>  
                <Box sx={{ width: '290px', height: '400px' }}>
                    <MapForm mapLocations={mapLocations} location={location} coordinate={coordinate} setCoordinate={(e) => setCoordinate(e)}></MapForm>
                </Box>
            </Grid>
            </Grid>
            </DialogContent>
            
            <DialogActions>
                    <Button onClick={() => handleClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {location ? "Update" : "Create"}
                    </Button>
            </DialogActions>
            
        </Dialog>
    );
};

export default LocationDialog;