using AutoMapper;
using Friends.Core.Dtos.UserDto;
using Friends.Core.Exceptions;
using Friends.Core.Repositories.Interfaces;
using Friends.Core.Services.Interfaces;
using Friends.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;

namespace Friends.Core.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public UserServices(IUserRepository userRepository, UserManager<User> userManager, IMapper mapper)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _mapper = mapper;
        }

        public User CreateUser(CreateUserDto newUser)
        {
            if (_userRepository.GetAll().Any(u => u.Email == newUser.Email))
            {
                throw new EntryAlreadyExistsException("This Email is already being used by another user");
            }

            if (_userRepository.GetAll().Any(u => u.UserName == newUser.Username))
            {
                throw new EntryAlreadyExistsException("This Username is already being used by another user");
            }

            User user = new User
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                BirthDate = newUser.BirthDate,
                UserName = newUser.Username,
                Email = newUser.Email
            };

            _userRepository.Add(user);
            _userRepository.Save();
            return user;
        }

        public IEnumerable<User> GetUsers()
        {
            return _userRepository.GetAll().ToList();
        }

        public User GetUserById(long id)
        {
            return _userRepository.Find(id);
        }

        public void UpdateUser(long id, CreateUserDto updatedUser)
        {
            User user = _userRepository.Find(id);

            if (user == null)
                throw new NotFoundException("User not found!");

            if (updatedUser.Email != user.Email && _userRepository.GetAll().Any(u => u.Email == updatedUser.Email))
                throw new EntryAlreadyExistsException("This Email is already being used by another user");

            if (updatedUser.Username != user.UserName && _userRepository.GetAll().Any(u => u.UserName == updatedUser.Username))
                throw new EntryAlreadyExistsException("This Username is already being used by another user");

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.BirthDate = updatedUser.BirthDate;
            user.UserName = updatedUser.Username;
            user.Email = updatedUser.Email;

            _userRepository.Save();
        }

        public UserDto UpdateUserDetails(long userId, UpdateUserDto updatedUser, IFormFile profileImageFile)
        {
            User user = _userRepository.Find(userId);
            
            if ( user == null)
                throw new NotFoundException("User not found");

            if (!string.IsNullOrWhiteSpace(updatedUser.FirstName))
            {
                if( updatedUser.FirstName.Length <= 50 )
                {
                    user.FirstName = updatedUser.FirstName;
                }
                else
                {
                    throw new Exception("First name must shorter than 50 characters");
                }
            }


            if (!string.IsNullOrWhiteSpace(updatedUser.LastName))
            {
                if (updatedUser.LastName.Length <= 50)
                {
                    user.LastName = updatedUser.LastName;
                }
                else
                {
                    throw new Exception("Last name must shorter than 50 characters");
                }
            }

            if (!string.IsNullOrWhiteSpace(updatedUser.Username) && user.UserName != updatedUser.Username)
            {
                if (_userRepository.GetAll().Any(u => u.UserName == updatedUser.Username))
                {
                    throw new EntryAlreadyExistsException("This Username is already being used by another user");
                }

                if (updatedUser.Username.Length <= 50 && updatedUser.Username.Length >= 5)
                {
                    user.UserName = updatedUser.Username;
                }
                else
                {
                    throw new Exception("Username must me between 5 and 50 characters");
                }
            }
                
            if (!string.IsNullOrWhiteSpace(updatedUser.Email) && user.Email != updatedUser.Email)
            {
                if (_userRepository.GetAll().Any(u => u.Email == updatedUser.Email))
                {
                    throw new EntryAlreadyExistsException("This Email is already being used by another user");
                }
                
                if( IsValidEmail(updatedUser.Email) )
                {
                    user.Email = updatedUser.Email;
                }
                else
                {
                    throw new Exception("Email is not valid");
                }
            }

            if (updatedUser.BirthDate.HasValue)
                user.BirthDate = updatedUser.BirthDate.Value;

            _userRepository.Save();

            // changePassword
            if(updatedUser.CurrentPassword != null && updatedUser.NewPassword != null && updatedUser.ConfirmedNewPassword != null)
            { // use IsNullOrwhiteSpace instead
                var changePassword = _userManager.ChangePasswordAsync(user, updatedUser.CurrentPassword, updatedUser.NewPassword);
                if (!changePassword.Result.Succeeded) 
                {
                    throw new Exception("Error while changing the password!");
                }
               
            }

            // change profile image
            if(profileImageFile != null)
            {
                using (var stream = new MemoryStream())
                {
                    profileImageFile.CopyTo(stream);
                    _userRepository.AddProfileImage(userId, profileImageFile.FileName, stream.ToArray());
                }
            }

            var changedUserDto = _mapper.Map<UserDto>(user);
           
            return changedUserDto;
        }

        public void RemoveUserById(long id)
        {
            if (!_userRepository.GetAll().Any(u => u.Id == id))
                throw new NotFoundException("User not foun");

            User user = _userRepository.Find(id);
            _userRepository.Remove(user);
            _userRepository.Save();
        }

        public bool CheckIfEmailAlreadyExists(string email)
        {
            if(_userRepository.GetAll().Any(u => u.Email == email))
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
            if(_userRepository.GetAll().Any(u => u.UserName == username))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public void AddRelation(long userId, long friendId)
        {
            _userRepository.AddRelation(userId, friendId);
        }

        public IEnumerable<UserDto> GetNonFriends(long userId, string query, int pageNumber, bool orderByFirstName = false, bool orderByLastName = false, bool orderByAge = false, bool orderAscending = true)
        {
            return _userRepository.GetNonFriends(userId, query, pageNumber, orderByFirstName, orderByLastName, orderByAge, orderAscending);
        }

        public void AddProfileImage(long userId, string imageTitle, byte[] imageData)
        {
            _userRepository.AddProfileImage(userId, imageTitle, imageData);
        }

        public Image GetProfileImage(long userId)
        {
            return _userRepository.GetProfileImage(userId);
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                MailAddress m = new MailAddress(email);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

    }
}
