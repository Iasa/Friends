using Friends.Domain;
using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Services
{
    public interface IMessageServices
    {
        void AddMessage(NewMessageDto newMessage);
        MessageDto GetLastMessage(long senderId, long chatId);
    }
}
