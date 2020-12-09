using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.API.Hubs
{
    public class MessageHub : Hub<IMessageClient>
    {
        
    }
}
