import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { ChatContext } from '../ChatContext';
import ChatModel from './ChatModel';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';

const CreateGroup : React.FC<{chatList: ChatModel[]}> = (props) =>{

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Select friends</DialogTitle>
          <DialogContent>
            {props.chatList.map(chat => {
                return chat.isGroup ? "" :
                    <List>
                        <ListItem button style={{margin:-10}}>
                        
                            <ListItemText>{chat.name}</ListItemText>
                        </ListItem>
                    </List>
                } 
            )}
            <DialogContentText>
                
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
}

export default CreateGroup;