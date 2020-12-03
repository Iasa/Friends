import { AppBar, Container, createStyles, Divider, Drawer, Grid, IconButton, Link, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, makeStyles, Paper, Theme, Toolbar, Typography, useTheme } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import MailIcon from '@material-ui/icons/Mail';
import { AccountCircle } from "@material-ui/icons";
import ChatList from "./ChatList";


function Messenger() {

    const userContext = useContext(UserContext);
    const theme = useTheme();
    
    const chats = (
        <div>
          <div/>
          <List>
            {['User/Group', 'User/Group','User/Group','User/Group','User/Group','User/Group','User/Group','User/Group','User/Group','User/Group','User/Group'].map((text, index) => (
              <ListItem button key={text} >
                <ListItemIcon> <AccountCircle /> </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
        </div>
      );

      const messages = (
        <div>
          <div/>
          <List>
            {['message', 'message','message','message','message','message','message','message'].map((text, index) => (
              <ListItem button key={text} >
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
        </div>
      );

      

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
                    <AppBar style={{ position: "sticky" }}>
                        <Toolbar>
                        <Typography variant="h6" noWrap>
                            Chat Name
                        </Typography>
                        </Toolbar>
                    </AppBar>
                        <List>
                            {messages}
                        </List>
                </Paper>
                </Grid>
            </Grid>
            
        
        
        

        </Container>

        
    );
}

export default Messenger;