const processResponse = async response => {
	if (!response.ok) {
		throw new Error("An error occurred while fetching data")
	}
	return await response.json()
}

export const getAllMyEvents = async (token, userId) => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_GET_MY_EVENT}?userId=${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		return await processResponse(response)
	} catch (error) {
		console.error("Events cannot be downloaded!")
		throw error
	}
}
