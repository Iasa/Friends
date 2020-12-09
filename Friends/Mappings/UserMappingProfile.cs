using AutoMapper;
using Friends.Core.Dtos.MessageDto;
using Friends.Core.Dtos.UserDto;
using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.API.Mappings
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<User, LoginDto>();
            CreateMap<NewMessageDto, Message>();
        }
    }
}
