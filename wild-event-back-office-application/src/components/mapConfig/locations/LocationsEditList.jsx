import React, { useEffect, useState, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocationActionsMenu from './LocationActionsMenu';
import { Box, Button } from "@mui/material";
import LocationDialog from "../dialog/LocationDialog"
import LocationDeleteDialog from "../dialog/LocationDeleteDialog";
import MuiAlert from '@mui/material/Alert';
import { deleteLocation } from "../../../services/LocationService";
import Snackbar from '@mui/material/Snackbar';
import { useUser } from "../../../services/useUser";

const LocationsEditList = ({mapLocations, setLocations}) => {
  const { token } = useUser();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [locationUpdate, setLocationUpdate] = useState(null);
  const [locationDeleteId, setLocationDeleteId] = useState(null);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'success'
});

  const handleOpenDeleteDialog = (id) => {
    setLocationDeleteId(id)
    setDeleteDialogOpen(true)
  };

  const setUpdating = (location) => {
    setLocationUpdate(location)
    setUpdateDialogOpen(true)
  };

  const finishUpdating = () => {
    setLocationUpdate(null)
    setLocationDeleteId(null)
    setUpdateDialogOpen(false)
    setDeleteDialogOpen(false)
    setLocations()
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setSnackbarInfo(prev => ({
        ...prev,
        open: false
    }));
};

  const deleteLocationById = async () => {
    try {
        await deleteLocation(token, locationDeleteId)
        setSnackbarInfo({
            open: true,
            message: 'Location has been deleted!',
            severity: 'success'
        });
    } catch (error) {
        console.error("Could not delete location:", error)
    }
  }
  
  return <Box>
  
        <TableContainer component={Paper}>
            <Table aria-label="simple table"> 
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>No</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                        <Button variant="outlined" color="primary" size="large"
                            style={{borderRadius: '50%', height: '60px', fontSize: '32px', lineHeight: '64px'}}
                            onClick={() => setUpdateDialogOpen(true)}>+</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {mapLocations.locations.map((location, index) => (
                            <TableRow key={location.id}>
                                <TableCell component="th" scope="row" >{index + 1}</TableCell>
                                <TableCell align="center">{location.title}</TableCell>
                                <TableCell align="center">
                                    <LocationActionsMenu
                                        onEdit={() => setUpdating(location)}
                                        onDeactivate={() => handleOpenDeleteDialog(location.id)}
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
          </TableContainer>
          <LocationDialog 
                mapLocations={mapLocations}
                open={updateDialogOpen}
                location={locationUpdate}
                handleClose={() => finishUpdating()}
          />
          <LocationDeleteDialog
                open={deleteDialogOpen}
                handleClose={() => finishUpdating()}
                handleConfirm={deleteLocationById}
          />
           <Snackbar open={snackbarInfo.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbarInfo.severity} elevation={6} variant="filled">
                    {snackbarInfo.message}
                </MuiAlert>
            </Snackbar>
          </Box>
          
  ;
};

export default LocationsEditList;
