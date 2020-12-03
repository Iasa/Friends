using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Services
{
    public interface IChatServices
    {
        IEnumerable<Object> GetUserChats(long userId);
    }
}
