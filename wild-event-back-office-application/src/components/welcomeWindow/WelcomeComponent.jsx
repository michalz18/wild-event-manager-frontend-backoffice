import React from "react"
import { Paper, Typography } from "@mui/material"

export const WelcomeWindow = ({ userId }) => {
	const loggedUser = JSON.parse(sessionStorage.getItem('user'));

	return (
		<Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
			<Typography variant='h5' gutterBottom>
				Welcome, {loggedUser.name}
			</Typography>
			<Typography variant='body1'>
				Thank you for using our app. Enjoy your experience!
			</Typography>
		</Paper>
	)
}
