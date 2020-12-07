using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Hubs
{
    public interface IMessageClient
    {
        Task SendMessageToClients(MessageDto newMessage);
    }
}
