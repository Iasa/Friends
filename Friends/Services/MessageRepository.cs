using Friends.CodeFirst;
using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Friends
{
    class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(FriendsDbContext context) : base(context)
        {
        }
        public FriendsDbContext FriendsContext
        {
            get { return _context as FriendsDbContext; }
        }
        public void EditMessage(string newContent, long messageId)
        {
            FriendsContext.Messages.First(m => m.Id == messageId).Content = newContent;
        }
    }
}
