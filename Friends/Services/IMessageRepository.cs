using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends
{
    public interface IMessageRepository : IRepository<Message>
    {
        void EditMessage(string newContent, long messageId);
    }
}
