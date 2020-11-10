using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Friends.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Friends.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;

        public MessageController(IMessageRepository messageRepository, IMapper mapper)
        {
            _messageRepository = messageRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult CreateMessage([FromBody] CreateMessageDto dto)
        {
            var message = _messageRepository.CreateMessage(dto);
            var result = _mapper.Map<CreateMessageDto>(message);
            return Ok(result);
        }
    }
}
