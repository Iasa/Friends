import React from "react";

interface NewMessageModel {
    senderId : number;
    chatId : number;
    sendingTime : Date;
    content : string;
}

export default NewMessageModel;