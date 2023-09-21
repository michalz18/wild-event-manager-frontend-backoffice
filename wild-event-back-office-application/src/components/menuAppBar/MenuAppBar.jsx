import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import itemList from '../dashboard/DashboardElements';
import { useUser } from "../../services/useUser";

export const MenuAppBar = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();
  const { user } = useUser();

  const handleChange = (event) => {
    // setAuth(event.target.checked);
    if (auth) {
      navigate('/logout');  // Jeśli jesteś zalogowany, przeniesie Cię do strony wylogowania.
    } else {
      navigate('/');  // Jeśli nie jesteś zalogowany, przeniesie Cię do strony logowania.
    }
    setAuth(event.target.checked);  // Zaktualizuj stan auth na podstawie włącznika.
  };
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [item.text]: !prevOpenItems[item.text],
    }));
    handleClose();
    navigate(item.path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WildEvent manager
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
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {itemList.map(item =>(
                  <MenuItem key={item.text} onClick={() => handleItemClick(item)}>
                    <Typography variant='"inherit'>{item.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
