using Friends.Core.Dtos.ChatDto;
using Friends.Core.Dtos.MessageDto;
using Friends.Core.Services;
using Friends.Domain.Models;
using Friends.Infrastructure;
using Friends.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Core.Repositories.Interfaces
{
    public class ChatRepository : Repository<Chat>, IChatRepository
    {
        private readonly int _messagesPerPage = 10;
        public ChatRepository(FriendsDbContext context) : base(context)
        {
        }

        public IEnumerable<MessageDto> GetChatMessages(long chatId, int pageNumber)
        {
            return _context.Set<Message>().Where(m => m.ChatId == chatId)
                .Select(m => new MessageDto
                {
                    Id = m.Id,
                    SenderId = m.SenderId,
                    SenderName = _context.Set<User>().FirstOrDefault(u => u.Id == m.SenderId).FirstName + " " +
                                 _context.Set<User>().FirstOrDefault(u => u.Id == m.SenderId).LastName,
                    ChatId = m.ChatId,
                    SendingTime = m.SendingTime,
                    Content = m.Content
                })
                .OrderByDescending(m => m.SendingTime).Page(pageNumber, _messagesPerPage).OrderBy(m => m.SendingTime).ToList();
        }


        public IEnumerable<ChatDto> GetUserChats(long userId)
        {
            List<ChatDto> chatList = new List<ChatDto>();

            return _context.Set<UserChat>().Where(uc => uc.UserId == userId)
                .Select(uc => new ChatDto
                {
                    ChatId = uc.ChatId,
                    Name = uc.Chat.IsGroup ? uc.Chat.Name : 
                        _context.Set<UserChat>().FirstOrDefault(x => (x.ChatId == uc.ChatId) && (x.UserId != userId)).User.FirstName + " " +
                        _context.Set<UserChat>().FirstOrDefault(x => (x.ChatId == uc.ChatId) && (x.UserId != userId)).User.LastName,
                    IsGroup = uc.Chat.IsGroup
                }).ToList();
        }

        public void CreateChat(long userOneId, long userTwoId)
        {

            Chat newChat = new Chat() { IsGroup = false };

            _context.Set<Chat>().Add(newChat);
            Save();

            _context.Set<UserChat>().Add(new UserChat()
            {
                ChatId = newChat.Id,
                UserId = userOneId
            });

            _context.Set<UserChat>().Add(new UserChat()
            {
                ChatId = newChat.Id,
                UserId = userTwoId
            });

            Save();
        }

        public async Task<ChatDto> CreateGroup(string groupName, long[] usersId)
        {

            Chat newChat = new Chat()
            {
                IsGroup = true,
                Name = groupName
            };

            await _context.Set<Chat>().AddAsync(newChat);
            //Save();
            await _context.SaveChangesAsync();

            foreach (long userId in usersId)
            {
                await _context.Set<UserChat>().AddAsync(new UserChat()
                {
                    ChatId = newChat.Id,
                    UserId = userId
                });
            }

            //Save();
            await _context.SaveChangesAsync();

            return new ChatDto()
            {
                ChatId = newChat.Id,
                Name = groupName,
                IsGroup = true
            };
        }
    }
}
