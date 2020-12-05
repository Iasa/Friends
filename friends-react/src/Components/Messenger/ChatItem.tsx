import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../ChatContext";
import ChatModel from "./ChatModel";

function ChatItem(props : ChatModel) {

    const userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);


    return(
        <ListItem button key={props.chatId} onClick={() => { chatContext.onSelectingAChat(props.chatId); console.log("context chatId on select and propschatId" + chatContext.activeChatId + " " + props.chatId);}}>
            <ListItemIcon> <AccountCircle /> </ListItemIcon>
            <ListItemText primary={props.name}/>
        </ListItem>
    );
}

export default ChatItem;
