import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ setSearchTerm }) => {

  return (
    <div style={{ margin: '20px' }}>
      <TextField
        id="outlined-search"
        label="Search by name"
        type="search"
        variant="outlined"
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
