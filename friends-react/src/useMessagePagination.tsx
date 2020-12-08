import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'inspector';
import Message from './Components/Messenger/Message';
import { getChatMessages } from './Services/UserServices';

const numberOfMessagesPerPage = 10;

export default function useMessagePagination(chatId:number, pageNumber:number) {

    
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [messages, setMessageList] = useState([] as Message[]);
    const [hasMore, setHasMore] = useState(true);


   useEffect(() => {
       setMessageList([]);

   }, [chatId]);

    useEffect(() => {
        //setLoading(true);
        //setError(false);

        const response = getChatMessages(chatId, pageNumber);
        response.then(mess => {
           // console.log("number of messeges received " + (mess as Message[]).length);
            
            setHasMore((mess as Message[]).length === numberOfMessagesPerPage);
            if(pageNumber === 1) {
                setMessageList([...mess]);
               // console.log(messages);
            } else {
                let newMessageList = messages;
                newMessageList.unshift(...mess);
                setMessageList([...newMessageList]);
                //console.log(messages);
            }
            
           
            //setHasMore((mess as Message[]).length > 0);
            //setLoading(false);
        })
        .catch(error => {
            //setError(true);
        })
    }, [chatId, pageNumber]);


    return { loading, error, messages, hasMore};

}