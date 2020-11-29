using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Identity
{
    public class UserRegisterResponse
    {
        public string Message { get; set; }
        public bool IsSucces { get; set; }
        public bool EmailIsAlreadyUsed { get; set; }
        public bool UsernameIsAlreadyUsed { get; set; }
    }
}
