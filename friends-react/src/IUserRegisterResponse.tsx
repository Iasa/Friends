import React from 'react'

interface IUserRegisterResponse {
    isSucces : boolean;
    EmailIsAlreadyUsed : boolean;
    UsernameIsAlreadyUsed : boolean;
}

export default IUserRegisterResponse;