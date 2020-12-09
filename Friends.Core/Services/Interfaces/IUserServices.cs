using Friends.Core.Dtos.UserDto;
using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Services.Interfaces
{
    public interface IUserServices
    {
        IEnumerable<User> GetUsers();
        User GetUserById(long id);
        User CreateUser(CreateUserDto newUser);
        void UpdateUser(long id, CreateUserDto updatedUser);
        User UpdateUserDetails(long ig, UpdateUserDto updatedUser);
        void RemoveUserById(long id);
        bool CheckIfEmailAlreadyExists(string email);
        bool CheckIfUsernameAlreadyExists(string username);
    }
}
