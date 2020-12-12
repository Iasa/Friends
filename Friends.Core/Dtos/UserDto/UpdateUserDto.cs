using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Friends.Core.Dtos.UserDto
{
    public class UpdateUserDto
    {
        [StringLength(50, MinimumLength = 3, ErrorMessage = "First name is too short")]
        public string FirstName { get; set; }

        [StringLength(50, MinimumLength = 3, ErrorMessage = "First name is too short")]
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

        [EmailAddress]
        public string Email { get; set; }
    }
}
