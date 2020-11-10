using Friends.Domain;
using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends
{
    public interface IMessageRepository
    {
        Message CreateMessage(CreateMessageDto newMessage);
        IEnumerable<Message> GetMessagesFromChat(long chatId);
        void EditMessage(long messageId);
        void RemoveMessage(long messageId);
    }
}
