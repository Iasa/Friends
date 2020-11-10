using AutoMapper;
using Friends;
using Friends.Controllers;
using Friends.Domain;
using Friends.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection.Metadata.Ecma335;

namespace FriendsUnitTests
{
    [TestClass]
    public class UserControllerUnitTests
    {
        private Mock<IUserRepository> _mockUserRepository;
        private Mock<IMapper> _mockMapper;  
        private UserController _userController;
        private List<User> _usersList;

        [TestInitialize]
        public void Initializer()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _mockMapper = new Mock<IMapper>();
            _userController = new UserController(_mockUserRepository.Object, _mockMapper.Object);

            _mockMapper.Setup(m => m.Map<UserDto>(It.IsAny<User>())).Returns((User src) => new UserDto()
            {
                Id = src.Id,
                FirstName = src.FirstName,
                LastName = src.LastName,
                BirthDate = src.BirthDate,
                Email = src.Email,
                Username = src.Username,
                Password = src.Password
            });

            _usersList = new List<User>()
            {
                new User()
                {
                    Id = 1,
                    FirstName = "Mihai",
                    LastName = "Eminescu",
                    BirthDate = new DateTime(1988,04,01),
                    Email = "eminescu@mail.com",
                    Username = "eminescu",
                    Password = "eminescu123"
                },
                new User()
                {
                    Id = 2,
                    FirstName = "John",
                    LastName = "Travolta",
                    BirthDate = new DateTime(1934,11,14),
                    Email = "travolta@mail.com",
                    Username = "travolta",
                    Password = "travolta123"
                },
                new User()
                {
                    Id = 3,
                    FirstName = "Indiana",
                    LastName = "Johnes",
                    BirthDate = new DateTime(1954,12,17),
                    Email = "indiana@mail.com",
                    Username = "indiana",
                    Password = "indiana123"
                }
            };
        }

        [TestMethod]
        [DataRow(2)]
        public void GetUserById_ReturnUserById(long id)
        {
            User expected = _usersList.First(u => u.Id == id);
            _mockUserRepository.Setup(m => m.GetUserById(It.IsAny<long>())).Returns(expected);
          
            var user = _userController.GetUserById(id) as OkObjectResult;
            var result = user.Value as UserDto;
         
            Assert.AreEqual("John", result.FirstName);
            Assert.AreEqual((int)HttpStatusCode.OK, user.StatusCode);
        }

        [TestMethod]
        public void GetAllUsers_ReturnAllUsersList()
        {
            var expectedCount = _usersList.Count;

            _mockUserRepository.Setup(m => m.GetUsers()).Returns(_usersList);
            
            var users = _userController.GetAllUsers() as OkObjectResult;
            //var result = users.Value as List<UserDto>;

            //Assert.AreEqual(result.Count, expectedCount);
            Assert.AreEqual((int)HttpStatusCode.OK, users.StatusCode);
        }   

        [TestMethod]
        public void CreateUser_ShouldReturnTheCreatedUser()
        {
            CreateUserDto user = new CreateUserDto()
            {
                FirstName = "Vlad",
                LastName = "Filat",
                BirthDate = new DateTime(1964, 09, 13),
                Email = "filat@mail.com",
                Username = "filat",
                Password = "filat123"
            };

            _mockUserRepository.Setup(m => m.CreateUser(It.IsAny<CreateUserDto>())).Returns(
                (CreateUserDto dto) => new User
                {
                    Id = 4,
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    BirthDate = dto.BirthDate,
                    Email = dto.Email,
                    Username = dto.Username,
                    Password = dto.Password
                });

            var result = _userController.CreateUser(user) as CreatedAtActionResult;

            Assert.AreEqual(HttpStatusCode.Created, (HttpStatusCode)result.StatusCode);

        }

        [TestMethod]
        [DataRow(1)]
        public void UpdateUser_ShouldReturnExpectedResult(long id)
        {
            CreateUserDto user = new CreateUserDto()
            {
                FirstName = "Vlad",
                LastName = "Filat",
                BirthDate = new DateTime(1964, 09, 13),
                Email = "filat@mail.com",
                Username = "filat",
                Password = "filat123"
            };

            _mockUserRepository.Setup(m => m.UpdateUser(It.IsAny<long>(), It.IsAny<CreateUserDto>()));
            var result = _userController.UpdateUser(id, user) as NoContentResult;

            Assert.AreEqual(HttpStatusCode.NoContent, (HttpStatusCode)result.StatusCode);

        }

        [TestMethod]
        [DataRow(1)]
        public void UpdateUserDetails_ShouldReturnExpectedResult(long id)
        {
            UpdateUserDto user = new UpdateUserDto()
            {
                Username = "filat",
                Password = "filat123"
            };

            _mockUserRepository.Setup(m => m.UpdateUserDetails(It.IsAny<long>(), It.IsAny<UpdateUserDto>())).Returns(new User());

            var result = _userController.UpdateUserDetails(id, user) as OkObjectResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
        }

        [TestMethod]
        [DataRow(1)]
        public void RemoveUser_ShouldReturnExpectedResult(long id)
        {
            _mockUserRepository.Setup(m => m.RemoveUserById(It.IsAny<long>()));
            var result = _userController.RemoveUser(id) as NoContentResult;

            Assert.AreEqual(HttpStatusCode.NoContent, (HttpStatusCode)result.StatusCode);
        }



    }
}
