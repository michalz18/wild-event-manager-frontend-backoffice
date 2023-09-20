import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserActionsMenu = ({ onEdit, onDeactivate }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div>
      <MoreVertIcon onClick={(event) => setAnchorEl(event.currentTarget)} style={{ cursor: 'pointer' }} />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          setAnchorEl(null);
          onEdit();
        }}>Edit</MenuItem>
        <MenuItem onClick={() => {
          setAnchorEl(null);
          onDeactivate();
        }}>Deactivate</MenuItem>
      </Menu>
    </div>
  );
}

export default UserActionsMenu;
