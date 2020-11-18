import React, { useEffect, useState } from 'react';
import {getAllUsers} from '../Services/UserServices';
import User from '../User';

function UsersList() {
    
    const [users, setUsers] = useState([{} as User]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const usersList = await getAllUsers();
        setUsers(usersList);
    }

    return (
        <div>
            {users.map(user => (
                <p><b>Username:</b> {user.username}, <b>Email:</b> {user.email}, <b>Birt Date:</b> {user.birthDate}</p>
            ))}
        </div>
    );
}

export default UsersList;