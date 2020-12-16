import { Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, List, ListItem, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import IUserInfo from "../../Interfaces/IUserInfo";
import { createGroup, getChatList, getFriends } from "../../Services/UserServices";
import { UserContext } from "../../UserContext";
import ChatItem from "./ChatItem";
import IChatModel from "../../Interfaces/IChatModel";
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import { ChatContext } from "../ChatContext";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import Message from "./Message";

function ChatList() {

    const [chats, setChats] = useState([] as IChatModel[]);
    const userContext = useContext(UserContext); 
    const chatContext = useContext(ChatContext);
    const [connection, setConnection] = useState<HubConnection>();
    const [open, setOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([userContext.user.id]);
    const [friends, setFriends] = useState([] as IUserInfo[]);
    const [groupName, setGroupName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchChats();
    }, []);

    const handleClickOpen = () => {
        getFriends(userContext.user.id).then(response => { setFriends(response as IUserInfo[]); console.log(response as IUserInfo[]) });
        setOpen(true);
    };

    const onCreatingGroup = () => {
        if(groupName.length === 0) setErrorMessage('Group name is required');
        else if(groupName.length > 50) setErrorMessage('Group name must be shorter than 50 characters');
        else if(selectedFriends.length < 3) setErrorMessage('Must select at least 2 friends');
        else {
          createGroup(groupName, selectedFriends).then(response => {
              setChats([...chats,response]);
          });
          setOpen(false);
          clearStates();
        }
    };

    const onCancel = () => {
        console.log(selectedFriends);
        setOpen(false);
        clearStates();
    }

    const clearStates = () => {
        setSelectedFriends([userContext.user.id]);
        setGroupName('');
        setErrorMessage('');
    }

    const onSelectingAFriend = (event : React.ChangeEvent<HTMLInputElement>) => {
      
        const selectedFriendId = Number(event.target.value)
  
        if(selectedFriends.includes(selectedFriendId)) {
          const newArray = selectedFriends.filter(item => item !== selectedFriendId);
          setSelectedFriends(newArray);
        } else {
          setSelectedFriends([...selectedFriends, selectedFriendId]);
        }
  
    }

    const onChangingGroupName = (event : React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    }

    const fetchChats = async () => {
        const chatList = await getChatList(userContext.user.id);
        setChats(chatList);
    }

    const userHasMoreThanTwoFriends = ():boolean => {
        let friendsCount = 0;
        for(let chat of chats) {
            if(!chat.isGroup) friendsCount +=1;
        }
        
        return friendsCount >= 2 ? true : false;
    }


//////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


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
      //chats.find(c=>c.chatId === (message as Message).chatId);
      console.log("chat message in chat list " + message);
      // if(isTheSameChat((message as Message))) {
      //   setMessageList(messageList => [...messageList, message]);
      // }
    });
  }
}, [connection]);




/////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


    return( 
    <> 
    {chats.length === 0 ? <p>No friends yet</p> : ""}
        { !userHasMoreThanTwoFriends() ? "" :
            <Container>
            <Button 
                variant="contained" 
                onClick={handleClickOpen}
                startIcon={<GroupAddRoundedIcon />}
                style ={{position:'static', color:'steelblue', marginTop:20}}
            >
                Create group
            </Button>
            <Dialog open={open} onClose={onCreatingGroup} aria-labelledby="form-dialog-title" fullWidth style={{height:'75vh', overflow:'auto'}}>
              <DialogTitle id="form-dialog-title">Select friends</DialogTitle>
              <DialogContent>
                <List>
                  {friends.map(chat => {
                    return (
                        <ListItem button key={chat.id} style={{margin:-10}}>
                          <FormControlLabel
                            control={
                              <Checkbox 
                                checked={ selectedFriends.includes(chat.id) ? true : false } 
                                value = {chat.id}
                                onChange={onSelectingAFriend}  
                              />}
                            label={chat.firstName + " " + chat.lastName}
                          />
                            
                        </ListItem> )
                    } 
                  )}
                </List>
                <DialogContentText>
                  <TextField 
                    label = "Group name"
                    variant = "outlined"
                    type = "text"
                    fullWidth
                    onChange = {onChangingGroupName}
                    value = {groupName}
                    helperText = { <span>{errorMessage}</span> }
                    error = {errorMessage.length > 0 ? true : false}
                  />  
                  
                </DialogContentText>
                
              </DialogContent>
              <DialogActions>
                <Button onClick={onCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={onCreatingGroup} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        }
        <List>
           
            { chats.map(chat => 
                { 
                    const model = { chatId: chat.chatId, name: chat.name, isGroup: chat.isGroup}; 
                    return ( <ChatItem {...model}/> ) 
                }
            )}
        </List>
    </>
    );
}

export default ChatList;