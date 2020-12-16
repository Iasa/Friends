import React, { useState } from 'react';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar'
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { UserContext } from './UserContext';
import Messenger from './Components/Messenger/Messenger';
import { getCurrentUser } from './Services/UserServices';
import IUserInfo from './Interfaces/IUserInfo';
import MessengerProtectedRoute from './Routes/MessengerProtectedRoute';
import LoginRoute from './Routes/LoginRoute';
import RegisterRoute from './Routes/RegisterRoute';
import AddFriends from './Components/AddFriends';
import AddFriendsRoute from './Routes/AddFriendsRoute';
import EditProfile from './Components/EditProfile';
import ProfilePageRoute from './Routes/ProfilePageRoute';
import ProfilePage from './Components/ProfilePage';
import EditProfileRoute from './Routes/EditProfileRoute';
import backgroundImage from './backgroundImage.jpg'

function App() {

  const [user, setUser] = useState(getCurrentUser());
  const logIn = (user:IUserInfo) => {
    setUser(user);
  }
  const logOut = () => {
    setUser({} as IUserInfo);
  }
  const updateUser = (updatedUser : IUserInfo) => {
    setUser(updatedUser);
  }

  return (
    <div className="App" style={{background:`url(${backgroundImage})`, backgroundPosition: 'center',
    backgroundSize: '15%'}}>
    <UserContext.Provider value={{user:user, logIn:logIn, logOut:logOut, updateUser:updateUser}}>
      
        <Router>
          <Navbar />
          <Switch>
            <RegisterRoute path="/register" component={Register} /> 
            <LoginRoute path="/login" component={Login}/>  
            <AddFriendsRoute path="/addfriends" component={AddFriends}/>   
            <ProfilePageRoute path="/profilepage" component={ProfilePage} />
            <EditProfileRoute path="/editprofile" component={EditProfile} />
            <MessengerProtectedRoute path="/messenger" component={Messenger} />
          </Switch> 
        </Router>
      
    </UserContext.Provider>
    </div>
  );
}

export default App;
