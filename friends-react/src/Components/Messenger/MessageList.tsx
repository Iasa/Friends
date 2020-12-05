import { HubConnection } from "@microsoft/signalr";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../ChatContext";
import Message from "./Message";

const MessageList : React.FC<{HubConnection: HubConnection}> = (hubConnection:{HubConnection: HubConnection}) =>{

    const chatContext = useContext(ChatContext);
    //const [messageList, addMessageToList] = useState([] as Message[]);
    const [messageList, addMessageToList] = useState(chatContext.chatMessages);
    const userContext = useContext(UserContext);
    

    useEffect(() => {
        hubConnection.HubConnection.on("SendMessageToClients", message => {       
          console.log("message chat Id and context chatId " + (message as Message).chatId + " " + chatContext.activeChatId);
          if((message as Message).chatId == chatContext.activeChatId){

            addMessageToList(messageList =>[...messageList, message as Message]);
          }
        })
      }, []);
   
    return (
        <div>
        {messageList.map((message) => <p>{message.content}</p>)} 
        </div>
    );

}

export default MessageList;