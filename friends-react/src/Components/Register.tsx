import React from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import IUser from '../IUser';
import Grid from '@material-ui/core/Grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {addUser} from '../Services/UserServices';
//import {createStyles, makeStyles, Theme } from '@material-ui/core/styles'


function Register() {

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required").min(3, "First Name is too short").max(50, "Last Name is too long"),
        lastName: yup.string().required("Last Name is required").min(3, "Last Name is too short").max(50, "Last Name is too long"),
        email: yup.string().email("Enter a valid email").required("Email is required"),
        username: yup.string().required("Username is required").min(3, "Username is too short").max(50, "Username is too long"),
        password: yup.string().required("Password is required").min(3, "Password is too short").max(50, "Password is too long"),
        birthDate: yup.string().required("Select your birth date")
    });

    const {register, handleSubmit, errors} = useForm<IUser>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data : IUser) => {
        console.log(data);
        const request = await addUser(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                name = "firstName"
                                variant = "outlined"
                                fullWidth
                                label = "First Name"
                                autoFocus
                                inputRef = { register() }
                                helperText = {errors.firstName ? errors.firstName.message : ""}
                                error = {errors.firstName ? true : false}
                            />
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                name = "lastName"
                                variant = "outlined"
                                fullWidth
                                label = "Last Name"
                                inputRef = { register() }
                                helperText = {errors.lastName ? errors.lastName?.message : ""}
                                error = {errors.lastName ? true : false }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name = "birthDate"
                                type = "date"
                                fullWidth
                                label = "Birth Date"
                                defaultValue = "2020-05-24"
                                variant = "outlined"
                                inputRef = { register }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name = "email"
                                variant = "outlined"
                                fullWidth
                                label = "Email"
                                inputRef = { register }
                                helperText = {errors.email ? errors.email.message : ""}
                                error = {errors.email ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name = "username"
                                variant = "outlined"
                                fullWidth
                                label = "Username"
                                inputRef = { register }
                                helperText = {errors.username ? errors.username.message : ""}
                                error = {errors.username ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name = "password"
                                variant = "outlined"
                                type = "password"
                                fullWidth
                                label = "Password"
                                inputRef = { register }
                                helperText = {errors.password ? errors.password.message : ""}
                                error = {errors.password ? true : false}
                            />
                        </Grid>
                        <Button 
                            type = "submit"
                            variant = "contained"
                            fullWidth
                            color = "primary"
                        >
                            Register
                        </Button>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Register;