import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormGroup,
    FormControl,
    InputLabel,
    Input,
    Button,
    TextField,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormHelperText
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addEvent, updateEvent } from '../../../services/EventService';
import basicSchema from '../validationSchema/EventFormSchema';
import { Field, useFormik, } from 'formik';
import { useUser } from '../../../services/useUser';


const EventForm = ({
    open,
    locationDB,
    handleModalClose,
    isTimeGridWeek,
    isUpdateEvent,
    pickedEvent,
    handleDeleteEvent,
    onEventAdded,
    userDB,
    handleEvent,
}) => {
    const START_AT = 'start';
    const ENDS_AT = 'end';
    const { user, token } = useUser();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            dateRange: {
                startsAt: '',
                endsAt: '',
            },
            locationId: '',
            organizers: [],
            openToPublic: false,
        },
        validationSchema: basicSchema,
        onSubmit: async (values) => {
            console.log(values);
            let id = null;
            isUpdateEvent
                ? (id = await updateEvent(values, pickedEvent.id,token))
                : (id = await addEvent(values,token));
            await handleEvent(values, id);
            await handleModalClose();
            console.log(values)
            formik.resetForm()
        },
    });

    useEffect(() => {
        formik.resetForm()
        if (pickedEvent && pickedEvent.organizers && userDB) {
            formik.setFieldValue('title', pickedEvent.title);
            formik.setFieldValue('description', pickedEvent.description);
            formik.setFieldValue(
                'dateRange.startsAt',
                dayjs(pickedEvent.start).format('YYYY-MM-DDTHH:mm:ss')
            );
            formik.setFieldValue(
                'dateRange.endsAt',
                dayjs(pickedEvent.end).format('YYYY-MM-DDTHH:mm:ss')
            );
            formik.setFieldValue('locationId', pickedEvent.location.id);
            formik.setFieldValue(
                'organizers',
                pickedEvent.organizers.map((organizerName) => {
                    const user = userDB.find((user) => user.name === organizerName);
                    return user ? user.id : null;
                }).filter((id) => id !== null)
            );
        }

        if (!isUpdateEvent) {
            formik.setFieldValue('dateRange.startsAt', `${pickedEvent.start}T00:00:00`);
            formik.setFieldValue('dateRange.endsAt', `${pickedEvent.end}T00:00:00`);
        }

        if (isTimeGridWeek) {
            formik.setFieldValue('dateRange.startsAt', pickedEvent.start.toString().split('+')[0]);
            formik.setFieldValue('dateRange.endsAt', pickedEvent.end.toString().split('+')[0]);
        }

        if (pickedEvent.allDay) {
            formik.setFieldValue('dateRange.startsAt', `${pickedEvent.start}T00:00:00`);
            formik.setFieldValue(
                'dateRange.endsAt',
                dayjs(pickedEvent.start).add(1, 'day').format('YYYY-MM-DDTHH:mm:ss')
            );
        }
    }, [isUpdateEvent, isTimeGridWeek, pickedEvent, userDB]);

    const handleDateChange = (newValue, flag) => {
        const formattedValue = newValue.format('YYYY-MM-DDTHH:mm:ss');
        formik.setFieldValue(`dateRange.${flag === START_AT ? 'startsAt' : 'endsAt'}`, formattedValue);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);
    };

    const getNameFromId = (selected) => {
        const selectedNames = selected.map((id) => {
            const user = userDB.find((user) => user.id === id);
            return user ? user.name : '';
        });
        return selectedNames.join(', ');
    };

    return (
        <Dialog fullWidth open={open} onClose={handleModalClose}>
            <DialogTitle>{isUpdateEvent ? 'Event details' : 'Add New Event'}</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <FormControl margin="normal">
                            <TextField
                                label="Event title"
                                variant="outlined"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!formik.touched.title && !!formik.errors.title}
                                helperText={formik.touched.title && formik.errors.title}

                            />
                        </FormControl>
                        <FormControl margin="normal">
                            <TextField
                                label="Description"
                                variant="outlined"
                                name="description"
                                value={formik.values.description}
                                multiline
                                rows={3}
                                onChange={handleInputChange}
                                onBlur={formik.handleBlur}
                                error={!!formik.touched.description && !!formik.errors.description}
                                helperText={formik.touched.description && formik.errors.description}

                            />
                        </FormControl>
                        <FormControl margin="normal">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    spacing={0.5}
                                    defaultValue={
                                        pickedEvent.start.includes('T')
                                            ? dayjs(pickedEvent.start)
                                            : dayjs(`${pickedEvent.start}T00:00`)
                                    }
                                    label="Start at"
                                    value={formik.values.dateRange.startAt}
                                    onChange={(newValue) => handleDateChange(newValue, START_AT)}
                                    
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl margin="normal">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="endsAt"
                                    name={'endsAt'}
                                    defaultValue={
                                        pickedEvent.end.trim() !== ''
                                            ? dayjs(pickedEvent.end)
                                            : dayjs(pickedEvent.start).add(1, 'day')
                                    }
                                    value={formik.values.dateRange.endAt} 
                                    onChange={(newValue) => handleDateChange(newValue, ENDS_AT)}
                                    onBlur={formik.handleBlur}
                                    // error={!!formik.touched.dateRange.endsAt && !!formik.errors.dateRange.endsAt}
                                    // helperText={formik.touched.dateRange.endsAt && formik.errors.dateRange.endsAt}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl margin="normal">
                            <InputLabel>Locations</InputLabel>
                            <Select
                                label="Locations"
                                value={formik.values.locationId || ''}
                                name="locationId"
                                onChange={handleInputChange}
                                onBlur={formik.handleBlur}
                                error={!!formik.touched.locationId && !!formik.errors.locationId}
                             
                            >
                                {locationDB.map((location) => (
                                    <MenuItem key={location.id} value={location.id}>
                                        {location.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.locationId && formik.errors.locationId}</FormHelperText>

                        </FormControl>
                        <FormControl margin="normal">
                            <InputLabel>Select Users</InputLabel>
                            <Select
                                label="Select Users"
                                multiple
                                value={formik.values.organizers}
                                name="organizers"
                                onChange={handleInputChange}
                                renderValue={getNameFromId}
                                onBlur={formik.handleBlur}
                                error={!!formik.touched.organizers && !!formik.errors.organizers}
                            >
                                {userDB.map((user, index) => (
                                    <MenuItem key={index} value={user.id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.organizers && formik.errors.organizers}</FormHelperText>
                        </FormControl>
                        <FormControl margin="normal">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(event) =>
                                            formik.setFieldValue('openToPublic', !formik.values.openToPublic)
                                        }
                                       
        
                                    />
                                }
                                label="Available for everyone?"
                            />
                        </FormControl>
                    </FormGroup>
                </form>
            </DialogContent>
            {isUpdateEvent ? (
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={(event) => formik.handleSubmit(event, true)}
                        color="primary"
                        type="submit"
                    >
                        Update
                    </Button>
                    <Button onClick={() => handleDeleteEvent(pickedEvent)} color="error">
                        Delete
                    </Button>
                </DialogActions>
            ) : (
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={formik.handleSubmit} color="primary" type="submit">
                        Submit
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default EventForm;
