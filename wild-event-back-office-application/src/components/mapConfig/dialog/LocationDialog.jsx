import React, { useState, useEffect } from 'react';
import {FormGroup, FormControl, Button, TextField} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { submitLocation } from '../../../services/LocationService';

const LocationDialog = ({ open, location, handleClose, mapCoordinates }) => {
    const [locationData, setLocationData] = useState(
        {
            id:null,
            title:"",
            description: "",
            longitude: 0,
            latitude: 0
        }
    )

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
                longitude: mapCoordinates.mapLatitude,
                latitude: mapCoordinates.mapLongitude
            })
        }
    }, [open]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLocationData({
            ...locationData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        await submitLocation(locationData);
        await handleClose();
    }

    return (
        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>{location ? "Location details" : "Add new location"}</DialogTitle>
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
                            label="Longitude"
                            variant="outlined"
                            type="number"
                            name="longitude"
                            value={locationData.longitude}
                            onChange={handleInputChange} />
                    </FormControl>
                    <FormControl margin="normal">
                        <TextField autoFocus
                            label="Latitude"
                            variant="outlined"
                            type="number"
                            name="latitude"
                            value={locationData.latitude}
                            onChange={handleInputChange} />
                    </FormControl>
                </FormGroup>
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