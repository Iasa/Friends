using Friends.CodeFirst;
using Friends.Domain;
using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
{
    public class ChatRepository : Repository<Chat>, IChatRepository
    {
        public ChatRepository(FriendsDbContext context) : base(context)
        {
        }

        public IEnumerable<Object> GetUserChats(long userId)
        {
            List<ChatDto> chatList = new List<ChatDto>();

            return _context.Set<UserChat>().Where(uc => uc.UserId == userId)
                .Select(uc => new
                {
                    ChatId = uc.ChatId,
                    Name = uc.Chat.IsGroup ? uc.Chat.Name : _context.Set<UserChat>().FirstOrDefault(x => (x.ChatId == uc.ChatId) && (x.UserId != userId)).User.UserName
                }).ToList();


        }
    }
}
