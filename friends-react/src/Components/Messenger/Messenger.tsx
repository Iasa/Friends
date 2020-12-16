import { AppBar, Container, Grid, List, Paper, Toolbar, Typography, useTheme } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { getChatMessages } from "../../Services/UserServices";
import { ChatContext } from "../ChatContext";
import ChatList from "./ChatList";
import Message from "./Message";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import { animateScroll } from "react-scroll";



function Messenger() {

  const numberOfMessagesPerPage = 15;
  const theme = useTheme();

  const [currentChat, setCurrentChat] = useState({activeChatId:0, chatMessages: [] as Message[]});
  const [unreadChats, setUnreadChats] = useState([] as number[]);
  const currentChatName = useRef("");
  
  const onSelectingAChat = async (chatId:number, chatName:string) => {
    currentChatName.current = chatName;
    const messages = await getChatMessages(chatId, numberOfMessagesPerPage);
    if(unreadChats.includes(chatId)) {
      console.log(unreadChats);
      console.log(chatId);
      const tempArray = [...unreadChats];
      tempArray.splice(tempArray.indexOf(chatId), 1);
      setUnreadChats(tempArray);
    }
    setCurrentChat({activeChatId : chatId, chatMessages : messages as Message[]});
  }

  const addUnreadChats = (chatId:number) => {
    setUnreadChats(prevState => [...prevState, chatId]);
  }
  
  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "messageListPapar"
    });
  }, [currentChat]);



  return (
    <Container style={{ marginTop: theme.spacing(3), width: "130vh"}}>
      <Grid container >
        <Grid item xs={4}>
          <Paper style={{height: "75vh", overflow: 'auto'}}>
            <ChatContext.Provider value={{activeChatId:currentChat.activeChatId, chatMessages:currentChat.chatMessages, onSelectingAChat:onSelectingAChat, unreadChats:unreadChats, addUnreadChats:addUnreadChats}}>
              <ChatList />
            </ChatContext.Provider>
          </Paper>
        </Grid>

        <Grid item xs={8}>
        <Paper style={{height: '75vh', overflow: 'auto'}}>
          <Paper id="messageListPapar" style={{ height: '67.5vh', overflow: 'auto'}}>
            <AppBar style={{ position: "sticky", backgroundColor: "steelblue"}}>
              <Toolbar>
                <Typography variant="h6" noWrap>
                    {currentChatName.current}
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
              <ChatContext.Provider value={{activeChatId:currentChat.activeChatId, chatMessages:currentChat.chatMessages, onSelectingAChat:onSelectingAChat, unreadChats:unreadChats, addUnreadChats:addUnreadChats}}>
              
                <MessageList chatId={currentChat.activeChatId}/>
               
              </ChatContext.Provider>
            </List>
          </Paper>
          <ChatContext.Provider value={{activeChatId:currentChat.activeChatId, chatMessages:currentChat.chatMessages, onSelectingAChat:onSelectingAChat, unreadChats:unreadChats, addUnreadChats:addUnreadChats}}>
            {currentChat.activeChatId !== 0 ? <SendMessage /> : ""}
          </ChatContext.Provider>
        </Paper>
        </Grid>
      </Grid>
    </Container>

      
  );
}

export default Messenger;