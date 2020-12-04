import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import ChatModel from "./ChatModel";

function ChatItem(props : ChatModel) {

    const userContext = useContext(UserContext);


    return(
        <ListItem button key={props.chatId} onClick={() => userContext.setChatId(props.chatId)}>
            <ListItemIcon> <AccountCircle /> </ListItemIcon>
            <ListItemText primary={props.name}/>
        </ListItem>
    );
}

export default ChatItem;
