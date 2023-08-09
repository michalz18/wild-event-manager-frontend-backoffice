import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditButton from '../../buttons/EditButton';
import RemoveButton from '../../buttons/RemoveButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Box, IconButton, Menu, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';



function createData(name, email, phone, locations, role) {
    return { name, email, phone, locations, role };
}

const rows = [
    createData('John Doe', 'john.doe@example.com', 123456789, ['New York', 'Los Angeles'], 'Manager'),
    createData('Jane Smith', 'jane.smith@example.com', 234567890, ['Chicago'], 'Employee'),
    createData('James Johnson', 'james.johnson@example.com', 345678901, ['Houston', 'Miami'], 'Director'),
    createData('Emily Davis', 'emily.davis@example.com', 456789012, ['Phoenix', 'San Francisco'], 'Employee'),
    createData('Michael Miller', 'michael.miller@example.com', 567890123, ['Jacksonville', 'Indianapolis'], 'Manager'),
    createData('Sarah Wilson', 'sarah.wilson@example.com', 678901234, ['Columbus'], 'Director'),
    createData('David Taylor', 'david.taylor@example.com', 789012345, ['Austin', 'Detroit'], 'Manager'),
    createData('Robert Moore', 'robert.moore@example.com', 890123456, ['Memphis', 'Seattle'], 'Employee'),
    createData('Laura Thompson', 'laura.thompson@example.com', 901234567, ['Denver', 'Boston'], 'Manager'),
    createData('Charles Harris', 'charles.harris@example.com', 123456789, ['Nashville', 'Las Vegas'], 'Employee'),
    createData('Marie Clark', 'marie.clark@example.com', 234567890, ['Baltimore'], 'Director'),
    createData('Thomas Lewis', 'thomas.lewis@example.com', 345678901, ['Portland', 'Oklahoma City'], 'Manager'),
    createData('Patricia Hall', 'patricia.hall@example.com', 456789012, ['Louisville', 'Milwaukee'], 'Employee'),
];


export default function BasicTable() {
    const [locationFilter, setLocationFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);

    

    const filteredRows = rows.filter(row => {
        return row.name.toLowerCase().includes(search.toLowerCase()) &&
                (roleFilter === 'All' || row.role === roleFilter) &&
                (locationFilter === 'All' || row.locations.includes(locationFilter));
    })

    const handleLocationFilterChange = (e) => {
        setLocationFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

     const handleRoleFilterChange = (e) => {
        setRoleFilter(e.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

     const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const uniqueLocations = Array.from(new Set(rows.flatMap(row => row.locations))).sort();


    return (
        <div>
            <TextField
                label="Search employee by name"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={{ marginBottom: 1, width: '20%' }}
            />
              <IconButton
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <FilterListIcon />
            </IconButton>
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
                        <MenuItem value="Director">Director</MenuItem>
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

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Employee</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Email</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Phone</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Locations</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Role</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Edit</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">
                                    {row.locations.length > 1 ? row.locations.join(', ') : row.locations[0]}
                                </TableCell>
                                <TableCell align="center">{row.role}</TableCell>
                                <TableCell align="center"><EditButton /></TableCell>
                                <TableCell align="center"><RemoveButton /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredRows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}