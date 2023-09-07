import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const LocationActionsMenu = ({ onEdit, onDeactivate }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreVertIcon onClick={handleMenuOpen} style={{ cursor: 'pointer' }} />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleMenuClose();
          onEdit();
        }}>Edit</MenuItem>
        <MenuItem onClick={() => {
          handleMenuClose();
          onDeactivate();
        }}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default LocationActionsMenu;