using Friends.Domain;
using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
{
    public interface IChatRepository : IRepository<Chat>
    {
        IEnumerable<Object> GetUserChats(long userId);
    }
}
