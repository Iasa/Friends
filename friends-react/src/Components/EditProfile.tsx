import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, CardMedia, Container, Divider, Grid, Input, TextField, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import IUpdateUserModel from '../IUpdateUserModel';
import IUserRegisterModel from '../IUserRegisterModel';
import { addProfileImage, checkIfEmailExists, checkIfUsernameExists, getProfileImage, logInUser, updateUser } from '../Services/UserServices';
import { UserContext } from '../UserContext';

function EditProfile() {
    
    const [profileImageTempUrl, setprofileImageTempUrl] = useState('');
    const [changePasswordState, setChangePasswordState] = useState(false);
    const userContext = useContext(UserContext);
    const initialBirthDate = userContext.user.birthDate.toString().substring(0, userContext.user.birthDate.toString().indexOf('T'));
    const formData = new FormData();


    const onSelectingProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event && event.target.files && event.target.files.length > 0) {
            setprofileImageTempUrl(URL.createObjectURL(event.target.files[0]));
            formData.append('profileImage', event.target.files[0]);
            if(!formData.has('profileImage')) console.log("null formData")
            console.log(formData.get('profileImage'))
            // addProfileImage(userContext.user.id, formData);
        }
    }

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
        // have to check if the password is right. maybe write a .test()
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
        confirmedPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match'),
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

    const onChoosingToChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangePasswordState(event.target.checked);
    }

    const onSubmit = (data : IUpdateUserModel) => {
        data.profileImage = data.profileImage[0];
        //console.log(data.profileImage);
        updateUser(userContext.user.id, data);
        
        
    //     registerUser(data).then(response => {
    //         if(!response.isSucces) alert(response.message);
    //    });
   };
    

    return (
        <Container maxWidth='sm'>
            <Grid container spacing={2} style={{marginTop:10}}>
                <Grid item xs={12} style={{height:150}}>
                    <img src={ userContext.user.profileImageUrl == '' ? profileImageTempUrl : userContext.user.profileImageUrl } alt="select an image" style={{maxHeight:150}}/>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12}>
                    <Input 
                        type="file"
                        name="profileImage" 
                        inputRef = { register }
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
                                name = "confirmedPassword"
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