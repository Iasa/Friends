using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain.Models.Auth
{
    public class Role : IdentityRole<long>
    {
        public Role(string name): base(name)
        {

        }
    }
}
