import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, TextField, FormHelperText } from '@mui/material';
import { useUser } from '../../../services/useUser';
import { updateUser } from '../../../services/EmployeeManagement';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name should be at least 3 characters long')
        .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters and spaces')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    phone: Yup.string()
        .matches(/^[\d]{9}$/, 'Phone number must have exactly 9 digits')
        .required('Required'),
    roleIds: Yup.array()
        .min(1, 'At least one role must be assigned')
        .required('Required'),
    locationIds: Yup.array()
        .min(1, 'At least one location must be assigned')
        .required('Required'),
});

const EditEmployeeDialog = ({ open, handleClose, allRoles, allLocations, userToEdit }) => {
    const { token } = useUser();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            roleIds: [],
            locationIds: [],
        },
        validationSchema,
        onSubmit: async (values) => {
            await updateUser(userToEdit.id, values, token);
            handleClose(false, values);
        },
    });

    useEffect(() => {
        if (userToEdit) {
            const roleIds = userToEdit.roles.map(role =>
                allRoles.find(r => r.name === role)?.id || ''
            );
            const locationIds = userToEdit.locations.map(location =>
                allLocations.find(l => l.title === location)?.id || ''
            );
            formik.setValues({
                ...userToEdit,
                roleIds,  
                locationIds,  
            });
        }
    }, [userToEdit]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit selected employee</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Name and Surname"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...formik.getFieldProps('name')}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...formik.getFieldProps('phone')}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <FormControl fullWidth margin="normal" variant="outlined" error={formik.touched.roleIds && Boolean(formik.errors.roleIds)}>
                        <InputLabel>Roles</InputLabel>
                        <Select
                            multiple
                            name="roleIds"
                            {...formik.getFieldProps('roleIds')}
                        >
                            {allRoles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.roleIds && <FormHelperText>{formik.errors.roleIds}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined" error={formik.touched.locationIds && Boolean(formik.errors.locationIds)}>
                        <InputLabel>Locations</InputLabel>
                        <Select
                            multiple
                            name="locationIds"
                            {...formik.getFieldProps('locationIds')}
                        >
                            {allLocations.map((location) => (
                                <MenuItem key={location.id} value={location.id}>
                                    {location.title}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.locationIds && <FormHelperText>{formik.errors.locationIds}</FormHelperText>}
                    </FormControl>
                    <DialogActions>
                        <Button onClick={() => handleClose(true, null)} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditEmployeeDialog;
