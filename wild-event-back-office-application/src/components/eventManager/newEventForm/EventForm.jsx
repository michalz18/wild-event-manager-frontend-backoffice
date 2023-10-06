import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormGroup,
    FormControl,
    InputLabel,
    Button,
    TextField,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormHelperText
} from '@mui/material';
import { LocalizationProvider, DateTimePicker, } from '@mui/x-date-pickers';
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
    const [error, setError] = React.useState(null);

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const STARTS_AT = 'startsAt';
    const ENDS_AT = 'endsAt';
    const { user, token } = useUser();
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            dateRange: {
                startsAt: dayjs('2023-09-20T08:00:00').format('YYYY-MM-DDTHH:mm:ss'),
                endsAt: dayjs('2023-09-20T08:00:00').format('YYYY-MM-DDTHH:mm:ss'),
            },
            locationId: '',
            organizers: [],
            openToPublic: false,

        },
        validationSchema: basicSchema,
        onSubmit: async (values) => {
            let id = null;
            isUpdateEvent
                ? (id = await updateEvent(values, pickedEvent.id, token))
                : (id = await addEvent(values, token));
            await handleEvent(values, id);
            await handleModalClose();
            formik.resetForm()
        },
    });
    const closeModal = () => {
        handleModalClose();
        formik.resetForm();
    }
    useEffect(() => {
        formik.resetForm();
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
            formik.setFieldValue('dateRange.startsAt', dayjs(`${pickedEvent.start}T00:00:00`).format('YYYY-MM-DDTHH:mm:ss'));
            formik.setFieldValue('dateRange.endsAt', dayjs(`${pickedEvent.end}T00:00:00`).format('YYYY-MM-DDTHH:mm:ss'));
        }

        if (isTimeGridWeek) {
            formik.setFieldValue('dateRange.startsAt', dayjs(pickedEvent.start.toString().split('+')[0]).format('YYYY-MM-DDTHH:mm:ss'));
            formik.setFieldValue('dateRange.endsAt', dayjs(pickedEvent.end.toString().split('+')[0]).format('YYYY-MM-DDTHH:mm:ss'));
        }

        if (pickedEvent.allDay) {
            formik.setFieldValue('dateRange.startsAt', dayjs(`${pickedEvent.start}T00:00:00`).format('YYYY-MM-DDTHH:mm:ss'));
            formik.setFieldValue('dateRange.endsAt', dayjs(pickedEvent.start).add(1, 'day').format('YYYY-MM-DDTHH:mm:ss'));
        }
        setIsDataLoaded(true)
    }, [isUpdateEvent, isTimeGridWeek, pickedEvent, userDB]);

    const handleDateChange = (newValue, flag) => {
        const formattedValue = newValue.format('YYYY-MM-DDTHH:mm:ss');
        formik.setFieldValue(`dateRange.${flag === STARTS_AT ? 'startsAt' : 'endsAt'}`, formattedValue);
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
        isDataLoaded ? (
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
                                        minDate={today}
                                        disablePast={true}
                                        slotProps={{
                                            textField: {
                                                helperText:  formik.errors.dateRange?.startsAt 
                                            },
                                        }}
                                        spacing={0.5}
                                        defaultValue={
                                           formik.values.dateRange?.startsAt
                                        }
                                        name="dateRange.startsAt"
                                        className='dateRange.startsAt'
                                        label="Starts At"
                                        value={dayjs(formik.values.dateRange.startsAt)}
                                        onChange={(newValue) => handleDateChange(newValue, STARTS_AT)}
                                        onBlur={formik.handleBlur}
                                        error={!!formik.touched.dateRange?.startsAt && !!formik.errors.dateRange?.startsAt}
                                        onError={(newError) => setError(newError)}

                                    />

                                </LocalizationProvider>
                               
                            </FormControl>

                            <FormControl margin="normal">
                                <LocalizationProvider name="dateRange.endsAt" dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Ends At"
                                        name="dateRange.endsAt"
                                        className='dateRange.endsAt'
                                        slotProps={{
                                            textField: {
                                                helperText:  formik.errors.dateRange?.endsAt
                                            },
                                        }}
                                        disablePast={true}
                                        minDate={tomorrow}
                                        defaultValue={
                                            pickedEvent.end.trim() !== ''
                                                ? dayjs(pickedEvent.end)
                                                : dayjs(pickedEvent.start).add(1, 'day')
                                        }
                                        value={dayjs(formik.values.dateRange.endsAt)}
                                        onChange={(newValue) => handleDateChange(newValue, ENDS_AT)}
                                        onBlur={formik.handleBlur}

                                        error={!!formik.touched.dateRange?.endsAt && !!formik.errors.dateRange?.endsAt}
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
                        <Button onClick={closeModal} color="primary">
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
                        <Button onClick={closeModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={formik.handleSubmit} color="primary" type="submit">
                            Submit
                        </Button>
                    </DialogActions>
                )}

            </Dialog>
        ) : null
    );
};

export default EventForm;
