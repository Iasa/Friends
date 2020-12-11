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
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<User, LoginDto>();
            CreateMap<NewMessageDto, Message>();
            CreateMap<Message, MessageDto>();
            CreateMap<Image, ImageDto>().ForMember(img=>img.ImageUrl, x => x.MapFrom(u => ImageUrl.GetImageUrl(u.Id)));
        }
    }
}
