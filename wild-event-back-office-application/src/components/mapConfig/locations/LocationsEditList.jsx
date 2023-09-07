import React, { useEffect, useState, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import LocationActionsMenu from './LocationActionsMenu';

const LocationsEditList = ({mapLocations}) => {

  const handleEditLocation = (id) => {};
  
  const handleOpenDeleteDialog = (id) => {};
  
  return  <TableContainer component={Paper}>
            <Table aria-label="simple table"> 
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>No</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {mapLocations.locations.map((location, index) => (
                            <TableRow key={location.id}>
                                <TableCell component="th" scope="row" >{index + 1}</TableCell>
                                <TableCell align="center">{location.title}</TableCell>
                                <TableCell align="center">
                                    <LocationActionsMenu
                                        onEdit={() => handleEditLocation(location.id)}
                                        onDeactivate={() => handleOpenDeleteDialog(location.id)}
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
          </TableContainer>
  ;
};

export default LocationsEditList;
