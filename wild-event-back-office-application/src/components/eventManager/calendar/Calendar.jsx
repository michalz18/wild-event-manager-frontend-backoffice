import { useState, useEffect, useRef } from "react";
import FullCallendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Container } from "@mui/material";
import { getAllEvents, deleteEvent, updateDateEvent } from "../../../services/EventService"
import dayjs from 'dayjs';
import EventForm from "../newEventForm/EventForm";
import { getLocations } from "../../../services/LocationService"



const Calendar = ({ isAdmin }) => {
    const [defaultState, setDefaultState] = useState({
        id: '',
        title: '',
    });
    const [events, setEvents] = useState([]);
    const [locationDB, setLocationDB] = useState([]);
    const [open, setOpen] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState({});
    const [isUpdateEvent, setIsUpdateEvent] = useState(false);
    const [pickedEvent, setPickedEvent] = useState({
        id: "",
        title: "",
        start: "",
        end: "",
        locationId: {}
    });
    const calendarRef = useRef(null);

    const getEvents = async () => {
        try {
            const data = await getAllEvents();
            setEvents(
                data.map(eventDataFromDB => {
                    const startDate = new Date(eventDataFromDB.startsAt);
                    const endDate = new Date(eventDataFromDB.endsAt);

                    const isSingleDay = isDatesDifferenceOneDay(startDate, endDate);

                    const formattedStart = isSingleDay ? eventDataFromDB.startsAt.toString().split("T")[0] : eventDataFromDB.startsAt;
                    const formattedEnd = isSingleDay ? null : endDate.toISOString();

                    return {
                        title: eventDataFromDB.title,
                        start: formattedStart,
                        end: formattedEnd,
                        id: eventDataFromDB.id,
                        description: eventDataFromDB.description,
                        location: eventDataFromDB.location,
                        organizers: eventDataFromDB.organizers
                    };
                })
            );
        } catch (error) {
            console.error("Error fetching events", error);
            setEvents([]);
        }
    };
    function isDatesDifferenceOneDay(date1, date2) {
        const oneDayMilliseconds = 24 * 60 * 60 * 1000;
        const differenceMilliseconds = Math.abs(date1 - date2);
        return differenceMilliseconds === oneDayMilliseconds;
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
        getEvents();
        getAllLocations();

    }, []);

    const handleDateClick = (selected) => {
        setOpen(true);
        setIsUpdateEvent(false);
        setEventToUpdate(selected);

        setPickedEvent({
            id: "",
            title: "",
            start: selected.startStr,
            end: selected.endStr
        })

    }
    const handleModalClose = () => {
        setIsUpdateEvent(false)
        setOpen(false);
        setPickedEvent({
            id: "",
            title: "",
            start: "",
            end: "",
            description: "",
            location: "",
            organizers: [],
            locationId: {}

        });


        setDefaultState({
            id: '',
            title: '',
        })
    }
    const getIdFromEventTitle = (title) => {
        const find = events.find(event => event.title === title)
        return find ? find.id : "";
    }
    const getEventFromSelectedField = (id) => {
        return events.find(event => event.id === id);

    }
    const handleEventClick = (selected) => {
        setOpen(true)
        setDefaultState({
            id: '29b77468-c687-4565-bf9f-0cb6c5db9183',
            title: 'Jungle Trek',
        })

        setEventToUpdate(selected);
        setIsUpdateEvent(true);
        const event = getEventFromSelectedField(selected.event.id);
        setPickedEvent({
            id: selected.event.id,
            title: selected.event.title,
            start: selected.event.startStr,
            end: selected.event.endStr,
            selected: selected,
            description: event.description,
            organizers: event.organizers,
            location: locationDB.find(location => location.title === event.location)

        })

    };

    const handleDeleteEvent = (dto) => {
        if (window.confirm(`Are you sure you want to delete the event? ${dto.title}`)) {
            deleteEvent(getIdFromEventTitle(dto.title))
            dto.selected.event.remove();
            handleModalClose();
        }
    }
    const changeDate = (id, newStart, newEnd) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === id
                    ? { ...event, start: newStart, end: newEnd }
                    : event

            )
        );
    }
    const handleDateUpdate = (info) => {
        const id = info.event._def.publicId;
        const newStart = dayjs(info.event.startStr);
        let newEnd = dayjs(info.event.endStr);
        const formattedStart = newStart.format("YYYY-MM-DDTHH:mm:ss");

        if (!newEnd.isValid()) {
            const defaultEndEvent = newStart.add(1, 'hour');
            newEnd = defaultEndEvent;
        }
        const dto = {
            id: id,
            dateRange: {
                startsAt: "",
                endsAt: ""
            },
        };

        if (info.event.allDay) {
            changeDate(id, info.event.startStr, null);

            dto.dateRange.startsAt = formattedStart;
            const endDate = newStart.add(1, 'day');
            dto.dateRange.endsAt = endDate.format("YYYY-MM-DDTHH:mm:ss");

        } else {
            const formattedEnd = newEnd.format("YYYY-MM-DDTHH:mm:ss");
            dto.dateRange.startsAt = formattedStart;
            dto.dateRange.endsAt = formattedEnd;
            changeDate(id, dto.dateRange.startsAt, dto.dateRange.endsAt);

        }
        updateDateEvent(dto);

    };


    const findEventIndexById = (events, id) => events.findIndex(event => event.id === id);

    const removeEvent = (id, calendarApi) => {
        const indexToRemove = findEventIndexById(events, id);
        if (indexToRemove !== -1) {
            calendarApi.remove(events[indexToRemove]);
        }
    }
    

    const onEventUpdated = (updatedEvent) => {
        let calendarApi = calendarRef.current.getApi();

        removeEvent(updatedEvent.id, calendarApi);


        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id
                    ? { ...event, updatedEvent }
                    : event

            )

        );
        const formattedEnd = updatedEvent.dateRange.startsAt.format("YYYY-MM-DDTHH:mm:ss");
        const formattedEnd2 = updatedEvent.dateRange.endsAt.format("YYYY-MM-DDTHH:mm:ss");

        const dtoObj = {
            id: updatedEvent.id,
            title: updatedEvent.title,
            start: formattedEnd,
            end: formattedEnd2
        }
        calendarApi.addEvent(dtoObj)

    }

    const onEventAdded = (event, id) => {
        let calendarApi = calendarRef.current.getApi();


        console.log(event)
        const formattedEnd = dayjs(event.dateRange.startsAt).format("YYYY-MM-DDTHH:mm:ss");
        const formattedEnd2 = dayjs(event.dateRange.endsAt).format("YYYY-MM-DDTHH:mm:ss");

        setEvents((prevData) => ({
            ...prevData,
            event
        }))
        const dtoObj = {
            id: id,
            title: event.title,
            start: formattedEnd,
            end: formattedEnd2
        }
        console.log()
        calendarApi.addEvent(dtoObj)
        console.log(dtoObj)


    }

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 3, md: 10 } }}>
                <Box >
                    <FullCallendar
                        ref={calendarRef}
                        timeZone="local"
                        height={window.innerWidth <= 600 ? '60vh' : '70vh'}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin
                        ]}
                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                        }}
                        initialView="dayGridMonth"
                        editable={isAdmin}
                        selectable={isAdmin}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        events={events}
                        selectMirror={isAdmin}
                        dayMaxEvents={isAdmin}

                        eventDrop={handleDateUpdate}
                        eventResize={handleDateUpdate}
                    >
                    </FullCallendar>
                </Box>
            </Container>
            <EventForm open={open} locationDB={locationDB} defaultState={defaultState} onEventUpdated={onEventUpdated} onEventAdded={onEventAdded} handleDeleteEvent={handleDeleteEvent} handleModalClose={handleModalClose} isUpdateEvent={isUpdateEvent} pickedEvent={pickedEvent} >

            </EventForm>

        </>
    )
}

export default Calendar;

