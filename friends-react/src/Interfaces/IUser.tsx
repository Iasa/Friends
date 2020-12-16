import React from "react";
import IUserInfo from "./IUserInfo";

interface IUser {
    user : IUserInfo;
    logIn:(user:IUserInfo) => void;
    logOut:() => void;
    updateUser:(updatedUser:IUserInfo) => void;
}

export default IUser;