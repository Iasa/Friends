import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../ChatContext";
import Message from "./Message";

const MessageList : React.FC = () =>{

    const chatContext = useContext(ChatContext);
    const userContext = useContext(UserContext);
    //const messagesFromContext : Message[] = chatContext.chatMessages;
    const [connection, setConnection] = useState<HubConnection>();
    const [messageList, setMessageList] = useState([] as Message[]);

    useEffect(() => {
      const newConnection = new HubConnectionBuilder()
          .withUrl('https://localhost:44329/api/Message/messages')
          .withAutomaticReconnect()
          .build();
      setConnection(newConnection);
    }, []);


    useEffect(() => {
      if (connection) {
        connection.start()
          .then(result => {
            //console.log("connected");
            connection.on("SendMessageToClients", message => {
              setMessageList(messageList => [...messageList, message]);
            });
          })
          .catch(e => console.log("connection failed: ", e));
      }
    }, [connection]);

   useEffect(() => {
     setMessageList(chatContext.chatMessages);
   }, [chatContext]);
    

    // useEffect(() => {
    //   console.log("message list use effect " + chatContext.activeChatId  + " " + chatContext.chatMessages);
    //     hubConnection.HubConnection.on("SendMessageToClients", message => {       
    //       console.log("message.chatId and context.chatId on receiving and localState " + (message as Message).chatId);
    //       messageList.push(message);
    //       console.log("message list " + messageList);
    //       setDate(new Date());
    //       // if((message as Message).chatId == chatId){
    //       //   //addMessageToList(messageList =>[...messageList, message as Message]);
    //       //   messageList.push(...message);
    //       //   //updateState(state+1);
    //       // }
    //     }); 
        
    //   }, []);

 
   
    return (
        <div>
         <ListItem button>see older messeges </ListItem>
        {messageList.map((message) => 
          <ListItem>
             <ListItemText
              style={{ 
                marginLeft:  message.senderId == userContext.user.id ? '60%' : '', 
                backgroundColor: message.senderId == userContext.user.id ? 'lightsteelblue' : '#d5d5d5',
                maxWidth: '40%', borderRadius:5, padding:5 }}
              primary={
                <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                  >
                    {message.senderName}
                  </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    color="textPrimary"
                  >
                    {message.content}
                  </Typography>
                </React.Fragment>
              }
              />
          </ListItem>
        )} 
        </div>
    );

}

export default MessageList;