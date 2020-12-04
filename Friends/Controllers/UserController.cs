using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Friends.Domain;
using Friends.Dtos;
using Friends.Exceptions;
using Friends.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Friends.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly IChatServices _chatServices;
        private readonly IMapper _mapper;
        public UserController(IChatServices chatServices, IUserServices userServices, IMapper mapper)
        {
            _userServices = userServices;
            _mapper = mapper;
            _chatServices = chatServices;
        }

        [AllowAnonymous]
        [HttpGet("CheckIfEmailExists/{email}")]
        public bool CheckIfEmailExists(string email)
        {
            return _userServices.CheckIfEmailAlreadyExists(email);
        }

        [AllowAnonymous]
        [HttpGet("CheckIfUsernameExists/{username}")]
        public bool CheckIfUsernameExists(string username)
        {
            return _userServices.CheckIfUsernameAlreadyExists(username);
        }

        //[Authorize(Roles = "user")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _userServices.GetUsers();
            var result = users.Select(u => _mapper.Map<UserDto>(u));

            return Ok(result);
        }
        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public IActionResult GetUserById(long id)
        {
            User user = _userServices.GetUserById(id);

            if (user == null)
                return NotFound();

            var result = _mapper.Map<UserDto>(user);
            return Ok(result);
        }

        [HttpPost("CreateUser")]
        [ApiExceptionFilter]
        public IActionResult CreateUser([FromBody] CreateUserDto dto)
        {
            var user = _userServices.CreateUser(dto);

            var result = _mapper.Map<UserDto>(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, result);
        }

        [HttpPut("{id}")]
        [ApiExceptionFilter]
        public IActionResult UpdateUser(long id, [FromBody] CreateUserDto dto)
        {
            _userServices.UpdateUser(id, dto);
            return NoContent();
        }

        [HttpPatch("{id}")]
        [ApiExceptionFilter]
        public IActionResult UpdateUserDetails(long id, [FromBody] UpdateUserDto dto)
        {
            User user = _userServices.UpdateUserDetails(id, dto);
            var result = _mapper.Map<UserDto>(user);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveUser(long id)
        {
            _userServices.RemoveUserById(id);

            return NoContent();
        }

        [Authorize]
        [HttpGet("/chats/{id}")]
        public IActionResult GetUserChats(long id)
        {
            var result = _chatServices.GetUserChats(id);

            return Ok(result);
        }
    }
}
