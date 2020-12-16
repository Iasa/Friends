using Friends.Core.Dtos.ChatDto;
using Friends.Core.Dtos.MessageDto;
using Friends.Core.Repositories.Interfaces;
using Friends.Core.Services;
using Friends.Domain;
using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
{
    public interface IChatRepository : IRepository<Chat>
    {
        IEnumerable<ChatDto> GetUserChats(long userId);
        IEnumerable<MessageDto> GetChatMessages(long chatId, int pageNumber, int pageSize = PaginExtension.DefaultPageSize);
        void CreateChat(long userOneId, long userTwoId);
        Task<ChatDto> CreateGroup(string groupName, long[] usersId);
    }
}
