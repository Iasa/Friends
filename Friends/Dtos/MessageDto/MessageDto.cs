using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Dtos
{
    public class MessageDto
    {
        public long Id { get; set; }
        public long SenderId { get; set; }
        //public virtual UserDto Sender { get; set; }
        public long ChatId { get; set; }
        //public virtual ChatDto Chat { get; set; }
        public DateTimeOffset SendingTime { get; set; }
        public string Content { get; set; }
    }
}
