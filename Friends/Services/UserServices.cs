using Friends.CodeFirst;
using Friends.Domain;
using Friends.Dtos;
using Friends.Exceptions;
using Friends.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Friends
{
    class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        public UserServices(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User CreateUser(CreateUserDto newUser)
        {
            if (_userRepository.GetAll().Any(u => u.Email == newUser.Email))
            {
                throw new EntryAlreadyExistsException("This Email is already being used by another user");
            }

            if (_userRepository.GetAll().Any(u => u.Username == newUser.Username))
            {
                throw new EntryAlreadyExistsException("This Username is already being used by another user");
            }

            User user = new User
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                BirthDate = newUser.BirthDate,
                Username = newUser.Username,
                Password = newUser.Password,
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

            if (updatedUser.Username != user.Username && _userRepository.GetAll().Any(u => u.Username == updatedUser.Username))
                throw new EntryAlreadyExistsException("This Username is already being used by another user");

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.BirthDate = updatedUser.BirthDate;
            user.Username = updatedUser.Username;
            user.Password = updatedUser.Password;
            user.Email = updatedUser.Email;

            _userRepository.Save();
        }

        public User UpdateUserDetails(long id, UpdateUserDto updatedUser)
        {
            if (!_userRepository.GetAll().Any(u => u.Id == id))
                throw new NotFoundException("User not found");

            User user = _userRepository.Find(id);

            if (!string.IsNullOrWhiteSpace(updatedUser.FirstName))
                user.FirstName = updatedUser.FirstName;

            if (!string.IsNullOrWhiteSpace(updatedUser.LastName))
                user.LastName = updatedUser.LastName;

            if (!string.IsNullOrWhiteSpace(updatedUser.Username) && user.Username != updatedUser.Username)
            {
                if (_userRepository.GetAll().Any(u => u.Username == updatedUser.Username))
                {
                    throw new EntryAlreadyExistsException("This Username is already being used by another user");
                }    
                user.Username = updatedUser.Username;
            }
                
            if (!string.IsNullOrWhiteSpace(updatedUser.Email) && user.Email != updatedUser.Email)
            {
                if (_userRepository.GetAll().Any(u=>u.Email == updatedUser.Email))
                {
                    throw new EntryAlreadyExistsException("This Email is already being used by another user");
                }
                user.Email = updatedUser.Email;
            }

            if (!string.IsNullOrWhiteSpace(updatedUser.Password))
                user.Password = updatedUser.Password;

            if (updatedUser.BirthDate.HasValue)
                user.BirthDate = updatedUser.BirthDate.Value;

            _userRepository.Save();

            return user;
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
            if(_userRepository.GetAll().Any(u => u.Username == username))
            {
                return true;
            }
            else
            {
                return false;
            }
        }


    }
}
