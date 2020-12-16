
interface INewMessageModel {
    senderId : number;
    chatId : number;
    sendingTime : Date;
    content : string;
}

export default INewMessageModel;