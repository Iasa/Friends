using Microsoft.VisualStudio.TestTools.UnitTesting;
using Friends.API.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using Friends.Core.Services.Interfaces;
using AutoMapper;
using Friends.Domain.Models;
using Friends.Core.Dtos.UserDto;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Friends.API.Controllers.Tests
{
    [TestClass()]
    public class UserControllerTests
    {

        private Mock<IUserServices> _mockUserRepository;
        private Mock<IChatServices> _mockChatService;
        private Mock<IMapper> _mockMapper;
        private UserController _userController;
        private List<User> _usersList;

        [TestInitialize]
        public void Initializer()
        {
            _mockUserRepository = new Mock<IUserServices>();
            _mockMapper = new Mock<IMapper>();
            _userController = new UserController(_mockChatService.Object, _mockUserRepository.Object, _mockMapper.Object);

            _mockMapper.Setup(m => m.Map<UserDto>(It.IsAny<User>())).Returns((User src) => new UserDto()
            {
                Id = src.Id,
                FirstName = src.FirstName,
                LastName = src.LastName,
                BirthDate = src.BirthDate,
                Email = src.Email,
                Username = src.UserName
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
                    UserName = "eminescu"
                },
                new User()
                {
                    Id = 2,
                    FirstName = "John",
                    LastName = "Travolta",
                    BirthDate = new DateTime(1934,11,14),
                    Email = "travolta@mail.com",
                    UserName = "travolta"
                },
                new User()
                {
                    Id = 3,
                    FirstName = "Indiana",
                    LastName = "Johnes",
                    BirthDate = new DateTime(1954,12,17),
                    Email = "indiana@mail.com",
                    UserName = "indiana"
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
        [DataRow(1)]
        public void RemoveUser_ShouldReturnExpectedResult(long id)
        {
            _mockUserRepository.Setup(m => m.RemoveUserById(It.IsAny<long>()));
            var result = _userController.RemoveUser(id) as NoContentResult;

            Assert.AreEqual(HttpStatusCode.NoContent, (HttpStatusCode)result.StatusCode);
        }



    }
}