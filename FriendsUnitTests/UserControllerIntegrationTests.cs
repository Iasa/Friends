using AutoMapper;
using Friends;
using Friends.Controllers;
using Friends.Domain;
using Friends.Dtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FriendsUnitTests
{
    [TestClass]
    public class UserControllerIntegrationTests
    {
        private readonly HttpClient _client;
        private Mock<IUserRepository> _mockUserRepository;
        private Mock<IMapper> _mockMapper;
        private UserController _userController;
        private List<User> _usersList;

        public UserControllerIntegrationTests()
        {
            //var server = new TestServer(new WebHostBuilder()
            //    .UseEnvironment("Development")
            //    .UseStartup<Startup>());
            //_client = server.CreateClient();
            var appFactory = new WebApplicationFactory<Startup>();
            _client = appFactory.CreateClient();
        }

        [TestInitialize]
        public void Initializer()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _mockMapper = new Mock<IMapper>();
            _userController = new UserController(_mockUserRepository.Object, _mockMapper.Object);
            _usersList = new List<User>() { new User(), new User(), new User() };

            //_mockMapper.Setup(m => m.Map<UserDto>(It.IsAny<User>())).Returns((User src) => new UserDto()
            //{
            //    Id = src.Id,
            //    FirstName = src.FirstName,
            //    LastName = src.LastName,
            //    BirthDate = src.BirthDate,
            //    Email = src.Email,
            //    Username = src.Username,
            //    Password = src.Password
            //});
        }

        [TestMethod]
        public async Task ShouldAccess_GetAllUsers()
        {
            var request = "/api/User/GetAllUsers";
            var response = await _client.GetAsync(request);
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            var users = JsonConvert.DeserializeObject<List<UserDto>>(json);
            Assert.IsTrue(users.Count == 5);
        }


        [TestMethod]
        public async Task ShouldAccess_CreateUser()
        {
            var request = new
            {
                Url = "api/User/CreateUser",
                Body = new
                {
                    FirstName = "John",
                    LastName = "Travolta",
                    BirthDate = new DateTime(1934, 11, 14),
                    Email = "ggg@mail.com",
                    Username = "ggg",
                    Password = "travolta123"
                }
            };

            var postResponse = await _client.PostAsync(request.Url, ContentHelper.GetStringContent(request.Body));
            postResponse.EnsureSuccessStatusCode();
        }

        //[TestMethod]
        //public async Task ShouldAccess_GetAllUsers()
        //{
        //    var request = "/api/GetAllUsers";
        //    var response = await _client.GetAsync(request);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var json = await response.Content.ReadAsStringAsync();
        //        var users = JsonConvert.DeserializeObject<UserDto>(json);
        //        Assert.IsTrue(users.co)
        //    }
        //}
    }
}
