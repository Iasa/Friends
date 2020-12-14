import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, CardMedia, Container, Divider, Grid, Input, Paper, TextField, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import IUpdateUserModel from '../IUpdateUserModel';
import IUserInfo from '../IUserInfo';
import IUserRegisterModel from '../IUserRegisterModel';
import { addProfileImage, checkIfEmailExists, checkIfUsernameExists, getProfileImage, logInUser, removeProfileImage, updateUser } from '../Services/UserServices';
import { UserContext } from '../UserContext';

function EditProfile() {
    
    
    const [changePasswordState, setChangePasswordState] = useState(false);
    const [hasProfileImage, setHasProfileImage] = useState(false);
    const [profileImageChanged, setProfileImageChanged] = useState(false);
    const [profileImageTempUrl, setProfileImageTempUrl] = useState('');
    const userContext = useContext(UserContext);
    const initialBirthDate = userContext.user.birthDate.toString().substring(0, userContext.user.birthDate.toString().indexOf('T'));
    const formData = new FormData();


    const onSelectingProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event && event.target.files && event.target.files.length > 0) {
            setHasProfileImage(true);
            setProfileImageChanged(true);
            setProfileImageTempUrl(URL.createObjectURL(event.target.files[0]));
            formData.append('profileImage', event.target.files[0]);
            addProfileImage(userContext.user.id, formData);
        }
    }

    const onChoosingToChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangePasswordState(event.target.checked);
    }

    const removeProfilePicture = () => {
        setProfileImageChanged(false);
        setHasProfileImage(false);
        removeProfileImage(userContext.user.id);
    }

    const onSubmit = (data : IUpdateUserModel) => {
        console.log(data);
        console.log("form data in on submit: " + formData.get('profileImage'));
       var updatedUser = updateUser(userContext.user.id, data);
       updatedUser.then(response=> {
           console.log("from editprofile : " + (response as IUserInfo).firstName);
           userContext.updateUser((response as IUserInfo));
       })
    };

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required").min(3, "First Name is too short").max(50, "Last Name is too long"),
        lastName: yup.string().required("Last Name is required").min(3, "Last Name is too short").max(50, "Last Name is too long"),
        email: yup.string().email("Enter a valid email").required("Email is required")
        .test(
            'unique-email',
            'This email is already taken, please specify another one',
            value => (value as string) === userContext.user.email ? true : 
                checkIfEmailExists(value as string).then(response => {return !response.data})
        ),
        username: yup.string().required("Username is required").min(3, "Username is too short").max(50, "Username is too long")
        .test(
            'unique-username',
            'This username is already taken, please specify another one',
            value => (value as string) === userContext.user.username ? true :
                checkIfUsernameExists(value as string).then(response => {return !response.data})
        ),
        changePassword : yup.boolean(),
        currentPassword: yup.string()
            .when("changePassword", {
                is: value => (value as boolean) === true,
                then: yup.string().required("Current password is required")
                    .test(
                        'checkCurrentPassword',
                        'Wrong password',
                        value => logInUser({username: userContext.user.username, password: (value as string)})
                                    .then(response => { return response.isSucces; })
                    ),
                otherwise: yup.string()
            }),
        newPassword: yup.string()
            .when("changePassword", {
                is: value => (value as boolean) === true,
                then: yup.string().required("Provide a new password")
                .min(6, "Password is too short")
                .max(50, "Password is too long")
                .matches(/^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, 
                        "Password must contain at least 1 uppercase, 1 lowercase and 1 numeric character"),
                otherwise: yup.string()
            }),
        confirmedNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match'),
        birthDate: yup.string().required("Select your birth date")
    });

    const {register, handleSubmit, errors} = useForm<IUpdateUserModel>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            firstName : userContext.user.firstName,
            lastName : userContext.user.lastName,
            username : userContext.user.username,
            email : userContext.user.email,
            birthDate : initialBirthDate
        }
    });
    

    return (
        
        <Container maxWidth='sm'>
            <Grid container spacing={5} style={{marginTop:5}}>
            
                <Grid item xs={12} style={{height:'25vh', marginBottom: 20}}>
                    <Container style={{ width:'30vh'}}>
                        <div style={{height:'25vh', width:'25vh', borderRadius: '50%', overflow:'hidden', backgroundColor:'rgb(96 96 96 / 18%)'}}>
                            <img 
                            onError = {() => { setHasProfileImage(false) }}
                            onLoad = {() => { setHasProfileImage(true) } }
                            src = { profileImageChanged ? profileImageTempUrl : `${userContext.user.profileImageUrl}?${Date.now()}` } 
                            style={{height:'25vh', marginLeft:'-5%'}} 
                            hidden = {!hasProfileImage}/>
                            <Typography
                                hidden = {hasProfileImage}
                                style={{fontSize:'16vh', color: 'white'}}
                            >
                                {userContext.user.firstName[0].toUpperCase()}{userContext.user.lastName[0].toUpperCase()} 
                            </Typography>
                        </div>
                    </Container>
                </Grid>
                
                <Grid item xs={6}>
                    <Button 
                        variant="contained" 
                        component="label" 
                        fullWidth
                        style= {{backgroundColor: '#59acdd', color: 'white'}}
                    >
                        New profile image
                        <input 
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={onSelectingProfileImage}
                        hidden />
                    </Button>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: 20}}>
                    <Button 
                        variant="contained" 
                        fullWidth
                        disabled = { !hasProfileImage }
                        onClick = {removeProfilePicture}
                        style= {{backgroundColor: '#ff6c6c', color: 'white'}}
                    >
                        Remove profile image
                    </Button>
                </Grid>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{marginBottom:20}}>
                            <Typography variant="h5" style={{fontFamily:"Corbel"}}>
                                Edit personal information
                            </Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                name = "firstName"
                                variant = "outlined"
                                fullWidth
                                label = "First Name"
                                inputRef = { register }
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
                                inputRef = { register }
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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={changePasswordState}
                                    onChange={onChoosingToChangePassword}
                                    name="changePassword"
                                    color='secondary'
                                    inputRef = { register }
                                //inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label="Change password"
                        />
                        <Grid item xs={12}>
                            <TextField 
                                disabled={!changePasswordState}
                                name = "currentPassword"
                                variant = "outlined"
                                type = "password"
                                fullWidth
                                label = "Current password"
                                inputRef = { register }
                                helperText = {errors.currentPassword ? errors.currentPassword.message : ""}
                                error = {errors.currentPassword ? true : false}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                disabled={!changePasswordState}
                                name = "newPassword"
                                variant = "outlined"
                                type = "password"
                                fullWidth
                                label = "New password"
                                inputRef = { register }
                                helperText = {errors.newPassword ? errors.newPassword.message : ""}
                                error = {errors.newPassword ? true : false}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                disabled = {!changePasswordState}
                                name = "confirmedNewPassword"
                                variant = "outlined"
                                type = "password"
                                fullWidth
                                label = "Confirm new password"
                                inputRef = { register }
                                helperText = {errors.confirmedNewPassword ? errors.confirmedNewPassword.message : ""}
                                error = {errors.confirmedNewPassword ? true : false}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                                type = "submit"
                                variant = "contained"
                                fullWidth
                                style={{marginTop: 20, backgroundColor:'#59acdd', color: 'white'}}
                            >
                                Save Changes
                            </Button>

                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                                variant = "contained"
                                fullWidth
                                style={{marginTop: 20, backgroundColor: '#ff6c6c' }}
                            >
                                <Link to="/profilepage" style={{textDecoration: 'none', color:'white'}}>
                                Cancel
                                </Link>
                            </Button>
                        </Grid>
                        

                    </Grid>
                </form>
                            
            </Grid>
        </Container>
       
    );
}

export default EditProfile;