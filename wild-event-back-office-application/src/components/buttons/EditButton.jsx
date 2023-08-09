import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export default function EditButtons() {
    return (
      <Button variant="contained" color="success">
        <EditIcon />
      </Button>
    );
  }