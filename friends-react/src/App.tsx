import React, { useMemo, useState } from 'react';
import './App.css';
import UsersList from './Components/UsersList';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserContext } from './UserContext';
import Messenger from './Components/Messenger/Messenger';
import { getCurrentUser } from './Services/UserServices';
import IUserInfo from './IUserInfo';
import  MessengerProtectedRoute from './Components/MessengerProtectedRoute';
import LoginRoute from './LoginRoute';
import RegisterRoute from './RegisterRoute';
import Messengerr from './Components/Experiment';


function App() {

  const [user, setUser] = useState(getCurrentUser());
  const [chatId, setId] = useState(0);
  //const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const logIn = (user:IUserInfo) => {
    setUser(user);
  }
  const logOut = () => {
    setUser({} as IUserInfo);
  }
  const setChatId = (chatId:number) => {
    setId(chatId);
  }

  return (
    <div className="App">
     {/* <Messengerr /> */}
    <UserContext.Provider value={{user:user, activeChatId:chatId, setChatId:setChatId, logIn:logIn, logOut:logOut}}>
      <Router>
        <Navbar />
        <Switch>
          <RegisterRoute path="/register" component={Register} /> 
          <LoginRoute path="/login" component={Login}/>        
          <MessengerProtectedRoute path="/messenger" component={Messenger} />
        </Switch> 
      </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;
