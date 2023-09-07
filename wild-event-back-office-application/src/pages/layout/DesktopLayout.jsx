import { Box } from "@mui/material";
import { DashboardComponent } from "../../components/dashboard/DashboardComponent";
import { HeaderComponent } from "../../components/header/HeaderComponent";

export const DesktopLayout = ({ children, drawerWidth }) => {
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				height: "100vh",
			}}
		>
			<DashboardComponent drawerWidth={drawerWidth}/>
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: `calc(100% - ${drawerWidth}px)`,
				}}
			>
				<HeaderComponent />
				<Box
					sx={{
						width: "90%", 
					}}
				>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
