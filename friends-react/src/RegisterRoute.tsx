import React from "react";
import { Redirect, Route } from "react-router-dom";

const RegisterRoute: React.FC<{
    component: React.FC;
    path: string;
}> = (props) => {

    if( !localStorage.getItem('token') ) {
        console.log("register route no token ");
        return ( <Route path={props.path} component={props.component}/> );
    }
    else {
        console.log("register route token ");
        return ( <Redirect to="/messenger"/> );
    }

}

export default RegisterRoute;