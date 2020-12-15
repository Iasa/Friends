import { Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { ChatContext } from '../ChatContext';
import ChatModel from './ChatModel';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import { createGroup, getFriends } from '../../Services/UserServices';
import IUserInfo from '../../IUserInfo';
import { useHistory, useLocation } from 'react-router-dom';

const CreateGroup = () => {

    const userContext = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([userContext.user.id]);
    const [friends, setFriends] = useState([] as IUserInfo[]);
    const [groupName, setGroupName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const onCreatingGroup = () => {
      if(groupName.length === 0) setErrorMessage('Group name is required');
      else if(groupName.length > 50) setErrorMessage('Group name must be shorter than 50 characters');
      else if(selectedFriends.length < 3) setErrorMessage('Must select at least 2 friends');
      else {
        createGroup(groupName, selectedFriends);
        setOpen(false);
      }
    };

    useEffect(() => {
      setSelectedFriends([userContext.user.id]);
      setGroupName('');
      setErrorMessage('');
    }, [open]);

    useEffect(() => {
      getFriends(userContext.user.id).then(response => { setFriends(response as IUserInfo[]); console.log(response as IUserInfo[]) });
    }, []);

    const onCancel = () => {
      setOpen(false);
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


    return (
        <Container>
        <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleClickOpen}
            startIcon={<GroupAddRoundedIcon />}
        >
            Create group
        </Button>
        <Dialog open={open} onClose={onCreatingGroup} aria-labelledby="form-dialog-title" fullWidth >
          <DialogTitle id="form-dialog-title">Select friends</DialogTitle>
          <DialogContent>
            <List>
              {friends.map(chat => {
                //return chat.isGroup ? "" :
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
                        <ListItemText>{}</ListItemText>
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
    );
}

export default CreateGroup;