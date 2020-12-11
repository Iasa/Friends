import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, CardMedia, Container, Divider, Grid, Input, TextField, Typography } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import IUserRegisterModel from '../IUserRegisterModel';
import { addProfileImage, checkIfEmailExists, checkIfUsernameExists, getProfileImage } from '../Services/UserServices';
import { UserContext } from '../UserContext';

function ProfilePage() {
    
    const [profileImageTempUrl, setprofileImageTempUrl] = useState('');
    const [cancel, setCancel] = useState(false);
    const userContext = useContext(UserContext);
    const formData = new FormData();
    const initialBirthDate = userContext.user.birthDate.toString().substring(0, userContext.user.birthDate.toString().indexOf('T'));

    const onSelectingProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event && event.target.files && event.target.files.length > 0) {
            setprofileImageTempUrl(URL.createObjectURL(event.target.files[0]));
            console.log(event.target.files[0]);
            formData.append('image', event.target.files[0]);
            addProfileImage(userContext.user.id, event.target.files[0].name, formData);
            const result = getProfileImage(userContext.user.id);
            result.then(res => {
                
                console.log("RESULT !!!!!! : " + URL.createObjectURL(res));
            });
            
        }
    }

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
    
    return (
        <Container maxWidth='sm'>
            <Grid container spacing={2} style={{marginTop:10}}>
                <Grid item xs={12} style={{height:150}}>
                    <img src="https://localhost:44329/api/User/getImage/25" alt="select an image" style={{maxHeight:150}}/>
                </Grid>
                <form >
                <Grid item xs={12}>
                    <Input 
                        type="file" 
                        inputProps={{ accept: 'image/*' }}
                        disableUnderline={true}
                        onChange={onSelectingProfileImage}
                    />
                </Grid>

                
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                name = "firstName"
                                variant = "outlined"
                                fullWidth
                                label = "First Name"
                                defaultValue = {userContext.user.firstName}
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
                                defaultValue = {userContext.user.lastName}
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
                                defaultValue = {initialBirthDate}
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
                                defaultValue = {userContext.user.email}
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
                                defaultValue = {userContext.user.username}
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
                            color = "secondary"
                            
                        >
                            Save Changes
                        </Button>
                        
                        <Divider />
                        <Typography >
                            Or
                        </Typography>
                        <Button 
                            variant = "contained"
                            color = "primary"
                            fullWidth
                            onClick={() => {setCancel(!cancel)}}
                        >
                            Cancel
                        </Button>

                    </Grid>
                </form>
                                
            </Grid>
        </Container>
    );
}

export default ProfilePage;