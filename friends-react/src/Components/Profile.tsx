import React, { useEffect, useState } from 'react';
import {getUserById} from '../Services/UserServices';

function Profile(props : { id : number }) {
    const [user, setUser] = useState(Object);

    useEffect(() =>  {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const user = await getUserById(props.id);
        setUser(user);
    }

    return(
        <div>
            <h3>Username: {user.username}</h3>
            <h3>Password: {user.email}</h3>
        </div>
    );
}


export default Profile;