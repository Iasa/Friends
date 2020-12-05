import React, { useRef, useState } from 'react';
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
import { getChatMessages, getCurrentUser } from './Services/UserServices';
import IUserInfo from './IUserInfo';
import  MessengerProtectedRoute from './Components/MessengerProtectedRoute';
import LoginRoute from './LoginRoute';
import RegisterRoute from './RegisterRoute';
import Messengerr from './Components/Experiment';
import { ChatContext } from './Components/ChatContext';
import Message from './Components/Messenger/Message';


function App() {

  const [user, setUser] = useState(getCurrentUser());
  const logIn = (user:IUserInfo) => {
    setUser(user);
  }
  const logOut = () => {
    setUser({} as IUserInfo);
  }

  
  const currentChat = useRef({activeChatId:2, chatMessages: [] as Message[]});

  const onSelectingAChat = async (chatId:number) => {
    currentChat.current.activeChatId = chatId;
    const messages = await getChatMessages(chatId);
    currentChat.current.chatMessages = messages as Message[];
  }

  return (
    <div className="App">
     {/* <Messengerr /> */}
    <UserContext.Provider value={{user:user, logIn:logIn, logOut:logOut}}>
      <ChatContext.Provider value={{activeChatId:currentChat.current.activeChatId, chatMessages:currentChat.current.chatMessages, onSelectingAChat:onSelectingAChat}}>
        <Router>
          <Navbar />
          <Switch>
            <RegisterRoute path="/register" component={Register} /> 
            <LoginRoute path="/login" component={Login}/>        
            <MessengerProtectedRoute path="/messenger" component={Messenger} />
          </Switch> 
        </Router>
      </ChatContext.Provider>
    </UserContext.Provider>
    </div>
  );
}

export default App;
