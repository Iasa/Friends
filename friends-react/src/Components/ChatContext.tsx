import { createContext } from "react";
import Message from "./Messenger/Message";


export const ChatContext = createContext({
    activeChatId : 0,
    chatMessages : [] as Message[],
    unreadChats : [] as number[],
    addUnreadChats: (chatId: number) => {},
    onSelectingAChat: (selectedChatId : number, chatName : string) => {}
});