using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain.Models
{
    public class Image : BaseEntity
    {
        public string ImageTitle { get; set; }
        public byte[] ImageData { get; set; }
        public virtual User User { get; set; }
    }
}
