import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../ChatContext";
import Message from "./Message";
import { getChatMessages } from "../../Services/UserServices";

const numberOfMessagesPerPage = 10;

const MessageList : React.FC<{chatId:number}> = (currentChatIdd) =>{
  
  const chatContext = useContext(ChatContext);
  const userContext = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [connection, setConnection] = useState<HubConnection>();
  const [messageList, setMessageList] = useState([] as Message[]);
  const [currentChatId, setCurrentChatId] = useState(0);

  useEffect(() => {
    const response = getChatMessages(chatContext.activeChatId, pageNumber);
    response.then(mess => {
        console.log("number of messeges received " + (mess as Message[]).length + " pageNumber: " + pageNumber);
        
        setHasMore((mess as Message[]).length === numberOfMessagesPerPage);
        if(pageNumber !== 1) {
            const newMessageList = messageList;
            newMessageList.unshift(...mess);
            setMessageList([...newMessageList]);
            console.log(messageList);
        }
    });
  }, [pageNumber]);

    useEffect(() => {
      const newConnection = new HubConnectionBuilder()
          .withUrl('https://localhost:44329/api/Message/messages')
          .withAutomaticReconnect()
          .build();
      setConnection(newConnection);
    }, [chatContext.activeChatId]);

    useEffect(() => {
      if (connection) {
        connection.start();
        connection.on("SendMessageToClients", message => {
          
          console.log("on receiving messageChatId " + (message as Message).chatId + " contextChatId: " + currentChatIdd.chatId);
          if(isTheSameChat((message as Message))) {
           // (message as Message).chatId === currentChatIdd.chatId
            setMessageList(messageList => [...messageList, message]);
          }
        });
      }
    }, [connection]);

    function isTheSameChat(m:Message):boolean {
      console.log("isTheSameChat: messageCHat currentCHat " + m.chatId + " " + currentChatIdd.chatId);
      return m.chatId === currentChatIdd.chatId;
    }

   useEffect(() => {
    console.log("set messeges from context");
      setMessageList(chatContext.chatMessages);
      setHasMore(chatContext.chatMessages.length === numberOfMessagesPerPage);
      console.log("active chat from effect " + chatContext.activeChatId);
      setCurrentChatId(chatContext.activeChatId);
      setPageNumber(1);
      if (connection) {
        connection.stop();
        
      }
      
      
   }, [chatContext.activeChatId]);

  //  useEffect(() => {
  //   setCurrentChatId(chatContext.activeChatId);
  //  },[chatContext.activeChatId])

 
  const showMoreMessages = () => {
    if(hasMore) setPageNumber(pageNumber+1);
  }

    return (
        <div>
       
          {hasMore && <ListItem button  onClick={ showMoreMessages }>
                        <ListItemText style={{width:'100%', textAlign:'center'}}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            see older messeges
                          </Typography>
                        </ListItemText>
                      </ListItem> 
          }

          {messageList.map((message, index) => {
       
          return (
          <ListItem key={message.id}>
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
          </ListItem>)
        }
        )} 
        </div>
    );

}

export default MessageList;