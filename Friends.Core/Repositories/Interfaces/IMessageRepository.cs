using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Repositories.Interfaces
{
    public interface IMessageRepository : IRepository<Message>
    {
        Message GetLastMessage(long senderId, long chatId);
    }
}
