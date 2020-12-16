using Friends.Core.Dtos.ChatDto;
using Friends.Core.Dtos.MessageDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Services.Interfaces
{
    public interface IChatServices
    {
        IEnumerable<ChatDto> GetUserChats(long userId);
        IEnumerable<MessageDto> GetChatMessages(long chatId, int pageNumber, int pageSize = PaginExtension.DefaultPageSize);
        Task<ChatDto> CreateGroup(string groupName, long[] usersId);
    }
}
