using AutoMapper;
using Friends.Core.Dtos.MessageDto;
using Friends.Core.Dtos.UserDto;
using Friends.Core.Dtos.ImageDto;
using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Friends.Core.Services;

namespace Friends.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ForMember(u => u.ProfileImageUrl, x => x.MapFrom(src => ProfileImageUrl.GetProfileImageUrl(src.Id)));
            CreateMap<User, LoginDto>();
            CreateMap<CreateUserDto, User>();

            CreateMap<NewMessageDto, Message>();
            CreateMap<Message, MessageDto>();
        }
    }
}
