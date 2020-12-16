import React from "react";
import { Redirect, Route } from "react-router-dom";

const  EditProfileRoute: React.FC<{
    component: React.FC;
    path: string;
}> = (props) => {

    if( localStorage.getItem('token') ) {
        return (<Route  path={props.path} component={props.component} />)
    }
    else {
        return ( <Redirect to="/login" /> );
    }
}; 

export default EditProfileRoute;