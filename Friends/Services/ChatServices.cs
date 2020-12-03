﻿using Friends.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.Services
{
    public class ChatServices : IChatServices
    {
        private readonly IChatRepository _chatRepository;
        public ChatServices(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }
        public IEnumerable<Object> GetUserChats(long userId)
        {
            return _chatRepository.GetUserChats(userId);
        }
    }
}