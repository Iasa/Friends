using Friends.CodeFirst;
using Friends.Domain;
using Friends.Dtos;
using Friends.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Friends
{
    class UserRepository : IUserRepository
    {
        private readonly IRepository<User> _userRepository;
        public UserRepository(IRepository<User> userRepository)
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

        public void UpdateUser(long id, CreateUserDto changedUser)
        {
            User user = _userRepository.Find(id);

            if (!_userRepository.GetAll().Any(u => u.Id == id))
                throw new NotFoundException("User not found!");

            if (changedUser.Email != user.Email && _userRepository.GetAll().Any(u => u.Email == changedUser.Email))
                throw new EntryAlreadyExistsException("This Email is already being used by another user");

            if (changedUser.Username != user.Username && _userRepository.GetAll().Any(u => u.Username == changedUser.Username))
                throw new EntryAlreadyExistsException("This Username is already being used by another user");

            user.FirstName = changedUser.FirstName;
            user.LastName = changedUser.LastName;
            user.BirthDate = changedUser.BirthDate;
            user.Username = changedUser.Username;
            user.Password = changedUser.Password;
            user.Email = changedUser.Email;

            _userRepository.Save();
        }


    }
}
