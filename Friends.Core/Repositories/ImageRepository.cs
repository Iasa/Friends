using Friends.Core.Repositories.Interfaces;
using Friends.Domain.Models;
using Friends.Infrastructure;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using Friends.Core.Dtos.ImageDto;

namespace Friends.Core.Repositories
{
    public class ImageRepository : Repository<Image>, IImageRepository
    {
        public ImageRepository(FriendsDbContext context) : base(context)
        {
        }

        public void AddProfileImage(long userId, string imageTitle, byte[] imageData)
        {
            var newImage = new Image()
            {
                ImageTitle = imageTitle,
                ImageData = imageData
            };

            _context.Set<Image>().Add(newImage);
            
            Save();

            _context.Set<User>().FirstOrDefault(u => u.Id == userId).ProfileImageId = newImage.Id;

            Save();
        }

        public Image GetProfileImage(long userId)
        {
            Image image = _context.Set<Image>().FirstOrDefault(img => img.Id == (_context.Set<User>().FirstOrDefault(u => u.Id == userId).ProfileImageId));

            return image;
        }
    }
}
