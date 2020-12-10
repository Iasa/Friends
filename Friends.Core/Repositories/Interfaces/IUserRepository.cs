using Friends.Core.Dtos.UserDto;
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
        void CreateChat(long userId, long friendId);
        void AddRelation(long userId, long frindId);
        IEnumerable<UserDto> GetNonFriends(long userId, string query, int pageNumber,
            bool orderByFirstName = false, bool orderByLastName = false, bool orderByAge = false, bool orderAscending = true);
    }
}
