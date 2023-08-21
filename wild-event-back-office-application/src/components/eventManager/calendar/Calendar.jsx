import { useState, useEffect } from "react";
import FullCallendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { useNavigate, } from "react-router-dom";
import { getAllEvents } from "../../../services/EventService"



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

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event? ${selected.event.title}`)) {
            selected.event.remove();
        }
    };

    return <Box m="20px">
        <Box >
            <FullCallendar
                timeZone="local"
                height="70vh"
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
            >
            </FullCallendar>
        </Box>
    </Box>
    )
}

export default Calendar;