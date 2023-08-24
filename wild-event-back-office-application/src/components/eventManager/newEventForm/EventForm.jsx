import React from "react";
import { FormGroup, FormControl, InputLabel, Input, Button, Autocomplete, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { addEvent } from "../../../services/EventService"
import { getLocations } from "../../../services/LocationService"
import { getUsers } from "../../../services/UserService"


const EventForm = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (new Date(eventData.dateRange.startsAt) < new Date(eventData.dateRange.endsAt)) {
            addEvent(eventData);
            navigate("/calendar");
        } else {
            alert("Invalid dates. Make sure the start date is earlier than the end date.");
        }
    }

    return (
        <Box>
            <FormGroup
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: "5% auto",
                    gap: '0.9em',
                    height: '70vh',
                    width: '50%',
                    padding: '2rem',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
                }}
            >
                <FormControl>
                    <InputLabel>Event title</InputLabel>
                    <Input onChange={(event) => setEventData((prevData) => ({
                        ...prevData,
                        title: event.target.value
                    }))} />
                </FormControl>
                <FormControl>
                    <InputLabel>Description</InputLabel>
                    <Input
                        multiline rows={3}
                        onChange={(event) => setEventData((prevData) => ({
                            ...prevData,
                            description: event.target.value
                        }))} />
                </FormControl>
                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Start at"
                            value={eventData.dateRange.startAt}
                            onChange={(newValue) => handleDateChange(newValue, START_AT)} />
                    </LocalizationProvider>
                </FormControl>
                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Ends at"
                            value={eventData.dateRange.endAt}
                            onChange={(newValue) => handleDateChange(newValue, ENDS_AT)} />
                    </LocalizationProvider>
                </FormControl>
                <FormControl>
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
                <FormControl>
                    <InputLabel>Select Users</InputLabel>
                    <Select
                        multiple
                        value={eventData.organizers}
                        onChange={(event) => setEventData((prevData) => ({
                            ...prevData,
                            organizers: event.target.value
                        }))}
                        renderValue={(selected) => {
                            const selectedNames = selected.map(id => {
                                const user = userDB.find(user => user.id === id);
                                return user ? user.name : "";
                            });
                            return selectedNames.join(", ");
                        }}
                    >
                        {userDB.map((user, index) => (
                            <MenuItem key={index} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl >
                    <FormControlLabel control={<Checkbox onChange={(event) => setEventData((prevData) => ({
                        ...prevData,
                        openToPublic: !eventData.openToPublic
                    }))} />} label="available for everyone " />
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit} type="submit">
                    Submit
                </Button>
                <Button onClick={() => navigate('/calendar')} variant="contained" color="primary">
                    Cancel
                </Button>
            </FormGroup>
        </Box>
    );
};

export default EventForm;
