import * as React from 'react';
import { Box, IconButton, Menu, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList'

export default function FilterMenu({ roleFilter, locationFilter, handleRoleFilterChange, handleLocationFilterChange, handleClick, uniqueLocations, anchorEl, handleClose }) {

    return (
        <>
            <Box sx={{ display: 'flex', marginBottom: 1 }}>
                <div style={{ flexGrow: 1 }}></div>
                <IconButton
                    aria-controls="filter-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <FilterListIcon />
                </IconButton>
            </Box>
            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <FormControl sx={{ marginBottom: 1, minWidth: 120 }}>
                    <InputLabel id="role-filter-label">Filter by Role</InputLabel>
                    <Select
                        labelId="role-filter-label"
                        id="role-filter"
                        value={roleFilter}
                        onChange={handleRoleFilterChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ marginBottom: 1, minWidth: 120 }}>
                    <InputLabel id="location-filter-label">Filter by Location</InputLabel>
                    <Select
                        labelId="location-filter-label"
                        id="location-filter"
                        value={locationFilter}
                        onChange={handleLocationFilterChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {uniqueLocations.map((location) => (
                            <MenuItem key={location} value={location}>{location}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Menu>
        </>
    );
}