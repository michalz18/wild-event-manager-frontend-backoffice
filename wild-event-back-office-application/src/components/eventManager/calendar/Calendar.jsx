import { useState, useEffect } from "react";
import FullCallendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
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
        console.log(find)
        return find ? find.id : "";
    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event? ${selected.event.title}`)) {
           console.log(`${getIdFromEventTitle(selected.event._def.title)}`)

            deleteEvent(getIdFromEventTitle(selected.event._def.title))
            selected.event.remove();
        }
    };

    return <Box marginTop={10} width={1000} marginLeft={60}>
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
                datesSet={data => ""} // PATCH new date

            >
            </FullCallendar>
        </Box>
    </Box>
}

export default Calendar;