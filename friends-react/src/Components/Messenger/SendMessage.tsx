import { IconButton, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { UserContext } from "../../UserContext";
import { ChatContext } from "../ChatContext";
import { addMessage } from "../../Services/UserServices";
import NewMessageModel from "../../NewMessageModel";

function SendMessage() {
    
    const [messageContent, setMessageContent] = useState("");
    const userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);

    const messageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            setMessageContent(event.target.value);
          }
    }

    const onSubmit = () => {
        if(chatContext.activeChatId > 0 && messageContent && messageContent.trim().length > 0) {
            const newMessage : NewMessageModel = {
                senderId : userContext.user.id,
                chatId : chatContext.activeChatId,
                sendingTime : new Date(),
                content : messageContent
            }
            addMessage(newMessage);
            setMessageContent("");
        }
    };

    return (
        <div>
            <TextField
                placeholder = "Write a message "
                variant = "outlined"
                type = "text"
                fullWidth
                InputProps={{
                    endAdornment: <IconButton onClick={onSubmit} color="primary"> <SendRoundedIcon /> </IconButton>
                }}
                size="medium"
                onChange={messageChange}
                value={messageContent}
            >

            </TextField>
        </div>
    );
}

export default SendMessage;