import React from "react";
import IUserInfo from "./IUserInfo";

interface IUser {
    user : IUserInfo;
    activeChatId : number;
    setChatId:(chatId:number) => void;
    logIn:(user:IUserInfo) => void;
    logOut:() => void;
}

export default IUser;