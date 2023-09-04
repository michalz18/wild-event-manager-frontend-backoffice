import { useState, useEffect } from "react";
import FullCallendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Container } from "@mui/material";
import { useNavigate, } from "react-router-dom";
import { getAllEvents, deleteEvent } from "../../../services/EventService"



const Calendar = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            const data = await getAllEvents();
            setEvents(
                data.map(eventDataFromDB => ({
                    title: eventDataFromDB.title,
                    start: eventDataFromDB.startsAt,
                    end: eventDataFromDB.endsAt,
                    id: eventDataFromDB.id

                })));
        } catch (error) {
            console.error("Error fetching events", error);
            setEvents([]);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    const handleDateClick = (selected) => {
        navigate("/add-event");
    }
    const getIdFromEventTitle = (title) => {
        const find = events.find(event => event.title === title)
        return find ? find.id : "";
    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event? ${selected.event.title}`)) {

            deleteEvent(getIdFromEventTitle(selected.event._def.title))
            selected.event.remove();
        }
    };

    return (
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
            
                    eventDrop={(info) => { console.log(info.event.id) }}

                >
                </FullCallendar>
            </Box>
        </Container>
    )
}

export default Calendar;