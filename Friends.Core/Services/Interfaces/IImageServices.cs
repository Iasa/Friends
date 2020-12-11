using Friends.Core.Dtos.ImageDto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Services.Interfaces
{
    public interface IImageServices
    {
        void AddProfileImage(long userId, string imageTitle, byte[] imageData);
        ImageDto GetProfileImage(long userId);
    }
}
