import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ColorButtons() {
  return (
      <Button variant="outlined" color="error">
        <DeleteIcon />
      </Button>
  );
}