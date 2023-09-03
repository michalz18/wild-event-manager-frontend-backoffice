const processResponse = async response => {
	if (!response.ok) {
		throw new Error("An error occurred while fetching data")
	}
	return await response.json()
}

const MyEventService = {
	getAllMyEvents: async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_GET_MY_EVENT}`)
			return await processResponse(response)
		} catch (error) {
			console.error("Events cannot be downloaded!")
			throw error
		}
	},
}
export default MyEventService
