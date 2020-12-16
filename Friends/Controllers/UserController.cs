using System;
using System.IO;
using System.Linq;
using AutoMapper;
using Friends.Core.Dtos.UserDto;
using Friends.Core.Exceptions;
using Friends.Core.Services;
using Friends.Core.Services.Interfaces;
using Friends.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Friends.API.Controllers
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

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetUserById(long id)
        {
            User user = _userServices.GetUserById(id);

            if (user == null)
                return NotFound();

            var result = _mapper.Map<UserDto>(user);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("checkIfEmailExists/{email}")]
        public bool CheckIfEmailExists(string email)
        {
            return _userServices.CheckIfEmailAlreadyExists(email);
        }

        [AllowAnonymous]
        [HttpGet("checkIfUsernameExists/{username}")]
        public bool CheckIfUsernameExists(string username)
        {
            return _userServices.CheckIfUsernameAlreadyExists(username);
        }

        [Authorize]
        [HttpPatch("{userId}/update")]
        [ApiExceptionFilter]
        public IActionResult UpdateUserDetails(long userId, [FromBody] UpdateUserDto updatedUserDto)
        {
            try
            {
                UserDto user = _userServices.UpdateUserDetails(userId, updatedUserDto);
                return Ok(user);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Authorize]
        [HttpDelete("{userId}/remove")]
        public IActionResult RemoveUser(long userId)
        {
            _userServices.RemoveUserById(userId);

            return NoContent();
        }

        [Authorize]
        [HttpGet("{userId}/chats")]
        public IActionResult GetUserChats(long userId)
        {
            var result = _chatServices.GetUserChats(userId);

            return Ok(result);
        }


        [Authorize]
        [HttpGet("/getNonFriends")]
        public IActionResult GetNonFriends(long userId, string query, int pageNumber, int pageSize = PaginExtension.DefaultPageSize,
            bool orderByFirstName = false, bool orderByLastName = false, bool orderByAge = false, bool orderAscending = true)
        {
            var result = _userServices.GetNonFriends(userId, query, pageNumber, pageSize, orderByFirstName, orderByLastName, orderByAge, orderAscending);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("addRelation")]
        public IActionResult AddRelation(long userId, long friendId)
        {
            _userServices.AddRelation(userId, friendId);
            return Ok();
        }

        [Authorize]
        [HttpPost("addProfileImage")]
        public IActionResult AddProfileImage(long userId, [FromForm(Name = "profileImage")] IFormFile imageFile)
        {
            if( imageFile != null )
            {
                using (var stream = new MemoryStream())
                {
                    imageFile.CopyTo(stream);
                    _userServices.AddProfileImage(userId, imageFile.FileName, stream.ToArray());
                }

                return Ok();
            }

            return BadRequest();
            
        }

        [AllowAnonymous]
        [HttpGet("{userId}/image")]
        public IActionResult GetProfileImage(long userId)
        {
            var image = _userServices.GetProfileImage(userId);
            
            if(image == null)
            {
                return NoContent();
            }

            return File(image?.ImageData, "image/png");
        }

        [Authorize]
        [HttpDelete("{userId}/removeProfileImage")]
        public IActionResult RemoveProfilePicture(long userId)
        {
            _userServices.RemoveProfileImage(userId);
            return Ok();
        }

        [Authorize]
        [HttpGet("{userId}/friends")]
        public IActionResult GetFriends(long userId)
        {
            var friends = _userServices.GetFriends(userId);
            return Ok(friends);
        }

    }
}
