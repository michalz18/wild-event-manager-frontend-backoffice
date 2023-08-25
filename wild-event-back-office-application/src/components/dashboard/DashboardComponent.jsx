import { useNavigate } from "react-router-dom";

import { Drawer, Box, Toolbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import NotificationIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";

export const DashboardComponent = () => {
	const drawerWidth = 340

	const itemList = [
		{ text: "Event management", icon: <EventIcon /> },
		{ text: "My events", icon: <NotificationIcon /> },
		{ text: "Employee management", icon: <PersonIcon /> },
		{ text: "Map configuration", icon: <MapIcon /> },
	]

  const navigate = useNavigate() ;

	const handleMyEventsClick = () =>{
		navigate("/my-events/event")
	}

  const handleLogoutClick = () => {
    navigate("/logout");
  };

 	return (
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
					{itemList.map((item, index) => (
						<ListItem key={item.text} disablePadding>
							<ListItemButton onClick={handleMyEventsClick}>
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
	)
}
