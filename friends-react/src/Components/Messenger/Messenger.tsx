import { AppBar, Container, createStyles, Divider, Drawer, Grid, IconButton, Link, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, makeStyles, Paper, Theme, Toolbar, Typography, useTheme } from "@material-ui/core";
import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useContext, useRef, useState } from "react";
import { getChatMessages } from "../../Services/UserServices";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../ChatContext";
import ChatList from "./ChatList";
import Message from "./Message";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";


function Messenger() {

  const userContext = useContext(UserContext);
  const theme = useTheme();
  
  const hubConnection = new HubConnectionBuilder()
  .withUrl('https://localhost:44329/api/Message/messages')
  .withAutomaticReconnect()
  .build();
  
  hubConnection.start();

  const [currentChat, setCurrentChat] = useState({activeChatId:0, chatMessages: [] as Message[]})

  const onSelectingAChat = async (chatId:number) => {    
    const messages = await getChatMessages(chatId);
    setCurrentChat({activeChatId : chatId, chatMessages : messages as Message[]});
  }
     

  return (
    <Container style={{marginTop: theme.spacing(3), width: "130vh"}}>
      <Grid container >
        <Grid item xs={4}>
          <Paper style={{height: "75vh", overflow: 'auto'}}>
            <ChatContext.Provider value={{activeChatId:currentChat.activeChatId, chatMessages:currentChat.chatMessages, onSelectingAChat:onSelectingAChat}}>
              <ChatList />
            </ChatContext.Provider>
          </Paper>
        </Grid>

        <Grid item xs={8}>
        <Paper style={{height: '75vh', overflow: 'auto'}}>
          <Paper style={{ height: '67.2vh', overflow: 'auto'}}>
            <AppBar style={{ position: "sticky" }}>
              <Toolbar>
                <Typography variant="h6" noWrap>
                    Chat Name
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
              <ChatContext.Provider value={{activeChatId:currentChat.activeChatId, chatMessages:currentChat.chatMessages, onSelectingAChat:onSelectingAChat}}>
                <MessageList HubConnection={hubConnection}/>
              </ChatContext.Provider>
            </List>
          </Paper>
          
            <SendMessage />
        </Paper>
        </Grid>
      </Grid>
    </Container>

      
  );
}

export default Messenger;