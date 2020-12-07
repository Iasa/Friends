import React from "react";

interface Message {
    senderId : number;
    chatId : number;
    senderName : string;
    sendingTime : Date;
    content : string;
}

export default Message;