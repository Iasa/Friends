import { List } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getChatList } from "../../Services/UserServices";
import { UserContext } from "../../UserContext";
import ChatModel from "./ChatModel";

function ChatList() {

    const [chats, setChats] = useState([{} as ChatModel]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        const chatList = await getChatList(userContext.user.id);
        console.log(chatList);
        //setChats(chatList);
    }

    return(
        <div>
        
        </div>
    );
}

export default ChatList;