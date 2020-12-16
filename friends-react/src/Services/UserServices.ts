import axios from 'axios';
import UserRegisterModel from '../Classes/UserRegisterModel';
import UserLogInModel from '../Classes/UserLogInModel';
import IUserInfo from '../Interfaces/IUserInfo';
import INewMessageModel from '../Interfaces/INewMessageModel';
import IUpdateUserModel from '../Interfaces/IUpdateUserModel';

export const registerUser = async (user : UserRegisterModel) => {
    return (await axios.post("https://localhost:44329/api/Account/register", user)).data;
}

export const checkIfEmailExists = async (email : string) => {
    if(email != '') return await axios.get(`https://localhost:44329/api/User/checkIfEmailExists/${email}`);
    else return { data : false }
}

export const checkIfUsernameExists = async (username : string) => {
    if(username != '') return await axios.get(`https://localhost:44329/api/User/checkIfUsernameExists/${username}`);
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

export const checkPassword = async (username: string, password: string) => {
    const result = await axios.post(`https://localhost:44329/api/Account/checkPassword?username=${username}&password=${password}`);
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
    const chatList = await axios.get(`https://localhost:44329/api/User/${userId}/chats`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    return chatList.data;
}

export const getChatMessages = async (chatId : number, pageSize: number, pageNumber = 1) => {
    const messages = await axios.get(`https://localhost:44329/api/Chat/${chatId}/messeges?pageNumber=${pageNumber}&pageSize=${pageSize}`, 
                    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    return messages.data;
}

export const addMessage = async (newMessage : INewMessageModel) => {
    const message = await axios.post("https://localhost:44329/api/Message/messages", newMessage, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
    return message.data;
}

export const getNonFriends = async (userId: number, query: string, pageNumber: number, pageSize: number, orderByFirstName: boolean = false, orderByLastName: boolean = false, 
    orderByAge: boolean = false, orderAscending: boolean = true) => {
        const users = await axios({
            method: 'GET',
            url: 'https://localhost:44329/getNonFriends',
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`},
            params: { userId : userId, query : query, pageNumber: pageNumber, pageSize: pageSize, orderByFirstName: orderByFirstName, 
                orderByLastName: orderByLastName, orderByAge: orderByAge, orderAscending: orderAscending }
        });
        return users.data;
    }

export const addFriend = async (userId: number, friendId: number) => {
    await axios({
        method: 'POST',
        url: 'https://localhost:44329/api/User/addRelation',
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`},
        params: { userId : userId, friendId: friendId }
    });
}

export const addProfileImage = async (userId: number, imageData: any) => {
    await axios.post('https://localhost:44329/api/User/addProfileImage', imageData, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`,
        "Content-type": "multipart/form-data" },
        params: { userId : userId }
    });
}

export const getProfileImage = async (userId: number) => {
    const image = await axios.get(`https://localhost:44329/api/User/${userId}/image`);
    return image.data;
}

export const updateUser = async (userId: number, user: IUpdateUserModel) => {
    const updatedUser = await axios.patch(`https://localhost:44329/api/User/${userId}/update`, user, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}` }
    });
    return updatedUser.data;
}

export const removeProfileImage = async (userId : number) => {
    await axios.delete(`https://localhost:44329/api/User/${userId}/removeProfileImage`, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}` }
    });
}

export const createGroup = async (groupName: string, usersId: number[]) => {
    const newGroup = await axios.post(`https://localhost:44329/api/Chat/createGroup/${groupName}`, usersId, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}` ,
        "Content-Type": "application/json" }
    });
    
    return newGroup.data;
}

export const getFriends = async (userId : number) => {
    const friends = await axios.get(`https://localhost:44329/api/User/${userId}/friends`, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}` }
    });

   return friends.data;
}

