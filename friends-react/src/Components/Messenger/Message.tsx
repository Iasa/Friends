import React from "react";

interface Message {
    senderId : number;
    chatId : number;
    sendingTime : Date;
    content : string;
}

export default Message;