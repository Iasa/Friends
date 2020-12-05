import { createContext } from "react";
import Message from "./Messenger/Message";



export const ChatContext = createContext({
    activeChatId : 0,
    chatMessages : [] as Message[],
    onSelectingAChat: (selectedChatId : number) => {}
});