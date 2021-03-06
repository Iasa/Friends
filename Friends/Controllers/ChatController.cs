﻿using Friends.Core.Dtos.ChatDto;
using Friends.Core.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Friends.Core.Services;

namespace Friends.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatServices _chatServices;

        public ChatController(IChatServices chatServices)
        {
            _chatServices = chatServices;
        }

        [AllowAnonymous]
        [HttpPost("createGroup/{groupName}")]
        public async Task<ChatDto> CreateGroup(string groupName, [FromBody] long[] usersId)
        {
            ChatDto newGroup = await _chatServices.CreateGroup(groupName, usersId);
            return newGroup;
        }

        [Authorize]
        [HttpGet("{chatId}/messeges")]
        public IActionResult GetChatMessages(long chatId, int pageNumber, int pageSize = PaginExtension.DefaultPageSize)
        {
            var result = _chatServices.GetChatMessages(chatId, pageNumber, pageSize);

            return Ok(result);
        }
    }
}
