import React from 'react';
import axios from 'axios';
import IUserRegisterResponse from '../IUserRegisterResponse';
import User from '../User';

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

// export const logInUser(username: string, password: string) {
//     const response = fetch("")
// }

