using Friends.Domain;
using Friends.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        User GetUserById(long id);
        User CreateUser(CreateUserDto newUser);
        void UpdateUser(long id, CreateUserDto changedUser);
    }
}
