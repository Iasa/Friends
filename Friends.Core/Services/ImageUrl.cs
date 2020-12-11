using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Services
{
    public static class ImageUrl
    {
        private const string BaseUrl = "https://localhost:44329/api/Image/";
        public static string GetImageUrl(long imageId)
        {
            return $"{BaseUrl}{imageId}";
        }
    }
}
