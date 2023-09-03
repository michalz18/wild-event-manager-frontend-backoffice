import React, { useState, useEffect } from "react"
import { Box, Paper, Typography } from "@mui/material"

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
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				backgroundColor: "#f0f5fa",
			}}>
			<Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
				<Typography variant='h5' gutterBottom>
					Welcome,{" "}
					{userData ? `${userData.firstName} ${userData.lastName}` : "User"}
				</Typography>
				<Typography variant='body1'>
					Thank you for using our app. Enjoy your experience!
				</Typography>
			</Paper>
		</Box>
	)
}
