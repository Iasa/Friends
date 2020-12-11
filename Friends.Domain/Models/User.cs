using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain.Models
{
    public class User : IdentityUser<long>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public long? ProfileImageId { get; set; }
        public virtual Image ProfileImage { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<UserChat> UserChats { get; set; }
        public virtual ICollection<Relation> Relations { get; set; }
    }
}
