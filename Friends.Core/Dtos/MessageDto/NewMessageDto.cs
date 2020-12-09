using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Dtos.MessageDto
{
    public class NewMessageDto
    {
        [Required]
        public long SenderId { get; set; }

        [Required]
        public long ChatId { get; set; }

        [Required]
        public DateTimeOffset SendingTime { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
