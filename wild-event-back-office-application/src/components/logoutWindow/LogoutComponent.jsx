import React from "react"
import { useNavigate } from "react-router-dom"

import { Box, Paper, Typography, Button } from "@mui/material"
//package logoutWindow and class LogoutComponent should be logout/logout.jsx
export const LogoutComponent = () => {
	const navigate = useNavigate()

	const handleCancelClick = () => {
		navigate(-1)
	}

  const handleLogoutClick = () =>{
    navigate("/signup")
  }

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
					Are you sure you want to logout?
				</Typography>
				<Typography variant='body1'>
					You will be logged out of the application.
				</Typography>
				<Box sx={{ marginTop: "20px" }}>
						<Button variant='outlined' color='primary' onClick={handleCancelClick}>
							Cancel
						</Button>
						<Button variant='contained' color='primary' onClick={handleLogoutClick} sx={{ marginLeft: "10px"}}>
							Logout
						</Button>
				</Box>
			</Paper>
		</Box>
	)
}
