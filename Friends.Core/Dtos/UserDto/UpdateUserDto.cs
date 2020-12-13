using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Friends.Core.Dtos.UserDto
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? BirthDate { get; set; }

        public string Username { get; set; }

        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Compare("NewPassword", ErrorMessage = "Passwords are not the same")]
        [DataType(DataType.Password)]
        public string ConfirmedNewPassword { get; set; }

        public IFormFile profileImage { get; set; }

        public string Email { get; set; }
    }
}
