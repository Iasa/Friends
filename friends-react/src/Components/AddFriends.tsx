import { Button, Container, Grid, IconButton, TextField } from '@material-ui/core';
import React from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';

function AddFriends() {



    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

    

return (
    <Container component="main" style={{marginTop:50}}>
        <Grid container spacing={2} >
            <Grid item xs={6} style={{position:'sticky'}}>
                 <TextField 
                    placeholder = "search"
                    variant = "outlined"
                    InputProps={{
                        endAdornment: <IconButton color="inherit"> <SearchRoundedIcon /> </IconButton>
                    }}
                 />
            </Grid>
            <Grid item xs={6} style={{position:'sticky'}}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<><ArrowUpwardRoundedIcon /> <ArrowDownwardRoundedIcon /></>}
                >
                    Age
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<><ArrowUpwardRoundedIcon /> <ArrowDownwardRoundedIcon /></>}
                >
                    FirstName
                </Button>
            </Grid>
        </Grid>
        
        <Grid container spacing={2} >
            {rows.map(row => {
                return <Grid item xs={3}>{row.lastName}</Grid>
            })}     
        </Grid>
        

    </Container>
);

}

export default AddFriends;