import { Link } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function Messenger() {

    const userContext = useContext(UserContext);

    return (
        <div>
            Messenger
            
            <br></br>
            Id: {userContext.user.id}
            <br></br>
            Username: {userContext.user.username}
            <br></br>
            Email : {userContext.user.email}
        </div>
    );
}

export default Messenger;