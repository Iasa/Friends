import React from 'react';

export const getUserById = async (id:number) => {
    const response = await fetch(`https://localhost:44329/api/User/${id}`);
    
    const userJson = response.ok ? await response.json() : { };

    return userJson;

    //return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()).catch(res => {alert("erroooooor" + res)});
    //return fetch(`https://localhost:44329/api/User/${id}`).then(res => res.json()).catch(res => {alert("erroooooor" + res)});
}

export const getAllUsers = async () => {
    const response = await fetch("https://localhost:44329/api/User/GetAllUsers");
    const usersJson = response.ok ? await response.json() : { };

    return usersJson;
}

