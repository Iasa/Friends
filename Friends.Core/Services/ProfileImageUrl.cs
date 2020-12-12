using Friends.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Services
{
    public static class ProfileImageUrl
    {
        public static string GetProfileImageUrl(long userId)
        {
            return $"https://localhost:44329/api/User/{userId}/Image";
        }
    }
}
