import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControl, InputLabel, Input, Button, Autocomplete, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { addEvent } from "../../../services/EventService"
import { getLocations } from "../../../services/LocationService"
import { getUsers } from "../../../services/UserService"



const EventForm = ({ open, handleModalClose }) => {
    const START_AT = 'start';
    const ENDS_AT = 'end';
    const navigate = useNavigate();
    const [locationDB, setLocationDB] = useState([]);
    const [userDB, setUserDB] = useState([]);

    const getAllUsers = async () => {
        try {
            const data = await getUsers();
            setUserDB(
                data.map(userData => ({
                    id: userData.id,
                    name: userData.name,
                })));
        } catch (error) {
            console.error("Error fetching users", error);
            setUserDB([]);
        }
    }

    const getAllLocations = async () => {
        try {
            const data = await getLocations();
            setLocationDB(
                data.map(locationDataFromDB => ({
                    id: locationDataFromDB.id,
                    title: locationDataFromDB.title,
                })));
        } catch (error) {
            console.error("Error fetching locations", error);
            setLocationDB([]);
        }
    }

    useEffect(() => {
        getAllLocations();
        getAllUsers();
    }, []);

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        dateRange: {
            startsAt: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
            endsAt: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
        },
        locationId: "",
        organizers: [],
        openToPublic: false
    });

    const handleDateChange = (newValue, flag) => {
        const formattedValue = newValue.format("YYYY-MM-DDTHH:mm:ss");
        setEventData((prevData) => ({
            ...prevData,
            dateRange: {
                ...prevData.dateRange,
                [flag === START_AT ? "startsAt" : "endsAt"]: formattedValue,
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (new Date(eventData.dateRange.startsAt) < new Date(eventData.dateRange.endsAt)) {
            await addEvent(eventData);
            await handleModalClose();
            // navigate("/calendar");
        } else {
            alert("Invalid dates. Make sure the start date is earlier than the end date.");
        }
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    const getNameFromId = (selected) => {
        const selectedNames = selected.map(id => {
            const user = userDB.find(user => user.id === id);
            return user ? user.name : "";
        });
        return selectedNames.join(", ");
    }

    return (
        <Dialog fullWidth open={open}  >
            <DialogTitle>Add New Event</DialogTitle>
            <DialogContent  >
                <FormGroup >
                    <FormControl margin="normal">
                        <TextField autoFocus
                            label="Event title"
                            variant="outlined"
                            name="title"
                            value={eventData.title}

                            onChange={handleInputChange} />
                    </FormControl>
                    <FormControl margin="normal" >
                        <TextField
                            label="Description"

                            variant="outlined"
                            name="description"
                            value={eventData.description}
                            multiline rows={3}
                            onChange={handleInputChange} />
                    </FormControl>
                    <FormControl margin="normal">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker spacing={0.5}
                                label="Start at"
                                value={eventData.dateRange.startAt}
                                onChange={(newValue) => handleDateChange(newValue, START_AT)} />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl margin="normal">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Ends at"
                                value={eventData.dateRange.endAt}
                                onChange={(newValue) => handleDateChange(newValue, ENDS_AT)} />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl margin="normal">
                        <Autocomplete
                            disablePortal
                            options={locationDB}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField {...params} label="Locations" />}
                            onChange={(event, value) => setEventData((prevData) => ({
                                ...prevData,
                                locationId: value.id
                            }))}
                        />
                    </FormControl>
                    <FormControl margin="normal">
                        <InputLabel>Select Users</InputLabel>
                        <Select
                            label="Select Users"
                            multiple
                            value={eventData.organizers}
                            name="organizers"
                            onChange={handleInputChange}
                            renderValue={getNameFromId}
                        >
                            {userDB.map((user, index) => (
                                <MenuItem key={index} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" >
                        <FormControlLabel control={<Checkbox onChange={(event) => setEventData((prevData) => ({
                            ...prevData,
                            openToPublic: !eventData.openToPublic
                        }))} />}
                            label="available for everyone? " />
                    </FormControl>
                </FormGroup>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventForm;
