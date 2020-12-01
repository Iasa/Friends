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
import Messenger from './Components/Messenger';
import { getCurrentUser } from './Services/UserServices';
import IUserInfo from './IUserInfo';
import  MessengerProtectedRoute from './Components/MessengerProtectedRoute';
import LoginRoute from './LoginRoute';


function App() {

  const [user, setUser] = useState(getCurrentUser());
  //const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const logIn = (user:IUserInfo) => {
    setUser(user);
  }
  const logOut = () => {
    setUser({} as IUserInfo);
  }

  return (
    <div className="App">
      <Navbar />
    <Router>
        <Switch>
        <UserContext.Provider value={{user:user, logIn:logIn, logOut:logOut}}>
          <LoginRoute path="/login" component={Login}/>
          <Route path="/register" component={Register} />
          <MessengerProtectedRoute path="/messenger" component={Messenger} />
        </UserContext.Provider>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
