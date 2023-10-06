import React, { useState, useEffect } from "react"
import { getAllMyEvents } from "../../services/MyEventService"
import Calendar from "../../components/eventManager/calendar/Calendar"
import { useUser } from "../../services/useUser"

const MyEventList = ({isMobileView}) => {
	const [events, setEvents] = useState([])
	const [filteredEvents, setFilteredEvents] = useState([])
	const { token } = useUser()

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const data = await getAllMyEvents(token)
				setEvents(data)
				setFilteredEvents(data)
			} catch (error) {
				console.error("Error fetching events", error)
				setEvents([])
				setFilteredEvents([])
			}
		}
		fetchEvents()
	}, [token])


	return (
		isMobileView ? <Calendar isAdmin={false} isMobileView={true}/> : <Calendar isAdmin={false} />
	)
}

export default MyEventList
