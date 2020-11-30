import React from 'react';
import axios from 'axios';
import User from '../User';
import UserLogInModel from '../UserLogInModel';

export const getUserById = async (id:number) => {
    const response = await fetch(`https://localhost:44329/api/User/${id}`);
    const userJson = response.ok ? await response.json() : { };
    return userJson;
}

export const getAllUsers = async () => {
    const response = await fetch("https://localhost:44329/api/User/GetAllUsers");
    const usersJson = response.ok ? await response.json() : { };
    return usersJson;
}

export const registerUser = async (user : User) => {
    return (await axios.post("https://localhost:44329/api/Account/register", user)).data;
}

export const checkIfEmailExists = async (email : string) => {
    if(email != '') return await axios.get(`https://localhost:44329/api/User/CheckIfEmailExists/${email}`);
    else return { data : false }
}

export const checkIfUsernameExists = async (username : string) => {
    if(username != '') return await axios.get(`https://localhost:44329/api/User/CheckIfUsernameExists/${username}`);
    else return { data : false }
}

export const logInUser = async (logInModel : UserLogInModel) => {
    const result = await axios.post("https://localhost:44329/api/Account/login", logInModel);
    console.log(result.data);
    return result.data;
}

