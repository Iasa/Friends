import React from "react";
import { Redirect, Route } from "react-router-dom";

const  LoginRoute: React.FC<{
    component: React.FC;
    path: string;
}> = (props) => {

    if( !localStorage.getItem('token') ) {
        return (<Route  path={props.path} component={props.component} />)
    }
    else {
        return ( <Redirect to="/messenger" /> );
    }
}; 

export default LoginRoute;