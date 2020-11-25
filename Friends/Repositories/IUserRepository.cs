﻿using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        bool CheckIfEmailAlreadyExists(string email);
        bool CheckIfUsernameAlreadyExists(string username);
    }
}
