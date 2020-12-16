using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Services
{
    public static class PaginExtension
    {
        public const int DefaultPageSize = 12;
        public static IEnumerable<TSource> Page<TSource>(this IEnumerable<TSource> source, int pageNumber, int pageSize = DefaultPageSize)
        {
            return source.Skip((pageNumber - 1) * pageSize).Take(pageSize);
        }
    }
}
