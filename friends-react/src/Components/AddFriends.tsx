import { Button, Card, CardContent, CardMedia, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import IUserInfo from '../IUserInfo';
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
        const result = getNonFriends(userContext.user.id, query, pageNumber, sorting.firstName, sorting.lastName, sorting.age, sorting.sortAscending);
        console.log("in effect")
        
        result.then(users => {
            setPeople([...users]);
            setHasMore((users as IUserInfo[]).length === personsPerPage); 
        });        
            
    }, [query, pageNumber, sorting, addedFriend]);

    const queryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            
            //console.log("query " + event.target.value);

            setTimeout(() => { 
                console.log(`I can see you're not typing. I can use now!: ` + event.target.value) 
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
    <Container component="main" style={{marginTop:50}}>
        
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField 
                        placeholder = "search"
                        variant = "outlined"
                        InputProps={{
                            endAdornment: <IconButton color="inherit"> <SearchRoundedIcon /> </IconButton>
                        }}
                        onChange={queryChange}
                    />
                </Grid>
                <Grid item xs={2} style={{}}>
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
                <Grid item xs={2} style={{}}>
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
        
            <Grid container spacing={2}>
                {people.map(person => {
                    return (
                        <Grid item xs={3} key={person.id}>
                            
                                <Card elevation={1}>
                                    <CardMedia 
                                        image="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
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

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled = {pageNumber === 1 ? true : false}
                        onClick = {prevPage}
                    >
                        Prev
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled = {!hasMore}
                        onClick = {nextPage}
                    >
                        Next
                    </Button>
                </Grid>   
            </Grid>

    </Container>
);

}

export default AddFriends;