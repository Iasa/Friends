using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain
{
    public class Chat : BaseEntity
    {
        public string Name { get; set; }
        public bool IsGroup { get; set; }
        public virtual ICollection<UserChat> UserChats { get; set; }
    }
}
