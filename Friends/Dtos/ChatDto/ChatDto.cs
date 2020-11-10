using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Dtos
{
    public class ChatDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsGroup { get; set; }
    }
}
