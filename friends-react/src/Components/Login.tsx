import React, { useContext, useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import IUserRegisterModel from '../IUserRegisterModel';
import Grid from '@material-ui/core/Grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {checkIfUsernameExists, checkPassword, logInUser} from '../Services/UserServices';
import {createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import UserLogInModel from '../UserLogInModel';
import { red } from '@material-ui/core/colors';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';


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
    worngPassword: {
        alignItems: 'center',
        color: 'red',
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    smallText: {
        fontFamily: "Corbel",
        fontSize: 14
    }
}))

function Login(props : any) {

    const [passwordIsWrong, setPasswordIsWrong] = useState(false);
    const [username, setUsername] = useState('');

    const classes = useStyles();

    const userContext = useContext(UserContext);

    // type UserLogInModel = {
    //     username : string,
    //     password : string
    // }

    const validationSchema = yup.object().shape({
        username: yup.string().required("Username is required")
        .test(
            'checkUsername',
            'No user with such username exists',
            value => checkIfUsernameExists(value as string).then(response => {return response.data})
        ),
        password: yup.string().required("Password is required")
        .test(
            'checkPassword',
            'Wrong password',
            value => checkPassword(username, (value as string)).then(response => { return response })      
        ),
    });

    const {register, handleSubmit, errors} = useForm<UserLogInModel>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data : UserLogInModel) => {
        //checkPassword(data.username, data.password);
        logInUser(data).then(response => {
            if( response.isSucces )  {
                userContext.logIn(response.user);
            }
        });
    };

    const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            
            <div className={classes.container}>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                name = "username"
                                variant = "outlined"
                                fullWidth
                                label = "Username"
                                value = {username}
                                onChange = {changeUsername}
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
                            color = "secondary"
                            className = {classes.button}
                        >
                            Log in
                        </Button>
                    </Grid>
                </form>
                <Typography className={classes.smallText}>
                    Don't have an account ?
                </Typography>
                    <Button 
                        variant = "contained"
                        color = "primary"
                        fullWidth
                        className={classes.button}
                        onClick={() => props.history.push('/Register')}
                    >
                        Register
                    </Button>
            </div>
        </Container>
    );
}

export default Login;