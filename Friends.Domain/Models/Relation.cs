using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain.Models
{
    public class Relation : BaseEntity
    {
        public long UserOneId { get; set; }
        public virtual User UserOne { get; set; }
        public long UserTwoId { get; set; }
        public virtual User UserTwo { get; set; }
    }
}
