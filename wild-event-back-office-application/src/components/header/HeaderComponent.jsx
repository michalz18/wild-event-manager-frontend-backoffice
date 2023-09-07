import { Box, AppBar, CssBaseline, Toolbar, Typography, IconButton} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useDarkMode } from "../../components/darkMode/DarkModeProvider";

export const HeaderComponent = () => {
	const { darkMode, toggleDarkMode } = useDarkMode();

  return (
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
        </Box>
  )
}