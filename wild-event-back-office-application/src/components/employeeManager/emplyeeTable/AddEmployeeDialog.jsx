import React, { useState } from 'react';
import { addUser } from '../../../services/EmployeeManagement';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export default function AddEmployeeDialog({ open, handleClose, allRoles, allLocations }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', roles: [], locations: [] });
  const [errors, setErrors] = useState({});


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
  let newErrors = {...errors}; 

  if (name === "name") {
    if (!value || value.length < 3 || !/^[a-zA-Z\s]+$/.test(value)) {
      newErrors.name = 'Name should be at least 3 characters long and contain only letters and spaces';
    } else {
      delete newErrors.name;
    }
  }

  if (name === "email") {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      newErrors.email = 'Invalid email format';
    } else {
      delete newErrors.email;
    }
  }

  if (name === "phone") {
    if (!/^[\d]{9}$/.test(value)) {
      newErrors.phone = 'Phone number must have exactly 9 digits';
    } else {
      delete newErrors.phone;
    }
  }

  if (name === "roles") {
    if (!value || value.length === 0) {
      newErrors.roles = 'At least one role must be assigned';
    } else {
      delete newErrors.roles;
    }
  }

  setErrors(newErrors);
};

  const handleAdd = async () => {
    if (!validateField()) return;

    const userDTO = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      roleIds: formData.roles,
      locationIds: formData.locations,
    };

    await addUser(userDTO)
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            label="Name and Surname"
            fullWidth
            margin="normal"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            error={!!errors.email}
            helperText={errors.email}
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            error={!!errors.phone}
            helperText={errors.phone}
            label="Phone"
            fullWidth
            margin="normal"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Roles</InputLabel>
            <Select
              multiple
              name="roles"
              value={formData.roles}
              onChange={handleInputChange}
            >
              {allRoles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
            {errors.roles && <FormHelperText>{errors.roles}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Locations</InputLabel>
            <Select
              multiple
              name="locations"
              value={formData.locations}
              onChange={handleInputChange}
            >
              {allLocations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  {location.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
