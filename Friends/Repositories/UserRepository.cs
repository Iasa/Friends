using Friends.CodeFirst;
using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(FriendsDbContext context) : base(context)
        {
        }

        public bool CheckIfEmailAlreadyExists(string email)
        {
            if (GetAll().Any(u => u.Email == email))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool CheckIfUsernameAlreadyExists(string username)
        {
            if (GetAll().Any(u => u.UserName == username))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public User Find(long id)
        {
            return _context.Set<User>().FirstOrDefault(u => u.Id == id);
        }

    }
}
