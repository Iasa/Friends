using AutoMapper;
using Friends.Core.Dtos.MessageDto;
using Friends.Core.Repositories.Interfaces;
using Friends.Core.Services.Interfaces;
using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Services
{
    public class MessageServices : IMessageServices
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public MessageServices(IMessageRepository messageRepository, IMapper mapper, IUserRepository userRepository)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public MessageDto AddMessage(NewMessageDto newMessage)
        {
            var message = _mapper.Map<Message>(newMessage);
            _messageRepository.Add(message);
            _messageRepository.Save();

            var response = _mapper.Map<MessageDto>(message);
            response.SenderName = _userRepository.Find(response.SenderId).FirstName + " " + _userRepository.Find(response.SenderId).LastName;

            return response;
        }

    }
}
