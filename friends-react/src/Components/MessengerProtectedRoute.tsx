import React, { Component, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

const  MessengerProtectedRoute: React.FC<{
    component: React.FC;
    path: string;
}> = (props) => {

    if( localStorage.getItem('token') ) {
        return (<Route  path={props.path} component={props.component} />)
    }
    else {
        return <Redirect to="/login" />
    }
};
export  default  MessengerProtectedRoute;

