import React, { useState, useEffect } from "react"
import { Paper, Typography } from "@mui/material"

export const WelcomeWindow = ({ userId }) => {
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		// fetchUserData(userId).then((data) => setUserData(data));
		// stałe dane
		const sampleUserData = {
			firstName: "Artur",
			lastName: "Pokora",
		}
		setUserData(sampleUserData)
	}, [userId])

	return (
		<Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
			<Typography variant='h5' gutterBottom>
				Welcome,{" "}
				{userData ? `${userData.firstName} ${userData.lastName}` : "User"}
			</Typography>
			<Typography variant='body1'>
				Thank you for using our app. Enjoy your experience!
			</Typography>
		</Paper>
	)
}
