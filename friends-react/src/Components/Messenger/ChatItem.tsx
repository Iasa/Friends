import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useContext } from "react";
import { ChatContext } from "../ChatContext";
import IChatModel from "../../Interfaces/IChatModel";


function ChatItem(props : IChatModel) {

    const chatContext = useContext(ChatContext);

    const backgroundColor = (chatContext.activeChatId === props.chatId) ? 'steelblue' : '';
    const textColor = (chatContext.activeChatId === props.chatId) ? 'white' : '';

    return(
        <ListItem button key={props.chatId} onClick={() => { chatContext.onSelectingAChat(props.chatId, props.name);}} style={{backgroundColor:backgroundColor, color: textColor}}>
            <ListItemIcon> <AccountCircle /> </ListItemIcon>
            <ListItemText primary={props.name} />
        </ListItem>
    );
}

export default ChatItem;
