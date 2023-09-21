import {
	Box,
	AppBar,
	CssBaseline,
	Toolbar,
	Typography,
	IconButton,
} from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import { useDarkMode } from "../../components/darkMode/DarkModeProvider"
import { useUser } from "../../services/useUser"

export const HeaderComponent = () => {
	const { darkMode, toggleDarkMode } = useDarkMode()
	const { user } = useUser()

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						Wild Event Manager
					</Typography>
					<Typography
						variant='h6'
						sx={{
							flexGrow: 1,
							textAlign: "center",
							textTransform: "uppercase",
						}}>
						{user.name}
					</Typography>
					<IconButton
						color='inherit'
						onClick={toggleDarkMode}
						sx={{ marginLeft: "auto" }}>
						<Brightness4Icon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
