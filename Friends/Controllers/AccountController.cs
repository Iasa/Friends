using AutoMapper;
using Friends.API.Identity;
using Friends.Core.Dtos.UserDto;
using Friends.Core.Services;
using Friends.Domain.Models;
using Friends.Domain.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Friends.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly AuthOptions _authenticationOptions;
        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, RoleManager<Role> roleManager,
            SignInManager<User> signInManager, IOptions<AuthOptions> authOptions, IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _authenticationOptions = authOptions.Value;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<UserManagerResponse> Register([FromBody] CreateUserDto model)
        {
            if (ModelState.IsValid)
            {
                if (model.Password != model.ConfirmedPassword)
                {
                    return new UserManagerResponse
                    {
                        IsSucces = false,
                        Message = "Passwords are not the same"
                    };
                }
                var userByEmail = await _userManager.FindByEmailAsync(model.Email);
                var userByUserName = await _userManager.FindByNameAsync(model.Username);
                if (userByEmail == null && userByUserName == null)
                {
                    var user = _mapper.Map<User>(model);

                    var result = await _userManager.CreateAsync(user, model.Password);
                    
                    if (result.Succeeded)
                    {
                        var resultRole = _roleManager.RoleExistsAsync("user").Result;
                        if (!resultRole)
                        {
                            var role = new Role("user");
                            var roleResult = _roleManager.CreateAsync(role).Result;
                        }
                        await _userManager.AddToRoleAsync(user, "user");
                       
                        return new UserManagerResponse
                        {
                            IsSucces = true
                        };
                    }

                }

                return new UserManagerResponse
                {
                    IsSucces = false,
                    Message = "Email or username is already used"
                };
                
            }

            return new UserManagerResponse
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

                var user = _userManager.FindByNameAsync(model.Username);

                UserDto userInfo = _mapper.Map<UserDto>(user.Result);

                return new UserManagerResponse
                {
                    Message = "Success",
                    IsSucces = true,
                    ExpireDate = jwtSecurityToken.ValidTo,
                    Token = encodedToken,
                    User = userInfo
                };
            }

            return new UserManagerResponse
            {
                IsSucces = false,
                Message = "Incorect password"
            };
        }

        [AllowAnonymous]
        [HttpPost("checkPassword")]
        public async Task<bool> CheckPassword(string username, string password)
        {
            if(!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                var user = await _userManager.FindByNameAsync(username);
                var isCorrectPassword = await _userManager.CheckPasswordAsync(user, password);
                return isCorrectPassword;
            }

            return false;
        }


    }
}
