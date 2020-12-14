import { List } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getChatList } from "../../Services/UserServices";
import { UserContext } from "../../UserContext";
import ChatItem from "./ChatItem";
import ChatModel from "./ChatModel";
import CreateGroup from "./CreateGroup";

function ChatList() {

    const [chats, setChats] = useState([] as ChatModel[]);
    const userContext = useContext(UserContext); 

    useEffect(() => {
        fetchChats();
    }, []);

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

    return(
        <List>
           { userHasMoreThanTwoFriends() ? <CreateGroup chatList={chats}/> : "" }
            { chats.map(chat => 
                { 
                    const model = { chatId: chat.chatId, name: chat.name, isGroup: chat.isGroup}; 
                    return ( <ChatItem {...model}/> ) 
                }
            )}
        </List>
    );
}

export default ChatList;