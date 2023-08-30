import React, { useEffect, useState } from 'react';
import { getAllActiveUsers, getAllLocations, deactivateUser } from '../../../services/EmployeeManagement';
import { getAllRoles } from '../../../services/Roles';
import { useNavigate } from 'react-router-dom';
import AddEmployeeDialog from './AddEmployeeDialog';
import UserActionsMenu from './UserActionsMenu';
import RoleFilter from './RoleFilter';
import SearchBar from './SearchBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';

export default function EmployeeTable() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [allLocations, setAllLocations] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAllActiveUsers();
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user => {
            return user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedRole === "" || user.roles.includes(selectedRole)) &&
                (selectedRole === "" || user.locations.includes(selectedLocation))
        });
        setFilteredUsers(filtered);
    }, [searchTerm, users, selectedRole, selectedLocation]);


    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await getAllRoles();
            setAllRoles(roles);
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
          const locations = await getAllLocations();
          setAllLocations(locations);
        };
      
        fetchLocations();
      }, []);

    const handleDeactivateUser = async (userId) => {
        try {
            await deactivateUser(userId)
            const fetchedUsers = await getAllActiveUsers();
            setUsers(fetchedUsers);
            setFilteredUsers(fetchedUsers);
        } catch (error) {
            console.error("Could not deactivate user:", error)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddEmployeeForm = (event) => {
        event.preventDefault()
        navigate("/staff-management/staff/add-employee")
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Employee</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Email</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Phone</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                Location
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '8px' }}>Role</span>
                                    <RoleFilter allRoles={allRoles} onRoleSelect={setSelectedRole} />
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredUsers
                        ).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.phone}</TableCell>
                                <TableCell align="center">
                                    {Array.isArray(user.locations) ? user.locations.join(', ') : user.locations}
                                </TableCell>
                                <TableCell align="center">
                                    {Array.isArray(user.roles) ? user.roles.join(', ') : user.roles}
                                </TableCell>
                                <TableCell align="center">
                                    <UserActionsMenu
                                        onEdit={() => {
                                            // Kod do edycji użytkownika
                                        }}
                                        onRemove={() => handleDeactivateUser(user.id)}
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={7}
                                count={users.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Employee
      </Button>
      <AddEmployeeDialog open={open} handleClose={handleClose} allRoles={allRoles} allLocations={allLocations} />
        </div>
    );
}

