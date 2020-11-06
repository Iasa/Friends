using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Friends.Exceptions
{
    public class NotFoundException : ApiException
    {
        public NotFoundException(string message):base(HttpStatusCode.NotFound, message)
        {
        }
    }
}
