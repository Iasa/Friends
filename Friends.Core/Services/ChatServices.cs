using Friends.Core.Dtos.ChatDto;
using Friends.Core.Dtos.MessageDto;
using Friends.Core.Services.Interfaces;
using Friends.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Services
{
    public class ChatServices : IChatServices
    {
        private readonly IChatRepository _chatRepository;
        public ChatServices(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task<ChatDto> CreateGroup(string groupName, long[] usersId)
        {
            return await _chatRepository.CreateGroup(groupName, usersId);
        }

        public IEnumerable<MessageDto> GetChatMessages(long chatId, int pageNumber, int pageSize = PaginExtension.DefaultPageSize)
        {
            return _chatRepository.GetChatMessages(chatId, pageNumber, pageSize);
        }

        public IEnumerable<ChatDto> GetUserChats(long userId)
        {
            return _chatRepository.GetUserChats(userId);
        }
    }
}
