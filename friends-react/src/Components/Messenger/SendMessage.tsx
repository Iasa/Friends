import { IconButton, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Message from "./Message";
import axios from 'axios';
import { UserContext } from "../../UserContext";

function SendMessage() {
    
    const [messageContent, setMessageContent] = useState("");
    const userContext = useContext(UserContext);

    const messageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            setMessageContent(event.target.value);
          }
    }

    const onSubmit = () => {
        if(messageContent && messageContent.trim().length > 0) {
            const newMessage : Message = {
                senderId : userContext.user.id,
                chatId : userContext.activeChatId,
                sendingTime : new Date(),
                content : messageContent
            }    
            
            axios.post("https://localhost:44329/api/Message/messages", newMessage);
            setMessageContent("");
        } else console.log("no message");
    };

    return (
        <div>
            <form >
                <TextField
                    placeholder = "Write a message"
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
            </form>
        </div>
    );
}

export default SendMessage;