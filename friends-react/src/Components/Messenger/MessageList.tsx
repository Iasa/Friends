import { HubConnection } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import Message from "./Message";

const MessageList : React.FC<{HubConnection: HubConnection}> = (hubConnection:{HubConnection: HubConnection}) =>{

    const [messageList, addMessageToList] = useState([] as Message[]);

    useEffect(() => {
        hubConnection.HubConnection.on("SendMessageToClients", message => {       
          //console.log("PUSHHHH");
          addMessageToList(messageList =>[...messageList, message as Message]);
        })
      }, []);
   
    return (
        <div>
        {messageList.map((message) => <p>{message.content}</p>)} 
        </div>
    );

}

export default MessageList;