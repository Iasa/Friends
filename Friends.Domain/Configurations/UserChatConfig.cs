using Friends.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Friends.Domain.Configurations
{
    public class UserChatConfig : IEntityTypeConfiguration<UserChat>
    {
        public void Configure(EntityTypeBuilder<UserChat> builder)
        {
            builder.HasOne<User>(u => u.User).WithMany(u => u.UserChats).HasForeignKey(u => u.UserId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<Chat>(u => u.Chat).WithMany(c => c.UserChats).HasForeignKey(u => u.ChatId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
