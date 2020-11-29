﻿using Friends.Domain;
using Friends.Domain.Models.Auth;
using Friends.Dtos;
using Friends.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Identity;

namespace Friends.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AuthOptions _authenticationOptions;

        public AccountController(UserManager<User> userManager, RoleManager<Role> roleManager,
            SignInManager<User> signInManager, IOptions<AuthOptions> authOptions)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _authenticationOptions = authOptions.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<UserRegisterResponse> Register([FromBody] CreateUserDto model)
        {
            if (ModelState.IsValid)
            {
                //if (model.Password != model.ConfirmedPassword)
                //{
                //    return new UserRegisterResponse
                //    {
                //        Message = "Passwords are not the same"
                //    };
                //}
                var userEmail = await _userManager.FindByEmailAsync(model.Email);
                var userUserName = await _userManager.FindByNameAsync(model.Username);
                if (userEmail == null && userUserName == null)
                {
                    var user = new User
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Email = model.Email,
                        UserName = model.Username,
                        BirthDate = model.BirthDate,
                    };
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (result.Succeeded)
                    {
                        var resultRole = _roleManager.RoleExistsAsync("user").Result;
                        if (!resultRole)
                        {
                            var role = new Role("user");
                            var roleResult = _roleManager.CreateAsync(role).Result;
                            //if (!roleResult.Succeeded)
                            //{
                            //    return new UserManagerResponse
                            //    {
                            //        Message = "Such User Already Exist"
                            //    };
                            //}
                        }
                        await _userManager.AddToRoleAsync(user, "user");
                        await _signInManager.SignInAsync(user, false);
                        return new UserRegisterResponse
                        {
                            IsSucces = true
                        };
                    }
                    //else
                    //{
                    //    foreach (var error in result.Errors)
                    //    {
                    //        ModelState.AddModelError(string.Empty, error.Description);
                    //        return new UserManagerResponse
                    //        {
                    //            Message = "Such User Already Exist"
                    //        };
                    //    }
                    //}
                }

                return new UserRegisterResponse
                {
                    IsSucces = false,
                    EmailIsAlreadyUsed = userEmail != null ? true : false,
                    UsernameIsAlreadyUsed = userUserName != null ? true : false
                };
                
            }

            return new UserRegisterResponse
            {
                Message = "Model State Invalid",
                IsSucces = false
            };
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<UserManagerResponse> Login([FromBody] LoginDto model)
        {
            var checkingPasswordResult = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

            if (checkingPasswordResult.Succeeded)
            {
                var signinCredentials = new SigningCredentials(_authenticationOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);
                var jwtSecurityToken = new JwtSecurityToken(
                     issuer: _authenticationOptions.Issuer,
                     audience: _authenticationOptions.Audience,
                     claims: new List<Claim>(),
                     expires: DateTime.Now.AddDays(30),
                     signingCredentials: signinCredentials
                );

                var tokenHandler = new JwtSecurityTokenHandler();

                var encodedToken = tokenHandler.WriteToken(jwtSecurityToken);
                return new UserManagerResponse
                {
                    Message = "Successfully: ",
                    IsSucces = true,
                    ExpireDate = jwtSecurityToken.ValidTo,
                    Token = encodedToken
                };
            }

            return new UserManagerResponse
            {
                Message = "Incorect password"
            };
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }


    }
}