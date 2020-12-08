// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import axios from 'axios';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
 
const Messengerr: React.FC = () => {
 
  const hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44329/api/Message/messages').withAutomaticReconnect()
  .build();
    
  hubConnection.start();

 
  interface MessageProps {
    HubConnection: HubConnection
  }
 
  const Messages: React.FC<MessageProps> = (hubConnection) => {
    
    const [list, setList] = useState([] as Message[]);
    
    useEffect(() => {
        hubConnection.HubConnection.on("SendMessageToClients", message => {       
        console.log("PUSHHHH");
        setList(list =>[...list, message as Message]);

      })
    }, []);
 
    return <>{list.map((message) => <p>{message.content}</p>)}</>
  }
 

  interface Message {
    senderId:number;
    chatId:number;
    sendingTime:Date;
    content:string;
  }

  const SendMessage: React.FC = () => {
 
    const [message, setMessage] = useState({} as Message);
 
    const messageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && event.target) {
        setMessage({
            senderId : 25,
            chatId : 1,
            sendingTime : new Date(),
            content : event.target.value
        });
      }
    }
 
    const messageSubmit = (event: React.MouseEvent) => {
      if (event) {
          console.log();
        axios.post("https://localhost:44329/api/Message/messages", message); 
        setMessage({} as Message);
      }
    }
 
    return <><label>Enter your Message</label><input type="text" onChange={messageChange} value={message.content} /><button onClick={messageSubmit}>Add Message</button></>;
  
  }
 
 
  return <><SendMessage /><Messages HubConnection={hubConnection}></Messages></>
}
 
export default Messengerr;