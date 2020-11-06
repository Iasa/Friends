using Friends.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Friends
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        TEntity Find(long id);
        IQueryable<TEntity> GetAll();
        void Add(TEntity entity);
        void Remove(TEntity entity);
        void Save();
    }
}
