using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
{
    public interface IMessageRepository : IRepository<Message>
    {
        Message GetLastMessage(long senderId, long chatId);
    }
}
