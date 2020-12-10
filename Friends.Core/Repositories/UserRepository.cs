using Friends.Core.Dtos.UserDto;
using Friends.Core.Repositories.Interfaces;
using Friends.Core.Services;
using Friends.Domain.Models;
using Friends.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly int _peoplePerPage = 12;
        public UserRepository(FriendsDbContext context) : base(context)
        {
        }

        public void CreateChat(long userId, long friendId)
        {
            Chat newChat = new Chat()
            {
                IsGroup = false
            };

            _context.Set<Chat>().Add(newChat);
            _context.SaveChanges();

            long chatId = _context.Set<Chat>().OrderBy(c => c.Id).Select(c=>c.Id).LastOrDefault();

            _context.Set<UserChat>().Add(new UserChat()
            {
                ChatId = chatId,
                UserId = userId
            });

            _context.Set<UserChat>().Add(new UserChat()
            {
                ChatId = chatId,
                UserId = friendId
            });

            Save();
        }

        public void AddRelation(long userId, long friendId)
        {
            var newRelation = new Relation()
            {
                UserOneId = userId,
                UserTwoId = friendId
            };

            _context.Set<Relation>().Add(newRelation);
            Save();

            CreateChat(userId, friendId);
        }

        public User Find(long id)
        {
            return _context.Set<User>().FirstOrDefault(u => u.Id == id);
        }

        public IEnumerable<UserDto>  GetNonFriends(long userId, string query, int pageNumber,
            bool orderByFirstName = false, bool orderByLastName = false, bool orderByAge = false, bool orderAscending = true)
        {
            //var re = _context.Set<User>().Where(u => u.FirstName.Contains(query));

            //var userFriends = _context.Set<UserChat>().Where(uc => uc.UserId == userId)
            //    .Select(uc =>
            //        _context.Set<UserChat>().Where(u=>(u.ChatId == uc.ChatId) && (u.UserId != userId)).Select(u=>u.UserId).ToList()
            //    ).ToList();
            //List<long> userFriendsIds = new List<long>();
            //userFriends.ForEach(e => userFriendsIds = e.ToList());

            //var nonFrieds = _context.Set<User>().Where(u => (u.Id != userId && !(userFriendsIds.Contains(u.Id))) && (!string.IsNullOrEmpty(query) ? (u.FirstName.Contains(query) || u.LastName.Contains(query)) : true))
            //   .Select(u => new UserDto
            //   {
            //       Id = u.Id,
            //       FirstName = u.FirstName,
            //       LastName = u.LastName,
            //       BirthDate = u.BirthDate,
            //   });

            var userFriends = _context.Set<Relation>().Where(u => u.UserOneId == userId || u.UserTwoId == userId)
                .Select(u => u.UserOneId == userId ? u.UserTwoId : u.UserOneId);

            var nonFriends = _context.Set<User>().Where(u => !userFriends.Contains(u.Id) 
                        && u.Id != userId && (!string.IsNullOrEmpty(query) ? (u.FirstName.Contains(query) || u.LastName.Contains(query)) : true))
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    BirthDate = u.BirthDate
                });

            if(orderAscending)
            {
                if (orderByAge) nonFriends = nonFriends.OrderBy(x => x.BirthDate);
                else if (orderByFirstName) nonFriends = nonFriends.OrderBy(x => x.FirstName);
                else if (orderByLastName) nonFriends = nonFriends.OrderBy(x => x.LastName);
            } else
            {
                if (orderByAge) nonFriends = nonFriends.OrderByDescending(x => x.BirthDate);
                else if (orderByFirstName) nonFriends = nonFriends.OrderByDescending(x => x.FirstName);
                else if (orderByLastName) nonFriends = nonFriends.OrderByDescending(x => x.LastName);
            }

            return nonFriends.Page(pageNumber, _peoplePerPage).ToList();
        }

    }
}
