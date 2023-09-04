import { FormControl, FormGroup } from "@mui/material";

const EventForm2 = () => {


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogContent>
                <FormGroup>

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
                </FormGroup>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose(true, null)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}