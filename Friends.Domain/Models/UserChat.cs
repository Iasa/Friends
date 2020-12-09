using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain.Models
{
    public class UserChat : BaseEntity
    {
        public long UserId { get; set; }
        public virtual User User { get; set; }
        public long ChatId { get; set; }
        public virtual Chat Chat { get; set; }
        public bool IsAdmin { get; set; }
    }
}
