using Friends.Core.Dtos.UserDto;
using Friends.Core.Services;
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
        void AddRelation(long userId, long frindId);
        void AddProfileImage(long userId, string imageTitle, byte[] imageData);
        Image GetProfileImage(long userId);
        void RemoveProfileImage(long userId);
        IEnumerable<UserDto> GetNonFriends(long userId, string query, int pageNumber, int pageSize = PaginExtension.DefaultPageSize,
            bool orderByFirstName = false, bool orderByLastName = false, bool orderByAge = false, bool orderAscending = true);
        IEnumerable<UserDto> GetFriends(long userId);
    }
}
