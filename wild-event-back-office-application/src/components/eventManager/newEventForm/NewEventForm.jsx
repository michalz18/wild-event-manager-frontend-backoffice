import React from "react";
import { FormGroup, FormControl, InputLabel, Input, Button, Autocomplete, TextField } from '@mui/material';
import { Box } from '@mui/system';


const EventForm = () => {
    const movieOptions = [
        "Location1",
        "Location2",
        "L3",
        "The ",

    ];
  

    return (
        <Box >
           
                <FormGroup
                    sx={{

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin:"5% auto",
                        gap: '0.9em',
                        height: '70vh',
                        width: '50%',
                        justifyContent: 'center',
                        padding: '2rem',
                        boxShadow:'0px 0px 10px rgba(0,0,0,0.5)'

                    }}
                >
                    <FormControl>
                        <InputLabel>Event title</InputLabel>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Description</InputLabel>
                        <Input multiline="true" maxRows={5} />
                    </FormControl>
                    <FormControl>
                        <InputLabel>start at: YY-MM-DD</InputLabel>
                        <Input />
                    </FormControl>
                    <FormControl>
                    <InputLabel>start at: YY-MM-DD</InputLabel>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={movieOptions}
                            renderInput={(movieOptions) => <TextField  {...movieOptions} label="Locations" />}
                        />
                    </FormControl>
        
                    <Button  variant="contained" color="primary">
                        Submit
                    </Button>
                    <Button variant="contained" color="primary">
                        Cancel
                    </Button>
                  
                    
                </FormGroup>
          
        </Box>
    )
}

export default EventForm;
