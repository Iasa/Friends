import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useContext } from "react";
import { ChatContext } from "../ChatContext";
import IChatModel from "../../Interfaces/IChatModel";
import AnnouncementIcon from '@material-ui/icons/Announcement';


function ChatItem(props : IChatModel) {

    const chatContext = useContext(ChatContext);

    const backgroundColor = (chatContext.activeChatId === props.chatId) ? 'steelblue' : 
        chatContext.unreadChats.includes(props.chatId) ? '#fffa67' : '';
    const unread = chatContext.unreadChats.includes(props.chatId) ? true : false;
    const textColor = (chatContext.activeChatId === props.chatId) ? 'white' : '';

    return(
        <ListItem button key={props.chatId} onClick={() => { chatContext.onSelectingAChat(props.chatId, props.name);}} style={{backgroundColor:backgroundColor, color: textColor}}>
            <ListItemIcon> <AccountCircle /> </ListItemIcon>
            <ListItemText primary={props.name} />
            
            {
            unread ? 
                <ListItemSecondaryAction>
                    <AnnouncementIcon color="error"/>
                </ListItemSecondaryAction>
            : "" 
            }
            
        </ListItem>
    );
}

export default ChatItem;
