using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Friends.Core.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        //TEntity Find(long id);
        IQueryable<TEntity> GetAll();
        void Add(TEntity entity);
        void Remove(TEntity entity);
        void Save();
    }
}
