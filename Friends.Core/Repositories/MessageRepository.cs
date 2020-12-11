using Friends.Core.Repositories.Interfaces;
using Friends.Domain.Models;
using Friends.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Repositories
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(FriendsDbContext context) : base(context)
        {
        }

    }
}
