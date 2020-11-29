import React from 'react';

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    username: string;
    password: string;
    confirmedPassword: string;
    email: string;
}

export default IUser;