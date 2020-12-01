import React from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import IUserRegisterModel from '../IUserRegisterModel';
import Grid from '@material-ui/core/Grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { checkIfEmailExists, checkIfUsernameExists, registerUser } from '../Services/UserServices';
import {createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    regForm: {
        marginTop: theme.spacing(2),
        width: '100%'
    },
    submitButton: {
        marginTop: theme.spacing(2)
    }
}))

function Register() {

    const classes = useStyles();

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required").min(3, "First Name is too short").max(50, "Last Name is too long"),
        lastName: yup.string().required("Last Name is required").min(3, "Last Name is too short").max(50, "Last Name is too long"),
        email: yup.string().email("Enter a valid email").required("Email is required")
        .test(
            'unique-email',
            'This email is already taken, please specify another one',
            value => checkIfEmailExists(value as string).then(response => {return !response.data})
        ),
        username: yup.string().required("Username is required").min(3, "Username is too short").max(50, "Username is too long")
        .test(
            'unique-username',
            'This username is already taken, please specify another one',
            value => checkIfUsernameExists(value as string).then(response => {return !response.data})
        ),
        password: yup.string().required("Password is required").min(3, "Password is too short").max(50, "Password is too long"),
        confirmedPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        birthDate: yup.string().required("Select your birth date")
    });

    const {register, handleSubmit, errors} = useForm<IUserRegisterModel>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data : IUserRegisterModel) => {
         registerUser(data).then(response => {
             console.log(response.message);
             if(!response.isSucces) alert(response.message);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.container}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.regForm}>
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
                        <Grid item xs={12}>
                            <TextField 
                                name = "confirmedPassword"
                                variant = "outlined"
                                type = "password"
                                fullWidth
                                label = "Confirm password"
                                inputRef = { register }
                                helperText = {errors.confirmedPassword ? errors.confirmedPassword.message : ""}
                                error = {errors.confirmedPassword ? true : false}
                            />
                        </Grid>
                        <Button 
                            type = "submit"
                            variant = "contained"
                            fullWidth
                            color = "primary"
                            className = {classes.submitButton}
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