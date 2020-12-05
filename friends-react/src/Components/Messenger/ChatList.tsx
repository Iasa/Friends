import { List } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getChatList } from "../../Services/UserServices";
import { UserContext } from "../../UserContext";
import ChatItem from "./ChatItem";
import ChatModel from "./ChatModel";

function ChatList() {

    const [chats, setChats] = useState([{} as ChatModel]);
    const userContext = useContext(UserContext);

    

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        const chatList = await getChatList(userContext.user.id);
        setChats(chatList);
    }

    return(
        <List>
            { chats.map(chat => 
                { 
                    const model = { chatId: chat.chatId, name: chat.name  }; 
                    return ( <ChatItem {...model}/> ) 
                }
            )}
        </List>
    );
}

export default ChatList;