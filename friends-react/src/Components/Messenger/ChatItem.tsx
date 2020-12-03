import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import ChatModel from "./ChatModel";

function ChatItem(props : ChatModel) {
    return(
        <ListItem button key={props.chatId}>
            <ListItemIcon> <AccountCircle /> </ListItemIcon>
            <ListItemText primary={props.name}/>
        </ListItem>
    );
}

export default ChatItem;
