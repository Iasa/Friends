import React from "react";

interface IUserInfo {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    username: string;
    email: string;
    profileImageUrl: string;
    token: string;
}

export default IUserInfo;