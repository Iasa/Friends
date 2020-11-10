using Friends.CodeFirst;
using Friends.Domain;
using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Friends
{
    class MessageRepository : IMessageRepository
    {
        private readonly IRepository<Message> _messageRepository;

        public MessageRepository(IRepository<Message> messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public Message CreateMessage(CreateMessageDto newMessage)
        {
            Message message = new Message();
            message.SenderId = newMessage.SenderId;
            message.ChatId = newMessage.ChatId;
            message.Content = newMessage.Content.Trim();
            message.SendingTime = newMessage.SendingTime;

            _messageRepository.Add(message);
            _messageRepository.Save();

            return message;
        }

        public void EditMessage(long messageId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Message> GetMessagesFromChat(long chatId)
        {
            return null;
        }

        public void RemoveMessage(long messageId)
        {
            throw new NotImplementedException();
        }
    }
}
