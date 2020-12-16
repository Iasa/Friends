using AutoMapper;
using Friends.API;
using Friends.Core.Dtos.UserDto;
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

        public UserControllerIntegrationTests()
        {
            var appFactory = new WebApplicationFactory<Startup>();
            _client = appFactory.CreateClient();
        }

        [TestMethod]
        [DataRow(25)]
        [DataRow(10020)]
        public async Task GetProfileImageTest(long userId)
        {
            var request = $"/api/User/{userId}/image";
            
            var response = await _client.GetAsync(request);
            
            Assert.IsTrue(response.IsSuccessStatusCode);
        }

    }
}
