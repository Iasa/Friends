import React from "react";
import { Redirect, Route } from "react-router-dom";

const  LoginRoute: React.FC<{
    component: React.FC;
    path: string;
}> = (props) => {

    if( !localStorage.getItem('token') ) {
        console.log("login route no token ");
        return (<Route  path={props.path} component={props.component} />)
    }
    else {
        console.log("login route token ");
        return ( <Redirect to="/messenger" /> );
    }
}; 

export default LoginRoute;