import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, CardMedia, Container, Divider, Grid, Input, TextField, Typography } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import IUserRegisterModel from '../IUserRegisterModel';
import { addProfileImage, checkIfEmailExists, checkIfUsernameExists, getProfileImage } from '../Services/UserServices';
import { UserContext } from '../UserContext';

function ProfilePage() {
    
    const userContext = useContext(UserContext);
    const birthDate = userContext.user.birthDate.toString().substring(0, userContext.user.birthDate.toString().indexOf('T'));


    
    

    return (
        <Container maxWidth='sm'>
            <Grid container spacing={2} style={{marginTop:10}}>
                <Grid item xs={4} >
                    <div style={{width: 150, height: 150, overflow: 'hidden', borderRadius: '50%'}}>
                        <img src={userContext.user.profileImageUrl} alt="" style={{width:200, marginLeft:'-10%'}}/>
                    </div>
                </Grid>
                <Grid item xs={5} >
                    <Typography variant="h5">
                        {userContext.user.firstName} {userContext.user.lastName}
                    </Typography>
                    <Typography variant="body2">
                        {birthDate} 
                    </Typography>
                    <Typography variant="body2">
                        {userContext.user.email} 
                    </Typography>
                </Grid>
                <Button 
                    variant = "contained"
                    fullWidth
                    style = {{backgroundColor: '#ff6c6c'}}
                >
                    <Link to="/editprofile" style={{textDecoration: 'none', color:'white'}}>
                    Edit Profile
                    </Link>
                </Button>              
            </Grid>
        </Container>
    );
}

export default ProfilePage;