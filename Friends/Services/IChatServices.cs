using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Services
{
    public interface IChatServices
    {
        IEnumerable<ChatDto> GetUserChats(long userId);
        IEnumerable<MessageDto> GetChatMessages(long chatId, int pageNumber);
    }
}
