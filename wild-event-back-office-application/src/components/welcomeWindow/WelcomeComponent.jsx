import React from "react"
import { Paper, Typography } from "@mui/material"
import { useUser } from "../../services/useUser"

export const WelcomeWindow = ({ userId }) => {
	const { user } = useUser(); 

	return (
		<Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
			<Typography variant='h5' gutterBottom>
				Welcome, {user.name}
			</Typography>
			<Typography variant='body1'>
				Thank you for using our app. Enjoy your experience!
			</Typography>
		</Paper>
	)
}
