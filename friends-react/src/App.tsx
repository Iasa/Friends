import React from 'react';
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


function App() {
  return (
    <div className="App">
      <Navbar />
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <UsersList />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
