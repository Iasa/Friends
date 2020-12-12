using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Core.Dtos.ImageDto
{
    public class ImageDto
    {
        public long Id { get; set; }
        public string ImageTitle { get; set; }
        public byte[] ImageData { get; set; }
    }
}
