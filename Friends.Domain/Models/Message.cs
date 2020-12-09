using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain.Models
{
    public class Message : BaseEntity
    {
        public long SenderId { get; set; }
        public virtual User Sender { get; set; }
        public long ChatId { get; set; }
        public virtual Chat Chat { get; set; }
        public DateTimeOffset SendingTime { get; set; }
        public string Content { get; set; }
    }
}
