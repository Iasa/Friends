using Friends.CodeFirst;
using Friends.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Friends
{
    class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly FriendsDbContext _context;
        public Repository(FriendsDbContext context)
        {
            _context = context;
        }
        public void Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
        }

        public TEntity Find(long id)
        {
            return _context.Set<TEntity>().FirstOrDefault(u => u.Id == id);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _context.Set<TEntity>();
        }

        public void Remove(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
