using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Friends.Domain.Models;
using Friends.Domain.Models.Auth;
using Friends.Domain.Configurations;

namespace Friends.Infrastructure
{
    public class FriendsDbContext : IdentityDbContext<User, Role, long, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public FriendsDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new ChatConfig());
            modelBuilder.ApplyConfiguration(new MessageConfig());
            modelBuilder.ApplyConfiguration(new UserChatConfig());
            modelBuilder.ApplyConfiguration(new RelationConfig());
            ApplyIdentityMapConfiguration(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Relation> Relations { get; set; }

        private void ApplyIdentityMapConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users", SchemaConsts.Auth);
            modelBuilder.Entity<UserClaim>().ToTable("UserClaims", SchemaConsts.Auth);
            modelBuilder.Entity<UserLogin>().ToTable("UserLogins", SchemaConsts.Auth);
            modelBuilder.Entity<UserToken>().ToTable("UserRoles", SchemaConsts.Auth);
            modelBuilder.Entity<Role>().ToTable("Roles", SchemaConsts.Auth);
            modelBuilder.Entity<RoleClaim>().ToTable("RoleClaims", SchemaConsts.Auth);
            modelBuilder.Entity<UserRole>().ToTable("UserRole", SchemaConsts.Auth);
        }

    }
}
