import { Box } from "@mui/material"
import { MenuAppBar } from "../../components/menuAppBar/MenuAppBar"

export const PhoneLayout = ({ children }) => {
	return (
		<>
			<MenuAppBar />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "20px",
					width: "90%",
					margin: "0 auto",
				}}>
				{children}
			</Box>
		</>
	)
}
