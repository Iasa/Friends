using Friends.Dtos;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Hubs
{
    public class MessageHub : Hub<IMessageClient>
    {
        
    }
}
