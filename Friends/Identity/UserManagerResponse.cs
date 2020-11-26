using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebApi.Identity
{
    public class UserManagerResponse 
    {
        public string Message { get; set; }
        public bool IsSucces { get; set; }
        public DateTime ExpireDate { get; set; }
        public string Token { get; set; }

    }
}