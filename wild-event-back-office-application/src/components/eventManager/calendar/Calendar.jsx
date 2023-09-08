import { useState, useEffect } from "react";
import FullCallendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Container } from "@mui/material";
import { getAllEvents, deleteEvent, updateDate, updateDateEvent } from "../../../services/EventService"
import dayjs from 'dayjs';
import EventForm from "../newEventForm/EventForm";



const Calendar = ({ isAdmin }) => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState({});
    const [isUpdateEvent, setIsUpdateEvent] = useState(false);
    const [pickedEvent, setPickedEvent] = useState({
        id:"",
        title: "",
        start: "",
        end:""
    });

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

    useEffect(() => {
        getEvents();
    }, []);

    const handleDateClick = (selected) => {
        setOpen(true);
        setIsUpdateEvent(false);
        setEventToUpdate(selected);

        setPickedEvent({
            id:"",
            title: "",
            start: selected.startStr,
            end:selected.endStr
        })


    }
    const handleModalClose = () => {
        setIsUpdateEvent(false)
        setOpen(false);
        setPickedEvent({
            id:"",
            title: "",
            start: "",
            end:""
     
        });
        
    }
    const getIdFromEventTitle = (title) => {
        const find = events.find(event => event.title === title)
        return find ? find.id : "";
    }

    const handleEventClick = (selected) => {
        setOpen(true)

        setEventToUpdate(selected);
        setIsUpdateEvent(true);

        setPickedEvent({
            id:selected.event.id,
            title: selected.event.title,
            start: selected.event.startStr,
            end:selected.event.endStr,
            selected:selected
        })
    
    };

    const handleDeleteEvent = (dto) =>{
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
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 3, md: 10 } }}>
                <Box >
                    <FullCallendar
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
            <EventForm open={open} handleDeleteEvent={handleDeleteEvent} handleModalClose={handleModalClose} isUpdateEvent={isUpdateEvent} pickedEvent={pickedEvent} >

            </EventForm>

        </>
    )
}

export default Calendar;