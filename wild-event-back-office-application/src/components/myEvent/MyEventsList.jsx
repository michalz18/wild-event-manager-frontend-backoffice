import React, { useState, useEffect } from "react"
import {
	Container,
	Box,
	List,
	ListItem,
	ListItemText,
	TextField,
} from "@mui/material"
import { getAllMyEvents } from "../../services/MyEventService"
import { useMediaQuery } from "react-responsive"
import Calendar from "../../components/eventManager/calendar/Calendar"
import { UserProvider } from "../../services/useUser"

const MyEventList = () => {
	const [events, setEvents] = useState([])
	const [filteredEvents, setFilteredEvents] = useState([])
	const isPhone = useMediaQuery({ maxWidth: 600 })
	const { token, user } = UserProvider()

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const data = await getAllMyEvents(user.id, token)
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

	const handleDateFilterChange = event => {
		const filterValue = event.target.value
		const filtered = events.filter(event =>
			event.start.toLowerCase().includes(filterValue.toLowerCase())
		)
		setFilteredEvents(filtered)
	}

	return (
		<Container maxWidth='lg' sx={{ mt: { xs: 2, sm: 3, md: 10 } }}>
			<Box>
				{isPhone ? (
					<List>
						{filteredEvents.map(event => (
							<ListItem key={event.id}>
								<ListItemText
									primary={event.title}
									secondary={`Start: ${event.start} - End: ${event.end}`}
								/>
							</ListItem>
						))}
					</List>
				) : (
					<Calendar isAdmin={false} />
				)}
			</Box>
			{!isPhone && (
				<Box mt={2}>
					<TextField
						label='Filter by Date'
						variant='outlined'
						fullWidth
						onChange={handleDateFilterChange}
					/>
				</Box>
			)}
		</Container>
	)
}

export default MyEventList
