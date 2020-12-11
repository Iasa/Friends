using Friends.Core.Dtos.ChatDto;
using Friends.Core.Dtos.MessageDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Friends.Core.Services.Interfaces
{
    public interface IMessageServices
    {
        MessageDto AddMessage(NewMessageDto newMessage);
    }
}
