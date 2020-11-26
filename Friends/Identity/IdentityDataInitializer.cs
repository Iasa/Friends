using Friends.Domain;
using Friends.Domain.Models.Auth;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Identity
{
    public static class IdentityDataInitializer
    {
        public static void SeedData(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            SeedUsers(userManager);
            SeedRoles(roleManager);
        }
        public static void SeedUsers(UserManager<User> userManager)
        {
            if(userManager.FindByEmailAsync("user@gmail.com").Result == null)
            {
                var user = new User
                {
                    Email = "user@gmail.com",
                    UserName = "user@gmail.com",
                    FirstName = "User",
                    LastName = "Default"
                };
                var result = userManager.CreateAsync(user, "First1234").Result;
                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "user");
                }
            }
        }
        public static void SeedRoles(RoleManager<Role> roleManager)
        {
            if (!roleManager.RoleExistsAsync("user").Result)
            {
                Role role = new Role("user");
                var result = roleManager.
                    CreateAsync(role).Result;
            }
        }

    }
}
