import React from 'react';

export const getUserById = async (id:number) => {
    // const response = await fetch(`https://localhost:44329/api/User/${id}`, {
    //     method : "GET",
    //     headers: {
    //         "Content-Type": "text/plain; charset=UTF-8",
    //         "Access-Control-Allow-Origin": "*"
    //     }
    // });
    
    // const user = response.ok ? await response.json() : { };

    // return user;

    //return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()).catch(res => {alert("erroooooor" + res)});
    return fetch(`https://localhost:44329/api/User/${id}`).then(res => res.json()).catch(res => {alert("erroooooor" + res)});
}

