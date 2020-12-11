using AutoMapper;
using Friends.Core.Dtos.ImageDto;
using Friends.Core.Repositories.Interfaces;
using Friends.Core.Services.Interfaces;
using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Services
{
    class ImageServices : IImageServices
    {
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;

        public ImageServices(IImageRepository imageRepository, IMapper mapper)
        {
            _imageRepository = imageRepository;
            _mapper = mapper;
        }
        public void AddProfileImage(long userId, string imageTitle, byte[] imageData)
        {
            _imageRepository.AddProfileImage(userId, imageTitle, imageData);
        }

        public ImageDto GetProfileImage(long userId)
        {
            var image = _imageRepository.GetProfileImage(userId);
            var imageDto = _mapper.Map<ImageDto>(image);

            return imageDto;
        }
    }
}
