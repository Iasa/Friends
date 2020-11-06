﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Friends.Domain;
using Friends.Dtos;
using Friends.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Friends.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetUsers();
            var result = users.Select(u => _mapper.Map<UserDto>(u));

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(long id)
        {
            User user = _userRepository.GetUserById(id);

            if (user == null)
                return NotFound();

            var result = _mapper.Map<UserDto>(user);
            return Ok(result);
        }

        [HttpPost]
        [ApiExceptionFilter]
        public IActionResult Post([FromBody] CreateUserDto dto)
        {
            var user = _userRepository.CreateUser(dto);

            var result = _mapper.Map<UserDto>(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, result);
        }

        [HttpPut("{id}")]
        [ApiExceptionFilter]
        public IActionResult Put(long id, [FromBody] CreateUserDto dto)
        {
            _userRepository.UpdateUser(id, dto);
            return NoContent();
        }

        [HttpPatch("{id}")]
        [ApiExceptionFilter]
        public IActionResult Patch(long id, [FromBody] UpdateUserDto dto)
        {
            User user = _userRepository.UpdateUserDetails(id, dto);
            var result = _mapper.Map<UserDto>(user);
            return Ok(result);
        }

    }
}
