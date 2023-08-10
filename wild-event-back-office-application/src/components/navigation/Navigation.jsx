import * as React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from '@mui/material/IconButton';
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import NotificationIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import Brightness4Icon from '@mui/icons-material/Brightness4';

const drawerWidth = 340

export default function Navigation() {
	const [darkMode, setDarkMode] = React.useState(false);

	const toggleDarkMode = () =>{
		setDarkMode(!darkMode);
	}

	const theme = createTheme({
		palette:{
			mode: darkMode ? "dark" : "light",
		},
	})

	const itemList = [
		{ text: "Event management", icon: <EventIcon /> },
		{ text: "My events", icon: <NotificationIcon /> },
		{ text: "Employee management", icon: <PersonIcon /> },
		{ text: "Map configuration", icon: <MapIcon /> },
	]

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position='fixed'sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
					<Toolbar>
						<Typography variant='h6' noWrap component='div'>
							Elephant APP
						</Typography>
						<IconButton color="inherit" onClick={toggleDarkMode} sx={{marginLeft: "auto"}}>
              <Brightness4Icon />
            </IconButton>
					</Toolbar>
				</AppBar>
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
									<ListItemButton>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.text} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
						<Divider />
						<List>
							<ListItemButton>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary='Logout' />
							</ListItemButton>
						</List>
					</Box>
				</Drawer>
				<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
					<Toolbar />
					<Typography paragraph>
						<main>This app is using the dark mode</main>
						List events
					</Typography>
				</Box>
			</Box>
		</ThemeProvider>
	)
}
