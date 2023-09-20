import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

const RoleFilter = ({ allRoles, onRoleSelect }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleRoleSelect = (role) => {
        onRoleSelect(role === "None" ? "" : role);
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-label="filter" size="small" onClick={(event) => setAnchorEl(event.currentTarget)}>
                <FilterListIcon fontSize="inherit" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
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

export default RoleFilter;
