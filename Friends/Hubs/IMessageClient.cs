using Friends.Core.Dtos.MessageDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.API.Hubs
{
    public interface IMessageClient
    {
        Task SendMessageToClients(MessageDto newMessage);
    }
}
