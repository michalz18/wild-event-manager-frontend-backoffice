import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import {
	Drawer,
	Box,
	Toolbar,
	List,
	Divider,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material"

import LogoutIcon from "@mui/icons-material/Logout";
import itemList from "./DashboardElements";
import { MenuAppBar } from "../menuAppBar/MenuAppBar";
import { HeaderComponent } from "../header/HeaderComponent";

export const DashboardComponent = () => {
	const drawerWidth = 340

	const isPhone = useMediaQuery({ maxWidth: 767 })

	const navigate = useNavigate()

	const handleItemClick = path => {
		navigate(path)
	}

	const handleLogoutClick = () => {
		navigate("/logout")
	}

	return (
		<>
			{isPhone ? (
				<MenuAppBar />
			) : (
				<HeaderComponent /> &&
				<Drawer
					variant='permanent'
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}>
					<Toolbar />
					<Box sx={{ overflow: "auto" }}>
						<List>
							{itemList.map(item => (
								<ListItem key={item.text} disablePadding>
									<ListItemButton onClick={() => handleItemClick(item.path)}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.text} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
						<Divider />
						<List>
							<ListItemButton onClick={handleLogoutClick}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary='Logout' />
							</ListItemButton>
						</List>
					</Box>
				</Drawer>
			)}
		</>
	)
}
