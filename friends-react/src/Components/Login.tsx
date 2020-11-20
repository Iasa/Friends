import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import IUser from '../IUser';
import Grid from '@material-ui/core/Grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {addUser} from '../Services/UserServices';
import {createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginForm: {
        marginTop: theme.spacing(2),
        width: '100%'
    },
    submitButton: {
        marginTop: theme.spacing(2)
    }
}))

function Login() {

    const [regState, setRegState] = useState(0);

    const classes = useStyles();

    type loginFormData = {
        username : string,
        password : string
    }

    const validationSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required")
    });

    const {register, handleSubmit, errors} = useForm<loginFormData>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data : loginFormData) => {
        console.log(data);
        setRegState(5);
        //const request = await addUser(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.container}>
                <Typography component="h1" variant="h5">
                    Log in {regState}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                name = "username"
                                variant = "outlined"
                                fullWidth
                                label = "Username"
                                autoFocus
                                inputRef = { register() }
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
                            className = {classes.submitButton}
                        >
                            Log in
                        </Button>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login;