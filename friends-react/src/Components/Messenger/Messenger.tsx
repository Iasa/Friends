import { AppBar, Container, createStyles, Divider, Drawer, Grid, IconButton, Link, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, makeStyles, Paper, Theme, Toolbar, Typography, useTheme } from "@material-ui/core";
import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import ChatList from "./ChatList";
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
     

  return (
    <Container style={{marginTop: theme.spacing(3), width: "130vh"}}>
      <Grid container >
        <Grid item xs={4}>
          <Paper style={{height: "75vh", overflow: 'auto'}}>
            <ChatList />
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
              <MessageList HubConnection={hubConnection}/>
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