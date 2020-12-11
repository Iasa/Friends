using Friends.Core.Dtos.ImageDto;
using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Repositories.Interfaces
{
    public interface IImageRepository : IRepository<Image>
    {
        void AddProfileImage(long userId, string imageTitle, byte[] imageData);
        Image GetProfileImage(long userId);
    }
}
