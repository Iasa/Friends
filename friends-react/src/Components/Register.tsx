import React from 'react';
import { Input } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import User from '../User';
//import {createStyles, makeStyles, Theme } from '@material-ui/core/styles'


function Register() {

    const {register, handleSubmit} = useForm<User>();

    const onSubmit = (data : User) => {
        console.log(data);
    } 

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>First Name</label>
                    <input name="firstName" ref={ register } />
                </div>
                <div>
                    <label>Last Name</label>
                    <input name="lastName" ref={ register } />
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Register;