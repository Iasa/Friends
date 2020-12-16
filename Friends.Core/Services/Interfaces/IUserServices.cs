using Friends.Core.Dtos.UserDto;
using Friends.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Services.Interfaces
{
    public interface IUserServices
    {
        User GetUserById(long id);
        User CreateUser(CreateUserDto newUser);
        UserDto UpdateUserDetails(long userId, UpdateUserDto updatedUser);
        void RemoveUserById(long id);
        bool CheckIfEmailAlreadyExists(string email);
        bool CheckIfUsernameAlreadyExists(string username);
        void AddRelation(long userId, long friendId);
        void AddProfileImage(long userId, string imageTitle, byte[] imageData);
        Image GetProfileImage(long userId);
        void RemoveProfileImage(long userId);
        IEnumerable<UserDto> GetNonFriends(long userId, string query, int pageNumber, int pageSize = PaginExtension.DefaultPageSize,
            bool orderByFirstName = false, bool orderByLastName = false, bool orderByAge = false, bool orderAscending = true);
        IEnumerable<UserDto> GetFriends(long userId);
    }
}
