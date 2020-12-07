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
using Friends.Services;

namespace Friends.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IHubContext<MessageHub, IMessageClient> _messageHub;
        private readonly IMessageServices _messageServices;
        private readonly IUserServices _userServices;


        public MessageController(IHubContext<MessageHub, IMessageClient> messageHub, IMessageServices messageServices, IUserServices userServices)
        {
            _messageHub = messageHub;
            _messageServices = messageServices;
            _userServices = userServices;
        }

        [AllowAnonymous]
        [HttpPost("messages")]
        public async Task<IActionResult> Create([FromBody] NewMessageDto newMessage)
        {
            // save the message to the DB
            _messageServices.AddMessage(newMessage);

            var lastMessage = _messageServices.GetLastMessage(newMessage.SenderId, newMessage.ChatId);

            // send message to the clients
            await _messageHub.Clients.All.SendMessageToClients(lastMessage);
            return Ok(lastMessage);
        }

    }
}
