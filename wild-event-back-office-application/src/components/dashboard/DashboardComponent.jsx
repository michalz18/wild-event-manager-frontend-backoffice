import { useNavigate } from "react-router-dom";
import itemList from "./DashboardElements";

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

import LogoutIcon from "@mui/icons-material/Logout"

export const DashboardComponent = () => {
	const drawerWidth = 340

	const navigate = useNavigate()

	const handleItemClick = (path) => {
    navigate(path);
};

	const handleLogoutClick = () => {
		navigate("/logout")
	}

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
					{itemList.map((item) => (
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
	)
}
