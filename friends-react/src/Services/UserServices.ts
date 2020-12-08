import React, { useContext } from 'react';
import axios from 'axios';
import UserRegisterModel from '../UserRegisterModel';
import UserLogInModel from '../UserLogInModel';
import IUserInfo from '../IUserInfo';
import { UserContext } from '../UserContext';
import Message from '../Components/Messenger/Message';
import NewMessageModel from '../NewMessageModel';

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

export const registerUser = async (user : UserRegisterModel) => {
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
    if( result.data.isSucces ) {
        let user : IUserInfo = result.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', result.data.token);
    }
    return result.data;
}

export const logOutUser = async () => {
    localStorage.clear();
}

export const getCurrentUser = () : IUserInfo => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) as IUserInfo : {} as IUserInfo;
    return user;
}

export const getChatList = async (userId : number) => {
    const chatList = await axios.get(`https://localhost:44329/chats/${userId}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    return chatList.data;
}

export const getChatMessages = async (chatId : number, pageNumber = 1) => {
    //const messages = await axios.get(`https://localhost:44329/chatmessages/${chatId}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    const messages = await axios({
                        method: 'GET',
                        url: `https://localhost:44329/chatmessages/${chatId}`,
                        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`},
                        params: { page : pageNumber }
                    })
    return messages.data;
}

export const addMessage = async (newMessage : NewMessageModel) => {
    const message = await axios.post("https://localhost:44329/api/Message/messages", newMessage, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    return message.data;
}


