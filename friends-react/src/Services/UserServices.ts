import React from 'react';
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

export const addUser = async (user : User) => {
    const requestOptions = {
        method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
            firstName : user.firstName,
            lastName : user.lastName,
            birthDate : user.birthDate,
            username : user.username,
            email : user.email,
            password : user.password
        })
    };

    fetch("https://localhost:44329/api/User/CreateUser", requestOptions)
        .then(response => response.json())
        .catch(error => {
            alert("Errorooooooor");
        });

    return;
}

// export const logInUser(username: string, password: string) {
//     const response = fetch("")
// }

