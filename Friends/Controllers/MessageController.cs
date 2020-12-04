using Friends.Dtos;
using Friends.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace Friends.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IHubContext<MessageHub, IMessageClient> _messageHub;

        public MessageController(IHubContext<MessageHub, IMessageClient> messageHub)
        {
            _messageHub = messageHub;
        }

        [AllowAnonymous]
        [HttpPost("messages")]
        public async Task<IActionResult> Create(NewMessageDto newMessage)
        {
            // save the message to the DB
            // ....

            // send message to the clients
            await _messageHub.Clients.All.SendMessageToClients(newMessage);
            return Ok();
        }

    }
}
