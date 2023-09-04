import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function LocationFilter({ allLocations, onLocationSelect }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLocationSelect = (location) => {
        if (location === "None") {
            onLocationSelect("");
        } else {
            onLocationSelect(location);
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
                open={anchorEl}
                onClose={handleClose}
            >
                <MenuItem key="none" onClick={() => handleLocationSelect("None")}>
                    None
                </MenuItem>
                {allLocations.map((location) => (
                    <MenuItem key={location.id} onClick={() => handleLocationSelect(location.title)}>
                        {location.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
