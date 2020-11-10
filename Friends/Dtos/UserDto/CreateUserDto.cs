using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Dtos
{
    public class CreateUserDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "First name is too short")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "First name is too short")]
        public string LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
