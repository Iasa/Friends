using AutoMapper;
using Friends.Domain;
using Friends.Dtos;
using Friends.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Services
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
        public void AddMessage(NewMessageDto newMessage)
        {
            var message = _mapper.Map<Message>(newMessage);
            _messageRepository.Add(message);
            _messageRepository.Save();
        }

        public MessageDto GetLastMessage(long senderId, long chatId)
        {
            Message lastMessage = _messageRepository.GetLastMessage(senderId, chatId);

            User sender = _userRepository.Find(senderId);

            var message = new MessageDto
            {
                Id = lastMessage.Id,
                SenderId = lastMessage.SenderId,
                SenderName = sender.FirstName + " " + sender.LastName,
                ChatId = lastMessage.ChatId,
                SendingTime = lastMessage.SendingTime,
                Content = lastMessage.Content
            };

            return message;
        }
    }
}
