import React, { useState, useEffect } from "react"
import { getAllMyEvents } from "../../services/MyEventService"
import Calendar from "../../components/eventManager/calendar/Calendar"
import { useUser } from "../../services/useUser"

const MyEventList = () => {
	const [events, setEvents] = useState([])
	const [filteredEvents, setFilteredEvents] = useState([])
	const { token, user } = useUser()

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
	}, [token, user])


	return (
		<Calendar isAdmin={false} />
	)
}

export default MyEventList
