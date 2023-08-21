import { useState,  } from "react";
import FullCallendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from 'uuid';
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventForm from "../newEventForm/EventForm";


const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const navigate = useNavigate();
    const [newEvent, setNewEvent] = useState(null);


   
    const handleDateClick = (selected) => {
        navigate("/add-event");

    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event? ${selected.event.title}`)) {
            selected.event.remove();
        }
    };


    return (
    <Box margin="100px 100px 0 350px">
    
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

                editable={true}
                selectable={true}
                select={handleDateClick}
                eventClick={handleEventClick}

                selectMirror={true}
                dayMaxEvents={true}

                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                    { id: uuidv4, title: "title of event ", date: "2023-08-10" },
                    { id: uuidv4, title: "Time of event ", date: "2023-08-11" },
                    { id: uuidv4, title: "Day of event ", date: "2023-08-09" }
                ]}
            >
            </FullCallendar>

        </Box>
    </Box>
    )
}

export default Calendar;