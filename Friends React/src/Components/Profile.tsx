import React, { useEffect, useState } from 'react'
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
           <h1>{user.username}</h1>
            <h2>{user.email}</h2>
        </div>
    );
}

export default Profile;