import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControl, InputLabel, Input, Button, Autocomplete, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect } from "react";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { addEvent, updateEvent } from "../../../services/EventService"
import { getLocations } from "../../../services/LocationService"
import { getUsers } from "../../../services/UserService"



const EventForm = ({ open, handleModalClose, isUpdateEvent, pickedEvent, handleDeleteEvent, onEventAdded, onEventUpdated ,defaultState}) => {
    const START_AT = 'start';
    const ENDS_AT = 'end';
    const [defaultLocation, setDefaultLocation] = useState(undefined);
    const [locationDB, setLocationDB] = useState([]);
    const [userDB, setUserDB] = useState([]);

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        dateRange: {
            startsAt: pickedEvent ? pickedEvent.start : dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
            endsAt: pickedEvent ? pickedEvent.end : dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
        },
        locationId: "",
        organizers: [],
        openToPublic: false
    });

    useEffect(() => {
        if (pickedEvent && pickedEvent.organizers && userDB) {
            setDefaultLocation(locationDB.find(el => el.title === pickedEvent.location))
            setEventData((prevData) => ({
                ...prevData,
                title: pickedEvent.title,
                description: pickedEvent.description,
                dateRange: {
                    startsAt: pickedEvent.start.includes("T")
                        ? dayjs(pickedEvent.start)
                        : dayjs(`${pickedEvent.start}T00:00`),
                    endsAt: pickedEvent.end.includes("T")
                        ? dayjs(pickedEvent.end)
                        : dayjs(`${pickedEvent.end}T00:00`),
                },
                locationId: locationDB
                    .filter(location => location.title === pickedEvent.location)
                    .map(location => location.id)
                    .filter(id => id !== null).toString(),
                organizers: pickedEvent.organizers.map((organizerName) => {
                    const user = userDB.find((user) => user.name === organizerName);
                    return user ? user.id : null;
                }).filter((id) => id !== null),
            }));
        }
    }, [pickedEvent, userDB]);

    const getPickedLocationID = () => {
        return locationDB
            .filter(location => location.title === pickedEvent.location)
            .map(location => location.id)
            .filter(id => id !== null).toString()
    }
    const getPickedLocationTitle = () => {
        return locationDB
            .filter(location => location.title === pickedEvent.location)
            .map(location => location.title)
            .filter(id => id !== null).toString()
    }
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

    const handleSubmit = async (event, eventAlreadyExist) => {
        event.preventDefault();
        if (new Date(eventData.dateRange.startsAt) < new Date(eventData.dateRange.endsAt)) {
            let id = null;
            if (eventAlreadyExist) {
                id = await updateEvent(eventData, pickedEvent.id);
            } else {
                id = await addEvent(eventData);

            }
            const formattedStart = dayjs(eventData.dateRange.startsAt).format("YYYY-MM-DDTHH:mm:ss");
            const formattedEnd = dayjs(eventData.dateRange.endsAt).format("YYYY-MM-DDTHH:mm:ss");
            setEventData((prevData) => ({
                ...prevData,
                dateRange: {
                    ...prevData.dateRange,
                    startsAt: formattedStart,
                    endsAt: formattedEnd
                }
            }));

            onEventAdded(eventData, id);
            await handleModalClose();


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
        console.log(event)
    };

    const getNameFromId = (selected) => {
        const selectedNames = selected.map(id => {
            const user = userDB.find(user => user.id === id);
            return user ? user.name : "";
        });
        return selectedNames.join(", ");
    }

    const getTitleFromId = (selected) => {
        const location = locationDB.find(location => location.id === eventData.locationId);
        return location ? location.name : "";

    }
    console.log(eventData.locationId)
    return (
        <Dialog fullWidth open={open}  >
            <DialogTitle>{isUpdateEvent ? "Event details" : "Add New Event"}</DialogTitle>
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
                                defaultValue={pickedEvent.start.includes("T") ? dayjs(pickedEvent.start) : dayjs(`${pickedEvent.start}T00:00`)}
                                label="Start at"
                                value={eventData.dateRange.startAt}
                                onChange={(newValue) => handleDateChange(newValue, START_AT)} />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl margin="normal">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Ends at"
                                defaultValue={pickedEvent.end.includes("T") ? dayjs(pickedEvent.end) : dayjs(`${pickedEvent.end}T00:00`)}

                                value={eventData.dateRange.endAt}
                                onChange={(newValue) => handleDateChange(newValue, ENDS_AT)} />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl margin="normal">
                        <Autocomplete
                            value={defaultState}

                            disablePortal
                            options={locationDB}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField {...params} label="Locations" />}
                            onChange={(event, value) => setEventData((prevData) => ({
                                ...prevData,
                                locationId: value ? value.id : null
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
                    {/* <FormControl margin="normal">
                        <InputLabel>Locations</InputLabel>
                        <Select
                            value={eventData.locationId}
                            renderValue={getTitleFromId}

                            onChange={(event) => {
                                const selectedLocationId = event.target.value;
                                setEventData((prevData) => ({
                                    ...prevData,
                                    locationId: selectedLocationId || null
                                }));
                            }}
                        >
                            {locationDB.map((location, index) => (
                                <MenuItem key={index} value={location.id}>
                                    {location.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}


                    <FormControl margin="normal" >
                        <FormControlLabel control={<Checkbox onChange={(event) => setEventData((prevData) => ({
                            ...prevData,
                            openToPublic: !eventData.openToPublic
                        }))} />}
                            label="available for everyone? " />
                    </FormControl>
                </FormGroup>
            </DialogContent>

            {isUpdateEvent ? (
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(event) => handleSubmit(event, true)} color="primary">
                        Update
                    </Button>
                    <Button onClick={() => handleDeleteEvent(pickedEvent)} color="error">
                        Delete
                    </Button>
                </DialogActions>
            ) : <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={(event) => handleSubmit(event, false)} color="primary">
                    Submit
                </Button>
            </DialogActions>}


        </Dialog>
    );
};

export default EventForm;
