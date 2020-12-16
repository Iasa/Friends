import { Button, Card, CardContent, CardMedia, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import IUserInfo from '../Interfaces/IUserInfo';
import { UserContext } from '../UserContext';
import { addFriend, getNonFriends } from '../Services/UserServices';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

const personsPerPage = 12;

function AddFriends() {

    type sortingModel = {
        firstName: boolean,
        lastName: boolean,
        age: boolean,
        sortAscending: boolean
    };
    
    const userContext = useContext(UserContext);
    const [people, setPeople] = useState([] as IUserInfo[]);
    const [pageNumber, setPageNumber] = useState(1);
    const [query, setQuery] = useState('');
    const [hasMore, setHasMore] = useState(false);
    const [addedFriend, setAddedFriend] = useState(false);
    const [sorting, setSorting] = useState({
        firstName: false,
        lastName: false,
        age: false,
        sortAscending: false
    } as sortingModel);

    
    useEffect(() => {
        const result = getNonFriends(userContext.user.id, query, pageNumber, personsPerPage, sorting.firstName, sorting.lastName, sorting.age, sorting.sortAscending);
       
        result.then(users => {
            setPeople([...users]);
            setHasMore((users as IUserInfo[]).length === personsPerPage); 
        });        
            
    }, [query, pageNumber, sorting, addedFriend]);

    const queryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            setTimeout(() => { 
                setQuery(event.target.value);
                setPageNumber(1);
            }, 1000);
    
            clearTimeout();
          }
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1);
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1);
    }

    const sortByFirstName = () => {
        setSorting({firstName:true, lastName:false, age:false, sortAscending:!sorting.sortAscending})
    }
    const sortByLastName = () => {
        setSorting({firstName:false, lastName:true, age:false, sortAscending:!sorting.sortAscending})
    }
    const sortByAge = () => {
        setSorting({firstName:false, lastName:false, age:true, sortAscending:!sorting.sortAscending})
    }

    const addNewFriend = async (newFriendId:number) => {
        await addFriend(userContext.user.id, newFriendId);
        setAddedFriend(!addedFriend);
    }
   
return (
    <Container component="main" style={{marginTop:50, backgroundColor:'#ffffffe8', borderRadius:5}}>
        
            <Grid container spacing={2} style={{marginBottom:20, paddingTop: 20}}>
                <Grid item xs={5}>
                    <TextField 
                        placeholder = "search"
                        variant = "outlined"
                        InputProps={{
                            endAdornment: <IconButton color="inherit"> <SearchRoundedIcon /> </IconButton>
                        }}
                        onChange={queryChange}
                    />
                </Grid>
                <Grid item xs={1} style={{}}>
                    <Typography variant="h6">
                        Sort by : 
                    </Typography>
                </Grid>
                <Grid item xs={1} style={{}}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={ 
                            sorting.age ?  
                            sorting.sortAscending ? <ArrowUpwardRoundedIcon /> : <ArrowDownwardRoundedIcon />
                            : ''
                        }
                        onClick={sortByAge}
                    >
                        Age
                    </Button>
                </Grid>
                <Grid item xs={1} style={{}}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={ 
                            sorting.firstName ?  
                            sorting.sortAscending ? <ArrowUpwardRoundedIcon /> : <ArrowDownwardRoundedIcon />
                            : ''
                        }
                        onClick={sortByFirstName}
                    >
                        FirstName
                    </Button>
                </Grid>
                <Grid item xs={2} style={{}}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={ 
                            sorting.lastName ?  
                            sorting.sortAscending ? <ArrowUpwardRoundedIcon /> : <ArrowDownwardRoundedIcon />
                            : ''
                        }
                        onClick={sortByLastName}
                    >
                        LastName
                    </Button>
                </Grid>
            </Grid>
        
            <Grid container spacing={2} >
                {people.map(person => {
                    return (
                        <Grid item xs={3} key={person.id}>
                            <Card elevation={1}>
                                <CardMedia 
                                    style={{height:0, paddingTop: '56.25%'}}
                                    image={person.profileImageUrl}
                                />
                                
                                <CardContent>
                                    <Typography>
                                        {person.firstName} {person.lastName}
                                    </Typography>
                                    <Typography>
                                        {person.birthDate.toString().substring(0, person.birthDate.toString().indexOf('T'))}
                                    </Typography>
                                    <IconButton onClick={() => { addNewFriend(person.id); }}>
                                        <PersonAddRoundedIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>)
                })}  

                <Grid container spacing={2} style={{marginTop:10}}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled = {pageNumber === 1 ? true : false}
                            onClick = {prevPage}
                            fullWidth
                        >
                            Prev
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled = {!hasMore}
                            onClick = {nextPage}
                            fullWidth
                        >
                            Next
                        </Button>
                    </Grid> 
                </Grid>  
            </Grid>

    </Container>
);

}

export default AddFriends;