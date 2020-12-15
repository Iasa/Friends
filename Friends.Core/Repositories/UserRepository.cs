using AutoMapper;
using Friends.Core.Dtos.UserDto;
using Friends.Core.Repositories.Interfaces;
using Friends.Core.Services;
using Friends.Domain.Models;
using Friends.Infrastructure;
using Friends.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly int _peoplePerPage = 12;
        private readonly IChatRepository _chatRepository;
        private readonly IMapper _mapper;

        public UserRepository(FriendsDbContext context, IChatRepository chatRepository, IMapper mapper) : base(context)
        {
            _chatRepository = chatRepository;
            _mapper = mapper;
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

            _chatRepository.CreateChat(userId, friendId);
        }

        public User Find(long id)
        {
            return _context.Set<User>().FirstOrDefault(u => u.Id == id);
        }

        public IEnumerable<UserDto> GetNonFriends(long userId, string query, int pageNumber,
            bool orderByFirstName = false, bool orderByLastName = false, bool orderByAge = false, bool orderAscending = true)
        {

            var userFriends = _context.Set<Relation>().Where(u => u.UserOneId == userId || u.UserTwoId == userId)
                .Select(u => u.UserOneId == userId ? u.UserTwoId : u.UserOneId);

            var nonFriends = _context.Set<User>().Where(u => !userFriends.Contains(u.Id)
                        && u.Id != userId && (!string.IsNullOrEmpty(query) ? (u.FirstName.Contains(query) || u.LastName.Contains(query)) : true))
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    BirthDate = u.BirthDate,
                    ProfileImageUrl = ProfileImageUrl.GetProfileImageUrl(u.Id)
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

        public IEnumerable<UserDto> GetFriends(long userId)
        {
            var userFriends = _context.Set<Relation>()
                                .Where(r => r.UserOneId == userId || r.UserTwoId == userId)
                                .Select(r => r.UserOneId == userId ? r.UserTwo : r.UserOne)
                                .Select(u => _mapper.Map<UserDto>(u))
                                .ToList();

            return userFriends;
        }

        public void AddProfileImage(long userId, string imageTitle, byte[] imageData)
        {
            var oldImage = _context.Set<Image>()
                .FirstOrDefault(img => img.Id == (_context.Set<User>().FirstOrDefault(u => u.Id == userId).ProfileImageId));
            
            if( oldImage != null )
            {
                oldImage.ImageTitle = imageTitle;
                oldImage.ImageData = imageData;
                Save();
            } else
            {
                var newImage = new Image()
                {
                    ImageTitle = imageTitle,
                    ImageData = imageData
                };

                _context.Set<Image>().Add(newImage);
                Save();

                _context.Set<User>().FirstOrDefault(u => u.Id == userId).ProfileImageId = newImage.Id;
                Save();
            }
        }

        // trebuie sa returneze ImageDto - de facut maparea 
        public Image GetProfileImage(long userId)
        {
            return _context.Set<Image>().FirstOrDefault(img => img.Id == (_context.Set<User>().FirstOrDefault(u => u.Id == userId).ProfileImageId));
        }

        public void RemoveProfileImage(long userId)
        {
            var imageIdToRemove = _context.Set<User>().FirstOrDefault(u => u.Id == userId).ProfileImageId;
            var imageToRemove = _context.Set<Image>().FirstOrDefault(img => img.Id == imageIdToRemove);
            _context.Set<Image>().Remove(imageToRemove);
            Save();
        }

    }
}
