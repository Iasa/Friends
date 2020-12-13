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
import IUserInfo from './IUserInfo';
import MessengerProtectedRoute from './Components/MessengerProtectedRoute';
import LoginRoute from './LoginRoute';
import RegisterRoute from './RegisterRoute';
import AddFriends from './Components/AddFriends';
import AddFriendsRoute from './AddFriendsRoute';
import EditProfile from './Components/EditProfile';
import ProfilePageRoute from './ProfilePageRoute';
import ProfilePage from './Components/ProfilePage';
import EditProfileRoute from './EditProfileRoute';


function App() {

  const [user, setUser] = useState(getCurrentUser());
  const logIn = (user:IUserInfo) => {
    setUser(user);
  }
  const logOut = () => {
    setUser({} as IUserInfo);
  }

  return (
    <div className="App">
     {/* <Messengerr /> */}
    <UserContext.Provider value={{user:user, logIn:logIn, logOut:logOut}}>
      
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
