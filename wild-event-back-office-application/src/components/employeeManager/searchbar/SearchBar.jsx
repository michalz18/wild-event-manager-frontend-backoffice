import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }) => {
    
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div style={{ margin: '20px' }}>
      <TextField
        id="outlined-search"
        label="Search by name"
        type="search"
        variant="outlined"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
