import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function RoleFilter({ allRoles, onRoleSelect }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRoleSelect = (role) => {
        if (role === "None") {
            onRoleSelect("");
        } else {
            onRoleSelect(role);
        }
        handleClose();
    };

    return (
        <div>
            <IconButton aria-label="filter" size="small" onClick={handleClick}>
                <FilterListIcon fontSize="inherit" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleClose}
            >
                <MenuItem key="none" onClick={() => handleRoleSelect("None")}>
                    None
                </MenuItem>
                {allRoles.map((role) => (
                    <MenuItem key={role.id} onClick={() => handleRoleSelect(role.name)}>
                        {role.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
