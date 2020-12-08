﻿using Friends.CodeFirst;
using Friends.Domain;
using Friends.Dtos;
using Friends.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Repositories
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
                        _context.Set<UserChat>().FirstOrDefault(x => (x.ChatId == uc.ChatId) && (x.UserId != userId)).User.LastName
                }).ToList();


        }
    }
}
