using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        User Find(long id);
        bool CheckIfEmailAlreadyExists(string email);
        bool CheckIfUsernameAlreadyExists(string username);
    }
}
