import { ResponsiveLayout } from "../layout/ResponsiveLayout"
import { Box } from "@mui/material"

export const MyEventPage = () => {
	return (
		<>
			<ResponsiveLayout />
			<Box marginTop={10} textAlign='center'>
				My events list
			</Box>
		</>
	)
}
