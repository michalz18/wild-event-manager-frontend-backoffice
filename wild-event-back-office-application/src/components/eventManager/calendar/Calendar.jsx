import { useState } from "react";
import FullCallendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from 'uuid';
import {  Box } from "@mui/material";


const Calendar = () => {

    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected) => {
        const title = prompt("Plese enter a new tittle!");
        const callendarApi = selected.view.calendar;
        callendarApi.unselect();

        if (title) {

            callendarApi.addEvent({
                id: uuidv4(),
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
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
                
                eventsSet={(events)=> setCurrentEvents(events)}
                initialEvents={[
                    {id: uuidv4, title: "title of event " , date: "2023-08-10"},
                    {id: uuidv4, title: "Time of event " , date: "2023-08-11"},
                    {id: uuidv4, title: "Day of event " , date: "2023-08-09"}
                ]}
            >

            </FullCallendar>
        </Box>
    </Box>
    )
}

export default Calendar;