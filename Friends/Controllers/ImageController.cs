using Friends.Core.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageServices _imageServices;

        public ImageController(IImageServices imageServices)
        {
            _imageServices = imageServices;
        }

        [HttpGet("{imageId}")]
        public IActionResult Get(long imageId)
        {
           // _imageServices.GetProfileImage()
            return Ok();
        }
    }
}
