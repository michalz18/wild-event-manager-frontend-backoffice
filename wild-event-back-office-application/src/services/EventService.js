const getAllEvents = async token => {
	try {
		const response = await fetch(`${process.env.REACT_APP_GET_EVENT}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		if (!response.ok) {
			throw new Error("Problem occured with fetching events!")
		}
		return await response.json()
	} catch (error) {
		console.error("Events cannot be downloaded!")
	}
}
const addEvent = async (eventData, token) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_ADD_EVENT}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(eventData),
		})
		if (!response.ok) {
			throw new Error("Problem occurred while adding an event!")
		}
		return await response.json()
	} catch (error) {
		console.error("Event could not be added:", error)
	}
}
const deleteEvent = async (id, token) => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_DELETE_EVENT}/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
		if (!response.ok) {
			throw new Error("Problem occurred while deleting the event!")
		}
	} catch (error) {
		console.error("Event could not be deleted:", error)
	}
}

const updateEvent = async (event, id, token) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_PATCH_EVENT}/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(event),
		})
		if (!response.ok) {
			throw new Error("Problem occurred while updating the event!")
		}
		return await response.json()
	} catch (error) {
		console.error("Event could not be updated: ", error)
	}
}

const updateDateEvent = async (eventDTO, token) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_PATCH_EVENT}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(eventDTO),
		})
		if (!response.ok) {
			throw new Error("Problem occurred while updating the event!")
		}
	} catch (error) {
		console.error("Event could not be updated: ", error)
	}
}

export { getAllEvents, addEvent, deleteEvent, updateEvent, updateDateEvent }
