using Friends.CodeFirst;
using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(FriendsDbContext context) : base(context)
        {
        }

        public Message GetLastMessage(long senderId, long chatId)
        {
            return _context.Set<Message>().Where(m => (m.SenderId == senderId && m.ChatId == chatId)).OrderBy(m => m.SendingTime).LastOrDefault();
        }
    }
}
